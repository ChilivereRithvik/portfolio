"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  computeProjectsAgentsAt,
  deriveProjectsBuildAt,
  type ProjectsAnchors,
} from "@/components/projects/projectsBuildTimeline";

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useProjectsBuildSwarm(
  enabled: boolean,
  anchors: ProjectsAnchors | null,
  cardCount: number
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
    if (!enabled || reducedMotion) return;

    startRef.current = performance.now();
    let raf = 0;
    const frame = (now: number) => {
      setElapsedMs(now - (startRef.current ?? now));
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [enabled, reducedMotion]);

  const content = useMemo(
    () => deriveProjectsBuildAt(elapsedMs, reducedMotion, cardCount),
    [elapsedMs, reducedMotion, cardCount]
  );

  const spawnCorner = useMemo(() => {
    const w = typeof window !== "undefined" ? window.innerWidth : 1200;
    const h = typeof window !== "undefined" ? window.innerHeight : 800;
    const corners = [
      { x: w * 0.1, y: h * 0.16 },
      { x: w * 0.88, y: h * 0.2 },
      { x: w * 0.14, y: h * 0.78 },
    ];
    return (index: number) => corners[index] ?? corners[0];
  }, []);

  const agents = useMemo(
    () => computeProjectsAgentsAt(elapsedMs, anchors, spawnCorner),
    [elapsedMs, anchors, spawnCorner]
  );

  return {
    ...content,
    agents,
    cursors: agents.filter((a) => a.visible),
    reducedMotion,
    elapsedMs,
  };
}
