"use client";

import {
  type ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { AgentCursor } from "@/components/welcome/AgentCursor";
import { WelcomeSectionFrame } from "@/components/welcome/WelcomeSectionFrame";
import { measureHomeAnchors } from "@/components/home/measureHomeAnchors";
import {
  HOME_INDIVIDUAL_PROJECT_IDS,
  blogs,
  experiences,
  technologies,
} from "@/config/portfolio";
import { useHomeSwarm } from "@/components/home/useHomeSwarm";
import {
  deriveExperienceEntryPreviews,
  deriveWritingsCardPreviews,
  frameForExperienceStaggerAgent,
  frameForIndividualStaggerAgent,
  frameForWritingsStaggerAgent,
  HOME_AGENT_META,
  motionProgress,
  shiftHomeAnchorsForScroll,
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
  experienceSectionRef: React.RefObject<HTMLElement | null>;
  experienceBodyRef: React.RefObject<HTMLDivElement | null>;
  individualSectionRef: React.RefObject<HTMLElement | null>;
  individualGridRef: React.RefObject<HTMLDivElement | null>;
  writingsSectionRef: React.RefObject<HTMLElement | null>;
  writingsGridRef: React.RefObject<HTMLDivElement | null>;
  offClockSectionRef: React.RefObject<HTMLElement | null>;
  offClockBodyRef: React.RefObject<HTMLDivElement | null>;
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
    case "individual-layout":
      return anchors.individualSection;
    case "individual-cards":
      return anchors.individualGrid;
    case "writings-layout":
      return anchors.writingsSection;
    case "writings-cards":
    case "writings-content":
      return anchors.writingsGrid;
    case "offclock-layout":
      return anchors.offClockSection;
    case "offclock-content":
      return anchors.offClockBody;
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
  "individual-layout",
  "individual-cards",
  "writings-layout",
  "writings-cards",
  "writings-content",
  "offclock-layout",
  "offclock-content",
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
  individualSectionRef,
  individualGridRef,
  writingsSectionRef,
  writingsGridRef,
  offClockSectionRef,
  offClockBodyRef,
}: HomeAgentBuildProps) {
  const [phase, setPhase] = useState<"intro" | "building" | "complete">(
    "building"
  );
  const [anchors, setAnchors] = useState<HomeAnchors | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);
  const anchorScrollBaselineRef = useRef(0);
  const scrolledExperience = useRef(false);
  const scrolledIndividual = useRef(false);
  const scrolledWritings = useRef(false);
  const scrolledOffClock = useRef(false);
  const didInitialScrollTopRef = useRef(false);
  const lastAnchorRefreshMsRef = useRef(-1);

  useEffect(() => setMounted(true), []);

  useLayoutEffect(() => {
    if (didInitialScrollTopRef.current) return;
    didInitialScrollTopRef.current = true;
    const prev = history.scrollRestoration;
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    anchorScrollBaselineRef.current = 0;
    return () => {
      history.scrollRestoration = prev;
    };
  }, []);

  const building = phase === "building";

  const viewportAnchors = useMemo(() => {
    if (!anchors) return null;
    const delta = scrollY - anchorScrollBaselineRef.current;
    return shiftHomeAnchorsForScroll(anchors, delta);
  }, [anchors, scrollY]);

  const swarm = useHomeSwarm(building, viewportAnchors);

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

  useEffect(() => {
    if (phase !== "building" || swarm.reducedMotion) return;

    const scrollToSection = (
      ref: React.RefObject<HTMLElement | null>,
      scrolled: React.MutableRefObject<boolean>,
      layoutId: HomeAgentId
    ) => {
      if (
        !scrolled.current &&
        taskProgress(swarm.elapsedMs, layoutId) >= 1 &&
        ref.current
      ) {
        scrolled.current = true;
        ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    scrollToSection(
      experienceSectionRef,
      scrolledExperience,
      "experience-layout"
    );
    scrollToSection(
      individualSectionRef,
      scrolledIndividual,
      "individual-layout"
    );
    scrollToSection(writingsSectionRef, scrolledWritings, "writings-layout");
    scrollToSection(offClockSectionRef, scrolledOffClock, "offclock-layout");
  }, [
    phase,
    swarm.elapsedMs,
    swarm.reducedMotion,
    experienceSectionRef,
    individualSectionRef,
    writingsSectionRef,
    offClockSectionRef,
  ]);

  useEffect(() => {
    if (phase !== "building") return;
    const onScroll = () => setScrollY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [phase]);

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

  const measure = useCallback((opts?: { force?: boolean }) => {
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
      individualSectionRef.current,
      individualGridRef.current,
      writingsSectionRef.current,
      writingsGridRef.current,
      offClockSectionRef.current,
      offClockBodyRef.current,
      {
        stableOverlay: phase === "building",
        techCount: technologies.length,
        experienceCount: experiences.length,
        individualCount: HOME_INDIVIDUAL_PROJECT_IDS.length,
        writingsCount: blogs.length,
      }
    );
    if (!next) return;
    if (phase === "building" && anchors && !opts?.force) return;
    anchorScrollBaselineRef.current = window.scrollY;
    setAnchors(next);
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
    individualSectionRef,
    individualGridRef,
    writingsSectionRef,
    writingsGridRef,
    offClockSectionRef,
    offClockBodyRef,
    anchors,
  ]);

  useLayoutEffect(() => {
    if (phase === "complete") return;
    measure();
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => measure({ force: true }));
    });
    return () => cancelAnimationFrame(raf);
  }, [phase, measure]);

  useEffect(() => {
    if (phase !== "building" || swarm.reducedMotion) return;
    const gates = [0, 900, 2700, 4350, 5450, 6850];
    const elapsed = swarm.elapsedMs;
    const gate = [...gates].reverse().find((g) => elapsed >= g && lastAnchorRefreshMsRef.current < g);
    if (gate === undefined) return;
    lastAnchorRefreshMsRef.current = gate;
    measure({ force: true });
  }, [phase, swarm.elapsedMs, swarm.reducedMotion, measure]);

  useEffect(() => {
    if (phase !== "building") return;
    const onResize = () => measure({ force: true });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [phase, measure]);

  const completeView: HomeBuildView = {
    phase: "complete",
    typedHeroTitle: swarm.heroTitleFull,
    typedHeroMeta: swarm.heroMetaFull ?? "",
    heroMetaFull: swarm.heroMetaFull,
    showHeroEmail: true,
    typedTechHeading: "Tech Stack",
    typedExperienceHeading: "Experience",
    typedIndividualHeading: "Projects",
    typedWritingsHeading: "Writings",
    typedOffClockHeading: "Off The Clock",
    showHeroImage: true,
    showHeroMeta: true,
    showHeroLinks: true,
    techPillCount: Number.POSITIVE_INFINITY,
    experienceEntryPreviews: deriveExperienceEntryPreviews(1, experiences),
    writingsCardPreviews: deriveWritingsCardPreviews(1, blogs),
    showExperienceEntries: true,
    showExperienceContent: true,
    showIndividualSection: true,
    showIndividualCards: true,
    showOffClockSection: true,
    showOffClockContent: true,
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
    individualLayoutP: 1,
    individualCardsP: 1,
    offClockLayoutP: 1,
    offClockContentP: 1,
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
    individualLayoutReveal: 1,
    individualCardsReveal: 1,
    offClockLayoutReveal: 1,
    offClockContentReveal: 1,
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
            typedIndividualHeading: swarm.typedIndividualHeading,
            typedWritingsHeading: swarm.typedWritingsHeading,
            typedOffClockHeading: swarm.typedOffClockHeading,
            showHeroImage: swarm.showHeroImage,
            showHeroMeta: swarm.showHeroMeta,
            showHeroLinks: swarm.showHeroLinks,
            techPillCount: swarm.techPillCount,
            experienceEntryPreviews: swarm.experienceEntryPreviews,
            writingsCardPreviews: swarm.writingsCardPreviews,
            showExperienceEntries: swarm.showExperienceEntries,
            showExperienceContent: swarm.showExperienceContent,
            showIndividualSection: swarm.showIndividualSection,
            showIndividualCards: swarm.showIndividualCards,
            showOffClockSection: swarm.showOffClockSection,
            showOffClockContent: swarm.showOffClockContent,
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
            individualLayoutP: swarm.individualLayoutP,
            individualCardsP: swarm.individualCardsP,
            offClockLayoutP: swarm.offClockLayoutP,
            offClockContentP: swarm.offClockContentP,
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
            individualLayoutReveal: swarm.individualLayoutReveal,
            individualCardsReveal: swarm.individualCardsReveal,
            offClockLayoutReveal: swarm.offClockLayoutReveal,
            offClockContentReveal: swarm.offClockContentReveal,
            writingsLayoutReveal: swarm.writingsLayoutReveal,
            writingsCardsReveal: swarm.writingsCardsReveal,
            writingsContentReveal: swarm.writingsContentReveal,
          };

  const showOverlay = phase === "building" && !swarm.ready && !swarm.reducedMotion;

  const overlay =
    showOverlay && viewportAnchors && mounted ? (
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
          if (id === "individual-layout") {
            const cards = agent(swarm.agents, "individual-cards");
            if (
              cards?.working &&
              taskProgress(swarm.elapsedMs, "individual-cards") < 1
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
          if (
            id === "writings-content" ||
            id === "experience-content" ||
            id === "offclock-content"
          ) {
            return null;
          }

          const staggered =
            id === "experience-entries" ||
            id === "individual-cards" ||
            id === "writings-cards";
          const stagger =
            id === "experience-entries"
              ? frameForExperienceStaggerAgent(viewportAnchors, linearP)
              : id === "individual-cards"
                ? frameForIndividualStaggerAgent(viewportAnchors, linearP)
                : staggered
                  ? frameForWritingsStaggerAgent(viewportAnchors, linearP)
                  : null;
          const rect = stagger ?? frameForAgent(id, viewportAnchors);
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
