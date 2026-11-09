import type { Project } from "@/config/portfolio";

export const PROJECTS_SUBTITLE =
  "Products I've contributed to professionally and individually.";

export const PROJECTS_EMPLOYER = "Zeto Studio";

export function projectContributionLabel(
  contribution: Project["contribution"]
): string {
  return contribution === "individual" ? "Individual" : "Professional";
}

export function formatProjectMeta(project: Project): string {
  return `${PROJECTS_EMPLOYER} · ${projectContributionLabel(project.contribution)}`;
}
