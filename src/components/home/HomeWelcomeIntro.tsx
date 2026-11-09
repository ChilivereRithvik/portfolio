"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { AgentCursor } from "@/components/welcome/AgentCursor";
import { WelcomeSectionFrame } from "@/components/welcome/WelcomeSectionFrame";
import {
  HOME_INTRO_PREP_META,
  HOME_INTRO_STATUS,
  HOME_INTRO_TITLE,
  type HomeIntroAnchors,
} from "@/components/home/homeIntroTimeline";
import { useHomeIntroSwarm } from "@/components/home/useHomeIntroSwarm";
import { cn } from "@/lib/utils";

type HomeWelcomeIntroProps = {
  active: boolean;
  exiting: boolean;
  onReady: () => void;
};

function caretAtEnd(el: HTMLElement): { x: number; y: number } {
  const box = el.getBoundingClientRect();
  const range = document.createRange();
  const texts: Text[] = [];
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) texts.push(walker.currentNode as Text);

  const lastText = [...texts].reverse().find((n) => n.data.trim().length > 0);
  if (!lastText) {
    return { x: box.left + box.width / 2, y: box.top + box.height * 0.55 };
  }

  const end = lastText.data.length;
  range.setStart(lastText, Math.max(0, end - 1));
  range.setEnd(lastText, end);
  const rects = range.getClientRects();
  const r = rects[rects.length - 1];
  if (r) {
    return { x: r.right, y: r.top + r.height * 0.55 };
  }
  return { x: box.right, y: box.top + box.height * 0.55 };
}

function measureIntroAnchors(
  title: HTMLElement | null,
  status: HTMLElement | null
): HomeIntroAnchors | null {
  if (!title || !status) return null;
  const titleBox = title.getBoundingClientRect();
  const statusBox = status.getBoundingClientRect();
  const padX = 28;
  const padY = 20;
  const left = Math.min(titleBox.left, statusBox.left) - padX;
  const right = Math.max(titleBox.right, statusBox.right) + padX;
  const top = titleBox.top - padY;
  const bottom = statusBox.bottom + padY;
  const titleCaret = caretAtEnd(title);
  const statusCaret = caretAtEnd(status);
  return {
    copyBounds: { x: left, y: top, w: right - left, h: bottom - top },
    titleRect: {
      x: titleBox.left - 8,
      y: titleBox.top - 4,
      w: titleBox.width + 16,
      h: titleBox.height + 8,
    },
    statusRect: {
      x: statusBox.left - 8,
      y: statusBox.top - 2,
      w: statusBox.width + 16,
      h: statusBox.height + 6,
    },
    titleCaret,
    statusCaret,
    copyTL: { x: left, y: top },
    copyBR: { x: right, y: bottom },
  };
}

export function HomeWelcomeIntro({
  active,
  exiting,
  onReady,
}: HomeWelcomeIntroProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);
  const [anchors, setAnchors] = useState<HomeIntroAnchors | null>(null);
  const [mounted, setMounted] = useState(false);
  const swarm = useHomeIntroSwarm(active, anchors);

  useEffect(() => setMounted(true), []);

  const measure = useCallback(() => {
    const next = measureIntroAnchors(titleRef.current, statusRef.current);
    if (next) setAnchors(next);
  }, []);

  useLayoutEffect(() => {
    if (!active) return;
    measure();
    const raf = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(raf);
  }, [active, measure, swarm.typedTitle, swarm.typedStatus, swarm.elapsedMs]);

  useEffect(() => {
    if (!active) return;
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [active, measure]);

  const readyFired = useRef(false);
  useEffect(() => {
    if (!active) readyFired.current = false;
  }, [active]);

  useEffect(() => {
    if (!active || !swarm.ready || swarm.reducedMotion || readyFired.current) {
      return;
    }
    readyFired.current = true;
    onReady();
  }, [active, onReady, swarm.ready, swarm.reducedMotion]);

  if (!active && !exiting) return null;

  const overlay =
    mounted && active ? (
      createPortal(
        <div
          className="pointer-events-none fixed inset-0 z-[70] overflow-hidden"
          aria-hidden
        >
          {anchors && !swarm.ready
            ? (() => {
                const layout = swarm.agents.find((a) => a.id === "prep-layout");
                if (!layout?.working || layout.progress <= 0) return null;
                return (
                  <WelcomeSectionFrame
                    fixed
                    rect={anchors.copyBounds}
                    progress={layout.progress}
                    accentColor={HOME_INTRO_PREP_META["prep-layout"].color}
                    showDimensions={false}
                  />
                );
              })()
            : null}
          {swarm.cursors
            .filter((c) => c.active || c.working)
            .map((cursor) => (
              <AgentCursor
                key={cursor.id}
                x={cursor.x - 12}
                y={cursor.y - 8}
                color={cursor.color}
                label={cursor.label}
                active={cursor.active}
                exiting={!cursor.working && cursor.progress >= 1}
                className="welcome-agent-cursor--viewport"
              />
            ))}
        </div>,
        document.body
      )
    ) : null;

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-[50] flex items-center justify-center bg-background px-6",
          exiting && "welcome-intro--exit"
        )}
        role="dialog"
        aria-label="Welcome"
        aria-busy={!swarm.ready}
      >
        <div className="welcome-intro-enter w-full max-w-xl text-center">
          <h1
            ref={titleRef}
            className="welcome-intro-word text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl"
            style={{ animationDelay: "0.05s" }}
          >
            {swarm.typedTitle || "\u00a0"}
            {active &&
            !swarm.ready &&
            swarm.typedTitle.length < HOME_INTRO_TITLE.length &&
            swarm.typedTitle.length > 0 ? (
              <span className="welcome-type-caret ml-0.5 inline-block h-[1em] w-0.5 translate-y-0.5 bg-foreground align-middle" />
            ) : null}
          </h1>
          <p
            ref={statusRef}
            className="welcome-intro-sub mt-5 min-h-[1.5rem] text-base text-muted-foreground sm:text-lg"
            style={{ animationDelay: "0.2s" }}
          >
            {swarm.typedStatus || "\u00a0"}
            {active &&
            !swarm.ready &&
            swarm.typedStatus.length > 0 &&
            (swarm.typedStatus.length < HOME_INTRO_STATUS.length ||
              swarm.typedStatus === HOME_INTRO_STATUS) ? (
              <span className="welcome-type-caret ml-0.5 inline-block h-[1em] w-0.5 translate-y-0.5 bg-muted-foreground align-middle" />
            ) : null}
          </p>
        </div>
        <p className="sr-only" aria-live="polite">
          {swarm.ready
            ? "Agents are ready. Building the page."
            : "Agents are getting ready."}
        </p>
      </div>
      {overlay}
    </>
  );
}
