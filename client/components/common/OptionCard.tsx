import React from "react";

type OptionCardProps = {
  selected: boolean;
  onClick: () => void;
  headline: string;
  label: string;
  description: string;
};

export function OptionCard({
  selected,
  onClick,
  headline,
  label,
  description,
}: OptionCardProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-[20px_15px] rounded-[20px] transition-all duration-200 text-left ${
        selected ? "bg-[#FFEFD0]" : "bg-[#F9F9FA]"
      }`}
    >
      <div className="flex flex-col gap-[10px]">
        <div className="text-[18px] font-semibold leading-[145%] text-foreground">
          {headline}
        </div>
        <div className="text-[16px] leading-[145%]">
          <span className="font-bold text-primary">{label}</span>
          <span className="font-normal text-muted-foreground">
            {" "}
            {description}
          </span>
        </div>
      </div>
    </button>
  );
}

export default OptionCard;
