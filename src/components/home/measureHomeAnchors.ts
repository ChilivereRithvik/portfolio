import type { HomeAnchors } from "@/components/home/homeBuildTimeline";

function toViewportRect(el: DOMRect) {
  return { x: el.left, y: el.top, w: el.width, h: el.height };
}

function point(x: number, y: number) {
  return { x, y };
}

function estimateHeroLinks(heroShell: DOMRect): DOMRect {
  const linkRowH = 72;
  const top = heroShell.bottom - linkRowH;
  return {
    left: heroShell.left,
    top,
    right: heroShell.right,
    bottom: heroShell.bottom,
    width: heroShell.width,
    height: linkRowH,
    x: heroShell.left,
    y: top,
    toJSON: () => ({}),
  } as DOMRect;
}

/** Reserve vertical space for wrapped pill rows (matches build-time DOM). */
export function estimateTechPillsHeight(techCount: number, sectionWidth: number) {
  const pillH = 32;
  const gap = 8;
  const avgPillW = 128;
  const perRow = Math.max(2, Math.floor(sectionWidth / avgPillW));
  const rows = Math.ceil(techCount / perRow);
  return rows * pillH + Math.max(0, rows - 1) * gap;
}

function estimateTechBlock(heroShell: DOMRect, techCount: number) {
  const top = heroShell.bottom;
  const width = heroShell.width;
  const pillsHeight = estimateTechPillsHeight(techCount, width);
  const sectionPadding = 96;
  const headingBlock = 52;
  const gap = 24;
  const sectionHeight = sectionPadding + headingBlock + gap + pillsHeight;

  return {
    section: {
      left: heroShell.left,
      top,
      right: heroShell.right,
      bottom: top + sectionHeight,
      width,
      height: sectionHeight,
    } as DOMRect,
    heading: {
      left: heroShell.left,
      top: top + 48,
      right: heroShell.right,
      bottom: top + 48 + headingBlock,
      width,
      height: headingBlock,
    } as DOMRect,
    pills: {
      left: heroShell.left,
      top: top + 48 + headingBlock + gap,
      right: heroShell.right,
      bottom: top + 48 + headingBlock + gap + pillsHeight,
      width,
      height: pillsHeight,
    } as DOMRect,
  };
}

type MeasureHomeAnchorsOptions = {
  /** Lock overlay targets so layout shifts during the build do not move cursors/frames. */
  stableOverlay?: boolean;
  techCount?: number;
};

function estimateHeroCopy(title: DOMRect): {
  copy: DOMRect;
  metaCaret: { x: number; y: number };
  emailTL: { x: number; y: number };
  emailBR: { x: number; y: number };
} {
  const metaY = title.bottom + 36;
  const emailY = metaY + 34;
  const emailH = 40;
  const copyH = title.height + 36 + 22 + 12 + emailH;
  const copy = {
    left: title.left,
    top: title.top,
    right: title.right,
    bottom: title.top + copyH,
    width: title.width,
    height: copyH,
    x: title.x,
    y: title.y,
    toJSON: () => ({}),
  } as DOMRect;
  return {
    copy,
    metaCaret: point(title.left + 12, metaY),
    emailTL: point(title.left, emailY),
    emailBR: point(title.right - 12, emailY + emailH),
  };
}

export function measureHomeAnchors(
  nav: HTMLElement | null,
  heroShell: HTMLElement | null,
  heroPhoto: HTMLElement | null,
  heroTitle: HTMLElement | null,
  heroCopy: HTMLElement | null,
  heroLinks: HTMLElement | null,
  techSection: HTMLElement | null,
  techHeading: HTMLElement | null,
  techPills: HTMLElement | null,
  options?: MeasureHomeAnchorsOptions
): HomeAnchors | null {
  if (!nav || !heroShell || !heroPhoto || !heroTitle) {
    return null;
  }

  const navBox = nav.getBoundingClientRect();
  const shell = heroShell.getBoundingClientRect();
  const photo = heroPhoto.getBoundingClientRect();
  const title = heroTitle.getBoundingClientRect();

  const techCount = options?.techCount ?? 1;
  const techEst = estimateTechBlock(shell, techCount);
  const stable = options?.stableOverlay ?? false;

  const tech = stable
    ? techEst.section
    : techSection && techSection.offsetHeight > 0
      ? techSection.getBoundingClientRect()
      : techEst.section;
  const heading = stable
    ? techEst.heading
    : techHeading && techHeading.offsetHeight > 0
      ? techHeading.getBoundingClientRect()
      : techEst.heading;
  const pills = stable
    ? techEst.pills
    : techPills && techPills.offsetHeight > 0
      ? techPills.getBoundingClientRect()
      : techEst.pills;

  const linksBox = stable
    ? estimateHeroLinks(shell)
    : heroLinks && heroLinks.offsetHeight > 0
      ? heroLinks.getBoundingClientRect()
      : estimateHeroLinks(shell);

  const linksRect = toViewportRect(linksBox);

  const copyEst = estimateHeroCopy(title);
  const copyBox =
    stable || !heroCopy || heroCopy.offsetHeight <= 0
      ? copyEst.copy
      : heroCopy.getBoundingClientRect();
  const emailEl = !stable ? heroCopy?.querySelector<HTMLElement>("[data-hero-email]") : null;
  const emailBox = emailEl?.getBoundingClientRect();
  const emailTL = emailBox
    ? point(emailBox.left + 8, emailBox.top + emailBox.height * 0.5)
    : copyEst.emailTL;
  const emailBR = emailBox
    ? point(emailBox.right - 8, emailBox.top + emailBox.height * 0.5)
    : copyEst.emailBR;
  const metaLine = !stable ? heroCopy?.querySelector<HTMLElement>("[data-hero-meta]") : null;
  const metaBox = metaLine?.getBoundingClientRect();
  const metaCaret = metaBox
    ? point(metaBox.left + 8, metaBox.top + metaBox.height * 0.55)
    : copyEst.metaCaret;

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
    heroCopy: toViewportRect(copyBox),
    heroMetaCaret: metaCaret,
    heroEmailTL: emailTL,
    heroEmailBR: emailBR,
    heroLinksTL: point(linksBox.left, linksBox.top),
    heroLinksBR: point(linksBox.right, linksBox.bottom),
    techSectionTL: point(tech.left + 8, tech.top + 8),
    techSectionBR: point(tech.right - 12, tech.bottom - 12),
    techPillsTL: point(pills.left, pills.top),
    techPillsBR: point(pills.right, pills.bottom),
  };
}
