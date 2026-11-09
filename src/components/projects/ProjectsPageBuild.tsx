"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AgentCursor } from "@/components/welcome/AgentCursor";
import { WelcomeSectionFrame } from "@/components/welcome/WelcomeSectionFrame";
import {
  frameForProjectsAgent,
  PROJECTS_AGENT_META,
  type ProjectsAgentId,
  type ProjectsAnchors,
} from "@/components/projects/projectsBuildTimeline";
import type { useProjectsBuildSwarm } from "@/components/projects/useProjectsBuildSwarm";

type SwarmState = ReturnType<typeof useProjectsBuildSwarm>;

type ProjectsPageBuildProps = {
  anchors: ProjectsAnchors | null;
  cardCount: number;
  swarm: SwarmState;
};

function agentWorking(agents: SwarmState["agents"], id: ProjectsAgentId) {
  return agents.find((a) => a.id === id)?.working ?? false;
}

export function ProjectsPageBuild({
  anchors,
  cardCount,
  swarm,
}: ProjectsPageBuildProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useLayoutEffect(() => {
    const root = document.documentElement;
    const active = swarm.phase === "building";
    root.classList.toggle("projects-build-active", active);
    return () => root.classList.remove("projects-build-active");
  }, [swarm.phase]);

  if (!mounted || swarm.reducedMotion) return null;

  const showLayoutFrame =
    agentWorking(swarm.agents, "layout") && anchors != null;
  const showHeaderFrame =
    agentWorking(swarm.agents, "header") && anchors != null;
  const cardsAgent = swarm.agents.find((a) => a.id === "cards");
  const cardIndex =
    anchors && cardsAgent?.working
      ? Math.min(
          cardCount - 1,
          Math.floor(cardsAgent.progress * Math.max(cardCount, 1))
        )
      : 0;

  const overlay =
    swarm.phase === "building" ? (
      <div className="pointer-events-none fixed inset-0 z-[55] overflow-hidden">
        {showLayoutFrame && anchors ? (
          <WelcomeSectionFrame
            rect={frameForProjectsAgent("layout", anchors)}
            progress={swarm.layoutP}
            accentColor={PROJECTS_AGENT_META.layout.color}
            fixed
          />
        ) : null}
        {showHeaderFrame && anchors ? (
          <WelcomeSectionFrame
            rect={frameForProjectsAgent("header", anchors)}
            progress={swarm.headerP}
            accentColor={PROJECTS_AGENT_META.header.color}
            fixed
          />
        ) : null}
        {cardsAgent?.working && anchors && anchors.cardRects[cardIndex] ? (
          <WelcomeSectionFrame
            rect={frameForProjectsAgent("cards", anchors, cardIndex)}
            progress={
              swarm.cardProgress(cardIndex) > 0
                ? Math.min(1, swarm.cardProgress(cardIndex) + 0.15)
                : cardsAgent.progress
            }
            accentColor={PROJECTS_AGENT_META.cards.color}
            fixed
          />
        ) : null}

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

  return createPortal(overlay, document.body);
}
