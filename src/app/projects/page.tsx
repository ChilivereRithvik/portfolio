import { projects } from "@/config/portfolio";
import { ProjectGrid } from "@/components/ProjectCard";
import Link from "next/link";

export const metadata = {
  title: "Projects",
  description: "A collection of development projects.",
};

export default function ProjectsPage() {
  return (
    <div className="py-16">
      <div className="max-w-2xl mx-auto px-4 space-y-6">
        <Link
          href="/"
          className="inline-block text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          &larr; Back to home
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          My Projects
        </h1>
        <p className="text-sm text-muted-foreground">
          A collection of projects I have built across enterprise EdTech, AI automation, healthcare, and more.
        </p>
        <ProjectGrid projects={projects} />
      </div>
    </div>
  );
}
