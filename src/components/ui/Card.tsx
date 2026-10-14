import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardProps = {
  children: ReactNode;
  className?: string;
  border?: boolean;
};

export function Card({ children, className, border = true }: CardProps) {
  return (
    <div
      className={cn(
        "relative w-full bg-card",
        border && "border border-border",
        className
      )}
    >
      {children}
    </div>
  );
}
