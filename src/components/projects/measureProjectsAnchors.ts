import type { ProjectsAnchors } from "@/components/projects/projectsBuildTimeline";

export function measureProjectsAnchors(
  sectionEl: HTMLElement | null,
  titleEl: HTMLElement | null,
  cardEls: (HTMLElement | null)[]
): ProjectsAnchors | null {
  if (!sectionEl || !titleEl) return null;

  const section = sectionEl.getBoundingClientRect();
  const title = titleEl.getBoundingClientRect();

  const titleCaret = {
    x: title.right - 4,
    y: title.top + title.height * 0.55,
  };

  const cardRects = cardEls
    .filter((el): el is HTMLElement => el != null)
    .map((el) => {
      const r = el.getBoundingClientRect();
      return { x: r.left, y: r.top, w: r.width, h: r.height };
    });

  return {
    section: { x: section.left, y: section.top, w: section.width, h: section.height },
    sectionTL: { x: section.left + 8, y: section.top + 8 },
    sectionBR: {
      x: section.right - 8,
      y: section.bottom - 8,
    },
    titleCaret,
    cardRects,
  };
}
