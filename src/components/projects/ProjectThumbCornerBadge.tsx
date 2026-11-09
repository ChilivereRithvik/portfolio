import type { Project } from "@/config/portfolio";
import { cn } from "@/lib/utils";

const BADGE_STYLES = {
  live: "bg-emerald-400 text-[#0a0a0a]",
  development: "bg-amber-400 text-[#0a0a0a]",
} as const;

type ProjectThumbCornerBadgeProps = {
  variant: keyof typeof BADGE_STYLES;
  label: string;
};

export function ProjectThumbCornerBadge({
  variant,
  label,
}: ProjectThumbCornerBadgeProps) {
  return (
    <div
      className="pointer-events-none absolute left-0 top-0 z-10 h-16 w-16 overflow-hidden"
      aria-hidden
    >
      <span
        className={cn(
          "absolute left-[-36px] top-[18px] block w-[124px] -rotate-45 py-0.5 text-center text-[7px] font-bold uppercase tracking-[0.12em] shadow-sm",
          BADGE_STYLES[variant]
        )}
      >
        {label}
      </span>
    </div>
  );
}

export function projectThumbBadge(
  project: Project
): { variant: "live" | "development"; label: string } | null {
  if (project.id === "agent-swarm-ui") {
    return { variant: "development", label: "Development" };
  }
  if (project.status === "live") {
    return { variant: "live", label: "Live" };
  }
  return null;
}
