"use client";

import { useEffect, useRef, useState } from "react";

export function LiveRibbon() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [shift, setShift] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const dy = window.scrollY - lastY;
      lastY = window.scrollY;
      if (dy === 0) return;
      const dir = dy > 0 ? 1 : -1;
      setShift((s) => ({
        x: s.x + dir * 6,
        y: s.y + dir * 10,
      }));
    };

    const onWheel = (e: WheelEvent) => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left - 24 &&
        e.clientX <= rect.right + 24 &&
        e.clientY >= rect.top - 24 &&
        e.clientY <= rect.bottom + 24;
      if (!inside) return;
      const dir = e.deltaY > 0 ? 1 : -1;
      setShift((s) => ({
        x: s.x + dir * 8,
        y: s.y + dir * 12,
      }));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="pointer-events-none absolute right-0 top-0 z-20 h-20 w-20 overflow-hidden"
    >
      <span
        className="absolute right-[-34px] top-[22px] block w-[120px] bg-emerald-400 py-1 text-center text-[9px] font-bold uppercase tracking-[0.2em] text-[#0a0a0a] shadow-sm transition-transform duration-150 ease-out will-change-transform"
        style={{
          transform: `translate(${shift.x}px, ${shift.y}px) rotate(45deg)`,
        }}
      >
        Live
      </span>
    </div>
  );
}
