import { ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router';
import { supabase } from '../lib/supabase';

type Props = {
  children: ReactNode;
  allowAdmin?: boolean;
  allowMember?: boolean;
};

export function ProtectedRoute({
  children,
  allowAdmin = false,
  allowMember = false,
}: Props) {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: authData } = await supabase.auth.getUser();
      const user = authData.user;

      if (!user) {
        setIsLoggedIn(false);
        setRole(null);
        setLoading(false);
        return;
      }

      setIsLoggedIn(true);

      const userRole =
        user.app_metadata?.role ??
        user.user_metadata?.role ??
        'member';

      setRole(userRole);
      setLoading(false);
    };

    checkUser();
  }, []);

  if (loading) {
    return (
      <div className="pt-[120px] min-h-screen flex items-center justify-center">
        <p className="text-gray-500">로딩 중...</p>
      </div>
    );
  }

  if (!isLoggedIn) {
  if (allowAdmin) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return <Navigate to="/login" replace state={{ from: location }} />;
}

  if (allowAdmin && role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  if (allowMember && role !== 'member' && role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}