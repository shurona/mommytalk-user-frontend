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
        <div className="flex flex-col gap-[30px] items-center">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2Fe9b9b01c41aa41ffb5a9c124b22fbbf4%2Fbdfca41c901a4c89a48d6eb0577fdc27"
            alt="Mommy Talk English"
            className="w-[180px] h-auto"
          />
          <div className="flex flex-col gap-[15px] text-center">
            <h1 className="text-[26px] font-bold leading-[145%] text-foreground">
              마미톡 잉글리쉬에
              <br />
              오신 것을 환영합니다!
            </h1>
            <p className="text-[16px] leading-[145%] text-muted-foreground">
              아이와 함께하는 영어 학습을 시작해보세요
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
        <div className="flex flex-col gap-[15px]">
          {/* LINE Login Button */}
          <Button
            onClick={handleLineLogin}
            className="w-full h-[62px] rounded-[20px] text-[18px] font-medium tracking-[-0.72px]"
            style={{
              backgroundColor: '#06C755',
              color: '#FFFFFF',
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
                d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.105.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"
                fill="currentColor"
              />
            </svg>
            LINE으로 시작하기
          </Button>

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
          에 동의하는 것으로 간주됩니다.
        </p>
      </div>
    </div>
  );
}
