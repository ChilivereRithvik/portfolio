import { projects, type Project, experiences } from "@/config/portfolio";
import Link from "next/link";
import { use } from "react";

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.id,
  }));
}

function getProject(id: string): Project | null {
  return projects.find((p) => p.id === id) ?? null;
}

export default function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const project = getProject(slug);

  if (!project) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold">Project not found</h1>
        <Link href="/projects" className="text-sm text-muted-foreground hover:text-foreground">
          &larr; Back to projects
        </Link>
      </div>
    );
  }

  const experience = experiences.find((e) =>
    e.projects.some((p) => p.slug === project.id)
  );

  return (
    <article className="py-12">
      <div className="max-w-2xl mx-auto px-4">
        <Link
          href="/#projects"
          className="inline-block text-xs text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          &larr; Back to projects
        </Link>

        <div className="space-y-6">
          <div>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
              {project.category}
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-foreground mt-2">
              {project.title}
            </h1>
          </div>

          <p className="text-sm text-muted-foreground">
            {project.description}
          </p>

          <div className="space-y-2 mt-3">
            {project.achievements.map((ach, i) => (
              <p key={i} className="text-sm text-foreground">
                • {ach}
              </p>
            ))}
          </div>

          {project.metrics && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
              {project.metrics.map((m) => (
                <div key={m.label} className="border border-border rounded-lg p-3">
                  <div className="text-lg font-semibold text-foreground">{m.value}</div>
                  <div className="text-xs text-muted-foreground">{m.label}</div>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-border bg-muted/50 text-muted-foreground uppercase tracking-widest"
              >
                {tech}
              </span>
            ))}
          </div>

          {experience && (
            <div className="border-t border-border pt-4">
              <p className="text-xs text-muted-foreground">
                Worked on as part of{" "}
                <span className="text-foreground font-medium">
                  {experience.role} at {experience.company}
                </span>{" "}
                · {experience.duration}
              </p>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
