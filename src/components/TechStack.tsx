"use client";

import type { RefObject } from "react";
import { technologies } from "@/config/portfolio";
import { useHomeBuild } from "@/components/home/HomeBuildContext";
import {
  estimateTechPillsHeight,
} from "@/components/home/measureHomeAnchors";
import { TechIcon } from "@/lib/techIcons";
import { cn } from "@/lib/utils";

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
      : sectionVisible
        ? Math.min(1, build.techLayoutReveal)
        : 0;

  return (
    <section
      ref={sectionRef}
      aria-hidden={building && !sectionVisible ? true : undefined}
      className={cn(
        "border-t border-border py-12 ease-out home-build-animated",
        build.phase !== "building" && "transition-opacity duration-500",
        building && !sectionVisible && "pointer-events-none"
      )}
      style={{ opacity: sectionOpacity }}
    >
      <div className="space-y-6">
        <div>
          <h2
            ref={headingRef}
            className="min-h-[1.75rem] text-xl font-semibold text-white"
          >
            {headingText}
          </h2>
          <p
            className="mt-1 text-sm text-white/70"
            style={{
              opacity:
                build.phase === "complete"
                  ? 1
                  : build.techLayoutP >= 1
                    ? 1
                    : build.techPillCount > 0
                      ? Math.min(1, build.techUiReveal)
                      : 0,
            }}
          >
            Tools I reach for day to day.
          </p>
        </div>

        <div
          ref={pillsRef}
          className="flex min-h-[2rem] flex-wrap gap-2"
          style={building ? { minHeight: pillsReserveH } : undefined}
        >
          {technologies.map((tech, index) => {
              const revealed =
                !building ||
                build.techPillCount >= technologies.length ||
                index < build.techPillCount;

              return (
                <span
                  key={tech.name}
                  className={cn(
                    "flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/90 home-build-animated",
                    building && !revealed && "pointer-events-none invisible"
                  )}
                  style={
                    building
                      ? {
                          opacity: revealed
                            ? Math.min(1, build.techUiReveal)
                            : 0,
                        }
                      : undefined
                  }
                >
                  <TechIcon name={tech.name} />
                  {tech.name}
                </span>
              );
            })}
        </div>
      </div>
    </section>
  );
}
