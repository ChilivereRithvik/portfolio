import type { CSSProperties } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/config/portfolio";
import { LiveRibbon } from "@/components/projects/LiveRibbon";
import { cn } from "@/lib/utils";

type ProjectShowcaseCardProps = {
  project: Project;
  className?: string;
  style?: CSSProperties;
};

function ProjectPreview({ project }: { project: Project }) {
  if (!project.image) {
    return (
      <div className="min-h-[220px] w-full rounded-xl bg-[#141414] md:min-h-[280px]" />
    );
  }

  return (
    <div className="relative min-h-[220px] w-full overflow-hidden rounded-xl bg-[#0a0a0a] md:min-h-[280px]">
      <Image
        src={project.image}
        alt={`${project.title} preview`}
        fill
        className="object-cover object-top"
        sizes="(max-width: 768px) 100vw, 50vw"
        unoptimized
      />
    </div>
  );
}

export function ProjectShowcaseCard({
  project,
  className,
  style,
}: ProjectShowcaseCardProps) {
  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-[#111111]",
        className
      )}
      style={style}
    >
      {project.status === "live" ? <LiveRibbon /> : null}

      <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <div className="flex flex-col justify-center gap-3 border-b border-white/10 p-6 md:border-b-0 md:border-r md:p-8 lg:p-10">
          <h2 className="text-2xl font-bold leading-tight tracking-tight text-white md:text-3xl">
            {project.title}
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-white/55 line-clamp-3">
            {project.description}
          </p>
          {project.links.live ? (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              Live site
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          ) : null}
        </div>

        <div className="bg-[#0a0a0a] p-5 md:p-6 lg:p-7">
          <ProjectPreview project={project} />
        </div>
      </div>
    </article>
  );
}
