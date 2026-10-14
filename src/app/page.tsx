import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Hero } from "@/components/Hero";
import { TechStack } from "@/components/TechStack";
import { ExperienceList, experiences } from "@/components/Experience";
import { GitHubContributions } from "@/components/GitHubContributions";
import { BlogCard } from "@/components/BlogCard";
import { blogs } from "@/config/portfolio";

export default function Home() {
  return (
    <main className="pb-16">
      <div className="space-y-0">
        <Hero />

        <div className="border-t border-border">
          <TechStack />
        </div>

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
              <p className="text-sm text-muted-foreground mt-1 max-w-xl">
                Notes on what I build, break, and learn.
              </p>
            </div>
            <Link
              href="/blogs"
              className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              View All
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 [&>*]:border-b [&>*]:border-dashed [&>*]:border-border md:[&>*:nth-child(odd)]:border-r">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
