"use client";

import { useEffect, useState } from "react";
import { AgentCursor } from "@/components/welcome/AgentCursor";

function canUseAgentPointer() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (window.matchMedia("(pointer: coarse)").matches) return false;
  return true;
}

export function AgentPointer() {
  const [enabled, setEnabled] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [pressing, setPressing] = useState(false);
  const [overlayActive, setOverlayActive] = useState(false);

  useEffect(() => {
    const sync = () => {
      const root = document.documentElement;
      setOverlayActive(
        root.classList.contains("home-build-active") ||
          root.classList.contains("home-intro-active")
      );
    };
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!canUseAgentPointer()) return;

    setEnabled(true);
    document.documentElement.classList.add("agentic-pointer");

    const onMove = (e: PointerEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };

    const onDown = () => setPressing(true);
    const onUp = () => setPressing(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      document.documentElement.classList.remove("agentic-pointer");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  if (!enabled || !visible || overlayActive) return null;

  return (
    <AgentCursor
      x={pos.x - 12}
      y={pos.y - 8}
      color="#f5f5f5"
      label="You"
      active={pressing}
      className="welcome-agent-cursor--viewport"
    />
  );
}
