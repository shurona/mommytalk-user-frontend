import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function OnboardingFail() {
  const navigate = useNavigate();

  const handleRetry = () => {
    navigate("/onboarding2");
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center px-[25px]">
      <div className="w-full max-w-[343px] flex flex-col gap-[60px] items-center">
        {/* Error Icon */}
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
          <svg
            className="w-12 h-12 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        {/* Error Message */}
        <div className="flex flex-col gap-[15px] text-center">
          <h1 className="text-[26px] font-bold leading-[145%] text-foreground">
            설정 중 오류가 발생했어요
          </h1>
          <p className="text-[16px] leading-[145%] text-muted-foreground">
            일시적인 문제로 설정을 완료하지 못했습니다.
            <br />
            다시 시도해주세요.
          </p>
        </div>

        {/* Illustration */}
        <div className="flex justify-center">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2Fe9b9b01c41aa41ffb5a9c124b22fbbf4%2F5ef8d5d724b04f5aa24d9690fa3df549"
            alt="Error illustration"
            className="w-[200px] h-auto opacity-50"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-[15px] w-full">
          <Button
            onClick={handleRetry}
            className="w-full h-[62px] rounded-[20px] text-[18px] font-medium tracking-[-0.72px]"
          >
            처음부터 다시 설정하기
          </Button>

          <Button
            onClick={handleGoHome}
            variant="outline"
            className="w-full h-[62px] rounded-[20px] text-[18px] font-medium tracking-[-0.72px]"
          >
            홈으로 돌아가기
          </Button>
        </div>
      </div>
    </div>
  );
}
