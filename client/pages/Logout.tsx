import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Logout() {
  const navigate = useNavigate();

  const handleKakaoLogin = () => {
    // Navigate to onboarding/login flow
    navigate("/");
  };

  const handlePurchase = () => {
    // Navigate to a page where users can explore/purchase
    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-[850px] justify-center px-[25px] py-[25px] bg-white w-full">
      <div className="max-w-[393px] w-full flex flex-col relative">
        {/* Logo / Title */}
        <div className="flex justify-center mt-[100px]">
          <h1 className="text-[28px] font-extrabold tracking-tight text-foreground">
            Mommytalk English
          </h1>
        </div>

        {/* Illustration spacer */}
        <div className="flex justify-center mt-[60px] mb-[40px]">
          <div
            className='w-[298px] h-[141px] bg-muted/30 rounded-xl bg-[url("https://cdn.builder.io/api/v1/image/assets%2Fe9b9b01c41aa41ffb5a9c124b22fbbf4%2F5ef8d5d724b04f5aa24d9690fa3df549")] bg-no-repeat bg-center bg-cover lg:bg-none'
            aria-hidden
          />
        </div>

        {/* Member section */}
        <div className="flex flex-col gap-2">
          <div className="text-[#888] text-[18px] leading-[145%]">회원</div>
          <Button
            onClick={handleKakaoLogin}
            className="w-full h-[62px] rounded-[20px] bg-[#FFE100] text-[#111] font-bold text-[18px] tracking-[-0.72px] hover:brightness-95"
          >
            카카오 로그인
          </Button>
        </div>

        {/* Non-member section */}
        <div className="flex flex-col gap-2 mt-[22px]">
          <div className="text-[#888] text-[18px] leading-[145%]">비회원</div>
          <Button
            asChild
            className="w-full h-[62px] rounded-[20px] bg-[#FF9B00] text-white font-bold text-[18px] tracking-[-0.72px] hover:brightness-95 cursor-pointer pointer-events-auto"
          >
            <a href="https://mommytalkenglish.com/">구매하기</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
