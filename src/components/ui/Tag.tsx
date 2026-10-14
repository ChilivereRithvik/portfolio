import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type TagProps = {
  children: ReactNode;
  variant?: "default" | "outline";
  className?: string;
};

export function Tag({ children, variant = "default", className }: TagProps) {
  const baseClasses =
    "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-widest";

  if (variant === "outline") {
    return (
      <span
        className={cn(
          baseClasses,
          "border border-border bg-muted/50 text-muted-foreground",
          className
        )}
      >
        {children}
      </span>
    );
  }

  return (
    <span
      className={cn(
        baseClasses,
        "bg-muted text-muted-foreground",
        className
      )}
    >
      {children}
    </span>
  );
}
