import React from "react";
import { RawImg } from "@/components";

type BackButtonProps = {
  onClick: () => void;
  ariaLabel?: string;
};

export function BackButton({
  onClick,
  ariaLabel = "뒤로 가기",
}: BackButtonProps) {
  return (
    <button
      aria-label={ariaLabel}
      onClick={onClick}
      className="w-fit mb-[51px] focus:outline-none bg-transparent border-0"
    >
      <RawImg
        alt="Mommy Talk English"
        image="https://cdn.builder.io/api/v1/image/assets%2Fe9b9b01c41aa41ffb5a9c124b22fbbf4%2F6a9a596d282c4eb59087e6688ad96103"
        className="w-[12px] h-[22px] object-contain"
      />
    </button>
  );
}

export default BackButton;
