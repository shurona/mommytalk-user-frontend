import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const userInfoStr = localStorage.getItem('user_info');

    // 로그인되어 있지 않으면 루트 페이지로 리다이렉트
    if (!token || !userInfoStr) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  const token = localStorage.getItem('auth_token');
  const userInfoStr = localStorage.getItem('user_info');

  // 로그인되어 있지 않으면 null 반환 (빈 화면)
  if (!token || !userInfoStr) {
    return null;
  }

  return <>{children}</>;
}
