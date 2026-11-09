import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/config/portfolio";
import { LiveRibbon } from "@/components/projects/LiveRibbon";
import { cn } from "@/lib/utils";

type ProjectShowcaseCardProps = {
  project: Project;
  className?: string;
  style?: CSSProperties;
};

function ProjectPreviewMock({ project }: { project: Project }) {
  return (
    <div className="flex h-full min-h-[220px] flex-col overflow-hidden rounded-xl border border-white/10 bg-[#141414] shadow-2xl md:min-h-[300px]">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="ml-2 truncate text-[10px] text-white/40">
          {project.id}.app
        </span>
      </div>
      {project.image ? (
        <div className="relative min-h-[180px] flex-1 bg-[#f4f4f5] md:min-h-[240px]">
          <Image
            src={project.image}
            alt={`${project.title} product preview`}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 50vw"
            unoptimized
          />
        </div>
      ) : (
      <div className="relative flex flex-1 flex-col justify-between p-5">
        <div className="space-y-3">
          <div className="h-2 w-3/4 rounded-full bg-white/10" />
          <div className="h-2 w-full rounded-full bg-white/10" />
          <div className="h-2 w-5/6 rounded-full bg-white/10" />
        </div>
        <div className="mt-6 grid grid-cols-2 gap-2">
          <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-[10px] font-medium text-emerald-300/90">
            {project.category.split(" ")[0]}
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[10px] text-white/50">
            Product UI
          </div>
        </div>
      </div>
      )}
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
        <div className="flex flex-col justify-center gap-4 border-b border-white/10 p-6 md:border-b-0 md:border-r md:p-8 lg:p-10">
          <span className="inline-flex w-fit rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
            {project.category}
          </span>
          <h2 className="text-2xl font-bold leading-tight tracking-tight text-white md:text-3xl">
            {project.title}
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-white/55 line-clamp-3">
            {project.description}
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link
              href={`/projects/${project.id}`}
              className="inline-flex items-center gap-1.5 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-[#0a0a0a] transition-colors hover:bg-white/90"
            >
              View project
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            {project.links.live ? (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-4 py-2.5 text-sm font-medium text-white/80 transition-colors hover:border-white/30 hover:text-white"
              >
                Live demo
              </a>
            ) : null}
          </div>
        </div>

        <div className="bg-[#0a0a0a] p-5 md:p-7 lg:p-8">
          <ProjectPreviewMock project={project} />
        </div>
      </div>
    </article>
  );
}
