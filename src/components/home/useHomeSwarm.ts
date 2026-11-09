"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { blogs, experiences, technologies } from "@/config/portfolio";
import {
  computeHomeAgentsAt,
  deriveHomeContentAt,
  HERO_HEADING,
  type HomeAnchors,
} from "@/components/home/homeBuildTimeline";

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useHomeSwarm(
  enabled: boolean,
  anchors: HomeAnchors | null
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
    () =>
      deriveHomeContentAt(
        elapsedMs,
        reducedMotion,
        technologies.length,
        experiences,
        blogs
      ),
    [elapsedMs, reducedMotion]
  );

  const spawnCorner = useMemo(() => {
    const w = typeof window !== "undefined" ? window.innerWidth : 1200;
    const h = typeof window !== "undefined" ? window.innerHeight : 800;
    const corners = [
      { x: w * 0.06, y: h * 0.05 },
      { x: w * 0.92, y: h * 0.06 },
      { x: w * 0.08, y: h * 0.22 },
      { x: w * 0.9, y: h * 0.2 },
      { x: w * 0.1, y: h * 0.42 },
      { x: w * 0.88, y: h * 0.55 },
      { x: w * 0.12, y: h * 0.72 },
      { x: w * 0.5, y: h * 0.78 },
      { x: w * 0.72, y: h * 0.82 },
      { x: w * 0.35, y: h * 0.88 },
      { x: w * 0.85, y: h * 0.92 },
      { x: w * 0.55, y: h * 0.95 },
    ];
    return (index: number) => corners[index] ?? corners[0];
  }, []);

  const agents = useMemo(
    () => computeHomeAgentsAt(elapsedMs, anchors, spawnCorner),
    [elapsedMs, anchors, spawnCorner]
  );

  const cursors = agents.filter((a) => a.visible);
  const heroTypeWorking =
    agents.find((a) => a.id === "hero-type")?.working ?? false;

  return {
    ...content,
    agents,
    cursors,
    reducedMotion,
    elapsedMs,
    heroTypeWorking,
    heroTitleFull: HERO_HEADING,
  };
}
