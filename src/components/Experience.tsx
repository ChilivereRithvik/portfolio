import type { Experience } from "@/config/portfolio";
import { projects, experiences } from "@/config/portfolio";
import { Tag } from "@/components/ui/Tag";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { TechIcon } from "@/lib/techIcons";
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

      <div className="space-y-4 mt-3">
        {experience.projects.map((proj) => {
          const fullProject = projects.find((p) => p.id === proj.slug);
          return (
            <div key={proj.slug} className="space-y-2">
              {fullProject && (
                <>
                  <Link href={`/projects/${fullProject.id}`}>
                    <div className="flex items-center gap-2">
                      <Tag variant="outline">{fullProject.title}</Tag>
                      <StatusBadge status={
                        fullProject.status === "live"
                          ? "live"
                          : fullProject.status === "open-source"
                            ? "experimenting"
                            : "archived"
                      }>
                        {fullProject.status === "live"
                          ? "Live"
                          : fullProject.status === "open-source"
                            ? "Open Source"
                            : "Archived"}
                      </StatusBadge>
                    </div>
                  </Link>

                  <p className="text-xs text-muted-foreground">
                    {fullProject.description}
                  </p>

                  {fullProject.achievements.length > 0 && (
                    <ul className="list-none space-y-0.5">
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

                  {fullProject.metrics && fullProject.metrics.length > 0 && (
                    <div className="flex flex-wrap gap-3 mt-1.5">
                      {fullProject.metrics.map((m) => (
                        <div key={m.label} className="flex flex-col">
                          <span className="text-sm font-semibold text-foreground">
                            {m.value}
                          </span>
                          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                            {m.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1.5">
                    {fullProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-medium text-foreground bg-muted/50 border border-border rounded-md"
                      >
                        <TechIcon name={tech} />
                        {tech}
                      </span>
                    ))}
                  </div>
                </>
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
