import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Panel } from "@/components/common/Panel";
import { SectionTitle } from "@/components/common/SectionTitle";
import { BottomNav, DashboardHeader } from "@/components";

export default function ContentCreation() {
  const navigate = useNavigate();
  const [sentenceText, setSentenceText] = useState("");
  const maxChars = 100;

  const handleCreateSentence = () => {
    if (sentenceText.trim()) {
      // Navigate to result page with the sentence data
      navigate("/content-result", {
        state: {
          korean: sentenceText,
          english: "Go wash your hands", // In real app, this would come from AI/API
        },
      });
    }
  };

  const isDisabled = !sentenceText.trim();

  return (
    <div className="min-h-[850px] bg-white flex flex-col">
      <DashboardHeader />

      <main className="flex-1 px-[25px] pb-[55px]">
        <div className="w-full max-w-[343px] mx-auto pt-[25px]">
          <div className="flex flex-col gap-[15px]">
            {/* Title */}
            <div className="flex flex-col gap-[5px]">
              <SectionTitle as="h1">이럴 때는 어떻게?</SectionTitle>
            </div>

            {/* Input Card */}
            <Panel variant="outlined">
              <Textarea
                value={sentenceText}
                onChange={(e) => {
                  const v = e.target.value;
                  if (v.length <= maxChars) setSentenceText(v);
                }}
                placeholder="지금 손 씻으러가자"
                className="w-full min-h-[22px] h-auto bg-transparent border-0 text-[#888] text-[16px] leading-[145%] resize-none placeholder:text-[#888] p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <div className="text-[#888] text-[14px] leading-[145%] tracking-[-0.56px] text-right">
                {sentenceText.length} / {maxChars}
              </div>
              <Button
                onClick={handleCreateSentence}
                disabled={isDisabled}
                className="w-full h-[62px] rounded-[20px] font-bold text-[16px] leading-[145%] tracking-[-0.64px] text-white bg-[#FF9B00] hover:brightness-95 disabled:bg-[#FF9B00] disabled:opacity-100"
              >
                나만의 문장 만들기
              </Button>
            </Panel>

            {/* Info Card */}
            <Panel variant="blue" minHeightClass="min-h-[165px]">
              <p className="text-[#888] text-[16px] leading-[140%]">
                아이에게 해줄 영어 표현을 AI에게 물어보고 나만의 엄마표 문장을
                만들어보세요. 하루 1번, 원하는 문장을 만들 수 있어요.
              </p>
            </Panel>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
