import React from "react";

type WeeklyCardProps = {
  english: string;
  korean: string;
};

export function WeeklyCard({ english, korean }: WeeklyCardProps) {
  return (
    <div
      className="rounded-[20px] p-[20px_15px] flex flex-col gap-[5px]"
      style={{ background: "linear-gradient(90deg, #FFE1B4 0%, #FFD490 100%)" }}
    >
      <div className="inline-flex items-center justify-center gap-[10px] px-[10px] py-[3px] rounded-[10px] bg-white/50 w-fit">
        <span className="text-[#111] font-bold text-[12px] leading-[145%]">
          이번주 추천 문장
        </span>
      </div>
      <div className="flex flex-col gap-[5px]">
        <p
          className="text-[#111] text-[16px] leading-[130%]"
          style={{ fontFamily: "'ADLaM Display', display" }}
        >
          {english}
        </p>
        <p className="text-[#111] text-[14px] leading-[145%] tracking-[-0.56px]">
          {korean}
        </p>
      </div>
    </div>
  );
}

export default WeeklyCard;
