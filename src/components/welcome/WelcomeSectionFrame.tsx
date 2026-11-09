"use client";

type Rect = { x: number; y: number; w: number; h: number };

type WelcomeSectionFrameProps = {
  rect: Rect;
  progress: number;
  /** Matches the active agent cursor — visible while the frame grows. */
  accentColor?: string;
};

export function WelcomeSectionFrame({
  rect,
  progress,
  accentColor = "#a3a3a3",
}: WelcomeSectionFrameProps) {
  if (progress <= 0) return null;

  const w = Math.max(1, Math.round(rect.w * progress));
  const h = Math.max(1, Math.round(rect.h * progress));

  return (
    <div
      className="welcome-section-frame pointer-events-none fixed z-[6] border-2 bg-black/20"
      style={{
        left: rect.x,
        top: rect.y,
        width: w,
        height: h,
        borderColor: accentColor,
        boxShadow: `0 0 24px ${accentColor}55, inset 0 0 0 1px ${accentColor}33`,
      }}
      aria-hidden
    >
      {progress >= 0.35 ? (
        <span
          className="absolute -top-6 left-0 font-mono text-[10px] font-medium"
          style={{ color: accentColor }}
        >
          W {w} × H {h}
        </span>
      ) : null}
    </div>
  );
}
