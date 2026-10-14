import type { Experience } from "@/config/portfolio";
import { projects, experiences } from "@/config/portfolio";
import { Tag } from "@/components/ui/Tag";
import Link from "next/link";

export { experiences };

type ExperienceProps = {
  experience: Experience;
};

export function ExperienceEntry({ experience }: ExperienceProps) {
  return (
    <div className="space-y-3">
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

      <div className="space-y-2 mt-3">
        {experience.projects.map((proj) => {
          const fullProject = projects.find(
            (p) => p.id === proj.slug
          );
          return (
            <div key={proj.slug} className="space-y-1.5">
              <Link
                href={`/projects/${proj.slug}`}
                className="text-xs font-medium text-foreground hover:text-muted-foreground transition-colors"
              >
                <Tag variant="outline">{proj.title}</Tag>
              </Link>
              {fullProject && (
                <ul className="list-none space-y-1">
                  {fullProject.achievements.slice(0, 4).map((ach, i) => (
                    <li
                      key={i}
                      className="text-xs text-muted-foreground"
                    >
                      • {ach}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

type ExperienceListProps = {
  experiences: Experience[];
};

export function ExperienceList({ experiences }: ExperienceListProps) {
  return (
    <section className="py-12">
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Experience</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Professional journey and key contributions.
          </p>
        </div>

        {experiences.map((exp, i) => (
          <div key={exp.id} className={i > 0 ? "border-t border-border pt-6" : ""}>
            <ExperienceEntry experience={exp} />
          </div>
        ))}
      </div>
    </section>
  );
}
