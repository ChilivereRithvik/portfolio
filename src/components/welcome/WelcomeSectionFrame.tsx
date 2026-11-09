"use client";

type Rect = { x: number; y: number; w: number; h: number };

type WelcomeSectionFrameProps = {
  rect: Rect;
  progress: number;
  accentColor?: string;
  /** Viewport-fixed vs overlay-local coordinates */
  fixed?: boolean;
  showDimensions?: boolean;
};

export function WelcomeSectionFrame({
  rect,
  progress,
  accentColor = "#a3a3a3",
  fixed = false,
  showDimensions = true,
}: WelcomeSectionFrameProps) {
  if (progress <= 0) return null;

  const w = Math.max(1, rect.w * progress);
  const h = Math.max(1, rect.h * progress);

  return (
    <div
      className={
        fixed
          ? "welcome-section-frame pointer-events-none fixed z-[56] border bg-black/20"
          : "welcome-section-frame pointer-events-none absolute z-[6] border bg-black/20"
      }
      style={{
        left: rect.x,
        top: rect.y,
        width: w,
        height: h,
        borderColor: accentColor,
        boxShadow: `0 0 20px ${accentColor}40`,
      }}
      aria-hidden
    >
      {showDimensions && progress >= 0.35 ? (
        <span
          className="absolute -top-6 left-0 font-mono text-[10px] font-medium"
          style={{ color: accentColor }}
        >
          W {Math.round(w)} × H {Math.round(h)}
        </span>
      ) : null}
    </div>
  );
}
