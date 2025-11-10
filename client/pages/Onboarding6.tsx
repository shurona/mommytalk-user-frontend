import { useNavigate } from "react-router-dom";
import { BackButton } from "@/components";
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { LANGUAGE_LEVEL_MAP, RESPONSE_LEVEL_MAP } from "@/types/api";

export default function Onboarding6() {
  const navigate = useNavigate();
  const { languageLevel, responseLevel } = useOnboarding();

  const handleBack = () => {
    navigate("/onboarding5");
  };

  const handleKakaoTalk = () => {
    window.open("http://pf.kakao.com/_SxmQxbn", "_blank");
  };

  // userLevel과 childLevel 가져오기
  const userLevel = languageLevel ? LANGUAGE_LEVEL_MAP[languageLevel] : 1;
  const childLevel = responseLevel ? RESPONSE_LEVEL_MAP[responseLevel] : 1;

  // 로컬 레벨 이미지 경로
  const levelImageUrl = `/assets/images/Level_${userLevel}_${childLevel}.png`;

  return (
    <div className="min-h-screen bg-background flex justify-center px-[25px] py-[25px]">
      <div className="w-full max-w-[393px] flex flex-col gap-[25px]">
        <BackButton onClick={handleBack} />

        <div className="flex flex-col gap-[81px]">
          <div className="flex flex-col gap-[35px]">
            <h1 className="text-[22px] font-bold leading-[145%] text-foreground">
              우리집 맞춤 레벨 설정이 끝났어요
            </h1>

            <img
              loading="lazy"
              src={levelImageUrl}
              alt={`Level ${userLevel}-${childLevel} illustration`}
              className="w-full h-auto object-contain"
            />
          </div>

          <div className="flex flex-col gap-[20px]">
            <p className="text-[16px] font-medium leading-[145%] text-muted-foreground">
              📌 메시지를 받으려면 마미톡잉글리시 카카오톡 채널 친구 추가가
              필요해요.
              <br />
              <br />
              📌 아직 친구 추가를 하지 않으셨다면, 지금 바로 아래 '친구추가 하러 가기' 버튼을 눌러 친구 추가를 진행해주세요!
            </p>

            <Button
              onClick={handleKakaoTalk}
              className="w-full h-[62px] rounded-[20px] text-[18px] tracking-[-0.72px]"
              style={{ backgroundColor: "#FFE100", color: "#111" }}
            >
              친구추가 하러 가기
            </Button>

            <Button
              onClick={() => navigate("/dashboard")}
              className="w-full h-[62px] rounded-[20px] text-[18px] tracking-[-0.64px]"
             style={{ backgroundColor: "#FF9B00", color: "#FFF" }}
            >
              시작하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
