import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  FunctionsHttpError,
  FunctionsRelayError,
  FunctionsFetchError,
} from '@supabase/supabase-js';
import { Eye, EyeOff } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function RegisterPage() {
  const navigate = useNavigate();

  const [phone, setPhone] = useState('');
  const [villaName, setVillaName] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 8) {
      alert('비밀번호는 8자 이상이어야 합니다.');
      return;
    }

    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke(
        'make-server-15b3813f',
        {
          body: {
            action: 'register_member',
            phone,
            villa_name: villaName,
            unit_number: roomNumber,
            password,
            password_confirm: passwordConfirm,
            code: inviteCode.trim(),
          },
        }
      );

      if (error) {
        if (error instanceof FunctionsHttpError) {
          const errorBody = await error.context.json();
          alert(errorBody?.error || '회원가입 실패');
        } else if (error instanceof FunctionsRelayError) {
          alert('서버 중계 오류: ' + error.message);
        } else if (error instanceof FunctionsFetchError) {
          alert('네트워크 오류: ' + error.message);
        } else {
          alert('회원가입 실패: ' + error.message);
        }
        return;
      }

      if (data?.error) {
        alert(data.error);
        return;
      }

      alert('회원가입 완료. 로그인해 주세요.');
      navigate('/login');
    } catch (err) {
      alert(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-[140px] min-h-screen px-6 pb-20 flex items-center justify-center">
      <div className="w-full max-w-lg border border-gray-200 rounded-2xl p-8 bg-white">
        <h1 className="text-2xl font-light mb-6 text-center">조합원 회원가입</h1>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm mb-2">전화번호</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="01012345678"
              className="w-full h-12 px-4 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-2">빌라명</label>
            <input
              type="text"
              value={villaName}
              onChange={(e) => setVillaName(e.target.value)}
              className="w-full h-12 px-4 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-2">동.호수</label>
            <input
              type="text"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              placeholder="예: 동이 없으면 호수만 입력 가능"
              className="w-full h-12 px-4 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-2">비밀번호</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                placeholder="6자 이상 입력"
                className="w-full h-12 px-4 pr-12 border border-gray-300 rounded-lg"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
                aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
                aria-pressed={showPassword}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <p className="mt-2 text-xs text-gray-500">비밀번호는 6자 이상이어야 합니다.</p>
          </div>

          <div>
            <label className="block text-sm mb-2">비밀번호 확인</label>
            <div className="relative">
              <input
                type={showPasswordConfirm ? 'text' : 'password'}
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                minLength={6}
                placeholder="비밀번호를 다시 입력"
                className="w-full h-12 px-4 pr-12 border border-gray-300 rounded-lg"
                required
              />
              <button
                type="button"
                onClick={() => setShowPasswordConfirm((prev) => !prev)}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
                aria-label={showPasswordConfirm ? '비밀번호 확인 숨기기' : '비밀번호 확인 보기'}
                aria-pressed={showPasswordConfirm}
              >
                {showPasswordConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2">인증코드</label>
            <input
              type="text"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              placeholder="관리자에게 받은 6자리 숫자"
              className="w-full h-12 px-4 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-lg bg-black text-white disabled:opacity-60"
          >
            {loading ? '가입 처리 중...' : '회원가입'}
          </button>
        </form>
      </div>
    </div>
  );
}