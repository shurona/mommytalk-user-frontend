import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/common/Panel";
import { SectionTitle } from "@/components/common/SectionTitle";
import { BottomNav, DashboardHeader } from "@/components";

export default function ContentCreationResult() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get data from navigation state or use defaults
  const { korean = "얼른 가서 손 씻고 와", english = "Go wash your hands" } =
    location.state || {};
  const maxChars = 100;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <DashboardHeader />

      <main className="flex-1 px-[25px] pt-[60px] pb-[80px]">
        <div className="w-full max-w-[343px] mx-auto">
          <div className="flex flex-col gap-[15px]">
            <div className="flex flex-col gap-[5px]">
              <SectionTitle as="h1">이런 말은 영어로 어떻게 말할까요?</SectionTitle>
            </div>

            {/* Input Card with Result */}
            <Panel variant="yellow">
              <p className="text-[#111] text-[16px] leading-[145%] min-h-[250px] w-full">
                {korean}
              </p>
              <div className="text-[#888] text-[14px] leading-[145%] tracking-[-0.56px] text-right">
                {korean.length} / {maxChars}
              </div>
              <Button
                disabled
                className="w-full h-[62px] rounded-[20px] font-bold text-[16px] leading-[145%] tracking-[-0.64px] text-white bg-[#C7C7C7] hover:bg-[#C7C7C7] disabled:bg-[#C7C7C7] disabled:opacity-100 cursor-not-allowed"
              >
                나만의 문장 만들기
              </Button>
            </Panel>

            {/* English Result Card */}
            <Panel variant="blue" minHeightClass="min-h-[250px]">
              <p className="text-[#000] text-[20px] font-bold leading-[140%]">
                {english}
              </p>
            </Panel>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
