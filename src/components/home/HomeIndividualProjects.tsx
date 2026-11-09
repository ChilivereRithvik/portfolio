"use client";

import type { CSSProperties, ReactNode, RefObject } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useHomeBuild } from "@/components/home/HomeBuildContext";
import { formatProjectMeta } from "@/components/projects/projectsCopy";
import {
  ProjectThumbCornerBadge,
  projectThumbBadge,
} from "@/components/projects/ProjectThumbCornerBadge";
import {
  getHomeIndividualProjects,
  homeProjectHref,
} from "@/lib/homeIndividualProjects";
import { staggeredItemOpacity } from "@/components/home/homeBuildTimeline";
import { cn } from "@/lib/utils";

const SUBTITLE = "Independent builds outside client work.";

type HomeIndividualProjectsProps = {
  sectionRef: RefObject<HTMLElement | null>;
  gridRef: RefObject<HTMLDivElement | null>;
};

export function HomeIndividualProjects({
  sectionRef,
  gridRef,
}: HomeIndividualProjectsProps) {
  const build = useHomeBuild();
  const building = build.phase === "building";
  const items = getHomeIndividualProjects();

  const visible = build.showIndividualSection || build.phase === "complete";
  const sectionOpacity =
    build.phase === "complete"
      ? 1
      : !visible
        ? 0
        : build.individualLayoutP >= 1
          ? 1
          : build.individualLayoutReveal;

  const cardsReady =
    build.phase === "complete" ||
    (building && build.showIndividualCards && build.individualCardsP > 0);

  return (
    <section
      ref={sectionRef}
      aria-hidden={building && !visible ? true : undefined}
      className={cn(
        "home-build-animated border-t border-dashed border-border",
        building && !visible && "pointer-events-none border-transparent"
      )}
      style={{ opacity: sectionOpacity }}
    >
      <div className="space-y-6 px-4 py-10 md:px-6">
        <header className="space-y-1 border-b border-dashed border-border pb-6">
          <h2 className="min-h-[1.75rem] text-xl font-semibold text-foreground">
            {build.phase === "complete"
              ? "Individual"
              : build.typedIndividualHeading || "\u00a0"}
          </h2>
          <p
            className="text-sm text-muted-foreground"
            style={{
              opacity: build.phase === "complete" ? 1 : build.individualLayoutP,
            }}
          >
            {SUBTITLE}
          </p>
        </header>

        <div
          ref={gridRef}
          className={cn(
            "grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-6",
            building && !cardsReady && "pointer-events-none"
          )}
        >
          {items.map((project, index) => {
            const link = homeProjectHref(project);
            const thumbBadge = projectThumbBadge(project);
            const cardOpacity =
              build.phase === "complete"
                ? 1
                : cardsReady
                  ? staggeredItemOpacity(
                      build.individualCardsP,
                      index,
                      items.length
                    )
                  : 0;

            const inner = (
              <>
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md border border-dashed border-border bg-muted/20">
                  {thumbBadge ? (
                    <ProjectThumbCornerBadge
                      variant={thumbBadge.variant}
                      label={thumbBadge.label}
                    />
                  ) : null}
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt=""
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      unoptimized
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs font-medium text-muted-foreground">
                      {project.title.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1 space-y-2">
                  <h3 className="text-base font-semibold text-foreground group-hover:text-foreground/90">
                    {project.title}
                  </h3>
                  <p className="text-xs font-medium text-muted-foreground">
                    {formatProjectMeta(project)}
                  </p>
                  <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                </div>
              </>
            );

            const rowClass = cn(
              "group relative flex h-full flex-col gap-3 border border-dashed border-border p-4",
              link && "transition-colors hover:bg-muted/10"
            );

            return (
              <ProjectCardShell
                key={project.id}
                link={link}
                className={rowClass}
                style={{ opacity: cardOpacity }}
              >
                {inner}
              </ProjectCardShell>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProjectCardShell({
  link,
  className,
  style,
  children,
}: {
  link: { href: string; external: true } | null;
  className: string;
  style: CSSProperties;
  children: ReactNode;
}) {
  const shellClass = cn("home-build-animated block h-full", className);

  const arrow = link ? (
    <ArrowUpRight
      className="absolute right-3 top-3 h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
      aria-hidden
    />
  ) : null;

  if (link) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={shellClass}
        style={style}
        data-individual-project
      >
        {arrow}
        {children}
      </a>
    );
  }

  return (
    <div className={shellClass} style={style} data-individual-project>
      {children}
    </div>
  );
}
