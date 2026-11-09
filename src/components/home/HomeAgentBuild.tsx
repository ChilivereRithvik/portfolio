"use client";

import {
  type ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { AgentCursor } from "@/components/welcome/AgentCursor";
import { WelcomeSectionFrame } from "@/components/welcome/WelcomeSectionFrame";
import { measureHomeAnchors } from "@/components/home/measureHomeAnchors";
import { useHomeSwarm } from "@/components/home/useHomeSwarm";
import type { HomeAnchors } from "@/components/home/homeBuildTimeline";
import {
  HomeBuildProvider,
  type HomeBuildView,
} from "@/components/home/HomeBuildContext";
import { homeBuildShellView } from "@/components/home/homeBuildShell";

type HomeAgentBuildProps = {
  children: ReactNode;
  heroSectionRef: React.RefObject<HTMLElement | null>;
  heroTitleRef: React.RefObject<HTMLHeadingElement | null>;
  heroLinksRef: React.RefObject<HTMLDivElement | null>;
  techSectionRef: React.RefObject<HTMLElement | null>;
  techHeadingRef: React.RefObject<HTMLHeadingElement | null>;
  techPillsRef: React.RefObject<HTMLDivElement | null>;
};

export function HomeAgentBuild({
  children,
  heroSectionRef,
  heroTitleRef,
  heroLinksRef,
  techSectionRef,
  techHeadingRef,
  techPillsRef,
}: HomeAgentBuildProps) {
  const [phase, setPhase] = useState<"building" | "complete">("building");
  const [anchors, setAnchors] = useState<HomeAnchors | null>(null);

  const building = phase === "building";
  const swarm = useHomeSwarm(building && Boolean(anchors), anchors);

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

  const measure = useCallback(() => {
    setAnchors(
      measureHomeAnchors(
        heroSectionRef.current,
        heroTitleRef.current,
        heroLinksRef.current,
        techSectionRef.current,
        techHeadingRef.current,
        techPillsRef.current
      )
    );
  }, [
    heroSectionRef,
    heroTitleRef,
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
    return () => window.removeEventListener("resize", onResize);
  }, [phase, measure]);

  useEffect(() => {
    if (phase !== "building" || swarm.reducedMotion) return;
    let raf = 0;
    const loop = () => {
      measure();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [phase, swarm.reducedMotion, measure]);

  const buildView: HomeBuildView =
    phase === "complete" || swarm.reducedMotion
      ? {
            phase: "complete",
            typedHeroTitle: swarm.heroTitleFull,
            typedTechHeading: "Tech Stack",
            showHeroImage: true,
            showHeroMeta: true,
            showHeroLinks: true,
            techPillCount: Number.POSITIVE_INFINITY,
            showTechSection: true,
            showLowerSections: true,
            heroTypeWorking: false,
            heroTitleFull: swarm.heroTitleFull,
            heroLayoutP: 1,
            heroTypeP: 1,
            heroUiP: 1,
            techLayoutP: 1,
            techUiP: 1,
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
            typedTechHeading: swarm.typedTechHeading,
            showHeroImage: swarm.showHeroImage,
            showHeroMeta: swarm.showHeroMeta,
            showHeroLinks: swarm.showHeroLinks,
            techPillCount: swarm.techPillCount,
            showTechSection: swarm.showTechSection,
            showLowerSections: swarm.showLowerSections,
            heroTypeWorking: swarm.heroTypeWorking,
            heroTitleFull: swarm.heroTitleFull,
            heroLayoutP: swarm.heroLayoutP,
            heroTypeP: swarm.heroTypeP,
            heroUiP: swarm.heroUiP,
            techLayoutP: swarm.techLayoutP,
            techUiP: swarm.techUiP,
            heroLayoutReveal: swarm.heroLayoutReveal,
            heroTypeReveal: swarm.heroTypeReveal,
            heroUiReveal: swarm.heroUiReveal,
            techLayoutReveal: swarm.techLayoutReveal,
            techUiReveal: swarm.techUiReveal,
          };

  const showOverlay = phase === "building" && !swarm.ready && !swarm.reducedMotion;

  const heroLayout = swarm.agents.find((a) => a.id === "hero-layout");
  const heroType = swarm.agents.find((a) => a.id === "hero-type");
  const heroUi = swarm.agents.find((a) => a.id === "hero-ui");
  const techLayout = swarm.agents.find((a) => a.id === "tech-layout");
  const techUi = swarm.agents.find((a) => a.id === "tech-ui");

  return (
    <HomeBuildProvider value={buildView}>
      <div className="relative">
        {children}

        {showOverlay && anchors ? (
          <div
            className="pointer-events-none absolute inset-0 z-30 overflow-hidden"
            aria-hidden
          >
          {heroLayout?.working && swarm.heroLayoutP < 1 ? (
            <WelcomeSectionFrame
              rect={anchors.heroSection}
              progress={swarm.heroLayoutP}
              accentColor={heroLayout.color}
            />
          ) : null}
          {heroType?.working && heroType.progress < 1 ? (
            <WelcomeSectionFrame
              rect={anchors.heroTitle}
              progress={heroType.progress}
              accentColor={heroType.color}
            />
          ) : null}
          {heroUi?.working && swarm.heroUiP < 1 ? (
            <WelcomeSectionFrame
              rect={anchors.heroLinks}
              progress={swarm.heroUiP}
              accentColor={heroUi.color}
            />
          ) : null}
          {techLayout?.working && swarm.techLayoutP < 1 ? (
            <WelcomeSectionFrame
              rect={anchors.techSection}
              progress={swarm.techLayoutP}
              accentColor={techLayout.color}
            />
          ) : null}
          {techUi?.working && swarm.techUiP < 1 ? (
            <WelcomeSectionFrame
              rect={anchors.techPills}
              progress={swarm.techUiP}
              accentColor={techUi.color}
            />
          ) : null}

          <div className="absolute inset-0 z-20">
            {swarm.cursors.map((cursor) => (
              <AgentCursor
                key={cursor.id}
                x={cursor.x - 12}
                y={cursor.y - 8}
                color={cursor.color}
                label={cursor.label}
                active={cursor.active}
                exiting={!cursor.working && cursor.progress >= 1}
                className="welcome-agent-cursor--instant"
              />
            ))}
          </div>
          </div>
        ) : null}
      </div>

      {building && !swarm.ready && !swarm.reducedMotion ? (
        <p className="sr-only" aria-live="polite">
          Agents are building the home page. Please wait.
        </p>
      ) : null}
    </HomeBuildProvider>
  );
}
