import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BackButton, OptionCard } from "@/components";
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useSubmitOnboarding } from "@/hooks/use-api";
import { LANGUAGE_LEVEL_MAP, RESPONSE_LEVEL_MAP } from "@/types/api";
import { userApi } from "@/lib/api";

type ResponseLevel = "short-answer" | "short-sentence" | "listening-only";

export default function Onboarding4() {
  const navigate = useNavigate();
  const location = useLocation();
  const { childName, languageLevel, responseLevel: savedResponseLevel, setResponseLevel } = useOnboarding();
  const submitOnboarding = useSubmitOnboarding();
  const [selectedLevel, setSelectedLevel] =
    useState<ResponseLevel | null>(savedResponseLevel);

  // Check if coming from profile
  const fromProfile = location.state?.fromProfile === true;

  const handleNext = async () => {
    if (!selectedLevel) return;

    setResponseLevel(selectedLevel);

    // Submit onboarding data to server
    try {
      await submitOnboarding.mutateAsync({
        childName,
        userLevel: LANGUAGE_LEVEL_MAP[languageLevel],
        childLevel: RESPONSE_LEVEL_MAP[selectedLevel],
      });

      // 온보딩 완료 후 최신 유저 정보 받아오기
      const userInfoStr = localStorage.getItem('user_info');
      const userInfo = userInfoStr ? JSON.parse(userInfoStr) : null;
      const channelIdNum = userInfo?.channelId;

      if (channelIdNum) {
        const userResponse = await userApi.getMe(channelIdNum.toString());
        localStorage.setItem('user_info', JSON.stringify(userResponse.data));
      }

      // If from profile, go back to profile, otherwise continue onboarding
      if (fromProfile) {
        navigate("/profile");
      } else {
        navigate("/onboarding5");
      }
    } catch (error) {
      navigate("/onboarding-fail");
    }
  };

  const handleBack = () => {
    if (fromProfile) {
      navigate("/onboarding3", { state: { fromProfile: true } });
    } else {
      navigate("/onboarding3");
    }
  };

  const responseOptions = [
    {
      id: "listening-only" as ResponseLevel,
      english: "레벨 1. 아직 대답하지 않아도 괜찮아요.",
      title: "듣기 연습",
      description: "어린 아이라면 듣기 중심으로 시작해요.",
    },
    {
      id: "short-sentence" as ResponseLevel,
      english: "레벨 2. Okay, I'm going! / I washed my hands!",
      title: "짧은 문장",
      description: "짧은 문장으로 표현해요.",
    },
    {
      id: "short-answer" as ResponseLevel,
      english: "레벨 3. Okay, Mommy! / Wait, please!",
      title: "짧은 대답",
      description: "한두 단어로 쉽게 따라 말해요.",
    },
  ];

  return (
    <div className="flex min-h-[812px] px-[25px] py-[25px] bg-background w-full justify-center">
      <div className="w-full max-w-[393px] flex flex-col">
        <BackButton onClick={handleBack} />

        {/* Content */}
        <div className="flex flex-col justify-between flex-grow">
            <div className="flex flex-col gap-[21px]">
              <div className="flex flex-col gap-[23px]">
                <h1 className="text-xl sm:text-[22px] font-bold leading-[145%] text-foreground">
                  {childName}가 대답으로 연습할 문장은
                  <br />
                  어느 정도가 좋을까요?
                </h1>

                {/* Response Options */}
                <div className="flex flex-col gap-[10px]">
                  {responseOptions.map((option) => (
                    <OptionCard
                      key={option.id}
                      selected={selectedLevel === option.id}
                      onClick={() => setSelectedLevel(option.id)}
                      headline={option.english}
                      label={option.title}
                      description={option.description}
                    />
                  ))}
                </div>
              </div>
            </div>

          <Button
            onClick={handleNext}
            disabled={!selectedLevel || submitOnboarding.isPending}
            className="w-full h-[62px] rounded-[20px] font-bold text-[16px] leading-[145%] tracking-[-0.64px] mt-[15px]"
          >
            {submitOnboarding.isPending ? "설정 중..." : "다음 3/3"}
          </Button>
        </div>
      </div>
    </div>
  );
}
