import { personalInfo } from "@/config/portfolio";
import {
  easeOutCubic,
  type AnchorRect,
} from "@/components/welcome/welcomeTaskTimeline";

export const HERO_HEADING = `Hey Hi, I'm ${personalInfo.displayName}!`;
export const TECH_HEADING = "Tech Stack";

export type HomeAgentId =
  | "nav-layout"
  | "hero-shell"
  | "hero-photo"
  | "hero-type"
  | "hero-links"
  | "tech-layout"
  | "tech-ui";

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
  heroLinksTL: { x: number; y: number };
  heroLinksBR: { x: number; y: number };
  techSectionTL: { x: number; y: number };
  techSectionBR: { x: number; y: number };
  techPillsTL: { x: number; y: number };
  techPillsBR: { x: number; y: number };
};

const HOME_AGENT_ORDER: HomeAgentId[] = [
  "nav-layout",
  "hero-shell",
  "hero-photo",
  "hero-type",
  "hero-links",
  "tech-layout",
  "tech-ui",
];

export const HOME_AGENT_META: Record<
  HomeAgentId,
  { label: string; color: string; startMs: number; durationMs: number; exitMs: number }
> = {
  "nav-layout": {
    label: "Nav",
    color: "#94a3b8",
    startMs: 0,
    durationMs: 1300,
    exitMs: 380,
  },
  "hero-shell": {
    label: "Hero",
    color: "#38bdf8",
    startMs: 850,
    durationMs: 1350,
    exitMs: 380,
  },
  "hero-photo": {
    label: "Photo",
    color: "#22d3ee",
    startMs: 1750,
    durationMs: 1500,
    exitMs: 400,
  },
  "hero-type": {
    label: "Type",
    color: "#a78bfa",
    startMs: 2950,
    durationMs: 3100,
    exitMs: 420,
  },
  "hero-links": {
    label: "Links",
    color: "#34d399",
    startMs: 5750,
    durationMs: 1400,
    exitMs: 380,
  },
  "tech-layout": {
    label: "Layout",
    color: "#fbbf24",
    startMs: 7000,
    durationMs: 1500,
    exitMs: 380,
  },
  "tech-ui": {
    label: "UI",
    color: "#f472b6",
    startMs: 8300,
    durationMs: 2600,
    exitMs: 420,
  },
};

const PREVIEW_MS = 520;

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
      const drift = linearT * (anchors.heroTitle.w * 0.88);
      return {
        x: anchors.heroTitle.x + 12 + drift,
        y: anchors.heroTitleCaret.y,
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
  techCount: number
) {
  if (reducedMotion) {
    return {
      heroLayoutP: 1,
      heroTypeP: 1,
      heroUiP: 1,
      techLayoutP: 1,
      techUiP: 1,
      typedHeroTitle: HERO_HEADING,
      typedTechHeading: TECH_HEADING,
      showHeroImage: true,
      showHeroMeta: true,
      showHeroLinks: true,
      techPillCount: techCount,
      showTechSection: true,
      showLowerSections: true,
      ready: true,
      heroTypeStarted: true,
      heroLayoutReveal: 1,
      heroTypeReveal: 1,
      heroUiReveal: 1,
      techLayoutReveal: 1,
      techUiReveal: 1,
    };
  }

  const heroPhotoP = taskProgress(elapsedMs, "hero-photo");
  const heroTypeP = taskProgress(elapsedMs, "hero-type");
  const heroLinksP = taskProgress(elapsedMs, "hero-links");
  const techLayoutP = taskProgress(elapsedMs, "tech-layout");
  const techUiP = taskProgress(elapsedMs, "tech-ui");

  const typedHeroTitle =
    heroTypeP <= 0
      ? ""
      : HERO_HEADING.slice(0, Math.floor(heroTypeP * HERO_HEADING.length));

  const typedTechHeading =
    techLayoutP <= 0
      ? ""
      : TECH_HEADING.slice(0, Math.floor(techLayoutP * TECH_HEADING.length));

  const buildDoneMs =
    HOME_AGENT_META["tech-ui"].startMs + HOME_AGENT_META["tech-ui"].durationMs;
  const ready = elapsedMs >= buildDoneMs;

  return {
    heroLayoutP: heroPhotoP,
    heroTypeP,
    heroUiP: heroLinksP,
    techLayoutP,
    techUiP,
    heroLayoutReveal: motionProgress(elapsedMs, "hero-photo"),
    heroTypeReveal: motionProgress(elapsedMs, "hero-type"),
    heroUiReveal: motionProgress(elapsedMs, "hero-links"),
    techLayoutReveal: motionProgress(elapsedMs, "tech-layout"),
    techUiReveal: motionProgress(elapsedMs, "tech-ui"),
    typedHeroTitle: heroTypeP >= 1 ? HERO_HEADING : typedHeroTitle,
    typedTechHeading: techLayoutP >= 1 ? TECH_HEADING : typedTechHeading,
    showHeroImage: elapsedMs >= HOME_AGENT_META["hero-photo"].startMs - 200,
    showHeroMeta: heroTypeP >= 1,
    showHeroLinks: heroLinksP > 0,
    techPillCount: techUiP >= 1 ? techCount : Math.floor(techUiP * techCount),
    showTechSection: elapsedMs >= HOME_AGENT_META["tech-layout"].startMs,
    showLowerSections: ready,
    ready,
    heroTypeStarted: elapsedMs >= HOME_AGENT_META["hero-type"].startMs,
  };
}
