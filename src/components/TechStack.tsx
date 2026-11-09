"use client";

import type { RefObject } from "react";
import { technologies } from "@/config/portfolio";
import { useHomeBuild } from "@/components/home/HomeBuildContext";
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
  const visibleTech =
    build.techPillCount >= technologies.length
      ? technologies
      : technologies.slice(0, build.techPillCount);

  const headingText =
    build.phase === "complete"
      ? "Tech Stack"
      : build.phase === "building"
        ? build.typedTechHeading || "\u00a0"
        : "Tech Stack";

  const sectionOpacity =
    build.phase === "complete"
      ? 1
      : build.showTechSection
        ? build.techLayoutP
        : 0;
  const subtitleOpacity =
    build.phase === "complete" ? 1 : Math.min(1, build.techLayoutP);

  return (
    <section
      ref={sectionRef}
      className={cn(
        "border-t border-border py-12",
        build.showTechSection || build.phase === "complete" ? "" : "hidden"
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
                  : build.techPillCount > 0
                    ? subtitleOpacity
                    : 0,
            }}
          >
            Tools I reach for day to day.
          </p>
        </div>

        <div ref={pillsRef} className="flex min-h-[2rem] flex-wrap gap-2">
          {visibleTech.map((tech) => (
            <span
              key={tech.name}
              className="flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/90"
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
