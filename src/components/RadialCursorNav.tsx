"use client";

import { cn } from "@/lib/utils";
import { radialCursorNavItems } from "@/components/radialCursorNavItems";

export type RadialCursorNavProps = {
  x: number;
  y: number;
  open: boolean;
  selectedIndex: number;
};

/** 6 items: adjacent centers ≈ ORBIT_RADIUS; keep ORBIT_RADIUS > ITEM_SIZE + gap */
const ORBIT_RADIUS = 56;
const ITEM_SIZE = 34;
const DOT_SIZE = 8;

export function RadialCursorNav({
  x,
  y,
  open,
  selectedIndex,
}: RadialCursorNavProps) {
  if (!open) {
    return (
      <div
        className="radial-cursor-dot pointer-events-none fixed left-0 top-0 z-[200] will-change-transform"
        style={{ transform: `translate3d(${x}px, ${y}px, 0)` }}
        aria-hidden
      >
        <div
          className="relative -left-1/2 -top-1/2 rounded-full bg-[#1a1a1a] ring-1 ring-white/25"
          style={{ width: DOT_SIZE, height: DOT_SIZE }}
        />
      </div>
    );
  }

  return (
    <div
      className="radial-cursor-nav pointer-events-none fixed left-0 top-0 z-[200] will-change-transform"
      style={{ transform: `translate3d(${x}px, ${y}px, 0)` }}
      role="dialog"
      aria-label="Radial navigation"
      aria-activedescendant={`radial-nav-${selectedIndex}`}
    >
      <div className="relative -translate-x-1/2 -translate-y-1/2">
        {radialCursorNavItems.map((item, index) => {
          const angle =
            -Math.PI / 2 +
            (index * 2 * Math.PI) / radialCursorNavItems.length;
          const offsetX = Math.cos(angle) * ORBIT_RADIUS;
          const offsetY = Math.sin(angle) * ORBIT_RADIUS;
          const Icon = item.icon;
          const selected = index === selectedIndex;

          return (
            <div
              key={item.label}
              id={`radial-nav-${index}`}
              className={cn(
                "radial-cursor-nav__item absolute flex items-center justify-center rounded-full bg-[#1a1a1a] text-white/90 ring-1 ring-white/15 transition-all duration-150",
                selected &&
                  "z-10 scale-110 bg-[#262626] text-white ring-2 ring-white/70 shadow-[0_0_12px_rgba(255,255,255,0.15)]"
              )}
              style={{
                width: ITEM_SIZE,
                height: ITEM_SIZE,
                left: offsetX - ITEM_SIZE / 2,
                top: offsetY - ITEM_SIZE / 2,
              }}
              aria-hidden
            >
              <Icon className="h-4 w-4" strokeWidth={2.25} />
            </div>
          );
        })}

        <div
          className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#1a1a1a] px-3 ring-1 ring-white/25"
          style={{ minWidth: 44, height: 28 }}
        >
          <span className="max-w-[5.5rem] truncate text-[11px] font-medium text-white/90">
            {radialCursorNavItems[selectedIndex]?.label}
          </span>
        </div>
      </div>
    </div>
  );
}
