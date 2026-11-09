"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  computeHomeIntroAgentsAt,
  deriveHomeIntroAt,
  type HomeIntroAnchors,
} from "@/components/home/homeIntroTimeline";

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useHomeIntroSwarm(
  enabled: boolean,
  anchors: HomeIntroAnchors | null
) {
  const [elapsedMs, setElapsedMs] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(prefersReducedMotion);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (!enabled || reducedMotion) {
      startRef.current = null;
      setElapsedMs(0);
      return;
    }

    if (startRef.current === null) {
      startRef.current = performance.now();
    }

    let raf = 0;
    const frame = (now: number) => {
      const start = startRef.current ?? now;
      setElapsedMs(now - start);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => cancelAnimationFrame(raf);
  }, [enabled, reducedMotion]);

  const content = useMemo(
    () => deriveHomeIntroAt(elapsedMs, reducedMotion),
    [elapsedMs, reducedMotion]
  );

  const spawnCorner = useMemo(() => {
    const w = typeof window !== "undefined" ? window.innerWidth : 1200;
    const h = typeof window !== "undefined" ? window.innerHeight : 800;
    const corners = [
      { x: w * 0.08, y: h * 0.18 },
      { x: w * 0.88, y: h * 0.22 },
      { x: w * 0.12, y: h * 0.82 },
    ];
    return (index: number) => corners[index] ?? corners[0];
  }, []);

  const agents = useMemo(
    () => computeHomeIntroAgentsAt(elapsedMs, anchors, spawnCorner),
    [elapsedMs, anchors, spawnCorner]
  );

  const cursors = agents.filter((a) => a.visible);

  return {
    ...content,
    agents,
    cursors,
    reducedMotion,
    elapsedMs,
  };
}
