import * as React from "react";
import { cn } from "@/lib/utils";

type SectionTitleProps = React.HTMLAttributes<HTMLHeadingElement> & {
  as?: keyof JSX.IntrinsicElements;
};

export function SectionTitle({
  as: Tag = "h2",
  className,
  children,
  ...props
}: SectionTitleProps) {
  return (
    <Tag
      className={cn(
        "text-[#111] text-[16px] font-bold leading-[140%]",
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

export default SectionTitle;
