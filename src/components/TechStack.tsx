"use client";

import { useState } from "react";
import { technologies, techCategories } from "@/config/portfolio";

const categoryLabels = {
  language: "Languages",
  frontend: "Frontend",
  backend: "Backend",
  database: "Database",
  ai: "AI",
  devops: "DevOps",
  testing: "Testing",
  tools: "Tools",
};

export function TechStack() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredTechs =
    activeCategory === "all"
      ? technologies
      : technologies.filter((t) => t.category === activeCategory);

  return (
    <section className="py-12">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Tech Stack</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Tools I reach for, hover to explore.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {techCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeCategory === cat.id
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {filteredTechs.map((tech) => (
            <span
              key={tech.name}
              className="px-3 py-1.5 text-xs text-foreground bg-muted/50 border border-border rounded-md hover:bg-muted transition-colors"
              title={categoryLabels[tech.category as keyof typeof categoryLabels]}
            >
              {tech.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
