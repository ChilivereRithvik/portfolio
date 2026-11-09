"use client";

import type { RefObject } from "react";
import { technologies } from "@/config/portfolio";
import { useHomeBuild } from "@/components/home/HomeBuildContext";
import { estimateTechPillsHeight } from "@/components/home/measureHomeAnchors";
import { staggeredItemOpacity } from "@/components/home/homeBuildTimeline";
import { SectionTitle } from "@/components/SectionTitle";
import { TechIcon } from "@/lib/techIcons";
import { cn } from "@/lib/utils";
import { Layers } from "lucide-react";

type TechStackProps = {
  sectionRef: RefObject<HTMLElement | null>;
  headingRef: RefObject<HTMLHeadingElement | null>;
  pillsRef: RefObject<HTMLDivElement | null>;
};

export function TechStack({
  sectionRef,
  headingRef,
  pillsRef,
}: TechStackProps) {
  const build = useHomeBuild();
  const building = build.phase === "building";
  const pillsReserveH = estimateTechPillsHeight(technologies.length, 720);

  const headingText =
    build.phase === "complete"
      ? "Tech Stack"
      : build.phase === "building"
        ? build.typedTechHeading || "\u00a0"
        : "Tech Stack";

  const sectionVisible = build.showTechSection || build.phase === "complete";
  const sectionOpacity =
    build.phase === "complete"
      ? 1
      : !sectionVisible
        ? 0
        : build.techLayoutP >= 1
          ? 1
          : build.techLayoutReveal;

  return (
    <section
      ref={sectionRef}
      aria-hidden={building && !sectionVisible ? true : undefined}
      className={cn(
        "border-t border-dashed border-border py-12 ease-out home-build-animated",
        build.phase !== "building" && "transition-opacity duration-500",
        building && !sectionVisible && "pointer-events-none"
      )}
      style={{ opacity: sectionOpacity }}
    >
      <div className="space-y-6 px-4 md:px-6">
        <div>
          <SectionTitle
            ref={headingRef}
            icon={Layers}
            className="text-white"
            iconClassName="text-white/60"
          >
            {headingText}
          </SectionTitle>
          <p
            className="mt-1 min-h-[1.25rem] text-sm text-white/70"
            style={{
              opacity: build.phase === "complete" ? 1 : build.techLayoutP,
            }}
          >
            Tools I reach for day to day.
          </p>
        </div>

        <div
          ref={pillsRef}
          className="relative flex flex-wrap gap-2"
          style={
            building
              ? { height: pillsReserveH, overflow: "hidden" }
              : undefined
          }
        >
          {technologies.map((tech, index) => (
              <span
                key={tech.name}
                className={cn(
                  "flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/90 home-build-animated"
                )}
                style={
                  building
                    ? {
                        opacity: staggeredItemOpacity(
                          build.techUiP,
                          index,
                          technologies.length
                        ),
                      }
                    : undefined
                }
              >
                <TechIcon name={tech.name} />
                {tech.name}
              </span>
          ))}
        </div>
      </div>
    </section>
  );
}
