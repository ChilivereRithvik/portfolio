import type { Experience } from "@/config/portfolio";
import { projects, experiences } from "@/config/portfolio";
import Link from "next/link";

export { experiences };

type ExperienceProps = {
  experience: Experience;
};

export function ExperienceEntry({ experience }: ExperienceProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-foreground">
          {experience.role}
        </h3>
        <p className="text-sm text-muted-foreground mt-0.5">
          {experience.company} · {experience.location}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {experience.duration}
        </p>
      </div>

      <p className="text-sm text-muted-foreground">{experience.description}</p>

      <ul className="space-y-3 mt-2">
        {experience.projects.map((proj) => {
          const fullProject = projects.find((p) => p.id === proj.slug);
          if (!fullProject) return null;

          return (
            <li key={proj.slug} className="space-y-1">
              <Link
                href={`/projects/${fullProject.id}`}
                className="text-sm font-medium text-foreground hover:text-foreground/80 transition-colors"
              >
                {fullProject.title}
              </Link>
              <p className="text-xs text-muted-foreground">
                {proj.category}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {fullProject.description}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
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
          <p className="text-sm text-muted-foreground mt-1">
            Professional journey and key contributions.
          </p>
        </div>

        {experiences.map((exp, i) => (
          <div
            key={exp.id}
            className={i > 0 ? "border-t border-border pt-6" : ""}
          >
            <ExperienceEntry experience={exp} />
          </div>
        ))}
      </div>
    </section>
  );
}
