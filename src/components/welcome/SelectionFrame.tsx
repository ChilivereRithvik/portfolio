"use client";

import { cn } from "@/lib/utils";

type SelectionFrameProps = {
  progress: number;
  width: number;
  height: number;
  className?: string;
};

export function SelectionFrame({
  progress,
  width,
  height,
  className,
}: SelectionFrameProps) {
  const w = Math.round(width * progress);
  const h = Math.round(height * progress);

  if (progress <= 0) return null;

  return (
    <div
      className={cn(
        "pointer-events-none absolute left-1/2 top-1/2 z-[5] -translate-x-1/2 -translate-y-1/2",
        className
      )}
      style={{ width, height }}
    >
      <div
        className="welcome-selection-frame relative border-2 border-sky-500 bg-sky-500/5"
        style={{ width: w, height: h }}
      >
        {progress >= 0.35 && (
          <span className="absolute -top-6 left-0 rounded bg-sky-500 px-1.5 py-0.5 font-mono text-[10px] text-white">
            W {w} × H {h}
          </span>
        )}
      </div>
    </div>
  );
}
