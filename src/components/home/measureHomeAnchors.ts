import type { HomeAnchors } from "@/components/home/homeBuildTimeline";
import type { AnchorRect } from "@/components/welcome/welcomeTaskTimeline";

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

function estimateExperienceBlock(techSection: DOMRect, experienceCount: number) {
  const top = techSection.bottom;
  const width = techSection.width;
  const headerH = 72;
  const bodyH = Math.max(448, experienceCount * 448);
  const sectionH = 96 + headerH + bodyH;
  const section = {
    left: techSection.left,
    top,
    right: techSection.right,
    bottom: top + sectionH,
    width,
    height: sectionH,
  } as DOMRect;
  const body = {
    left: techSection.left,
    top: top + 96 + headerH,
    right: techSection.right,
    bottom: top + 96 + headerH + bodyH,
    width,
    height: bodyH,
  } as DOMRect;
  return { section, body };
}

function estimateIndividualBlock(
  afterSection: DOMRect,
  projectCount: number
) {
  const top = afterSection.bottom;
  const width = afterSection.width;
  const headerH = 100;
  const cols = Math.min(2, projectCount);
  const rows = Math.ceil(projectCount / cols);
  const cardH = 320;
  const gridH = rows * cardH + Math.max(0, rows - 1) * 24;
  const sectionH = headerH + gridH + 80;
  const section = {
    left: afterSection.left,
    top,
    right: afterSection.right,
    bottom: top + sectionH,
    width,
    height: sectionH,
  } as DOMRect;
  const grid = {
    left: afterSection.left,
    top: top + headerH,
    right: afterSection.right,
    bottom: top + headerH + gridH,
    width,
    height: gridH,
  } as DOMRect;
  return { section, grid };
}

function estimateWritingsBlock(afterSection: DOMRect, writingsCount: number) {
  const top = afterSection.bottom;
  const width = afterSection.width;
  const headerH = 120;
  const rowH = 220;
  const rows = Math.max(1, Math.ceil(writingsCount / 2));
  const gridH = rows * rowH;
  const sectionH = headerH + gridH;
  const section = {
    left: afterSection.left,
    top,
    right: afterSection.right,
    bottom: top + sectionH,
    width,
    height: sectionH,
  } as DOMRect;
  const grid = {
    left: afterSection.left,
    top: top + headerH,
    right: afterSection.right,
    bottom: top + headerH + gridH,
    width,
    height: gridH,
  } as DOMRect;
  return { section, grid };
}

function estimateOffClockBlock(afterSection: DOMRect) {
  const top = afterSection.bottom;
  const width = afterSection.width;
  const headerH = 88;
  const bodyH = 280;
  const sectionH = headerH + bodyH + 80;
  const section = {
    left: afterSection.left,
    top,
    right: afterSection.right,
    bottom: top + sectionH,
    width,
    height: sectionH,
  } as DOMRect;
  const body = {
    left: afterSection.left,
    top: top + headerH,
    right: afterSection.right,
    bottom: top + headerH + bodyH,
    width,
    height: bodyH,
  } as DOMRect;
  return { section, body };
}

function estimateIndividualCardRects(
  grid: DOMRect,
  count: number
): AnchorRect[] {
  const cols = Math.min(2, count);
  const rows = Math.max(1, Math.ceil(count / cols));
  const cardW = grid.width / cols;
  const cardH = grid.height / rows;
  return Array.from({ length: count }, (_, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    return {
      x: grid.left + col * cardW,
      y: grid.top + row * cardH,
      w: cardW,
      h: cardH,
    };
  });
}

function measureIndividualCardRects(
  gridEl: HTMLElement | null,
  stable: boolean,
  count: number,
  gridFallback: DOMRect
): AnchorRect[] {
  if (!gridEl) {
    return estimateIndividualCardRects(gridFallback, count);
  }
  const cardEls = gridEl.querySelectorAll<HTMLElement>("[data-individual-project]");
  if (!stable && cardEls.length > 0) {
    return Array.from(cardEls).map((el) => {
      const r = el.getBoundingClientRect();
      return { x: r.left, y: r.top, w: r.width, h: r.height };
    });
  }
  const grid =
    gridEl.offsetHeight > 0 ? gridEl.getBoundingClientRect() : gridFallback;
  return estimateIndividualCardRects(grid, count);
}

function estimateExperienceEntryRects(
  body: DOMRect,
  experienceCount: number
): AnchorRect[] {
  const entryH = experienceCount > 0 ? body.height / experienceCount : body.height;
  return Array.from({ length: experienceCount }, (_, i) => ({
    x: body.left,
    y: body.top + i * entryH,
    w: body.width,
    h: entryH,
  }));
}

function measureExperienceEntryRects(
  experienceBody: HTMLElement | null,
  stable: boolean,
  experienceCount: number,
  bodyFallback: DOMRect
): AnchorRect[] {
  if (!experienceBody) {
    return estimateExperienceEntryRects(bodyFallback, experienceCount);
  }
  const entryEls =
    experienceBody.querySelectorAll<HTMLElement>("[data-experience-entry]");
  if (!stable && entryEls.length > 0) {
    return Array.from(entryEls).map((el) => {
      const r = el.getBoundingClientRect();
      return { x: r.left, y: r.top, w: r.width, h: r.height };
    });
  }
  const body =
    experienceBody.offsetHeight > 0
      ? experienceBody.getBoundingClientRect()
      : bodyFallback;
  return estimateExperienceEntryRects(body, experienceCount);
}

function estimateWritingCardRects(
  grid: DOMRect,
  writingsCount: number
): AnchorRect[] {
  const cols = 2;
  const rows = Math.max(1, Math.ceil(writingsCount / cols));
  const cardH = grid.height / rows;
  const cardW = grid.width / cols;
  return Array.from({ length: writingsCount }, (_, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    return {
      x: grid.left + col * cardW,
      y: grid.top + row * cardH,
      w: cardW,
      h: cardH,
    };
  });
}

function measureWritingCardRects(
  writingsGrid: HTMLElement | null,
  stable: boolean,
  writingsCount: number,
  gridFallback: DOMRect
): AnchorRect[] {
  if (!writingsGrid) {
    return estimateWritingCardRects(gridFallback, writingsCount);
  }
  const cardEls = writingsGrid.querySelectorAll<HTMLElement>("[data-writing-card]");
  if (!stable && cardEls.length > 0) {
    return Array.from(cardEls).map((el) => {
      const r = el.getBoundingClientRect();
      return { x: r.left, y: r.top, w: r.width, h: r.height };
    });
  }
  const grid =
    writingsGrid.offsetHeight > 0
      ? writingsGrid.getBoundingClientRect()
      : gridFallback;
  return estimateWritingCardRects(grid, writingsCount);
}

type MeasureHomeAnchorsOptions = {
  /** Lock overlay targets so layout shifts during the build do not move cursors/frames. */
  stableOverlay?: boolean;
  techCount?: number;
  experienceCount?: number;
  individualCount?: number;
  writingsCount?: number;
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
  experienceSection: HTMLElement | null,
  experienceBody: HTMLElement | null,
  individualSection: HTMLElement | null,
  individualGrid: HTMLElement | null,
  writingsSection: HTMLElement | null,
  writingsGrid: HTMLElement | null,
  offClockSection: HTMLElement | null,
  offClockBody: HTMLElement | null,
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
  const experienceCount = options?.experienceCount ?? 2;
  const individualCount = options?.individualCount ?? 2;
  const writingsCount = options?.writingsCount ?? 2;
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

  const expEst = estimateExperienceBlock(tech, experienceCount);
  const experience =
    stable || !experienceSection || experienceSection.offsetHeight <= 0
      ? expEst.section
      : experienceSection.getBoundingClientRect();
  const experienceContent =
    stable || !experienceBody || experienceBody.offsetHeight <= 0
      ? expEst.body
      : experienceBody.getBoundingClientRect();

  const indEst = estimateIndividualBlock(experience, individualCount);
  const individual =
    stable || !individualSection || individualSection.offsetHeight <= 0
      ? indEst.section
      : individualSection.getBoundingClientRect();
  const individualCards =
    stable || !individualGrid || individualGrid.offsetHeight <= 0
      ? indEst.grid
      : individualGrid.getBoundingClientRect();

  const writEst = estimateWritingsBlock(individual, writingsCount);
  const writings =
    stable || !writingsSection || writingsSection.offsetHeight <= 0
      ? writEst.section
      : writingsSection.getBoundingClientRect();
  const writingsCards =
    stable || !writingsGrid || writingsGrid.offsetHeight <= 0
      ? writEst.grid
      : writingsGrid.getBoundingClientRect();

  const offEst = estimateOffClockBlock(writings);
  const offClock =
    stable || !offClockSection || offClockSection.offsetHeight <= 0
      ? offEst.section
      : offClockSection.getBoundingClientRect();
  const offClockContent =
    stable || !offClockBody || offClockBody.offsetHeight <= 0
      ? offEst.body
      : offClockBody.getBoundingClientRect();

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
    experienceSection: toViewportRect(experience),
    experienceBody: toViewportRect(experienceContent),
    experienceSectionTL: point(experience.left + 8, experience.top + 8),
    experienceSectionBR: point(experience.right - 12, experience.bottom - 12),
    experienceBodyTL: point(experienceContent.left, experienceContent.top),
    experienceBodyBR: point(
      experienceContent.right,
      experienceContent.bottom
    ),
    writingsSection: toViewportRect(writings),
    writingsGrid: toViewportRect(writingsCards),
    writingsSectionTL: point(writings.left + 8, writings.top + 8),
    writingsSectionBR: point(writings.right - 12, writings.bottom - 12),
    writingsGridTL: point(writingsCards.left, writingsCards.top),
    writingsGridBR: point(writingsCards.right, writingsCards.bottom),
    writingsCardRects: measureWritingCardRects(
      writingsGrid,
      stable,
      writingsCount,
      writingsCards
    ),
    experienceEntryRects: measureExperienceEntryRects(
      experienceBody,
      stable,
      experienceCount,
      experienceContent
    ),
    individualSection: toViewportRect(individual),
    individualGrid: toViewportRect(individualCards),
    individualSectionTL: point(individual.left + 8, individual.top + 8),
    individualSectionBR: point(individual.right - 12, individual.bottom - 12),
    individualGridTL: point(individualCards.left, individualCards.top),
    individualGridBR: point(individualCards.right, individualCards.bottom),
    individualProjectCardRects: measureIndividualCardRects(
      individualGrid,
      stable,
      individualCount,
      individualCards
    ),
    offClockSection: toViewportRect(offClock),
    offClockBody: toViewportRect(offClockContent),
    offClockSectionTL: point(offClock.left + 8, offClock.top + 8),
    offClockSectionBR: point(offClock.right - 12, offClock.bottom - 12),
    offClockBodyTL: point(offClockContent.left, offClockContent.top),
    offClockBodyBR: point(offClockContent.right, offClockContent.bottom),
  };
}
