"use client";

import type { RefObject } from "react";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import type { Blog } from "@/config/portfolio";
import { useHomeBuild } from "@/components/home/HomeBuildContext";
import { staggeredItemOpacity } from "@/components/home/homeBuildTimeline";
import { cn } from "@/lib/utils";

type HomeWritingsProps = {
  sectionRef: RefObject<HTMLElement | null>;
  gridRef: RefObject<HTMLDivElement | null>;
  blogs: Blog[];
};

export function HomeWritings({
  sectionRef,
  gridRef,
  blogs,
}: HomeWritingsProps) {
  const build = useHomeBuild();
  const building = build.phase === "building";
  const visible = build.showWritingsSection || build.phase === "complete";

  const sectionOpacity =
    build.phase === "complete"
      ? 1
      : !visible
        ? 0
        : build.writingsLayoutP >= 1
          ? 1
          : build.writingsLayoutReveal;

  return (
    <section
      ref={sectionRef}
      aria-hidden={building && !visible ? true : undefined}
      className={cn(
        "-mx-4 border-t border-dashed border-border home-build-animated",
        building && !visible && "pointer-events-none"
      )}
      style={{ opacity: sectionOpacity }}
    >
      <div className="flex items-center justify-between border-b border-dashed border-border px-6 py-8">
        <div>
          <h2 className="min-h-[1.75rem] text-xl font-semibold text-foreground">
            {build.phase === "complete"
              ? "Writings"
              : build.typedWritingsHeading || "\u00a0"}
          </h2>
          <p
            className="mt-1 min-h-[1.25rem] max-w-xl text-sm text-muted-foreground"
            style={{
              opacity: build.phase === "complete" ? 1 : build.writingsLayoutP,
            }}
          >
            Notes on what I build, break, and learn.
          </p>
        </div>
        <Link
          href="/blogs"
          className="flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          style={{
            opacity: build.phase === "complete" ? 1 : build.writingsLayoutP,
          }}
        >
          View All
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <div
        ref={gridRef}
        className="grid min-h-[18rem] grid-cols-1 md:grid-cols-2 [&>*]:border-b [&>*]:border-dashed [&>*]:border-border md:[&>*:nth-child(odd)]:border-r"
      >
        {blogs.map((blog, index) => {
          const preview = build.writingsCardPreviews[index];
          const borderAlpha =
            building &&
            build.showWritingsCards &&
            build.writingsCardsP < 1
              ? staggeredItemOpacity(
                  build.writingsCardsP,
                  index,
                  blogs.length
                )
              : 0;

          const showContent = build.phase === "complete" || build.showWritingsContent;
          const title =
            build.phase === "complete" ? blog.title : preview?.title || "\u00a0";
          const excerpt =
            build.phase === "complete" ? blog.excerpt : preview?.excerpt || "";

          return (
            <div
              key={blog.id}
              data-writing-card
              className="home-build-animated relative min-h-[14rem]"
              style={{
                boxShadow:
                  borderAlpha > 0
                    ? `inset 0 0 0 1px rgba(192, 132, 252, ${borderAlpha})`
                    : undefined,
              }}
            >
              <Link
                href={blog.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group flex h-full flex-col p-6 transition-colors hover:bg-muted/30",
                  building && !showContent && "pointer-events-none"
                )}
              >
                <span
                  className="mb-4 flex min-h-[1.25rem] items-center gap-1.5 text-xs text-muted-foreground"
                  style={{
                    opacity:
                      build.phase === "complete" || preview?.showMeta ? 1 : 0,
                  }}
                >
                  <Clock className="h-3.5 w-3.5" />
                  {blog.readTime}
                </span>

                <h3 className="min-h-[2.5rem] text-base font-semibold leading-snug text-foreground group-hover:text-foreground/90">
                  {title}
                  {building &&
                  build.showWritingsContent &&
                  build.writingsContentP < 1 &&
                  preview?.title &&
                  preview.title.length < blog.title.length ? (
                    <span className="welcome-type-caret ml-0.5 inline-block h-[1em] w-0.5 translate-y-0.5 bg-foreground align-middle" />
                  ) : null}
                </h3>

                <p className="mt-2 min-h-[3.75rem] line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                  {excerpt || "\u00a0"}
                </p>

                <p
                  className="mt-4 text-xs text-muted-foreground"
                  style={{
                    opacity:
                      build.phase === "complete" || preview?.showMeta ? 1 : 0,
                  }}
                >
                  {blog.tags.join(" · ")}
                </p>

                <span
                  className="mt-auto flex items-center gap-1 pt-6 text-xs font-medium text-foreground"
                  style={{
                    opacity:
                      build.phase === "complete" || preview?.showMeta ? 1 : 0,
                  }}
                >
                  Read Article
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
