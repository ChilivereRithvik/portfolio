"use client";

import type { RefObject } from "react";
import type { Experience } from "@/config/portfolio";
import { ExperienceEntry } from "@/components/Experience";
import { useHomeBuild } from "@/components/home/HomeBuildContext";
import { SectionTitle } from "@/components/SectionTitle";
import { cn } from "@/lib/utils";
import { Briefcase } from "lucide-react";

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
        "border-t border-dashed border-border py-12 home-build-animated",
        building && !visible && "pointer-events-none border-transparent",
      )}
      style={{ opacity: sectionOpacity }}
    >
      <div className="space-y-8 px-4 md:px-6">
        <div>
          <SectionTitle
            icon={Briefcase}
            className="text-foreground"
            iconClassName="text-muted-foreground"
          >
            {headingText}
          </SectionTitle>
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

        <div ref={bodyRef} className="min-h-[28rem] space-y-10">
          {experiences.map((exp, index) => {
            const preview = build.experienceEntryPreviews[index];

            const showContent =
              build.phase === "complete" || build.showExperienceContent;

            if (build.phase === "complete") {
              return (
                <div
                  key={exp.id}
                  data-experience-entry
                  className={cn(
                    "home-build-animated",
                    index > 0 && "border-t border-border pt-10"
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
                  "home-build-animated relative min-h-[12rem]",
                  index > 0 && "border-t border-transparent pt-10"
                )}
                style={{
                  opacity:
                    showContent ||
                    (building &&
                      build.showExperienceEntries &&
                      build.experienceEntriesP > 0)
                      ? 1
                      : 0,
                }}
              >
                <div
                  className={cn(
                    "space-y-5",
                    building && !showContent && "pointer-events-none"
                  )}
                >
                  <div className="space-y-2">
                    <h3 className="min-h-[1.5rem] text-base font-semibold tracking-tight text-foreground">
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
                      className="min-h-[1.25rem] text-sm text-muted-foreground"
                      style={{
                        opacity: preview?.companyLine ? 1 : 0,
                      }}
                    >
                      {preview?.companyLine || "\u00a0"}
                    </p>
                    <p
                      className="min-h-[1rem] text-xs tabular-nums text-muted-foreground sm:hidden"
                      style={{
                        opacity: preview?.duration ? 1 : 0,
                      }}
                    >
                      {preview?.duration || "\u00a0"}
                    </p>
                  </div>

                  <p className="min-h-[3rem] max-w-3xl text-sm leading-relaxed text-muted-foreground">
                    {preview?.description || "\u00a0"}
                  </p>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
