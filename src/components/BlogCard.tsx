import Link from "next/link";
import { ArrowUpRight, Clock, Link2 } from "lucide-react";
import type { Blog } from "@/config/portfolio";

type BlogCardProps = {
  blog: Blog;
};

export function BlogCard({ blog }: BlogCardProps) {
  return (
    <Link
      href={blog.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col p-6 transition-colors hover:bg-muted/30"
    >
      <span className="mb-4 flex items-center gap-1.5 text-xs text-muted-foreground">
        <Clock className="h-3.5 w-3.5" />
        {blog.readTime}
      </span>

      <h3 className="text-base font-semibold leading-snug text-foreground group-hover:text-foreground/90">
        {blog.title}
      </h3>

      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
        {blog.excerpt}
      </p>

      <p className="mt-4 text-xs text-muted-foreground">
        {blog.tags.join(" · ")}
      </p>

      <span className="mt-auto flex items-center gap-1 pt-6 text-xs font-medium text-foreground">
        Read Article
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </Link>
  );
}

type WritingsHeaderProps = {
  showIcon?: boolean;
};

export function WritingsHeader({ showIcon = true }: WritingsHeaderProps) {
  return (
    <div className="border-b border-dashed border-border px-6 py-10">
      <div className="flex items-center gap-2">
        {showIcon && <Link2 className="h-4 w-4 text-muted-foreground" aria-hidden />}
        <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          Writings
        </h1>
      </div>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Deep dives into full-stack engineering, system design, data architectures, and
        practical insights learned while building scalable software.
      </p>
    </div>
  );
}
