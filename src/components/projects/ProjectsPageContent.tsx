import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/config/portfolio";
import {
  PROJECTS_SUBTITLE,
  formatProjectMeta,
} from "@/components/projects/projectsCopy";
import {
  ProjectThumbCornerBadge,
  projectThumbBadge,
} from "@/components/projects/ProjectThumbCornerBadge";
import { cn } from "@/lib/utils";

/** Individual projects listed on /projects (after Agent Swarm UI). */
const INDIVIDUAL_PROJECT_ORDER = [
  "agent-swarm-ui",
  "telephony-voice-bot",
] as const;

function individualSortRank(id: string): number {
  const index = INDIVIDUAL_PROJECT_ORDER.indexOf(
    id as (typeof INDIVIDUAL_PROJECT_ORDER)[number]
  );
  return index === -1 ? INDIVIDUAL_PROJECT_ORDER.length : index;
}

function projectHref(
  project: Project
): { href: string; external: true } | null {
  if (project.links.live) {
    return { href: project.links.live, external: true };
  }
  if (project.links.github) {
    return { href: project.links.github, external: true };
  }
  return null;
}

function ProjectRow({ project }: { project: Project }) {
  const link = projectHref(project);
  const thumbBadge = projectThumbBadge(project);

  const content = (
    <>
      <div className="relative aspect-[16/10] w-full max-w-[280px] shrink-0 overflow-hidden rounded-md border border-dashed border-border bg-muted/20 sm:max-w-[320px] md:max-w-[360px]">
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
            sizes="(max-width: 640px) 280px, 360px"
            unoptimized
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs font-medium text-muted-foreground">
            {project.title.slice(0, 2).toUpperCase()}
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 items-start justify-between gap-4">
        <div className="min-w-0 space-y-2">
          <h2 className="text-lg font-semibold text-foreground group-hover:text-foreground/90">
            {project.title}
          </h2>
          <p className="text-xs font-medium text-muted-foreground">
            {formatProjectMeta(project)}
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>
        </div>
        {link ? (
          <ArrowUpRight
            className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
            aria-hidden
          />
        ) : null}
      </div>
    </>
  );

  const rowClass = cn(
    "group flex flex-col gap-4 py-8 transition-colors hover:bg-muted/15 sm:flex-row sm:items-start sm:gap-6",
    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-border"
  );

  if (link) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={rowClass}
      >
        {content}
      </a>
    );
  }

  return <div className={rowClass}>{content}</div>;
}

export function ProjectsPageContent() {
  return (
    <section className="border-t border-dashed border-border">
      <div className="px-4 py-8 md:px-6 md:py-10">
        <Link
          href="/"
          className="inline-block text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          &larr; Back to home
        </Link>

        <header className="mt-8 space-y-3 border-b border-dashed border-border pb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Projects
          </h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            {PROJECTS_SUBTITLE}
          </p>
        </header>

        <div className="divide-y divide-dashed divide-border border-b border-dashed border-border">
          {[...projects]
            .sort((a, b) => {
              if (a.contribution !== b.contribution) {
                return a.contribution === "individual" ? -1 : 1;
              }
              if (a.contribution === "individual") {
                return individualSortRank(a.id) - individualSortRank(b.id);
              }
              return 0;
            })
            .map((project) => (
              <ProjectRow key={project.id} project={project} />
            ))}
        </div>
      </div>
    </section>
  );
}
