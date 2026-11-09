"use client";

import type { RefObject } from "react";
import type { Experience } from "@/config/portfolio";
import { ExperienceEntry } from "@/components/Experience";
import { useHomeBuild } from "@/components/home/HomeBuildContext";
import { staggeredItemOpacity } from "@/components/home/homeBuildTimeline";
import { cn } from "@/lib/utils";

const EXP_HEADING = "Experience";
const EXP_SUB =
  "Professional journey and key contributions.";

type HomeExperienceProps = {
  sectionRef: RefObject<HTMLElement | null>;
  bodyRef: RefObject<HTMLDivElement | null>;
  experiences: Experience[];
};

export function HomeExperience({
  sectionRef,
  bodyRef,
  experiences,
}: HomeExperienceProps) {
  const build = useHomeBuild();
  const building = build.phase === "building";
  const visible = build.showExperienceSection || build.phase === "complete";

  const headingText =
    build.phase === "complete"
      ? EXP_HEADING
      : build.typedExperienceHeading || (visible ? "\u00a0" : "");

  const sectionOpacity =
    build.phase === "complete"
      ? 1
      : !visible
        ? 0
        : build.experienceLayoutP >= 1
          ? 1
          : build.experienceLayoutReveal;

  return (
    <section
      ref={sectionRef}
      id="experience"
      aria-hidden={building && !visible ? true : undefined}
      className={cn(
        "border-t border-border py-12 home-build-animated",
        building && !visible && "pointer-events-none"
      )}
      style={{ opacity: sectionOpacity }}
    >
      <div className="space-y-8">
        <div>
          <h2 className="min-h-[1.75rem] text-xl font-semibold text-foreground">
            {headingText}
          </h2>
          <p
            className="mt-1 min-h-[1.25rem] text-sm text-muted-foreground"
            style={{
              opacity:
                build.phase === "complete" ? 1 : build.experienceLayoutP,
            }}
          >
            {EXP_SUB}
          </p>
        </div>

        <div ref={bodyRef} className="min-h-[28rem] space-y-0">
          {experiences.map((exp, index) => {
            const preview = build.experienceEntryPreviews[index];
            const borderAlpha =
              building &&
              build.showExperienceEntries &&
              build.experienceEntriesP < 1
                ? staggeredItemOpacity(
                    build.experienceEntriesP,
                    index,
                    experiences.length
                  )
                : 0;

            const showContent =
              build.phase === "complete" || build.showExperienceContent;

            if (build.phase === "complete") {
              return (
                <div
                  key={exp.id}
                  data-experience-entry
                  className={cn(
                    index > 0 && "border-t border-border pt-6",
                    "home-build-animated"
                  )}
                >
                  <ExperienceEntry experience={exp} />
                </div>
              );
            }

            return (
              <div
                key={exp.id}
                data-experience-entry
                className={cn(
                  index > 0 && "border-t border-border pt-6",
                  "home-build-animated relative min-h-[12rem] py-4"
                )}
                style={{
                  opacity:
                    showContent || borderAlpha > 0 ? 1 : 0,
                  boxShadow:
                    borderAlpha > 0
                      ? `inset 0 0 0 1px rgba(96, 165, 250, ${borderAlpha})`
                      : undefined,
                }}
              >
                <div
                  className={cn(
                    "space-y-4",
                    building && !showContent && "pointer-events-none"
                  )}
                >
                  <div>
                    <h3 className="min-h-[1.25rem] text-sm font-semibold text-foreground">
                      {preview?.role || "\u00a0"}
                      {building &&
                      build.showExperienceContent &&
                      build.experienceContentP < 1 &&
                      preview?.role &&
                      preview.role.length < exp.role.length ? (
                        <span className="welcome-type-caret ml-0.5 inline-block h-[1em] w-0.5 translate-y-0.5 bg-foreground align-middle" />
                      ) : null}
                    </h3>
                    <p
                      className="mt-0.5 min-h-[1.25rem] text-sm text-muted-foreground"
                      style={{
                        opacity: preview?.companyLine ? 1 : 0,
                      }}
                    >
                      {preview?.companyLine || "\u00a0"}
                    </p>
                    <p
                      className="mt-0.5 min-h-[1rem] text-xs text-muted-foreground"
                      style={{
                        opacity: preview?.duration ? 1 : 0,
                      }}
                    >
                      {preview?.duration || "\u00a0"}
                    </p>
                  </div>

                  <p className="min-h-[3rem] text-sm text-muted-foreground">
                    {preview?.description || "\u00a0"}
                  </p>

                  {preview?.showProjects ? (
                    <div className="[&>div:first-child]:hidden [&>p]:hidden">
                      <ExperienceEntry experience={exp} />
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
