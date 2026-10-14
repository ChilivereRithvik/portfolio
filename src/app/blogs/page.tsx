import { blogs } from "@/config/portfolio";
import { BlogCard, WritingsHeader } from "@/components/BlogCard";

export default function BlogListingPage() {
  return (
    <div className="-mx-4 border-b border-dashed border-border">
      <WritingsHeader />
      <div className="grid grid-cols-1 md:grid-cols-2 [&>*]:border-b [&>*]:border-dashed [&>*]:border-border md:[&>*:nth-child(odd)]:border-r">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
}
