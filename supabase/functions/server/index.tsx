import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
};

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const adminClient = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

function json(status: number, data: unknown) {
  return new Response(JSON.stringify(data), {
    status,
    headers: corsHeaders,
  });
}

function normalizePhone(phone: string) {
  return String(phone || "").replace(/[^0-9]/g, "");
}

function toMemberEmail(phone: string) {
  const digits = normalizePhone(phone);
  return digits ? `${digits}@member.local` : "";
}

function generateSixDigitCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

async function getAuthUser(req: Request) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) return null;

  const userClient = createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: authHeader,
      },
    },
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data, error } = await userClient.auth.getUser();
  if (error || !data.user) return null;
  return data.user;
}

async function requireAdmin(req: Request) {
  const user = await getAuthUser(req);
  if (!user) return { error: json(401, { error: "로그인이 필요합니다." }) };

  const { data: profile, error: profileError } = await adminClient
    .from("profiles")
    .select("id, role, approved")
    .eq("id", user.id)
    .single();

  if (profileError || !profile || profile.role !== "admin" || !profile.approved) {
    return { error: json(403, { error: "관리자 권한이 없습니다." }) };
  }

  return { user, profile };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return json(405, { error: "POST 요청만 허용됩니다." });
  }

  try {
    const body = await req.json();
    const action = body?.action;

    if (!action) {
      return json(400, { error: "action 값이 필요합니다." });
    }

    // 0) 현재 로그인한 사용자를 관리자 권한으로 1회 설정
    if (action === "set_admin_role") {
      const currentUser = await getAuthUser(req);

      if (!currentUser) {
        return json(401, { error: "로그인이 필요합니다." });
      }

      const phone =
        normalizePhone(String(currentUser.user_metadata?.phone || "")) ||
        normalizePhone(String(body.phone || ""));
      const email =
        String(currentUser.email || "").trim().toLowerCase() ||
        toMemberEmail(phone);

      const { data: updatedUser, error: updateError } =
        await adminClient.auth.admin.updateUserById(currentUser.id, {
          email,
          email_confirm: true,
          app_metadata: {
            ...(currentUser.app_metadata || {}),
            role: "admin",
          },
          user_metadata: {
            ...(currentUser.user_metadata || {}),
            role: "admin",
            phone,
          },
        });

      if (updateError) {
        return json(500, { error: updateError.message });
      }

      const { error: profileUpsertError } = await adminClient
        .from("profiles")
        .upsert({
          id: currentUser.id,
          phone: phone || null,
          villa_name: "관리자",
          unit_number: "관리자",
          role: "admin",
          approved: true,
          created_by: currentUser.id,
        });

      if (profileUpsertError) {
        return json(500, { error: profileUpsertError.message });
      }

      return json(200, {
        message: "관리자 role 설정 완료",
        user_id: updatedUser.user?.id,
        email: updatedUser.user?.email,
        app_metadata: updatedUser.user?.app_metadata,
        user_metadata: updatedUser.user?.user_metadata,
      });
    }

    // 1) 관리자 최초 생성
    if (action === "bootstrap_admin") {
      const phone = normalizePhone(body.phone || "");
      const email = toMemberEmail(phone);
      const password = String(body.password || "");
      const villaName = String(body.villa_name || "관리자").trim();
      const unitNumber = String(body.unit_number || "관리자").trim();

      if (!phone || !password) {
        return json(400, { error: "phone, password는 필수입니다." });
      }

      if (password.length < 8) {
        return json(400, { error: "비밀번호는 8자 이상이어야 합니다." });
      }

      const existing = await adminClient.auth.admin.listUsers();
      const adminExists = existing.data?.users?.some((u) => {
        return (u.email || "").toLowerCase() === email.toLowerCase();
      });

      if (adminExists) {
        return json(409, { error: "이미 관리자 계정이 존재합니다." });
      }

      const { data: createdUser, error: createError } = await adminClient.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: {
          role: "admin",
          phone,
        },
      });

      if (createError || !createdUser.user) {
        return json(500, { error: createError?.message || "관리자 생성 실패" });
      }

      const { error: profileInsertError } = await adminClient.from("profiles").insert({
        id: createdUser.user.id,
        phone,
        villa_name: villaName,
        unit_number: unitNumber,
        role: "admin",
        approved: true,
        created_by: createdUser.user.id,
      });

      if (profileInsertError) {
        return json(500, { error: profileInsertError.message });
      }

      return json(200, {
        message: "관리자 계정 생성 완료",
        user_id: createdUser.user.id,
      });
    }

    // 2) 관리자용 코드 생성
    if (action === "generate_code") {
      const auth = await requireAdmin(req);
      if ("error" in auth) return auth.error;

      const targetPhone = body.target_phone ? normalizePhone(body.target_phone) : null;
      const expiresMinutes = Number(body.expires_minutes || 30);
      const code = generateSixDigitCode();

      const expiresAt = new Date(Date.now() + expiresMinutes * 60 * 1000).toISOString();

      const { data, error } = await adminClient
        .from("signup_codes")
        .insert({
          code,
          target_phone: targetPhone,
          created_by: auth.user.id,
          expires_at: expiresAt,
        })
        .select("id, code, target_phone, expires_at, created_at")
        .single();

      if (error) {
        return json(500, { error: error.message });
      }

      return json(200, {
        message: "인증코드 생성 완료",
        code: data.code,
        expires_at: data.expires_at,
        target_phone: data.target_phone,
      });
    }

    // 3) 조합원 회원가입
    if (action === "register_member") {
      const phone = normalizePhone(body.phone || "");
      const email = toMemberEmail(phone);
      const villaName = String(body.villa_name || "").trim();
      const unitNumber = String(body.unit_number || "").trim();
      const password = String(body.password || "");
      const passwordConfirm = String(body.password_confirm || "");
      const code = String(body.code || "").trim();

      if (!phone || !villaName || !unitNumber || !password || !passwordConfirm || !code) {
        return json(400, { error: "모든 항목을 입력해주세요." });
      }

      if (password.length < 8) {
        return json(400, { error: "비밀번호는 8자 이상이어야 합니다." });
      }

      if (password !== passwordConfirm) {
        return json(400, { error: "비밀번호와 비밀번호 확인이 일치하지 않습니다." });
      }

      if (!/^[0-9]{6}$/.test(code)) {
        return json(400, { error: "인증코드는 6자리 숫자여야 합니다." });
      }

      const { data: codeRow, error: codeError } = await adminClient
        .from("signup_codes")
        .select("*")
        .eq("code", code)
        .is("used_at", null)
        .gt("expires_at", new Date().toISOString())
        .maybeSingle();

      if (codeError) {
        return json(500, { error: codeError.message });
      }

      if (!codeRow) {
        return json(400, { error: "유효하지 않거나 만료된 인증코드입니다." });
      }

      if (codeRow.target_phone && normalizePhone(codeRow.target_phone) !== phone) {
        return json(400, { error: "이 인증코드는 해당 전화번호용이 아닙니다." });
      }

      const { data: existingProfiles } = await adminClient
        .from("profiles")
        .select("id")
        .eq("phone", phone)
        .limit(1);

      if (existingProfiles && existingProfiles.length > 0) {
        return json(409, { error: "이미 가입된 전화번호입니다." });
      }

      const existingUsers = await adminClient.auth.admin.listUsers();
      const authUserExists = existingUsers.data?.users?.some((u) => {
        return (u.email || "").toLowerCase() === email.toLowerCase();
      });

      if (authUserExists) {
        return json(409, { error: "이미 가입된 전화번호입니다." });
      }

      const { data: createdUser, error: createUserError } = await adminClient.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: {
          phone,
          villa_name: villaName,
          unit_number: unitNumber,
          role: "member",
        },
      });

      if (createUserError || !createdUser.user) {
        return json(500, { error: createUserError?.message || "회원 생성 실패" });
      }

      const { error: profileError } = await adminClient.from("profiles").insert({
        id: createdUser.user.id,
        phone,
        villa_name: villaName,
        unit_number: unitNumber,
        role: "member",
        approved: true,
        created_by: codeRow.created_by,
      });

      if (profileError) {
        return json(500, { error: profileError.message });
      }

      const { error: codeUsedError } = await adminClient
        .from("signup_codes")
        .update({
          used_at: new Date().toISOString(),
          used_by: createdUser.user.id,
        })
        .eq("id", codeRow.id);

      if (codeUsedError) {
        return json(500, { error: codeUsedError.message });
      }

      return json(200, {
        message: "회원가입 완료",
        user_id: createdUser.user.id,
      });
    }

    return json(400, { error: "지원하지 않는 action입니다." });
  } catch (error) {
    return json(500, {
      error: error instanceof Error ? error.message : "서버 오류",
    });
  }
});