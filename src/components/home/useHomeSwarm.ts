"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { blogs, experiences, technologies } from "@/config/portfolio";
import {
  computeHomeAgentsAt,
  deriveHomeContentAt,
  HERO_HEADING,
  scaleHomeBuildElapsed,
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

  const anchorsReady = anchors !== null;

  useEffect(() => {
    if (!enabled || reducedMotion) {
      startRef.current = null;
      setElapsedMs(0);
      return;
    }

    if (!anchorsReady) {
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
  }, [enabled, reducedMotion, anchorsReady]);

  const buildElapsedMs = useMemo(
    () => scaleHomeBuildElapsed(elapsedMs),
    [elapsedMs]
  );

  const content = useMemo(
    () =>
      deriveHomeContentAt(
        buildElapsedMs,
        reducedMotion,
        technologies.length,
        experiences,
        blogs
      ),
    [buildElapsedMs, reducedMotion]
  );

  const spawnCorner = useMemo(() => {
    const w = typeof window !== "undefined" ? window.innerWidth : 1200;
    const h = typeof window !== "undefined" ? window.innerHeight : 800;
    const cx = anchors?.heroShell.x ?? w * 0.5;
    const colW = anchors?.heroShell.w ?? Math.min(896, w);
    const colL = anchors?.heroShell.x ?? (w - colW) / 2;
    const corners = [
      { x: colL - 40, y: h * 0.14 },
      { x: colL + colW + 40, y: h * 0.16 },
      { x: colL - 36, y: h * 0.38 },
      { x: colL + colW + 36, y: h * 0.4 },
    ];
    return (index: number) => corners[index % corners.length] ?? { x: cx, y: h * 0.2 };
  }, [anchors?.heroShell.x, anchors?.heroShell.w]);

  const agents = useMemo(
    () => computeHomeAgentsAt(buildElapsedMs, anchors, spawnCorner),
    [buildElapsedMs, anchors, spawnCorner]
  );

  const cursors = agents.filter((a) => a.visible);
  const heroTypeWorking =
    agents.find((a) => a.id === "hero-type")?.working ?? false;

  return {
    ...content,
    agents,
    cursors,
    reducedMotion,
    elapsedMs: buildElapsedMs,
    heroTypeWorking,
    heroTitleFull: HERO_HEADING,
  };
}
