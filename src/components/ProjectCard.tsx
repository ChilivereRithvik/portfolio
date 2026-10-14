import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/config/portfolio";
import { Tag } from "@/components/ui/Tag";

type StatusBadgeProps = {
  status: Project["status"];
};

function ProjectStatusBadge({ status }: StatusBadgeProps) {
  const config = {
    live: {
      label: "Live",
      className:
        "bg-gradient-to-r from-rose-400 to-orange-500 text-white shadow-sm",
    },
    "open-source": {
      label: "Open Source",
      className:
        "border border-border bg-background text-foreground",
    },
    archived: {
      label: "Archived",
      className: "text-muted-foreground bg-muted/50",
    },
  };

  const cfg = config[status];

  return (
    <span
      className={`absolute top-4 right-4 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${cfg.className} transform rotate-0`}
    >
      {cfg.label}
    </span>
  );
}

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group relative border border-border rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200">
      <ProjectStatusBadge status={project.status} />

      <div className="aspect-[16/9] bg-muted/30 flex items-center justify-center overflow-hidden">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            width={600}
            height={340}
            unoptimized
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground/50">
            <svg
              width="120"
              height="120"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.3"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5-5 5" />
            </svg>
          </div>
        )}
      </div>

      <div className="p-5 space-y-3">
        <div>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {project.category}
          </span>
          <h3 className="text-lg font-semibold text-foreground mt-1">
            {project.title}
          </h3>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <Tag key={tech} variant="outline">
              {tech}
            </Tag>
          ))}
        </div>

        {project.links.live && (
          <a
            href={project.links.live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium text-foreground hover:underline"
          >
            Live Demo
            <ArrowUpRight className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  );
}

type ProjectGridProps = {
  projects: Project[];
};

export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
