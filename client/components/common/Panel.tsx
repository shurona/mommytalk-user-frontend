import * as React from "react";
import { cn } from "@/lib/utils";

export type PanelProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: "outlined" | "blue";
  minHeightClass?: string;
};

export function Panel({
  className,
  children,
  variant = "outlined",
  minHeightClass,
  ...props
}: PanelProps) {
  const base = "rounded-[15px] flex flex-col gap-[10px] p-[20px_15px]";
  const variants: Record<NonNullable<PanelProps["variant"]>, string> = {
    outlined: "border border-[#DBDBDB] bg-white",
    blue: "bg-[#ECF5FF]",
  };
  return (
    <div
      className={cn(base, variants[variant], minHeightClass, className)}
      {...props}
    >
      {children}
    </div>
  );
}

export default Panel;
