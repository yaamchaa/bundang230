import { useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function AdminCodesPage() {
  const [generatedCode, setGeneratedCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [adminSetting, setAdminSetting] = useState(false);

  const handleSetAdminRole = async () => {
    setAdminSetting(true);

    const { data, error } = await supabase.functions.invoke('make-server-15b3813f', {
      body: {
        action: 'set_admin_role',
      },
    });

    setAdminSetting(false);

    if (error) {
      alert('관리자 권한 설정 실패');
      return;
    }

    alert(data?.message || '관리자 권한 설정 완료');
  };

  const handleGenerateCode = async () => {
    setLoading(true);

    const { data, error } = await supabase.functions.invoke('make-server-15b3813f', {
      body: {
        action: 'generate_code',
      },
    });

    setLoading(false);

    if (error) {
      alert('코드 생성 실패');
      return;
    }

    if (!data?.code) {
      alert(data?.error || '생성된 코드가 없습니다.');
      return;
    }

    setGeneratedCode(data.code);
  };

  return (
    <div className="pt-[140px] min-h-screen px-6 pb-20">
      <div className="max-w-xl mx-auto border border-gray-200 rounded-2xl p-8 bg-white">
        <h1 className="text-2xl font-light mb-6 text-center">조합원 인증코드 관리</h1>

        <button
          onClick={handleSetAdminRole}
          disabled={adminSetting}
          className="w-full h-12 rounded-lg border border-black text-black mb-3"
        >
          {adminSetting ? '설정 중...' : '관리자 권한 1회 설정'}
        </button>

        <button
          onClick={handleGenerateCode}
          disabled={loading}
          className="w-full h-12 rounded-lg bg-black text-white"
        >
          {loading ? '생성 중...' : '코드생성'}
        </button>

        <div className="mt-6 border border-dashed border-gray-300 rounded-xl p-6 text-center">
          <p className="text-sm text-gray-500 mb-2">생성된 6자리 인증코드</p>
          <p className="text-3xl tracking-[0.3em] font-light">
            {generatedCode || '------'}
          </p>
        </div>

        <p className="mt-4 text-sm text-gray-500 text-center">
          먼저 관리자 권한 1회 설정 버튼을 누른 뒤, 코드생성을 실행하세요.
        </p>
      </div>
    </div>
  );
}