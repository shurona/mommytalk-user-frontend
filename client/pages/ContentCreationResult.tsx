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
    <div className="min-h-[850px] bg-white flex flex-col">
      <DashboardHeader />

      <main className="flex-1 px-[25px] pb-[55px]">
        <div className="w-full max-w-[343px] mx-auto pt-[25px]">
          <div className="flex flex-col gap-[15px]">
            <div className="flex flex-col gap-[5px]">
              <SectionTitle as="h1">이럴 때는 어떻게?</SectionTitle>
            </div>

            {/* Input Card with Result */}
            <div className="rounded-[15px] border border-[#DBDBDB] bg-white p-[20px_15px] flex flex-col gap-[10px]">
              <p className="text-[#111] text-[16px] leading-[145%] min-h-[22px] w-full">
                {korean}
              </p>
              <div className="text-[#888] text-[14px] leading-[145%] tracking-[-0.56px] text-right">
                {korean.length} / {maxChars}
              </div>
              <Button
                disabled
                className="w-full h-[62px] rounded-[20px] font-bold text-[16px] leading-[145%] tracking-[-0.64px] text-white bg-[#CDCDCD] hover:bg-[#CDCDCD] disabled:bg-[#CDCDCD] disabled:opacity-100"
              >
                나만의 문장 만들기
              </Button>
            </div>

            {/* English Result Card */}
            <Panel variant="blue" minHeightClass="min-h-[165px]">
              <p className="text-[#000] text-[20px] leading-[140%]">
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
