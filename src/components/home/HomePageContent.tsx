"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Hero } from "@/components/Hero";
import { TechStack } from "@/components/TechStack";
import { HomeAgentBuild } from "@/components/home/HomeAgentBuild";
import { useHomeBuild } from "@/components/home/HomeBuildContext";
import { ExperienceList, experiences } from "@/components/Experience";
import { GitHubContributions } from "@/components/GitHubContributions";
import { BlogCard } from "@/components/BlogCard";
import { blogs } from "@/config/portfolio";
import { cn } from "@/lib/utils";

function LowerSections() {
  const build = useHomeBuild();

  return (
  <div
    className={cn(
      "ease-out",
      build.phase !== "building" && "transition-opacity duration-500",
      build.phase === "building" && "home-build-animated",
      build.showLowerSections
        ? "opacity-100"
        : "pointer-events-none opacity-0"
    )}
  >
    <div className="border-t border-border">
      <ExperienceList experiences={experiences} />
    </div>

    <div className="border-t border-border">
      <GitHubContributions />
    </div>

    <div className="-mx-4 border-t border-dashed border-border">
      <div className="flex items-center justify-between border-b border-dashed border-border px-6 py-8">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Writings</h2>
          <p className="mt-1 max-w-xl text-sm text-muted-foreground">
            Notes on what I build, break, and learn.
          </p>
        </div>
        <Link
          href="/blogs"
          className="flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          View All
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 [&>*]:border-b [&>*]:border-dashed [&>*]:border-border md:[&>*:nth-child(odd)]:border-r">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  </div>
  );
}

export function HomePageContent() {
  const heroShellRef = useRef<HTMLElement>(null);
  const heroPhotoRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroCopyRef = useRef<HTMLDivElement>(null);
  const heroLinksRef = useRef<HTMLDivElement>(null);
  const techSectionRef = useRef<HTMLElement>(null);
  const techHeadingRef = useRef<HTMLHeadingElement>(null);
  const techPillsRef = useRef<HTMLDivElement>(null);

  return (
    <HomeAgentBuild
      heroShellRef={heroShellRef}
      heroPhotoRef={heroPhotoRef}
      heroTitleRef={heroTitleRef}
      heroCopyRef={heroCopyRef}
      heroLinksRef={heroLinksRef}
      techSectionRef={techSectionRef}
      techHeadingRef={techHeadingRef}
      techPillsRef={techPillsRef}
    >
      <main className="pb-16">
        <div className="space-y-0">
          <Hero
            sectionRef={heroShellRef}
            photoRef={heroPhotoRef}
            titleRef={heroTitleRef}
            copyRef={heroCopyRef}
            linksRef={heroLinksRef}
          />

          <TechStack
            sectionRef={techSectionRef}
            headingRef={techHeadingRef}
            pillsRef={techPillsRef}
          />

          <LowerSections />
        </div>
      </main>
    </HomeAgentBuild>
  );
}
