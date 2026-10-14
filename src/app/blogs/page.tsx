import { blogs } from "@/config/portfolio";
import Link from "next/link";
import { Clock } from "lucide-react";
import { Tag } from "@/components/ui/Tag";
import { Card } from "@/components/ui/Card";

export default function BlogListingPage() {
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
          Blog
        </h1>
        <p className="text-sm text-muted-foreground">
          Notes on what I build, break, and learn.
        </p>
        <Card className="border border-border">
          <div className="divide-y divide-border">
            {blogs.map((blog) => (
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
  );
}
