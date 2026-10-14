import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type StatusBadgeProps = {
  children: ReactNode;
  status?: "live" | "experimenting" | "archived";
  className?: string;
};

const statusColors = {
  live: "bg-gradient-to-r from-rose-400 to-orange-500 text-white shadow-sm",
  experimenting: "text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20",
  archived: "text-muted-foreground bg-muted/50 border border-border",
} as const;

export function StatusBadge({
  children,
  status = "live",
  className,
}: StatusBadgeProps) {
  const baseClasses =
    "inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase";
  const colorClasses = statusColors[status] ?? statusColors.live;

  return (
    <span className={cn(baseClasses, colorClasses, className)}>
      {children}
    </span>
  );
}
