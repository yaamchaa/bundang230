import { useState } from 'react';
import { useNavigate } from 'react-router';
import { supabase } from '../../lib/supabase';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const toAdminEmail = (value: string) =>
    `${value.replace(/\D/g, '')}@admin.local`;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const email = toAdminEmail(phone);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert('관리자 로그인 실패: ' + error.message);
      return;
    }

    navigate('/admin/codes');
  };

  return (
    <div className="pt-[140px] min-h-screen px-6 pb-20">
      <div className="max-w-md mx-auto border border-gray-200 rounded-2xl p-8 bg-white">
        <h1 className="text-2xl font-light mb-6 text-center">관리자 로그인</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="전화번호"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full h-12 border border-gray-300 rounded-lg px-4"
          />

          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-12 border border-gray-300 rounded-lg px-4"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-lg bg-black text-white"
          >
            {loading ? '로그인 중...' : '관리자 로그인'}
          </button>
        </form>
      </div>
    </div>
  );
}