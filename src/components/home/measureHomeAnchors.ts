import type { HomeAnchors } from "@/components/home/homeBuildTimeline";

function toViewportRect(el: DOMRect) {
  return { x: el.left, y: el.top, w: el.width, h: el.height };
}

function point(x: number, y: number) {
  return { x, y };
}

function estimateHeroLinks(heroShell: DOMRect): DOMRect {
  const top = heroShell.bottom - 72;
  return {
    left: heroShell.left,
    top,
    right: heroShell.right,
    bottom: heroShell.bottom,
    width: heroShell.width,
    height: 72,
    x: heroShell.left,
    y: top,
    toJSON: () => ({}),
  } as DOMRect;
}

function estimateTechBlock(heroShell: DOMRect) {
  const top = heroShell.bottom + 24;
  return {
    section: {
      left: heroShell.left,
      top,
      right: heroShell.right,
      bottom: top + 220,
      width: heroShell.width,
      height: 220,
    } as DOMRect,
    heading: {
      left: heroShell.left,
      top,
      right: heroShell.right,
      bottom: top + 32,
      width: heroShell.width,
      height: 32,
    } as DOMRect,
    pills: {
      left: heroShell.left,
      top: top + 48,
      right: heroShell.right,
      bottom: top + 180,
      width: heroShell.width,
      height: 132,
    } as DOMRect,
  };
}

export function measureHomeAnchors(
  nav: HTMLElement | null,
  heroShell: HTMLElement | null,
  heroPhoto: HTMLElement | null,
  heroTitle: HTMLElement | null,
  heroLinks: HTMLElement | null,
  techSection: HTMLElement | null,
  techHeading: HTMLElement | null,
  techPills: HTMLElement | null
): HomeAnchors | null {
  if (!nav || !heroShell || !heroPhoto || !heroTitle) {
    return null;
  }

  const navBox = nav.getBoundingClientRect();
  const shell = heroShell.getBoundingClientRect();
  const photo = heroPhoto.getBoundingClientRect();
  const title = heroTitle.getBoundingClientRect();

  const techEst = estimateTechBlock(shell);
  const tech =
    techSection && techSection.offsetHeight > 0
      ? techSection.getBoundingClientRect()
      : techEst.section;
  const heading =
    techHeading && techHeading.offsetHeight > 0
      ? techHeading.getBoundingClientRect()
      : techEst.heading;
  const pills =
    techPills && techPills.offsetHeight > 0
      ? techPills.getBoundingClientRect()
      : techEst.pills;

  const linksBox =
    heroLinks && heroLinks.offsetHeight > 0
      ? heroLinks.getBoundingClientRect()
      : estimateHeroLinks(shell);

  const linksRect = toViewportRect(linksBox);

  return {
    nav: toViewportRect(navBox),
    heroShell: toViewportRect(shell),
    heroPhoto: toViewportRect(photo),
    heroTitle: toViewportRect(title),
    heroLinks: linksRect,
    techSection: toViewportRect(tech),
    techHeading: toViewportRect(heading),
    techPills: toViewportRect(pills),
    navTL: point(navBox.left + 6, navBox.top + 6),
    navBR: point(navBox.right - 6, navBox.bottom - 6),
    heroShellTL: point(shell.left + 4, shell.top + 4),
    heroShellBR: point(shell.right - 4, shell.bottom - 4),
    heroPhotoTL: point(photo.left + 4, photo.top + 4),
    heroPhotoBR: point(photo.right - 4, photo.bottom - 4),
    heroTitleCaret: point(title.left + 12, title.top + title.height * 0.55),
    heroLinksTL: point(linksBox.left, linksBox.top),
    heroLinksBR: point(linksBox.right, linksBox.bottom),
    techSectionTL: point(tech.left + 8, tech.top + 8),
    techSectionBR: point(tech.right - 12, tech.bottom - 12),
    techPillsTL: point(pills.left, pills.top),
    techPillsBR: point(pills.right, pills.bottom),
  };
}
