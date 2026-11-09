"use client";

import {
  type ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { AgentCursor } from "@/components/welcome/AgentCursor";
import { WelcomeSectionFrame } from "@/components/welcome/WelcomeSectionFrame";
import { measureHomeAnchors } from "@/components/home/measureHomeAnchors";
import { blogs, experiences, technologies } from "@/config/portfolio";
import { useHomeSwarm } from "@/components/home/useHomeSwarm";
import {
  deriveExperienceEntryPreviews,
  deriveWritingsCardPreviews,
  frameForExperienceStaggerAgent,
  frameForWritingsStaggerAgent,
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
import {
  hasSeenHomeBuild,
  markHomeBuildSeen,
} from "@/components/home/homeBuildStorage";

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
  experienceSectionRef: React.RefObject<HTMLElement | null>;
  experienceBodyRef: React.RefObject<HTMLDivElement | null>;
  writingsSectionRef: React.RefObject<HTMLElement | null>;
  writingsGridRef: React.RefObject<HTMLDivElement | null>;
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
    case "experience-layout":
      return anchors.experienceSection;
    case "experience-entries":
    case "experience-content":
      return anchors.experienceBody;
    case "writings-layout":
      return anchors.writingsSection;
    case "writings-cards":
    case "writings-content":
      return anchors.writingsGrid;
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
  "experience-layout",
  "experience-entries",
  "experience-content",
  "writings-layout",
  "writings-cards",
  "writings-content",
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
  experienceSectionRef,
  experienceBodyRef,
  writingsSectionRef,
  writingsGridRef,
}: HomeAgentBuildProps) {
  const [phase, setPhase] = useState<"intro" | "building" | "complete">(
    "building"
  );
  const [anchors, setAnchors] = useState<HomeAnchors | null>(null);
  const [mounted, setMounted] = useState(false);
  const scrolledExperience = useRef(false);
  const scrolledWritings = useRef(false);

  useEffect(() => setMounted(true), []);

  useLayoutEffect(() => {
    if (hasSeenHomeBuild()) {
      setPhase("complete");
    }
  }, []);

  const building = phase === "building";
  const swarm = useHomeSwarm(building, anchors);

  useEffect(() => {
    if (building && swarm.ready) {
      setPhase("complete");
    }
  }, [building, swarm.ready]);

  useEffect(() => {
    if (phase !== "complete" || hasSeenHomeBuild()) return;
    markHomeBuildSeen();
  }, [phase]);

  useEffect(() => {
    if (swarm.reducedMotion) {
      setPhase("complete");
    }
  }, [swarm.reducedMotion]);

  useEffect(() => {
    if (phase !== "building" || swarm.reducedMotion) return;

    if (
      !scrolledExperience.current &&
      taskProgress(swarm.elapsedMs, "experience-layout") >= 0.12 &&
      experienceSectionRef.current
    ) {
      scrolledExperience.current = true;
      experienceSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    if (
      !scrolledWritings.current &&
      taskProgress(swarm.elapsedMs, "writings-layout") >= 0.12 &&
      writingsSectionRef.current
    ) {
      scrolledWritings.current = true;
      writingsSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [
    phase,
    swarm.elapsedMs,
    swarm.reducedMotion,
    experienceSectionRef,
    writingsSectionRef,
  ]);

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
      experienceSectionRef.current,
      experienceBodyRef.current,
      writingsSectionRef.current,
      writingsGridRef.current,
      {
        stableOverlay: phase === "building",
        techCount: technologies.length,
        experienceCount: experiences.length,
        writingsCount: blogs.length,
      }
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
    experienceSectionRef,
    experienceBodyRef,
    writingsSectionRef,
    writingsGridRef,
  ]);

  useLayoutEffect(() => {
    if (phase === "complete") return;
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

  const completeView: HomeBuildView = {
    phase: "complete",
    typedHeroTitle: swarm.heroTitleFull,
    typedHeroMeta: swarm.heroMetaFull ?? "",
    heroMetaFull: swarm.heroMetaFull,
    showHeroEmail: true,
    typedTechHeading: "Tech Stack",
    typedExperienceHeading: "Experience",
    typedWritingsHeading: "Writings",
    showHeroImage: true,
    showHeroMeta: true,
    showHeroLinks: true,
    techPillCount: Number.POSITIVE_INFINITY,
    experienceEntryPreviews: deriveExperienceEntryPreviews(1, experiences),
    writingsCardPreviews: deriveWritingsCardPreviews(1, blogs),
    showExperienceEntries: true,
    showExperienceContent: true,
    showTechSection: true,
    showExperienceSection: true,
    showWritingsSection: true,
    showWritingsCards: true,
    showWritingsContent: true,
    showLowerSections: true,
    heroTypeWorking: false,
    heroTitleFull: swarm.heroTitleFull,
    heroShellP: 1,
    heroLayoutP: 1,
    heroTypeP: 1,
    heroUiP: 1,
    techLayoutP: 1,
    techUiP: 1,
    experienceLayoutP: 1,
    experienceEntriesP: 1,
    experienceContentP: 1,
    writingsLayoutP: 1,
    writingsCardsP: 1,
    writingsContentP: 1,
    heroShellReveal: 1,
    heroLayoutReveal: 1,
    heroTypeReveal: 1,
    heroUiReveal: 1,
    techLayoutReveal: 1,
    techUiReveal: 1,
    experienceLayoutReveal: 1,
    experienceEntriesReveal: 1,
    experienceContentReveal: 1,
    writingsLayoutReveal: 1,
    writingsCardsReveal: 1,
    writingsContentReveal: 1,
  };

  const buildView: HomeBuildView =
    phase === "complete" || swarm.reducedMotion
      ? completeView
      : !anchors
          ? homeBuildShellView(swarm.heroTitleFull)
          : {
            phase: "building",
            typedHeroTitle: swarm.typedHeroTitle,
            typedHeroMeta: swarm.typedHeroMeta,
            heroMetaFull: swarm.heroMetaFull,
            showHeroEmail: swarm.showHeroEmail,
            typedTechHeading: swarm.typedTechHeading,
            typedExperienceHeading: swarm.typedExperienceHeading,
            typedWritingsHeading: swarm.typedWritingsHeading,
            showHeroImage: swarm.showHeroImage,
            showHeroMeta: swarm.showHeroMeta,
            showHeroLinks: swarm.showHeroLinks,
            techPillCount: swarm.techPillCount,
            experienceEntryPreviews: swarm.experienceEntryPreviews,
            writingsCardPreviews: swarm.writingsCardPreviews,
            showExperienceEntries: swarm.showExperienceEntries,
            showExperienceContent: swarm.showExperienceContent,
            showTechSection: swarm.showTechSection,
            showExperienceSection: swarm.showExperienceSection,
            showWritingsSection: swarm.showWritingsSection,
            showWritingsCards: swarm.showWritingsCards,
            showWritingsContent: swarm.showWritingsContent,
            showLowerSections: swarm.showLowerSections,
            heroTypeWorking: swarm.heroTypeWorking,
            heroTitleFull: swarm.heroTitleFull,
            heroShellP: swarm.heroShellP,
            heroLayoutP: swarm.heroLayoutP,
            heroTypeP: swarm.heroTypeP,
            heroUiP: swarm.heroUiP,
            techLayoutP: swarm.techLayoutP,
            techUiP: swarm.techUiP,
            experienceLayoutP: swarm.experienceLayoutP,
            experienceEntriesP: swarm.experienceEntriesP,
            experienceContentP: swarm.experienceContentP,
            writingsLayoutP: swarm.writingsLayoutP,
            writingsCardsP: swarm.writingsCardsP,
            writingsContentP: swarm.writingsContentP,
            heroShellReveal: swarm.heroShellReveal,
            heroLayoutReveal: swarm.heroLayoutReveal,
            heroTypeReveal: swarm.heroTypeReveal,
            heroUiReveal: swarm.heroUiReveal,
            techLayoutReveal: swarm.techLayoutReveal,
            techUiReveal: swarm.techUiReveal,
            experienceLayoutReveal: swarm.experienceLayoutReveal,
            experienceEntriesReveal: swarm.experienceEntriesReveal,
            experienceContentReveal: swarm.experienceContentReveal,
            writingsLayoutReveal: swarm.writingsLayoutReveal,
            writingsCardsReveal: swarm.writingsCardsReveal,
            writingsContentReveal: swarm.writingsContentReveal,
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

          if (id === "experience-layout") {
            const entries = agent(swarm.agents, "experience-entries");
            if (
              entries?.working &&
              taskProgress(swarm.elapsedMs, "experience-entries") < 1
            ) {
              return null;
            }
          }
          if (id === "writings-layout") {
            const cards = agent(swarm.agents, "writings-cards");
            if (
              cards?.working &&
              taskProgress(swarm.elapsedMs, "writings-cards") < 1
            ) {
              return null;
            }
          }
          if (id === "writings-content" || id === "experience-content") {
            return null;
          }

          const staggered =
            id === "experience-entries" ||
            id === "writings-cards";
          const stagger =
            id === "experience-entries"
              ? frameForExperienceStaggerAgent(anchors, linearP)
              : staggered
                ? frameForWritingsStaggerAgent(anchors, linearP)
                : null;
          const rect = stagger ?? frameForAgent(id, anchors);
          const frameProgress = stagger ? stagger.progress : linearP;

          return (
            <WelcomeSectionFrame
              key={id}
              fixed
              rect={rect}
              progress={frameProgress}
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
      <div>{children}</div>

      {overlay ? createPortal(overlay, document.body) : null}

      {building && !swarm.ready && !swarm.reducedMotion ? (
        <p className="sr-only" aria-live="polite">
          Agents are building the home page. Please wait.
        </p>
      ) : null}
    </HomeBuildProvider>
  );
}
