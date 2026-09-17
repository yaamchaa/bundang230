import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Eye, EyeOff } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function LoginPage() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const normalizePhone = (value: string) => value.replace(/\D/g, '');

  const toMemberEmail = (value: string) => {
    const digits = normalizePhone(value);
    return digits ? `${digits}@member.local` : '';
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const email = toMemberEmail(phone);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert('로그인 실패: ' + error.message);
      return;
    }

    const role = data.user?.user_metadata?.role;

    if (role === 'admin') {
      navigate('/admin/codes');
      return;
    }

    navigate('/kirochada');
  };

  return (
    <div className="pt-[140px] min-h-screen px-6 pb-20 flex items-center justify-center">
      <div className="w-full max-w-md border border-gray-200 rounded-2xl p-8 bg-white">
        <h1 className="text-2xl font-light mb-6 text-center">조합원 로그인</h1>

        <form onSubmit={handleLogin} className="space-y-4">
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
            <label className="block text-sm mb-2">비밀번호</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-lg bg-black text-white disabled:opacity-60"
          >
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          <Link to="/register" className="underline">
            조합원 회원가입
          </Link>
        </div>

        <div className="mt-3 text-center text-sm text-gray-400">
          <Link to="/admin/login" className="underline">
            관리자 로그인
          </Link>
        </div>
      </div>
    </div>
  );
}