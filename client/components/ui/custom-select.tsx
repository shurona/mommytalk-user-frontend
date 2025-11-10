import React from "react";
import * as Select from "@radix-ui/react-select";

export interface CustomSelectProps {
  value: number;
  onChange: (value: number) => void;
  options: { value: number; label: string }[];
  placeholder?: string;
}

export function CustomSelect({
  value,
  onChange,
  options,
  placeholder = "선택",
}: CustomSelectProps) {
  return (
    <Select.Root
      value={String(value)}
      onValueChange={(val) => onChange(Number(val))}
    >
      <Select.Trigger className="w-full h-[56px] px-[20px] pr-[45px] rounded-[15px] border border-[#DBDBDB] bg-white text-[18px] font-bold text-[#111] text-center focus:outline-none focus:border-[#FF9B00] cursor-pointer transition-colors inline-flex items-center justify-center gap-[5px] relative">
        <Select.Value placeholder={placeholder} />
        <Select.Icon className="absolute right-[15px] top-1/2 -translate-y-1/2">
          <svg
            width="16"
            height="20"
            viewBox="0 0 16 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* 위 화살표 */}
            <path d="M8 4L4 8L5 9L8 6L11 9L12 8L8 4Z" fill="#111" />
            {/* 아래 화살표 */}
            <path d="M8 16L12 12L11 11L8 14L5 11L4 12L8 16Z" fill="#111" />
          </svg>
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          className="overflow-hidden bg-white rounded-[15px] border border-[#DBDBDB] shadow-lg z-50 w-[var(--radix-select-trigger-width)]"
          position="popper"
          sideOffset={5}
        >
          <Select.Viewport className="p-[5px] max-h-[225px] overflow-y-auto">
            {options.map((option) => (
              <Select.Item
                key={option.value}
                value={String(option.value)}
                className="text-[16px] leading-none text-[#111] rounded-[10px] flex items-center justify-center h-[45px] px-[20px] relative select-none cursor-pointer outline-none data-[highlighted]:bg-[#FFF1DC] data-[state=checked]:bg-[#FFF1DC] data-[state=checked]:font-bold transition-colors"
              >
                <Select.ItemText className="text-center w-full">
                  {option.label}
                </Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
