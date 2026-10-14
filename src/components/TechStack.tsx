import { technologies } from "@/config/portfolio";
import { techCategoryDotClass } from "@/lib/techColors";

export function TechStack() {
  return (
    <section className="border-t border-border py-12">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Tech Stack</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Tools I reach for day to day.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span
              key={tech.name}
              className="flex items-center gap-2 px-3 py-1.5 text-xs text-foreground bg-muted/50 border border-border rounded-md"
            >
              <span
                className={`h-2 w-2 shrink-0 rounded-full ${techCategoryDotClass(tech.category)}`}
                aria-hidden
              />
              {tech.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
