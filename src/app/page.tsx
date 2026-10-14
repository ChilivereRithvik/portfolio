import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { Hero } from "@/components/Hero";
import { TechStack } from "@/components/TechStack";
import { ExperienceList, experiences } from "@/components/Experience";
import { GitHubContributions } from "@/components/GitHubContributions";
import { Tag } from "@/components/ui/Tag";
import { Card } from "@/components/ui/Card";
import { blogs } from "@/config/portfolio";

export default function Home() {
  return (
    <main className="pb-16">
      <div className="max-w-2xl mx-auto px-4 space-y-0">
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

        <div className="border-t border-border py-12">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-foreground">My Blogs</h2>
                <p className="text-sm text-muted-foreground mt-1">
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

            <Card className="border border-border">
              <div className="divide-y divide-border">
                {blogs.slice(0, 3).map((blog) => (
                  <Link
                    key={blog.id}
                    href={blog.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 hover:bg-muted/30 transition-colors group"
                  >
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {blog.readTime}
                      </span>
                    </div>
                    <h3 className="text-sm font-medium text-foreground group-hover:text-foreground/80 mb-1 line-clamp-1">
                      {blog.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {blog.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {blog.tags.map((tag) => (
                        <Tag key={tag} variant="outline">
                          {tag}
                        </Tag>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
