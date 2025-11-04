import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";

export default function Onboarding2() {
  const [childName, setChildName] = useState("");
  const navigate = useNavigate();
  const { setChildName: saveChildName } = useOnboarding();

  const handleNext = () => {
    if (childName.trim()) {
      saveChildName(childName.trim());
      navigate("/onboarding3");
    }
  };

  return (
    <div className="min-h-[812px] bg-background flex flex-row justify-center px-[25px] sm:px-4">
      <div className="w-full max-w-[393px] flex flex-col items-center gap-[392px] py-[100px]">
        <div className="w-full sm:w-full flex flex-col gap-[55px]">
          <h1 className="text-xl sm:text-[22px] font-bold leading-[145%] text-foreground">
            아이를 어떻게 부를까요?
          </h1>

          <div className="flex flex-col justify-center items-start gap-[15px] w-full h-[60px] px-[15px] py-[20px] rounded-[20px] bg-[#F9F9FA]">
            <input
              type="text"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              placeholder="이름 또는 별명을 적어주세요."
              className="w-full bg-transparent text-[16px] font-normal leading-[145%] text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </div>
        </div>

        <Button
          onClick={handleNext}
          disabled={!childName.trim()}
          className="w-full h-[62px] rounded-[20px] font-bold text-[16px] leading-[145%] tracking-[-0.64px] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          다음 1/3
        </Button>
      </div>
    </div>
  );
}
