"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  AGENT_META,
  computeAgentsAt,
  deriveContentAt,
  type WelcomeAnchors,
  WELCOME_TITLE,
} from "@/components/welcome/welcomeTaskTimeline";

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useWelcomeSwarm(
  enabled: boolean,
  anchors: WelcomeAnchors | null
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
      const start = startRef.current ?? now;
      setElapsedMs(now - start);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => cancelAnimationFrame(raf);
  }, [enabled, reducedMotion]);

  const content = useMemo(
    () => deriveContentAt(elapsedMs, reducedMotion),
    [elapsedMs, reducedMotion]
  );

  const spawnCorner = useMemo(() => {
    const w = typeof window !== "undefined" ? window.innerWidth : 1200;
    const h = typeof window !== "undefined" ? window.innerHeight : 800;
    const corners = [
      { x: w * 0.08, y: h * 0.12 },
      { x: w * 0.92, y: h * 0.1 },
      { x: w * 0.9, y: h * 0.86 },
    ];
    return (index: number) => corners[index] ?? corners[0];
  }, []);

  const agents = useMemo(
    () => computeAgentsAt(elapsedMs, anchors, spawnCorner),
    [elapsedMs, anchors, spawnCorner]
  );

  const cursors = agents.filter((a) => a.visible);

  const typeWorking = agents.find((a) => a.id === "type")?.working ?? false;

  return {
    ...content,
    agents,
    cursors,
    reducedMotion,
    elapsedMs,
    typeWorking,
    meta: AGENT_META,
    titleFull: WELCOME_TITLE,
  };
}
