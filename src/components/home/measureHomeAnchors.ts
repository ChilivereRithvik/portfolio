import type { HomeAnchors } from "@/components/home/homeBuildTimeline";

function toRect(el: DOMRect) {
  return {
    x: el.left,
    y: el.top,
    w: el.width,
    h: el.height,
  };
}

export function measureHomeAnchors(
  heroSection: HTMLElement | null,
  heroTitle: HTMLElement | null,
  heroLinks: HTMLElement | null,
  techSection: HTMLElement | null,
  techHeading: HTMLElement | null,
  techPills: HTMLElement | null
): HomeAnchors | null {
  if (!heroSection || !heroTitle || !heroLinks || !techSection || !techHeading || !techPills) {
    return null;
  }

  const hero = heroSection.getBoundingClientRect();
  const title = heroTitle.getBoundingClientRect();
  const links = heroLinks.getBoundingClientRect();
  const tech = techSection.getBoundingClientRect();
  const heading = techHeading.getBoundingClientRect();
  const pills = techPills.getBoundingClientRect();

  return {
    heroSection: toRect(hero),
    heroTitle: toRect(title),
    heroLinks: toRect(links),
    techSection: toRect(tech),
    techHeading: toRect(heading),
    techPills: toRect(pills),
    heroSectionTL: { x: hero.left + 8, y: hero.top + 8 },
    heroSectionBR: { x: hero.right - 12, y: hero.bottom - 12 },
    heroTitleCaret: {
      x: title.left + 12,
      y: title.top + title.height * 0.55,
    },
    heroLinksTL: { x: links.left, y: links.top },
    heroLinksBR: { x: links.right, y: links.bottom },
    techSectionTL: { x: tech.left + 8, y: tech.top + 8 },
    techSectionBR: { x: tech.right - 12, y: tech.bottom - 12 },
    techHeadingCaret: {
      x: heading.left + 8,
      y: heading.top + heading.height * 0.55,
    },
    techPillsTL: { x: pills.left, y: pills.top },
    techPillsBR: { x: pills.right, y: pills.bottom },
  };
}
