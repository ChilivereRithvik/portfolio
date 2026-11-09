"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { RadialCursorNav } from "@/components/RadialCursorNav";
import { radialCursorNavItems } from "@/components/radialCursorNavItems";
import { radialGoTo } from "@/lib/radialGoTo";

function canUseAgentPointer() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (window.matchMedia("(pointer: coarse)").matches) return false;
  return true;
}

function isInteractiveTarget(target: EventTarget | null) {
  if (!(target instanceof Element)) return false;
  return Boolean(
    target.closest(
      "a, button, input, textarea, select, label, [role='button'], [contenteditable='true']"
    )
  );
}

export function AgentPointer() {
  const router = useRouter();
  const [enabled, setEnabled] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [overlayActive, setOverlayActive] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const menuOpenRef = useRef(false);
  const selectedRef = useRef(0);
  menuOpenRef.current = menuOpen;
  selectedRef.current = selectedIndex;

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
    if (!menuOpen) {
      document.documentElement.classList.remove("radial-menu-active");
      return;
    }
    document.documentElement.classList.add("radial-menu-active");
    return () => {
      document.documentElement.classList.remove("radial-menu-active");
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!canUseAgentPointer()) return;

    setEnabled(true);
    document.documentElement.classList.add("agentic-pointer");

    const confirmSelection = () => {
      const item = radialCursorNavItems[selectedRef.current];
      if (item) radialGoTo(item, router);
      setMenuOpen(false);
    };

    const onMove = (e: PointerEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };

    const onDown = (e: PointerEvent) => {
      if (isInteractiveTarget(e.target)) return;

      if (e.button === 0) {
        e.preventDefault();
        if (!menuOpenRef.current) {
          setMenuOpen(true);
          setSelectedIndex(0);
          selectedRef.current = 0;
        } else {
          confirmSelection();
        }
        return;
      }

      if (e.button === 2 && menuOpenRef.current) {
        e.preventDefault();
        confirmSelection();
      }
    };

    const onWheel = (e: WheelEvent) => {
      if (!menuOpenRef.current) return;
      e.preventDefault();
      const step = e.deltaY > 0 ? 1 : -1;
      setSelectedIndex((i) => {
        const next =
          (i + step + radialCursorNavItems.length) % radialCursorNavItems.length;
        selectedRef.current = next;
        return next;
      });
    };

    const onContextMenu = (e: MouseEvent) => {
      if (!menuOpenRef.current) return;
      e.preventDefault();
      confirmSelection();
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (!menuOpenRef.current) return;
      if (e.key === "Escape") {
        e.preventDefault();
        setMenuOpen(false);
      }
    };

    const onLeave = () => {
      setVisible(false);
      setMenuOpen(false);
    };
    const onEnter = () => setVisible(true);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("contextmenu", onContextMenu);
    window.addEventListener("keydown", onKeyDown);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      document.documentElement.classList.remove("agentic-pointer");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("contextmenu", onContextMenu);
      window.removeEventListener("keydown", onKeyDown);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [router]);

  if (!enabled || !visible || overlayActive) return null;

  return (
    <RadialCursorNav
      x={pos.x}
      y={pos.y}
      open={menuOpen}
      selectedIndex={selectedIndex}
    />
  );
}
