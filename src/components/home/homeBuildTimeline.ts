import { personalInfo } from "@/config/portfolio";
import { type AnchorRect } from "@/components/welcome/welcomeTaskTimeline";

export const HERO_HEADING = `Hey Hi, I'm ${personalInfo.displayName}!`;
export const TECH_HEADING = "Tech Stack";

export type HomeAgentId =
  | "hero-layout"
  | "hero-type"
  | "hero-ui"
  | "tech-layout"
  | "tech-ui";

export type HomeAnchors = {
  heroSection: AnchorRect;
  heroTitle: AnchorRect;
  heroLinks: AnchorRect;
  techSection: AnchorRect;
  techHeading: AnchorRect;
  techPills: AnchorRect;
  heroSectionTL: { x: number; y: number };
  heroSectionBR: { x: number; y: number };
  heroTitleCaret: { x: number; y: number };
  heroLinksTL: { x: number; y: number };
  heroLinksBR: { x: number; y: number };
  techSectionTL: { x: number; y: number };
  techSectionBR: { x: number; y: number };
  techHeadingCaret: { x: number; y: number };
  techPillsTL: { x: number; y: number };
  techPillsBR: { x: number; y: number };
};

const HOME_AGENT_ORDER: HomeAgentId[] = [
  "hero-layout",
  "hero-type",
  "hero-ui",
  "tech-layout",
  "tech-ui",
];

export const HOME_AGENT_META: Record<
  HomeAgentId,
  { label: string; color: string; startMs: number; durationMs: number; exitMs: number }
> = {
  "hero-layout": {
    label: "Layout",
    color: "#38bdf8",
    startMs: 0,
    durationMs: 2000,
    exitMs: 500,
  },
  "hero-type": {
    label: "Type",
    color: "#a78bfa",
    startMs: 850,
    durationMs: 3000,
    exitMs: 480,
  },
  "hero-ui": {
    label: "UI",
    color: "#34d399",
    startMs: 2700,
    durationMs: 1850,
    exitMs: 480,
  },
  "tech-layout": {
    label: "Layout",
    color: "#fbbf24",
    startMs: 4400,
    durationMs: 1850,
    exitMs: 450,
  },
  "tech-ui": {
    label: "UI",
    color: "#f472b6",
    startMs: 5600,
    durationMs: 2550,
    exitMs: 480,
  },
};

/** Linear 0–1 progress — keeps cursors, frames, and content on the same clock. */
function taskProgress(elapsedMs: number, id: HomeAgentId) {
  const { startMs, durationMs } = HOME_AGENT_META[id];
  const local = elapsedMs - startMs;
  if (local <= 0) return 0;
  if (local >= durationMs) return 1;
  return local / durationMs;
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

function typeCursorProgress(progress: number) {
  if (progress <= 0) return 0;
  const chars = Math.floor(progress * HERO_HEADING.length);
  if (HERO_HEADING.length === 0) return progress;
  return Math.min(1, chars / HERO_HEADING.length);
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
  const cx = typeof window !== "undefined" ? window.innerWidth / 2 : 600;
  const cy = typeof window !== "undefined" ? window.innerHeight / 2 : 400;
  const spawnMs = 550;

  return HOME_AGENT_ORDER.map((id, index) => {
    const meta = HOME_AGENT_META[id];
    const local = elapsedMs - meta.startMs;
    let progress = 0;
    let working = false;
    let visible = true;
    let active = false;

    if (local < 0) {
      visible = elapsedMs < 800;
      working = false;
    } else if (local < meta.durationMs) {
      progress = local / meta.durationMs;
      working = true;
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

    if (anchors && working) {
      const t = progress;
      if (id === "hero-layout") {
        x = lerp(anchors.heroSectionTL.x, anchors.heroSectionBR.x, t);
        y = lerp(anchors.heroSectionTL.y, anchors.heroSectionBR.y, t);
      } else if (id === "hero-type") {
        const typeT = typeCursorProgress(progress);
        const drift = typeT * (anchors.heroTitle.w * 0.9);
        x = anchors.heroTitleCaret.x + drift;
        y = anchors.heroTitleCaret.y;
      } else if (id === "hero-ui") {
        x = lerp(anchors.heroLinksTL.x, anchors.heroLinksBR.x, t);
        y = lerp(anchors.heroLinksTL.y, anchors.heroLinksBR.y, t);
      } else if (id === "tech-layout") {
        x = lerp(anchors.techSectionTL.x, anchors.techSectionBR.x, t);
        y = lerp(anchors.techSectionTL.y, anchors.techSectionBR.y, t);
      } else if (id === "tech-ui") {
        x = lerp(anchors.techPillsTL.x, anchors.techPillsBR.x, t);
        y = lerp(anchors.techPillsTL.y, anchors.techPillsBR.y, t);
      }
    } else if (anchors && progress >= 1 && visible) {
      const exitT = (elapsedMs - meta.startMs - meta.durationMs) / meta.exitMs;
      const off = exitT * 120;
      if (id === "hero-layout") {
        x = anchors.heroSectionTL.x - off;
        y = anchors.heroSectionTL.y - off * 0.6;
      } else if (id === "hero-type") {
        x = anchors.heroTitleCaret.x + 40 + off;
        y = anchors.heroTitleCaret.y - off * 0.4;
      } else if (id === "hero-ui") {
        x = anchors.heroLinksBR.x + off * 0.5;
        y = anchors.heroLinksBR.y + off;
      } else if (id === "tech-layout") {
        x = anchors.techSectionTL.x - off;
        y = anchors.techSectionTL.y - off * 0.5;
      } else if (id === "tech-ui") {
        x = anchors.techPillsBR.x + off * 0.4;
        y = anchors.techPillsBR.y + off;
      }
    } else if (elapsedMs < meta.startMs) {
      const enterT = Math.min(1, elapsedMs / spawnMs);
      x = lerp(fallback.x, cx, enterT);
      y = lerp(fallback.y, cy, enterT);
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

  const heroLayoutP = taskProgress(elapsedMs, "hero-layout");
  const heroTypeP = taskProgress(elapsedMs, "hero-type");
  const heroUiP = taskProgress(elapsedMs, "hero-ui");
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
    heroLayoutP,
    heroTypeP,
    heroUiP,
    techLayoutP,
    techUiP,
    heroLayoutReveal: heroLayoutP,
    heroTypeReveal: heroTypeP,
    heroUiReveal: heroUiP,
    techLayoutReveal: techLayoutP,
    techUiReveal: techUiP,
    typedHeroTitle: heroTypeP >= 1 ? HERO_HEADING : typedHeroTitle,
    typedTechHeading: techLayoutP >= 1 ? TECH_HEADING : typedTechHeading,
    showHeroImage: true,
    showHeroMeta: heroTypeP >= 1,
    showHeroLinks: heroUiP > 0,
    techPillCount: techUiP >= 1 ? techCount : Math.floor(techUiP * techCount),
    showTechSection: elapsedMs >= HOME_AGENT_META["tech-layout"].startMs,
    showLowerSections: ready,
    ready,
    heroTypeStarted: elapsedMs >= HOME_AGENT_META["hero-type"].startMs,
  };
}
