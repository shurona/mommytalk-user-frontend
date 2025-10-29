import React from "react";
import { Button } from "@/components/ui/button";

export type HeroProps = {
  logoSrc: string;
  logoAlt: string;
  illustrationSrc: string;
  illustrationAlt: string;
  title: string;
  description: React.ReactNode;
  ctaLabel: string;
  onCta: () => void;
};

export function Hero({
  logoSrc,
  logoAlt,
  illustrationSrc,
  illustrationAlt,
  title,
  description,
  ctaLabel,
  onCta,
}: HeroProps) {
  const headingId = "hero-title";

  return (
    <section
      role="region"
      aria-labelledby={headingId}
      className="min-h-[812px] bg-background flex items-start justify-center px-[25px] sm:px-4"
    >
      <div className="w-full max-w-[393px] flex flex-col items-center gap-[64px] py-[100px]">
        <div className="flex justify-center" aria-hidden>
          <img
            src={logoSrc}
            alt={logoAlt}
            className="w-[173px] h-[76px] max-w-full h-auto"
            loading="eager"
            decoding="async"
          />
        </div>

        <div className="flex justify-center">
          <img
            src={illustrationSrc}
            alt={illustrationAlt}
            className="w-[298px] max-w-full h-auto"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="flex flex-col items-center gap-[64px] text-left w-full">
          <h1
            id={headingId}
            className="text-xl sm:text-[22px] font-bold leading-[145%] text-foreground w-full"
          >
            {title}
          </h1>

          <div className="text-base sm:text-[18px] font-medium leading-[145%] text-left text-muted-foreground w-full">
            {description}
          </div>

          <Button
            onClick={onCta}
            className="w-full h-[62px] rounded-[20px] font-bold text-[16px] leading-[145%] tracking-[-0.64px]"
          >
            {ctaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
