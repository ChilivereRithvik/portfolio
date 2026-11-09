"use client";

import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { projects } from "@/config/portfolio";
import { ProjectShowcaseCard } from "@/components/projects/ProjectShowcaseCard";
import { ProjectsPageBuild } from "@/components/projects/ProjectsPageBuild";
import { measureProjectsAnchors } from "@/components/projects/measureProjectsAnchors";
import type { ProjectsAnchors } from "@/components/projects/projectsBuildTimeline";
import { useProjectsBuildSwarm } from "@/components/projects/useProjectsBuildSwarm";
import { cn } from "@/lib/utils";

export function ProjectsPageContent() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  const [anchors, setAnchors] = useState<ProjectsAnchors | null>(null);
  const lockedAnchorsRef = useRef<ProjectsAnchors | null>(null);

  const swarm = useProjectsBuildSwarm(true, anchors, projects.length);
  const build = swarm.phase === "building" ? swarm : null;

  const remeasure = useCallback(() => {
    const next = measureProjectsAnchors(
      sectionRef.current,
      titleRef.current,
      cardRefs.current
    );
    if (!next) return;
    if (
      swarm.phase === "building" &&
      next.cardRects.length >= projects.length &&
      !lockedAnchorsRef.current
    ) {
      lockedAnchorsRef.current = next;
    }
    setAnchors(
      swarm.phase === "building" && lockedAnchorsRef.current
        ? lockedAnchorsRef.current
        : next
    );
  }, [swarm.phase]);

  useLayoutEffect(() => {
    remeasure();
  }, [remeasure, swarm.elapsedMs]);

  useLayoutEffect(() => {
    const ro = new ResizeObserver(remeasure);
    if (sectionRef.current) ro.observe(sectionRef.current);
    window.addEventListener("resize", remeasure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", remeasure);
    };
  }, [remeasure]);

  useLayoutEffect(() => {
    if (swarm.phase === "complete") {
      lockedAnchorsRef.current = null;
      remeasure();
    }
  }, [swarm.phase, remeasure]);

  const titleText =
    build?.typedTitle ??
    (swarm.phase === "complete" ? "Projects" : "\u00a0");
  const subtitleText =
    build?.typedSubtitle ??
    (swarm.phase === "complete"
      ? "Enterprise platforms, AI automation, and products shipped end to end."
      : "\u00a0");

  return (
    <>
      <ProjectsPageBuild
        anchors={anchors}
        cardCount={projects.length}
        swarm={swarm}
      />

      <section
        ref={sectionRef}
        className="border-t border-dashed border-border"
      >
        <div className="space-y-8 px-4 py-8 md:px-6 md:py-10">
          <Link
            href="/"
            className="inline-block text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            &larr; Back to home
          </Link>

          <header
            className={cn(
              "space-y-3",
              build && !build.showHeader && swarm.phase === "building" && "opacity-0"
            )}
          >
            <h1
              ref={titleRef}
              className="min-h-[2.25rem] text-3xl font-bold tracking-tight text-foreground md:text-4xl"
            >
              {titleText}
            </h1>
            <p className="min-h-[1.25rem] max-w-2xl text-sm text-muted-foreground">
              {subtitleText}
            </p>
          </header>

          <div className="flex flex-col gap-8 md:gap-10">
            {projects.map((project, index) => {
              const cardP = build?.cardProgress(index) ?? 1;
              const visible = build ? build.showCards : true;

              return (
                <div
                  key={project.id}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  style={{
                    opacity:
                      swarm.phase === "building"
                        ? visible
                          ? Math.max(cardP, 0.02)
                          : 0.02
                        : 1,
                  }}
                  className={cn(
                    swarm.phase === "complete" &&
                      "transition-opacity duration-300 ease-out",
                    swarm.phase === "building" && "pointer-events-none"
                  )}
                >
                  <ProjectShowcaseCard project={project} />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
