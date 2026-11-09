import type { Experience } from "@/config/portfolio";
import { projects, experiences } from "@/config/portfolio";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export { experiences };

type ExperienceProps = {
  experience: Experience;
};

export function ExperienceProjectList({
  experience,
}: ExperienceProps) {
  if (experience.projects.length === 0) return null;

  return (
    <ul className="mt-1 flex flex-col gap-3">
      {experience.projects.map((proj) => {
        const fullProject = projects.find((p) => p.id === proj.slug);
        if (!fullProject) return null;

        return (
          <li key={proj.slug}>
            <Link
              href={`/projects/${fullProject.id}`}
              className="group flex flex-col gap-2 border border-dashed border-border p-4 transition-colors hover:bg-muted/25"
            >
              <span className="flex items-start justify-between gap-2">
                <span className="text-sm font-medium leading-snug text-foreground group-hover:text-foreground/90">
                  {fullProject.title}
                </span>
                <ArrowUpRight
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                  aria-hidden
                />
              </span>
              <span className="text-xs font-medium text-muted-foreground">
                {proj.category}
              </span>
              <p className="line-clamp-3 text-xs leading-relaxed text-muted-foreground">
                {fullProject.description}
              </p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function ExperienceEntryHeader({ experience }: ExperienceProps) {
  return (
    <header className="space-y-2">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
        <h3 className="text-base font-semibold tracking-tight text-foreground">
          {experience.role}
        </h3>
        <time className="text-xs tabular-nums text-muted-foreground sm:text-right">
          {experience.duration}
        </time>
      </div>
      <p className="text-sm text-muted-foreground">
        {experience.company}
        <span className="text-muted-foreground/60"> · </span>
        {experience.location}
      </p>
    </header>
  );
}

export function ExperienceEntry({ experience }: ExperienceProps) {
  return (
    <article className="space-y-4">
      <ExperienceEntryHeader experience={experience} />
      <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
        {experience.description}
      </p>
      <ExperienceProjectList experience={experience} />
    </article>
  );
}

type ExperienceListProps = {
  experiences: Experience[];
};

export function ExperienceList({ experiences }: ExperienceListProps) {
  return (
    <section id="experience" className="py-12">
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Experience</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Professional journey and key contributions.
          </p>
        </div>

        <div className="space-y-10">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className={index > 0 ? "border-t border-border pt-10" : undefined}
            >
              <ExperienceEntry experience={exp} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
