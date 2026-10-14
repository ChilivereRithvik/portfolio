import { blogs, type Blog } from "@/config/portfolio";
import Link from "next/link";
import { Clock } from "lucide-react";
import { Tag } from "@/components/ui/Tag";
import { use } from "react";

export async function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.id,
  }));
}

function getBlog(id: string): Blog | null {
  return blogs.find((b) => b.id === id) ?? null;
}

export default function BlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const blog = getBlog(slug);

  if (!blog) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold">Blog not found</h1>
      </div>
    );
  }

  return (
    <article className="py-12">
      <div className="max-w-2xl mx-auto px-4">
        <Link
          href="/blogs"
          className="inline-block text-xs text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          &larr; Back to blogs
        </Link>

        <div className="space-y-6">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>{blog.readTime}</span>
            <span>·</span>
            <time dateTime={blog.date}>{blog.date}</time>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {blog.title}
          </h1>

          <div className="flex flex-wrap gap-1.5">
            {blog.tags.map((tag) => (
              <Tag key={tag} variant="outline">
                {tag}
              </Tag>
            ))}
          </div>

          <p className="text-sm text-muted-foreground">{blog.excerpt}</p>

          <div className="border border-border rounded-lg p-6 bg-muted/10">
            <p className="text-xs text-muted-foreground">
              This article is hosted on{" "}
              <a
                href="https://medium.com/@rithvik-zeto"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground"
              >
                Medium
              </a>
              .{" "}
              <a
                href={blog.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground"
              >
                Read the full article
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
