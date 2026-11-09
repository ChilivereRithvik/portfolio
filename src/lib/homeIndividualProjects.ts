import {
  HOME_INDIVIDUAL_PROJECT_IDS,
  projects,
  type Project,
} from "@/config/portfolio";

export function getHomeIndividualProjects(): Project[] {
  const order = new Map(
    HOME_INDIVIDUAL_PROJECT_IDS.map((id, index) => [id, index])
  );
  return projects
    .filter((p) => order.has(p.id as (typeof HOME_INDIVIDUAL_PROJECT_IDS)[number]))
    .sort(
      (a, b) =>
        (order.get(a.id as (typeof HOME_INDIVIDUAL_PROJECT_IDS)[number]) ?? 0) -
        (order.get(b.id as (typeof HOME_INDIVIDUAL_PROJECT_IDS)[number]) ?? 0)
    );
}

export function homeProjectHref(
  project: Project
): { href: string; external: true } | null {
  if (project.links.live) {
    return { href: project.links.live, external: true };
  }
  if (project.links.github) {
    return { href: project.links.github, external: true };
  }
  return null;
}
