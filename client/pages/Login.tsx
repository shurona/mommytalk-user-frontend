import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

// LINE 로그인 URL 생성 함수
const generateLineLoginUrl = () => {
  const channelId = import.meta.env.VITE_LINE_CHANNEL_ID;
  const redirectUri = import.meta.env.VITE_LINE_REDIRECT_URI;

  // ✅ CSRF 방지를 위한 랜덤 state 생성
  const state = crypto.randomUUID();

  // ✅ localStorage에 state 저장
  localStorage.setItem('line_login_state', state);

  // LINE OAuth URL
  const lineAuthUrl = new URL('https://access.line.me/oauth2/v2.1/authorize');
  lineAuthUrl.searchParams.append('response_type', 'code');
  lineAuthUrl.searchParams.append('client_id', channelId);
  lineAuthUrl.searchParams.append('redirect_uri', redirectUri);
  lineAuthUrl.searchParams.append('state', state);
  lineAuthUrl.searchParams.append('scope', 'profile openid email');

  return lineAuthUrl.toString();
};

// Kakao 로그인 URL 생성 함수
const generateKakaoLoginUrl = () => {
  const clientId = import.meta.env.VITE_KAKAO_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_KAKAO_REDIRECT_URI;

  // ✅ CSRF 방지를 위한 랜덤 state 생성
  const state = crypto.randomUUID();

  // ✅ localStorage에 state 저장
  localStorage.setItem('kakao_login_state', state);

  // Kakao OAuth URL
  const kakaoAuthUrl = new URL('https://kauth.kakao.com/oauth/authorize');
  kakaoAuthUrl.searchParams.append('response_type', 'code');
  kakaoAuthUrl.searchParams.append('client_id', clientId);
  kakaoAuthUrl.searchParams.append('redirect_uri', redirectUri);
  kakaoAuthUrl.searchParams.append('state', state);

  return kakaoAuthUrl.toString();
};

export default function Login() {
  const navigate = useNavigate();

  // 이미 로그인되어 있는지 체크
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const userInfoStr = localStorage.getItem('user_info');

    if (token && userInfoStr) {
      try {
        const user = JSON.parse(userInfoStr);

        // 온보딩 완료 여부에 따라 리다이렉트
        if (user.onboardingCompleted) {
          navigate('/dashboard', { replace: true });
        } else {
          navigate('/onboarding1', { replace: true });
        }
      } catch (error) {
        // user_info 파싱 실패 시 토큰만 삭제
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_info');
      }
    }
  }, [navigate]);

  const handleLineLogin = () => {
    const loginUrl = generateLineLoginUrl();
    window.location.href = loginUrl;
  };

  const handleKakaoLogin = () => {
    const loginUrl = generateKakaoLoginUrl();
    window.location.href = loginUrl;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center px-[25px]">
      <div className="w-full max-w-[343px] flex flex-col gap-[60px]">
        {/* Logo & Title */}
        <div className="flex flex-col gap-[30px] items-center pt-[5px]">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2Fe9b9b01c41aa41ffb5a9c124b22fbbf4%2Fbdfca41c901a4c89a48d6eb0577fdc27"
            alt="Mommy Talk English"
            className="w-[100px] h-auto"
          />
          <div className="flex flex-col gap-[15px] text-center">
            <h1 className="text-[26px] font-bold leading-[145%] text-foreground">
              환영합니다 💛
            </h1>
            <p className="text-[16px] leading-[145%] text-muted-foreground">
              마미톡잉글리시로 엄마표영어 루틴을 만들어보세요!
            </p>
          </div>
        </div>

        {/* Illustration */}
        <div className="flex justify-center">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2Fe9b9b01c41aa41ffb5a9c124b22fbbf4%2F5ef8d5d724b04f5aa24d9690fa3df549"
            alt="Cute owls illustration"
            className="w-[250px] h-auto"
          />
        </div>

        {/* Login Buttons */}
        <div className="flex flex-col gap-[25px]">
          {/* Kakao Login Button */}
          <Button
            onClick={handleKakaoLogin}
            className="w-full h-[62px] rounded-[20px] text-[18px] font-medium tracking-[-0.72px]"
            style={{
              backgroundColor: '#FEE500',
              color: '#000000',
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2"
            >
              <path
                d="M12 3C6.477 3 2 6.582 2 11C2 13.395 3.293 15.55 5.374 16.935L4.57 19.935C4.507 20.162 4.688 20.378 4.918 20.325L8.444 19.348C9.569 19.688 10.761 19.875 12 19.875C17.523 19.875 22 16.293 22 11.875C22 7.457 17.523 3 12 3Z"
                fill="currentColor"
              />
            </svg>
            카카오로 시작하기
          </Button>
        </div>

        {/* Footer Text */}
        <p className="text-[14px] text-center text-muted-foreground leading-[145%]">
          로그인하시면{' '}
          <a href="#" className="underline">
            이용약관
          </a>{' '}
          및{' '}
          <a href="#" className="underline">
            개인정보처리방침
          </a>
          에 동의하신 것으로 처리됩니다.
        </p>
      </div>
    </div>
  );
}
