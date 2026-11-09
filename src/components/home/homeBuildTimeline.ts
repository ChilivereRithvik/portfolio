import {
  HOME_INDIVIDUAL_PROJECT_IDS,
  offTheClock,
  personalInfo,
  type Blog,
  type Experience,
} from "@/config/portfolio";
import {
  easeOutCubic,
  type AnchorRect,
} from "@/components/welcome/welcomeTaskTimeline";

export const HERO_HEADING = `Hey Hi, I'm ${personalInfo.displayName}!`;
export const HERO_META_LINE = `${personalInfo.title} · ${personalInfo.location}`;
export const TECH_HEADING = "Tech Stack";
export const EXPERIENCE_HEADING = "Experience";
export const WRITINGS_HEADING = "Writings";
export const HOME_PROJECTS_HEADING = "Projects";
export const OFF_CLOCK_HEADING = offTheClock.title;

const HERO_TYPE_CHAR_TOTAL =
  HERO_HEADING.length + HERO_META_LINE.length;

export function splitHeroTypeProgress(heroTypeP: number) {
  if (heroTypeP <= 0) {
    return {
      typedHeroTitle: "",
      typedHeroMeta: "",
      showHeroEmail: false,
      showHeroMetaBlock: false,
    };
  }
  if (heroTypeP >= 1) {
    return {
      typedHeroTitle: HERO_HEADING,
      typedHeroMeta: HERO_META_LINE,
      showHeroEmail: true,
      showHeroMetaBlock: true,
    };
  }

  const typedCount = Math.floor(heroTypeP * HERO_TYPE_CHAR_TOTAL);
  const showHeroMetaBlock = typedCount > HERO_HEADING.length;
  const showHeroEmail = heroTypeP >= 0.93;

  if (typedCount <= HERO_HEADING.length) {
    return {
      typedHeroTitle: HERO_HEADING.slice(0, typedCount),
      typedHeroMeta: "",
      showHeroEmail: false,
      showHeroMetaBlock: false,
    };
  }

  return {
    typedHeroTitle: HERO_HEADING,
    typedHeroMeta: HERO_META_LINE.slice(0, typedCount - HERO_HEADING.length),
    showHeroEmail,
    showHeroMetaBlock: true,
  };
}

export type HomeAgentId =
  | "nav-layout"
  | "hero-shell"
  | "hero-photo"
  | "hero-type"
  | "hero-links"
  | "tech-layout"
  | "tech-ui"
  | "experience-layout"
  | "experience-entries"
  | "experience-content"
  | "individual-layout"
  | "individual-cards"
  | "writings-layout"
  | "writings-cards"
  | "writings-content"
  | "offclock-layout"
  | "offclock-content";

export type HomeAnchors = {
  nav: AnchorRect;
  heroShell: AnchorRect;
  heroPhoto: AnchorRect;
  heroTitle: AnchorRect;
  heroLinks: AnchorRect;
  techSection: AnchorRect;
  techHeading: AnchorRect;
  techPills: AnchorRect;
  navTL: { x: number; y: number };
  navBR: { x: number; y: number };
  heroShellTL: { x: number; y: number };
  heroShellBR: { x: number; y: number };
  heroPhotoTL: { x: number; y: number };
  heroPhotoBR: { x: number; y: number };
  heroTitleCaret: { x: number; y: number };
  heroCopy: AnchorRect;
  heroMetaCaret: { x: number; y: number };
  heroEmailTL: { x: number; y: number };
  heroEmailBR: { x: number; y: number };
  heroLinksTL: { x: number; y: number };
  heroLinksBR: { x: number; y: number };
  techSectionTL: { x: number; y: number };
  techSectionBR: { x: number; y: number };
  techPillsTL: { x: number; y: number };
  techPillsBR: { x: number; y: number };
  experienceSection: AnchorRect;
  experienceBody: AnchorRect;
  experienceSectionTL: { x: number; y: number };
  experienceSectionBR: { x: number; y: number };
  experienceBodyTL: { x: number; y: number };
  experienceBodyBR: { x: number; y: number };
  experienceEntryRects: AnchorRect[];
  individualSection: AnchorRect;
  individualGrid: AnchorRect;
  individualSectionTL: { x: number; y: number };
  individualSectionBR: { x: number; y: number };
  individualGridTL: { x: number; y: number };
  individualGridBR: { x: number; y: number };
  individualProjectCardRects: AnchorRect[];
  writingsSection: AnchorRect;
  writingsGrid: AnchorRect;
  writingsSectionTL: { x: number; y: number };
  writingsSectionBR: { x: number; y: number };
  writingsGridTL: { x: number; y: number };
  writingsGridBR: { x: number; y: number };
  writingsCardRects: AnchorRect[];
  offClockSection: AnchorRect;
  offClockBody: AnchorRect;
  offClockSectionTL: { x: number; y: number };
  offClockSectionBR: { x: number; y: number };
  offClockBodyTL: { x: number; y: number };
  offClockBodyBR: { x: number; y: number };
};

function shiftPoint(p: { x: number; y: number }, dy: number) {
  return { x: p.x, y: p.y - dy };
}

function shiftRect(r: AnchorRect, dy: number): AnchorRect {
  return { x: r.x, y: r.y - dy, w: r.w, h: r.h };
}

/** Viewport-anchor snapshot taken at `baselineScrollY`; pass `window.scrollY - baseline`. */
export function shiftHomeAnchorsForScroll(
  anchors: HomeAnchors,
  scrollDelta: number
): HomeAnchors {
  if (scrollDelta === 0) return anchors;
  const s = (r: AnchorRect) => shiftRect(r, scrollDelta);
  const p = (pt: { x: number; y: number }) => shiftPoint(pt, scrollDelta);
  return {
    nav: s(anchors.nav),
    heroShell: s(anchors.heroShell),
    heroPhoto: s(anchors.heroPhoto),
    heroTitle: s(anchors.heroTitle),
    heroLinks: s(anchors.heroLinks),
    techSection: s(anchors.techSection),
    techHeading: s(anchors.techHeading),
    techPills: s(anchors.techPills),
    navTL: p(anchors.navTL),
    navBR: p(anchors.navBR),
    heroShellTL: p(anchors.heroShellTL),
    heroShellBR: p(anchors.heroShellBR),
    heroPhotoTL: p(anchors.heroPhotoTL),
    heroPhotoBR: p(anchors.heroPhotoBR),
    heroTitleCaret: p(anchors.heroTitleCaret),
    heroCopy: s(anchors.heroCopy),
    heroMetaCaret: p(anchors.heroMetaCaret),
    heroEmailTL: p(anchors.heroEmailTL),
    heroEmailBR: p(anchors.heroEmailBR),
    heroLinksTL: p(anchors.heroLinksTL),
    heroLinksBR: p(anchors.heroLinksBR),
    techSectionTL: p(anchors.techSectionTL),
    techSectionBR: p(anchors.techSectionBR),
    techPillsTL: p(anchors.techPillsTL),
    techPillsBR: p(anchors.techPillsBR),
    experienceSection: s(anchors.experienceSection),
    experienceBody: s(anchors.experienceBody),
    experienceSectionTL: p(anchors.experienceSectionTL),
    experienceSectionBR: p(anchors.experienceSectionBR),
    experienceBodyTL: p(anchors.experienceBodyTL),
    experienceBodyBR: p(anchors.experienceBodyBR),
    experienceEntryRects: anchors.experienceEntryRects.map((r) => shiftRect(r, scrollDelta)),
    individualSection: s(anchors.individualSection),
    individualGrid: s(anchors.individualGrid),
    individualSectionTL: p(anchors.individualSectionTL),
    individualSectionBR: p(anchors.individualSectionBR),
    individualGridTL: p(anchors.individualGridTL),
    individualGridBR: p(anchors.individualGridBR),
    individualProjectCardRects: anchors.individualProjectCardRects.map((r) =>
      shiftRect(r, scrollDelta)
    ),
    writingsSection: s(anchors.writingsSection),
    writingsGrid: s(anchors.writingsGrid),
    writingsSectionTL: p(anchors.writingsSectionTL),
    writingsSectionBR: p(anchors.writingsSectionBR),
    writingsGridTL: p(anchors.writingsGridTL),
    writingsGridBR: p(anchors.writingsGridBR),
    writingsCardRects: anchors.writingsCardRects.map((r) =>
      shiftRect(r, scrollDelta)
    ),
    offClockSection: s(anchors.offClockSection),
    offClockBody: s(anchors.offClockBody),
    offClockSectionTL: p(anchors.offClockSectionTL),
    offClockSectionBR: p(anchors.offClockSectionBR),
    offClockBodyTL: p(anchors.offClockBodyTL),
    offClockBodyBR: p(anchors.offClockBodyBR),
  };
}

export type WritingsCardPreview = {
  title: string;
  excerpt: string;
  showMeta: boolean;
};

export type ExperienceEntryPreview = {
  role: string;
  companyLine: string;
  duration: string;
  description: string;
  showProjects: boolean;
};

export function frameForStaggerRects(
  rects: AnchorRect[],
  fallback: AnchorRect,
  linearP: number
) {
  const n = Math.max(rects.length, 1);
  const idx = activeStaggerIndex(linearP, n);
  const rect = rects[idx] ?? fallback;
  const progress = activeStaggerLocalP(linearP, n);
  return { ...rect, progress };
}

export function frameForWritingsStaggerAgent(
  anchors: HomeAnchors,
  linearP: number
) {
  return frameForStaggerRects(
    anchors.writingsCardRects,
    anchors.writingsGrid,
    linearP
  );
}

export function frameForExperienceStaggerAgent(
  anchors: HomeAnchors,
  linearP: number
) {
  return frameForStaggerRects(
    anchors.experienceEntryRects,
    anchors.experienceBody,
    linearP
  );
}

export function frameForIndividualStaggerAgent(
  anchors: HomeAnchors,
  linearP: number
) {
  return frameForStaggerRects(
    anchors.individualProjectCardRects,
    anchors.individualGrid,
    linearP
  );
}

export function deriveExperienceEntryPreviews(
  contentP: number,
  items: Experience[]
): ExperienceEntryPreview[] {
  const n = items.length;
  if (n === 0) return [];

  return items.map((exp, index) => {
    const companyLine = `${exp.company} · ${exp.location}`;
    const blob = `${exp.role}\n${companyLine}\n${exp.duration}\n${exp.description}`;

    const sliceStart = index / n;
    const sliceEnd = (index + 1) / n;
    if (contentP <= sliceStart) {
      return {
        role: "",
        companyLine: "",
        duration: "",
        description: "",
        showProjects: false,
      };
    }
    if (contentP >= sliceEnd) {
      return {
        role: exp.role,
        companyLine,
        duration: exp.duration,
        description: exp.description,
        showProjects: true,
      };
    }
    const local = (contentP - sliceStart) / (sliceEnd - sliceStart);
    const chars = Math.floor(local * blob.length);
    let consumed = 0;
    const take = (part: string) => {
      if (chars <= consumed) return "";
      const next = Math.min(part.length, chars - consumed);
      consumed += next;
      return part.slice(0, next);
    };
    return {
      role: take(exp.role),
      companyLine: take(companyLine),
      duration: take(exp.duration),
      description: take(exp.description),
      showProjects: local >= 0.92,
    };
  });
}

export function activeStaggerIndex(progress: number, total: number) {
  if (total <= 0 || progress <= 0) return 0;
  if (progress >= 1) return total - 1;
  return Math.min(total - 1, Math.floor(progress * total));
}

export function activeStaggerLocalP(progress: number, total: number) {
  if (total <= 0) return 0;
  if (progress <= 0) return 0;
  if (progress >= 1) return 1;
  const idx = Math.floor(progress * total);
  const start = idx / total;
  const end = (idx + 1) / total;
  if (progress <= start) return 0;
  if (progress >= end) return 1;
  return (progress - start) / (end - start);
}

export function deriveWritingsCardPreviews(
  contentP: number,
  blogs: Blog[]
): WritingsCardPreview[] {
  const n = blogs.length;
  if (n === 0) return [];

  return blogs.map((blog, index) => {
    const start = index / n;
    const end = (index + 1) / n;
    if (contentP <= start) {
      return { title: "", excerpt: "", showMeta: false };
    }
    if (contentP >= end) {
      return {
        title: blog.title,
        excerpt: blog.excerpt,
        showMeta: true,
      };
    }
    const local = (contentP - start) / (end - start);
    const titleCutoff = 0.5;
    if (local <= titleCutoff) {
      const t = local / titleCutoff;
      const len = Math.floor(t * blog.title.length);
      return { title: blog.title.slice(0, len), excerpt: "", showMeta: false };
    }
    const e = (local - titleCutoff) / (1 - titleCutoff);
    const len = Math.floor(e * blog.excerpt.length);
    return {
      title: blog.title,
      excerpt: blog.excerpt.slice(0, len),
      showMeta: e >= 0.85,
    };
  });
}

function staggerEntryCursor(
  rects: AnchorRect[],
  fallbackTL: { x: number; y: number },
  fallbackBR: { x: number; y: number },
  progress: number,
  linearT: number
) {
  if (rects.length === 0) {
    return {
      x: lerp(fallbackTL.x, fallbackBR.x, linearT),
      y: lerp(fallbackTL.y, fallbackBR.y, linearT),
    };
  }
  const n = rects.length;
  const idx = activeStaggerIndex(progress, n);
  const card = rects[idx] ?? rects[0];
  const localT = activeStaggerLocalP(progress, n);
  return {
    x: lerp(card.x + 16, card.x + card.w * 0.88, localT),
    y: lerp(card.y + 28, card.y + card.h * 0.72, linearT),
  };
}

function experienceEntryCursor(
  anchors: HomeAnchors,
  progress: number,
  linearT: number
) {
  return staggerEntryCursor(
    anchors.experienceEntryRects,
    anchors.experienceBodyTL,
    anchors.experienceBodyBR,
    progress,
    linearT
  );
}

function writingCardCursor(
  anchors: HomeAnchors,
  progress: number,
  linearT: number
) {
  return staggerEntryCursor(
    anchors.writingsCardRects,
    anchors.writingsGridTL,
    anchors.writingsGridBR,
    progress,
    linearT
  );
}

function individualProjectCursor(
  anchors: HomeAnchors,
  progress: number,
  linearT: number
) {
  return staggerEntryCursor(
    anchors.individualProjectCardRects,
    anchors.individualGridTL,
    anchors.individualGridBR,
    progress,
    linearT
  );
}

const HOME_AGENT_ORDER: HomeAgentId[] = [
  "nav-layout",
  "hero-shell",
  "hero-photo",
  "hero-type",
  "hero-links",
  "tech-layout",
  "tech-ui",
  "experience-layout",
  "experience-entries",
  "experience-content",
  "individual-layout",
  "individual-cards",
  "writings-layout",
  "writings-cards",
  "writings-content",
  "offclock-layout",
  "offclock-content",
];

export const HOME_AGENT_META: Record<
  HomeAgentId,
  { label: string; color: string; startMs: number; durationMs: number; exitMs: number }
> = {
  "nav-layout": {
    label: "Nav",
    color: "#94a3b8",
    startMs: 0,
    durationMs: 550,
    exitMs: 150,
  },
  "hero-shell": {
    label: "Hero",
    color: "#38bdf8",
    startMs: 320,
    durationMs: 560,
    exitMs: 150,
  },
  "hero-photo": {
    label: "Photo",
    color: "#22d3ee",
    startMs: 720,
    durationMs: 600,
    exitMs: 160,
  },
  "hero-type": {
    label: "Type",
    color: "#a78bfa",
    startMs: 1100,
    durationMs: 1900,
    exitMs: 180,
  },
  /** Social row — parallel with Type + Tech */
  "hero-links": {
    label: "Links",
    color: "#34d399",
    startMs: 1100,
    durationMs: 720,
    exitMs: 150,
  },
  "tech-layout": {
    label: "Layout",
    color: "#fbbf24",
    startMs: 1100,
    durationMs: 580,
    exitMs: 150,
  },
  "tech-ui": {
    label: "Tech",
    color: "#f472b6",
    startMs: 1620,
    durationMs: 950,
    exitMs: 170,
  },
  "experience-layout": {
    label: "Exp",
    color: "#818cf8",
    startMs: 2790,
    durationMs: 480,
    exitMs: 140,
  },
  "experience-entries": {
    label: "Roles",
    color: "#60a5fa",
    startMs: 3270,
    durationMs: 620,
    exitMs: 120,
  },
  "experience-content": {
    label: "Copy",
    color: "#38bdf8",
    startMs: 3390,
    durationMs: 980,
    exitMs: 120,
  },
  "individual-layout": {
    label: "Side",
    color: "#2dd4bf",
    startMs: 4390,
    durationMs: 420,
    exitMs: 120,
  },
  "individual-cards": {
    label: "Build",
    color: "#14b8a6",
    startMs: 4810,
    durationMs: 620,
    exitMs: 120,
  },
  "writings-layout": {
    label: "Write",
    color: "#c084fc",
    startMs: 5460,
    durationMs: 400,
    exitMs: 120,
  },
  "writings-cards": {
    label: "Cards",
    color: "#a855f7",
    startMs: 5860,
    durationMs: 620,
    exitMs: 120,
  },
  "writings-content": {
    label: "Copy",
    color: "#e879f9",
    startMs: 5860,
    durationMs: 980,
    exitMs: 120,
  },
  "offclock-layout": {
    label: "Play",
    color: "#fb7185",
    startMs: 6850,
    durationMs: 380,
    exitMs: 120,
  },
  "offclock-content": {
    label: "CoC",
    color: "#f43f5e",
    startMs: 7230,
    durationMs: 520,
    exitMs: 120,
  },
};

const PREVIEW_MS = 280;

/** Per-item opacity aligned with a 0–1 UI agent progress (matches growing selection frame). */
export function staggeredItemOpacity(
  uiP: number,
  index: number,
  total: number
): number {
  if (total <= 0 || uiP <= 0) return 0;
  if (uiP >= 1) return 1;
  const start = index / total;
  const end = (index + 1) / total;
  if (uiP <= start) return 0;
  if (uiP >= end) return 1;
  return (uiP - start) / (end - start);
}

/** Linear 0–1 progress — keeps typing and pill reveals on a steady clock. */
export function taskProgress(elapsedMs: number, id: HomeAgentId) {
  const { startMs, durationMs } = HOME_AGENT_META[id];
  const local = elapsedMs - startMs;
  if (local <= 0) return 0;
  if (local >= durationMs) return 1;
  return local / durationMs;
}

/** Eased motion for cursors and growing frames. */
export function motionProgress(elapsedMs: number, id: HomeAgentId) {
  return easeOutCubic(taskProgress(elapsedMs, id));
}

export type HomeAgentRuntime = {
  id: HomeAgentId;
  label: string;
  color: string;
  progress: number;
  working: boolean;
  visible: boolean;
  active: boolean;
  x: number;
  y: number;
};

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function idlePoint(id: HomeAgentId, anchors: HomeAnchors) {
  switch (id) {
    case "nav-layout":
      return anchors.navTL;
    case "hero-shell":
      return anchors.heroShellTL;
    case "hero-photo":
      return anchors.heroPhotoTL;
    case "hero-type":
      return anchors.heroTitleCaret;
    case "hero-links":
      return anchors.heroLinksTL;
    case "tech-layout":
      return anchors.techSectionTL;
    case "tech-ui":
      return anchors.techPillsTL;
    case "experience-layout":
      return anchors.experienceSectionTL;
    case "experience-entries":
    case "experience-content": {
      const pt = experienceEntryCursor(anchors, 0, 0);
      return { x: pt.x, y: pt.y };
    }
    case "individual-layout":
      return anchors.individualSectionTL;
    case "individual-cards": {
      const pt = individualProjectCursor(anchors, 0, 0);
      return { x: pt.x, y: pt.y };
    }
    case "writings-layout":
      return anchors.writingsSectionTL;
    case "writings-cards":
    case "writings-content": {
      const pt = writingCardCursor(anchors, 0, 0);
      return { x: pt.x, y: pt.y };
    }
    case "offclock-layout":
      return anchors.offClockSectionTL;
    case "offclock-content":
      return {
        x: (anchors.offClockBodyTL.x + anchors.offClockBodyBR.x) / 2,
        y: (anchors.offClockBodyTL.y + anchors.offClockBodyBR.y) / 2,
      };
    default:
      return anchors.navTL;
  }
}

function workPath(
  id: HomeAgentId,
  anchors: HomeAnchors,
  t: number,
  linearT: number
): { x: number; y: number } {
  switch (id) {
    case "nav-layout":
      return {
        x: lerp(anchors.navTL.x, anchors.navBR.x, t),
        y: lerp(anchors.navTL.y, anchors.navBR.y, t),
      };
    case "hero-shell":
      return {
        x: lerp(anchors.heroShellTL.x, anchors.heroShellBR.x, t),
        y: lerp(anchors.heroShellTL.y, anchors.heroShellBR.y, t),
      };
    case "hero-photo":
      return {
        x: lerp(anchors.heroPhotoTL.x, anchors.heroPhotoBR.x, t),
        y: lerp(anchors.heroPhotoTL.y, anchors.heroPhotoBR.y, t),
      };
    case "hero-type": {
      const titleEnd = anchors.heroTitle.x + anchors.heroTitle.w * 0.92;
      if (linearT < 0.42) {
        const t = linearT / 0.42;
        return {
          x: lerp(anchors.heroTitle.x + 12, titleEnd, t),
          y: anchors.heroTitleCaret.y,
        };
      }
      if (linearT < 0.82) {
        const t = (linearT - 0.42) / 0.4;
        return {
          x: lerp(anchors.heroTitle.x + 12, titleEnd * 0.92, t),
          y: anchors.heroMetaCaret.y,
        };
      }
      const t = (linearT - 0.82) / 0.18;
      return {
        x: lerp(anchors.heroEmailTL.x, anchors.heroEmailBR.x, t),
        y: anchors.heroEmailTL.y,
      };
    }
    case "hero-links":
      return {
        x: lerp(anchors.heroLinksTL.x, anchors.heroLinksBR.x, t),
        y: lerp(anchors.heroLinksTL.y, anchors.heroLinksBR.y, t),
      };
    case "tech-layout":
      return {
        x: lerp(anchors.techSectionTL.x, anchors.techSectionBR.x, t),
        y: lerp(anchors.techSectionTL.y, anchors.techSectionBR.y, t),
      };
    case "tech-ui":
      return {
        x: lerp(anchors.techPillsTL.x, anchors.techPillsBR.x, t),
        y: lerp(anchors.techPillsTL.y, anchors.techPillsBR.y, t),
      };
    case "experience-layout":
      return {
        x: lerp(anchors.experienceSectionTL.x, anchors.experienceSectionBR.x, t),
        y: lerp(anchors.experienceSectionTL.y, anchors.experienceSectionBR.y, t),
      };
    case "experience-entries":
      return experienceEntryCursor(anchors, linearT, t);
    case "experience-content":
      return experienceEntryCursor(anchors, linearT, t);
    case "individual-layout":
      return {
        x: lerp(anchors.individualSectionTL.x, anchors.individualSectionBR.x, t),
        y: lerp(anchors.individualSectionTL.y, anchors.individualSectionBR.y, t),
      };
    case "individual-cards":
      return individualProjectCursor(anchors, linearT, t);
    case "writings-layout":
      return {
        x: lerp(anchors.writingsSectionTL.x, anchors.writingsSectionBR.x, t),
        y: lerp(anchors.writingsSectionTL.y, anchors.writingsSectionBR.y, t),
      };
    case "writings-cards":
      return writingCardCursor(anchors, linearT, t);
    case "writings-content":
      return writingCardCursor(anchors, linearT, t);
    case "offclock-layout":
      return {
        x: lerp(anchors.offClockSectionTL.x, anchors.offClockSectionBR.x, t),
        y: lerp(anchors.offClockSectionTL.y, anchors.offClockSectionBR.y, t),
      };
    case "offclock-content":
      return {
        x: lerp(anchors.offClockBodyTL.x, anchors.offClockBodyBR.x, t),
        y: lerp(anchors.offClockBodyTL.y, anchors.offClockBodyBR.y, t),
      };
    default:
      return anchors.navTL;
  }
}

export function homeTimelineEndMs() {
  return Math.max(
    ...HOME_AGENT_ORDER.map(
      (id) =>
        HOME_AGENT_META[id].startMs +
        HOME_AGENT_META[id].durationMs +
        HOME_AGENT_META[id].exitMs
    )
  );
}

export function computeHomeAgentsAt(
  elapsedMs: number,
  anchors: HomeAnchors | null,
  spawnCorner: (index: number) => { x: number; y: number }
): HomeAgentRuntime[] {
  return HOME_AGENT_ORDER.map((id, index) => {
    const meta = HOME_AGENT_META[id];
    const local = elapsedMs - meta.startMs;
    let progress = 0;
    let working = false;
    let visible = false;
    let active = false;

    if (local < -PREVIEW_MS) {
      visible = false;
    } else if (local < 0) {
      visible = true;
      working = false;
      active = false;
    } else if (local < meta.durationMs) {
      progress = easeOutCubic(local / meta.durationMs);
      working = true;
      visible = true;
      active = true;
    } else {
      progress = 1;
      const past = local - meta.durationMs;
      working = false;
      visible = past < meta.exitMs;
      active = false;
    }

    const fallback = spawnCorner(index);
    let x = fallback.x;
    let y = fallback.y;

    if (anchors) {
      const idle = idlePoint(id, anchors);

      if (working) {
        const linearT = taskProgress(elapsedMs, id);
        const t = easeOutCubic(linearT);
        const pt = workPath(id, anchors, t, linearT);
        x = pt.x;
        y = pt.y;
      } else if (visible && progress >= 1) {
        const exitT = (elapsedMs - meta.startMs - meta.durationMs) / meta.exitMs;
        const off = exitT * 100;
        x = idle.x - off * 0.7;
        y = idle.y - off * 0.45;
      } else if (local < 0) {
        const approach = (elapsedMs - (meta.startMs - PREVIEW_MS)) / PREVIEW_MS;
        const t = easeOutCubic(Math.min(1, Math.max(0, approach)));
        x = lerp(fallback.x, idle.x, t);
        y = lerp(fallback.y, idle.y, t);
      }
    }

    return {
      id,
      label: meta.label,
      color: meta.color,
      progress,
      working,
      visible,
      active,
      x,
      y,
    };
  });
}

export function deriveHomeContentAt(
  elapsedMs: number,
  reducedMotion: boolean,
  techCount: number,
  experiences: Experience[],
  blogs: Blog[]
) {
  const experienceCount = experiences.length;
  const writingsCount = blogs.length;
  if (reducedMotion) {
    return {
      heroShellP: 1,
      heroLayoutP: 1,
      heroTypeP: 1,
      heroUiP: 1,
      techLayoutP: 1,
      techUiP: 1,
      typedHeroTitle: HERO_HEADING,
      typedHeroMeta: HERO_META_LINE,
      heroMetaFull: HERO_META_LINE,
      showHeroEmail: true,
      typedTechHeading: TECH_HEADING,
      showHeroImage: true,
      showHeroMeta: true,
      showHeroLinks: true,
      techPillCount: techCount,
      showTechSection: true,
      showExperienceSection: true,
      showIndividualSection: true,
      showIndividualCards: true,
      showOffClockSection: true,
      showOffClockContent: true,
      showWritingsSection: true,
      showWritingsCards: true,
      showWritingsContent: true,
      showExperienceEntries: true,
      showExperienceContent: true,
      experienceEntryPreviews: deriveExperienceEntryPreviews(1, experiences),
      writingsCardPreviews: deriveWritingsCardPreviews(1, blogs),
      typedExperienceHeading: EXPERIENCE_HEADING,
      typedIndividualHeading: HOME_PROJECTS_HEADING,
      typedWritingsHeading: WRITINGS_HEADING,
      typedOffClockHeading: OFF_CLOCK_HEADING,
      experienceLayoutP: 1,
      experienceEntriesP: 1,
      experienceContentP: 1,
      individualLayoutP: 1,
      individualCardsP: 1,
      offClockLayoutP: 1,
      offClockContentP: 1,
      writingsLayoutP: 1,
      writingsCardsP: 1,
      writingsContentP: 1,
      experienceLayoutReveal: 1,
      experienceEntriesReveal: 1,
      experienceContentReveal: 1,
      individualLayoutReveal: 1,
      individualCardsReveal: 1,
      offClockLayoutReveal: 1,
      offClockContentReveal: 1,
      writingsLayoutReveal: 1,
      writingsCardsReveal: 1,
      writingsContentReveal: 1,
      showLowerSections: true,
      ready: true,
      heroTypeStarted: true,
      heroShellReveal: 1,
      heroLayoutReveal: 1,
      heroTypeReveal: 1,
      heroUiReveal: 1,
      techLayoutReveal: 1,
      techUiReveal: 1,
    };
  }

  const heroShellP = taskProgress(elapsedMs, "hero-shell");
  const heroPhotoP = taskProgress(elapsedMs, "hero-photo");
  const heroTypeP = taskProgress(elapsedMs, "hero-type");
  const heroLinksP = taskProgress(elapsedMs, "hero-links");
  const techLayoutP = taskProgress(elapsedMs, "tech-layout");
  const techUiP = taskProgress(elapsedMs, "tech-ui");
  const experienceLayoutP = taskProgress(elapsedMs, "experience-layout");
  const experienceEntriesP = taskProgress(elapsedMs, "experience-entries");
  const experienceContentP = taskProgress(elapsedMs, "experience-content");
  const individualLayoutP = taskProgress(elapsedMs, "individual-layout");
  const individualCardsP = taskProgress(elapsedMs, "individual-cards");
  const offClockLayoutP = taskProgress(elapsedMs, "offclock-layout");
  const offClockContentP = taskProgress(elapsedMs, "offclock-content");
  const writingsLayoutP = taskProgress(elapsedMs, "writings-layout");
  const writingsCardsP = taskProgress(elapsedMs, "writings-cards");
  const writingsContentP = taskProgress(elapsedMs, "writings-content");

  const heroTyping = splitHeroTypeProgress(heroTypeP);

  const typedTechHeading =
    techLayoutP <= 0
      ? ""
      : TECH_HEADING.slice(0, Math.floor(techLayoutP * TECH_HEADING.length));
  const typedExperienceHeading =
    experienceLayoutP <= 0
      ? ""
      : EXPERIENCE_HEADING.slice(
          0,
          Math.floor(experienceLayoutP * EXPERIENCE_HEADING.length)
        );
  const typedIndividualHeading =
    individualLayoutP <= 0
      ? ""
      : HOME_PROJECTS_HEADING.slice(
          0,
          Math.floor(individualLayoutP * HOME_PROJECTS_HEADING.length)
        );
  const typedWritingsHeading =
    writingsLayoutP <= 0
      ? ""
      : WRITINGS_HEADING.slice(
          0,
          Math.floor(writingsLayoutP * WRITINGS_HEADING.length)
        );
  const typedOffClockHeading =
    offClockLayoutP <= 0
      ? ""
      : OFF_CLOCK_HEADING.slice(
          0,
          Math.floor(offClockLayoutP * OFF_CLOCK_HEADING.length)
        );

  const buildDoneMs =
    HOME_AGENT_META["offclock-content"].startMs +
    HOME_AGENT_META["offclock-content"].durationMs;
  const ready = elapsedMs >= buildDoneMs;

  return {
    heroShellP,
    heroLayoutP: heroPhotoP,
    heroTypeP,
    heroUiP: heroLinksP,
    techLayoutP,
    techUiP,
    experienceLayoutP,
    experienceEntriesP,
    experienceContentP,
    individualLayoutP,
    individualCardsP,
    offClockLayoutP,
    offClockContentP,
    writingsLayoutP,
    writingsCardsP,
    writingsContentP,
    experienceEntryPreviews: deriveExperienceEntryPreviews(
      experienceContentP,
      experiences
    ),
    writingsCardPreviews: deriveWritingsCardPreviews(writingsContentP, blogs),
    heroMetaFull: HERO_META_LINE,
    /** Linear 0–1 — matched to overlay frames and task clocks (no extra easing). */
    heroShellReveal: heroShellP,
    heroLayoutReveal: heroPhotoP,
    heroTypeReveal: heroTypeP,
    heroUiReveal: heroLinksP,
    techLayoutReveal: techLayoutP,
    techUiReveal: techUiP,
    experienceLayoutReveal: experienceLayoutP,
    experienceEntriesReveal: experienceEntriesP,
    experienceContentReveal: experienceContentP,
    individualLayoutReveal: individualLayoutP,
    individualCardsReveal: individualCardsP,
    offClockLayoutReveal: offClockLayoutP,
    offClockContentReveal: offClockContentP,
    writingsLayoutReveal: writingsLayoutP,
    writingsCardsReveal: writingsCardsP,
    writingsContentReveal: writingsContentP,
    typedHeroTitle:
      heroTypeP >= 1 ? HERO_HEADING : heroTyping.typedHeroTitle,
    typedHeroMeta:
      heroTypeP >= 1 ? HERO_META_LINE : heroTyping.typedHeroMeta,
    showHeroEmail: heroTyping.showHeroEmail,
    typedTechHeading: techLayoutP >= 1 ? TECH_HEADING : typedTechHeading,
    showHeroImage: elapsedMs >= HOME_AGENT_META["hero-photo"].startMs - 120,
    showHeroMeta: heroTyping.showHeroMetaBlock,
    showHeroLinks: heroLinksP > 0,
    techPillCount: techUiP >= 1 ? techCount : Math.floor(techUiP * techCount),
    showExperienceEntries: experienceEntriesP > 0,
    showExperienceContent: experienceContentP > 0,
    typedExperienceHeading:
      experienceLayoutP >= 1 ? EXPERIENCE_HEADING : typedExperienceHeading,
    typedIndividualHeading:
      individualLayoutP >= 1 ? HOME_PROJECTS_HEADING : typedIndividualHeading,
    typedWritingsHeading:
      writingsLayoutP >= 1 ? WRITINGS_HEADING : typedWritingsHeading,
    typedOffClockHeading:
      offClockLayoutP >= 1 ? OFF_CLOCK_HEADING : typedOffClockHeading,
    showTechSection: techLayoutP > 0,
    showExperienceSection: experienceLayoutP > 0,
    showIndividualSection: individualLayoutP > 0,
    showIndividualCards: individualCardsP > 0,
    showOffClockSection: offClockLayoutP > 0,
    showOffClockContent: offClockContentP > 0,
    showWritingsSection: writingsLayoutP > 0,
    showWritingsCards: writingsCardsP > 0,
    showWritingsContent: writingsContentP > 0,
    showLowerSections: ready,
    ready,
    heroTypeStarted: elapsedMs >= HOME_AGENT_META["hero-type"].startMs,
  };
}
