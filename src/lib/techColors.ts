import type { Technology } from "@/config/portfolio";

const categoryDotColors: Record<Technology["category"], string> = {
  language: "bg-sky-500",
  frontend: "bg-violet-500",
  backend: "bg-amber-500",
  database: "bg-emerald-500",
  ai: "bg-rose-500",
  testing: "bg-orange-500",
  devops: "bg-cyan-500",
  tools: "bg-slate-500",
};

export function techCategoryDotClass(category: Technology["category"]) {
  return categoryDotColors[category];
}
