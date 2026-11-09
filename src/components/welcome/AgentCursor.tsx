"use client";

import { cn } from "@/lib/utils";

export type AgentCursorProps = {
  x: number;
  y: number;
  color: string;
  label: string;
  active?: boolean;
  exiting?: boolean;
  className?: string;
};

export function AgentCursor({
  x,
  y,
  color,
  label,
  active = false,
  exiting = false,
  className,
}: AgentCursorProps) {
  return (
    <div
      className={cn(
        "welcome-agent-cursor pointer-events-none absolute left-0 top-0 z-[30] will-change-transform",
        className?.includes("welcome-agent-cursor--viewport") &&
          "fixed z-[200]",
        active && "welcome-agent-cursor--active",
        exiting && "welcome-agent-cursor--exiting",
        className
      )}
      style={{
        transform: `translate3d(${x}px, ${y}px, 0)`,
      }}
      aria-hidden
    >
      <svg
        width="24"
        height="28"
        viewBox="0 0 24 28"
        fill="none"
        className="drop-shadow-md"
      >
        <path
          d="M5 3.5L5 22.5L9.2 17.8L13.5 26L16.2 24.5L11.9 16.2L18 15.5L5 3.5Z"
          fill={color}
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="1"
        />
      </svg>
      <span
        className="welcome-agent-cursor-label absolute left-5 top-4 whitespace-nowrap rounded px-1.5 py-0.5 text-[10px] font-medium text-white shadow-sm"
        style={{ backgroundColor: color }}
      >
        {label}
      </span>
    </div>
  );
}
