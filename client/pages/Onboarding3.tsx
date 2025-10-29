import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackButton, OptionCard } from "@/components";
import { Button } from "@/components/ui/button";

type LanguageLevel = "basic" | "conversation" | "advanced";

export default function Onboarding3() {
  const [selectedLevel, setSelectedLevel] =
    useState<LanguageLevel>("conversation");
  const navigate = useNavigate();

  const handleNext = () => navigate("/onboarding4");
  const handleBack = () => navigate("/onboarding2");

  const languageOptions = [
    {
      id: "basic" as LanguageLevel,
      english: "Wash your hands.",
      label: "기본 문장",
      desc: "짧고 간단해요. 영어를 처음 시작할 때 좋아요.",
    },
    {
      id: "conversation" as LanguageLevel,
      english: "Let's wash your hands before dinner.",
      label: "쉬운 대화 문장",
      desc: "일상 대화처럼 자연스럽지만 쉬운 구조에요.",
    },
    {
      id: "advanced" as LanguageLevel,
      english: "It's time for dinner now, so please go wash your hands first.",
      label: "풍부한 표현",
      desc: "원어민처럼 다양한 표현을 들려주고 싶을 때 좋아요.",
    },
  ];

  return (
    <div className="flex min-h-[812px] justify-center px-[25px] py-[25px] sm:px-[15px] bg-background w-full">
      <div className="max-w-[393px] w-full flex flex-col">
        {/* Back area */}
        <div className="flex flex-col">
          <BackButton onClick={handleBack} />

          {/* Main content */}
          <div className="flex flex-col flex-grow justify-between">
            <div className="flex flex-col gap-[23px]">
              <h1 className="text-[22px] font-bold leading-[145%] text-foreground">
                도니에게
                <br />
                어느 수준의 영어로 말해줄까요?
              </h1>

              <div className="flex flex-col gap-[10px]">
                {languageOptions.map((opt) => (
                  <div key={opt.id}>
                    <OptionCard
                      selected={selectedLevel === opt.id}
                      onClick={() => setSelectedLevel(opt.id)}
                      headline={opt.english}
                      label={opt.label}
                      description={opt.desc}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-[51px]">
              <Button
                onClick={handleNext}
                className="w-full h-[62px] rounded-[20px] font-bold text-[16px] leading-[145%] tracking-[-0.64px]"
              >
                2/3
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
