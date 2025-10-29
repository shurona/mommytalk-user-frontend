import React from "react";
import { Textarea } from "@/components/ui/textarea";

type SentenceComposerProps = {
  value: string;
  onChange: (val: string) => void;
  maxChars?: number;
};

export function SentenceComposer({
  value,
  onChange,
  maxChars = 300,
}: SentenceComposerProps) {
  return (
    <div className="rounded-[15px] bg-[#F9F9FA] p-[20px_15px] flex flex-col gap-[10px]">
      <Textarea
        value={value}
        onChange={(e) => {
          const v = e.target.value;
          if (v.length <= maxChars) onChange(v);
        }}
        placeholder="하루 1번, 원하는 만큼 문장을 만들 수 있어요."
        className="w-full h-[253px] bg-transparent text-[#111] text-[16px] leading-[145%] resize-none placeholder:text-[#888]"
      />
      <div className="text-[#888] text-[14px] leading-[145%] tracking-[-0.56px] text-right">
        {value.length} / {maxChars}
      </div>
    </div>
  );
}

export default SentenceComposer;
