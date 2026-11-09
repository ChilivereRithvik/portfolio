"use client";

import {
  type ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { AgentCursor } from "@/components/welcome/AgentCursor";
import { WelcomeSectionFrame } from "@/components/welcome/WelcomeSectionFrame";
import { measureHomeAnchors } from "@/components/home/measureHomeAnchors";
import { technologies } from "@/config/portfolio";
import { useHomeSwarm } from "@/components/home/useHomeSwarm";
import {
  HOME_AGENT_META,
  motionProgress,
  taskProgress,
  type HomeAgentId,
  type HomeAnchors,
} from "@/components/home/homeBuildTimeline";
import {
  HomeBuildProvider,
  type HomeBuildView,
} from "@/components/home/HomeBuildContext";
import { homeBuildShellView } from "@/components/home/homeBuildShell";

type HomeAgentBuildProps = {
  children: ReactNode;
  heroShellRef: React.RefObject<HTMLElement | null>;
  heroPhotoRef: React.RefObject<HTMLElement | null>;
  heroTitleRef: React.RefObject<HTMLHeadingElement | null>;
  heroCopyRef: React.RefObject<HTMLDivElement | null>;
  heroLinksRef: React.RefObject<HTMLDivElement | null>;
  techSectionRef: React.RefObject<HTMLElement | null>;
  techHeadingRef: React.RefObject<HTMLHeadingElement | null>;
  techPillsRef: React.RefObject<HTMLDivElement | null>;
};

function agent(
  agents: ReturnType<typeof useHomeSwarm>["agents"],
  id: HomeAgentId
) {
  return agents.find((a) => a.id === id);
}

function frameForAgent(
  id: HomeAgentId,
  anchors: HomeAnchors
): { x: number; y: number; w: number; h: number } {
  switch (id) {
    case "nav-layout":
      return anchors.nav;
    case "hero-shell":
      return anchors.heroShell;
    case "hero-photo":
      return anchors.heroPhoto;
    case "hero-type":
      return anchors.heroCopy;
    case "hero-links":
      return anchors.heroLinks;
    case "tech-layout":
      return anchors.techSection;
    case "tech-ui":
      return anchors.techPills;
    default:
      return anchors.nav;
  }
}

const OVERLAY_AGENTS: HomeAgentId[] = [
  "nav-layout",
  "hero-shell",
  "hero-photo",
  "hero-type",
  "hero-links",
  "tech-layout",
  "tech-ui",
];

export function HomeAgentBuild({
  children,
  heroShellRef,
  heroPhotoRef,
  heroTitleRef,
  heroCopyRef,
  heroLinksRef,
  techSectionRef,
  techHeadingRef,
  techPillsRef,
}: HomeAgentBuildProps) {
  const [phase, setPhase] = useState<"building" | "complete">("building");
  const [anchors, setAnchors] = useState<HomeAnchors | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const building = phase === "building";
  const swarm = useHomeSwarm(building, anchors);

  useEffect(() => {
    if (building && swarm.ready) {
      setPhase("complete");
    }
  }, [building, swarm.ready]);

  useEffect(() => {
    if (swarm.reducedMotion) {
      setPhase("complete");
    }
  }, [swarm.reducedMotion]);

  useLayoutEffect(() => {
    const active =
      phase === "building" && !swarm.ready && !swarm.reducedMotion;
    const root = document.documentElement;
    root.classList.toggle("home-build-active", active);
    if (active) {
      const navReveal = anchors
        ? motionProgress(swarm.elapsedMs, "nav-layout")
        : 0;
      root.style.setProperty("--home-nav-reveal", String(navReveal));
      root.classList.toggle(
        "home-build-nav-interactive",
        taskProgress(swarm.elapsedMs, "nav-layout") >= 1
      );
    } else {
      root.style.removeProperty("--home-nav-reveal");
      root.classList.remove("home-build-nav-interactive");
    }
    return () => {
      root.classList.remove("home-build-active", "home-build-nav-interactive");
      root.style.removeProperty("--home-nav-reveal");
    };
  }, [
    phase,
    swarm.ready,
    swarm.reducedMotion,
    anchors,
    swarm.elapsedMs,
  ]);

  const measure = useCallback(() => {
    const nav = document.querySelector<HTMLElement>("[data-home-nav]");
    const next = measureHomeAnchors(
      nav,
      heroShellRef.current,
      heroPhotoRef.current,
      heroTitleRef.current,
      heroCopyRef.current,
      heroLinksRef.current,
      techSectionRef.current,
      techHeadingRef.current,
      techPillsRef.current,
      { stableOverlay: phase === "building", techCount: technologies.length }
    );
    if (next) setAnchors(next);
  }, [
    phase,
    heroShellRef,
    heroPhotoRef,
    heroTitleRef,
    heroCopyRef,
    heroLinksRef,
    techSectionRef,
    techHeadingRef,
    techPillsRef,
  ]);

  useLayoutEffect(() => {
    if (phase !== "building") return;
    measure();
  }, [phase, measure]);

  useEffect(() => {
    if (phase !== "building") return;
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onResize, { passive: true });
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onResize);
    };
  }, [phase, measure]);


  const buildView: HomeBuildView =
    phase === "complete" || swarm.reducedMotion
      ? {
          phase: "complete",
          typedHeroTitle: swarm.heroTitleFull,
          typedHeroMeta: swarm.heroMetaFull ?? "",
          heroMetaFull: swarm.heroMetaFull,
          showHeroEmail: true,
          typedTechHeading: "Tech Stack",
          showHeroImage: true,
          showHeroMeta: true,
          showHeroLinks: true,
          techPillCount: Number.POSITIVE_INFINITY,
          showTechSection: true,
          showLowerSections: true,
          heroTypeWorking: false,
          heroTitleFull: swarm.heroTitleFull,
          heroShellP: 1,
          heroLayoutP: 1,
          heroTypeP: 1,
          heroUiP: 1,
          techLayoutP: 1,
          techUiP: 1,
          heroShellReveal: 1,
          heroLayoutReveal: 1,
          heroTypeReveal: 1,
          heroUiReveal: 1,
          techLayoutReveal: 1,
          techUiReveal: 1,
        }
      : !anchors
        ? homeBuildShellView(swarm.heroTitleFull)
        : {
            phase: "building",
            typedHeroTitle: swarm.typedHeroTitle,
            typedHeroMeta: swarm.typedHeroMeta,
            heroMetaFull: swarm.heroMetaFull,
            showHeroEmail: swarm.showHeroEmail,
            typedTechHeading: swarm.typedTechHeading,
            showHeroImage: swarm.showHeroImage,
            showHeroMeta: swarm.showHeroMeta,
            showHeroLinks: swarm.showHeroLinks,
            techPillCount: swarm.techPillCount,
            showTechSection: swarm.showTechSection,
            showLowerSections: swarm.showLowerSections,
            heroTypeWorking: swarm.heroTypeWorking,
            heroTitleFull: swarm.heroTitleFull,
            heroShellP: swarm.heroShellP,
            heroLayoutP: swarm.heroLayoutP,
            heroTypeP: swarm.heroTypeP,
            heroUiP: swarm.heroUiP,
            techLayoutP: swarm.techLayoutP,
            techUiP: swarm.techUiP,
            heroShellReveal: swarm.heroShellReveal,
            heroLayoutReveal: swarm.heroLayoutReveal,
            heroTypeReveal: swarm.heroTypeReveal,
            heroUiReveal: swarm.heroUiReveal,
            techLayoutReveal: swarm.techLayoutReveal,
            techUiReveal: swarm.techUiReveal,
          };

  const showOverlay = phase === "building" && !swarm.ready && !swarm.reducedMotion;

  const overlay =
    showOverlay && anchors && mounted ? (
      <div
        className="pointer-events-none fixed inset-0 z-[55] overflow-hidden"
        aria-hidden
      >
        {OVERLAY_AGENTS.map((id) => {
          const a = agent(swarm.agents, id);
          const linearP = taskProgress(swarm.elapsedMs, id);
          if (!a?.working || linearP >= 1) return null;
          return (
            <WelcomeSectionFrame
              key={id}
              fixed
              rect={frameForAgent(id, anchors)}
              progress={linearP}
              accentColor={HOME_AGENT_META[id].color}
            />
          );
        })}

        {swarm.cursors.map((cursor) => (
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
      </div>
    ) : null;

  return (
    <HomeBuildProvider value={buildView}>
      {children}
      {overlay ? createPortal(overlay, document.body) : null}

      {building && !swarm.ready && !swarm.reducedMotion ? (
        <p className="sr-only" aria-live="polite">
          Agents are building the home page. Please wait.
        </p>
      ) : null}
    </HomeBuildProvider>
  );
}
