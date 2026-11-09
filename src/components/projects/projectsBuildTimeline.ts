import { easeOutCubic } from "@/components/welcome/welcomeTaskTimeline";

export const PROJECTS_TITLE = "Projects";
export const PROJECTS_SUBTITLE =
  "Enterprise platforms, AI automation, and products shipped end to end.";

export type ProjectsAgentId = "layout" | "header" | "cards";

export type ProjectsRect = { x: number; y: number; w: number; h: number };

export type ProjectsAnchors = {
  section: ProjectsRect;
  sectionTL: { x: number; y: number };
  sectionBR: { x: number; y: number };
  titleCaret: { x: number; y: number };
  cardRects: ProjectsRect[];
};

export const PROJECTS_AGENT_META: Record<
  ProjectsAgentId,
  {
    label: string;
    color: string;
    startMs: number;
    durationMs: number;
    exitMs: number;
  }
> = {
  layout: {
    label: "Layout",
    color: "#22d3ee",
    startMs: 0,
    durationMs: 1400,
    exitMs: 380,
  },
  header: {
    label: "Header",
    color: "#c084fc",
    startMs: 400,
    durationMs: 1400,
    exitMs: 380,
  },
  cards: {
    label: "Cards",
    color: "#4ade80",
    startMs: 1200,
    durationMs: 2200,
    exitMs: 420,
  },
};

const AGENT_ORDER: ProjectsAgentId[] = ["layout", "header", "cards"];

export function projectsBuildEndMs() {
  return (
    Math.max(
      ...AGENT_ORDER.map(
        (id) =>
          PROJECTS_AGENT_META[id].startMs +
          PROJECTS_AGENT_META[id].durationMs +
          PROJECTS_AGENT_META[id].exitMs
      )
    ) + 300
  );
}

function taskProgress(elapsedMs: number, id: ProjectsAgentId) {
  const { startMs, durationMs } = PROJECTS_AGENT_META[id];
  const local = elapsedMs - startMs;
  if (local <= 0) return 0;
  if (local >= durationMs) return 1;
  return easeOutCubic(local / durationMs);
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export type ProjectsAgentRuntime = {
  id: ProjectsAgentId;
  label: string;
  color: string;
  progress: number;
  working: boolean;
  visible: boolean;
  active: boolean;
  x: number;
  y: number;
};

export function computeProjectsAgentsAt(
  elapsedMs: number,
  anchors: ProjectsAnchors | null,
  spawnCorner: (index: number) => { x: number; y: number }
): ProjectsAgentRuntime[] {
  return AGENT_ORDER.map((id, index) => {
    const meta = PROJECTS_AGENT_META[id];
    const local = elapsedMs - meta.startMs;
    let progress = 0;
    let working = false;
    let visible = true;
    let active = false;

    if (local < 0) {
      visible = elapsedMs < 500;
      working = false;
    } else if (local < meta.durationMs) {
      progress = easeOutCubic(local / meta.durationMs);
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
      if (id === "layout") {
        x = lerp(anchors.sectionTL.x, anchors.sectionBR.x, progress * 0.92);
        y = lerp(anchors.sectionTL.y, anchors.sectionBR.y, progress * 0.92);
      } else if (id === "header") {
        x = anchors.titleCaret.x + progress * 36;
        y = anchors.titleCaret.y;
      } else if (id === "cards" && anchors.cardRects.length > 0) {
        const cardIndex = Math.min(
          anchors.cardRects.length - 1,
          Math.floor(progress * anchors.cardRects.length)
        );
        const card = anchors.cardRects[cardIndex]!;
        const frac =
          anchors.cardRects.length > 1
            ? (progress * anchors.cardRects.length) % 1
            : progress;
        x = lerp(card.x, card.x + card.w, frac * 0.85);
        y = lerp(card.y + 12, card.y + card.h - 12, frac * 0.5);
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

export function deriveProjectsBuildAt(
  elapsedMs: number,
  reducedMotion: boolean,
  cardCount: number
) {
  if (reducedMotion) {
    return {
      phase: "complete" as const,
      layoutP: 1,
      headerP: 1,
      cardsP: 1,
      typedTitle: PROJECTS_TITLE,
      typedSubtitle: PROJECTS_SUBTITLE,
      showHeader: true,
      showCards: true,
      cardProgress: () => 1,
    };
  }

  const end = projectsBuildEndMs();
  const phase = elapsedMs >= end ? ("complete" as const) : ("building" as const);
  const layoutP = taskProgress(elapsedMs, "layout");
  const headerP = taskProgress(elapsedMs, "header");
  const cardsP = taskProgress(elapsedMs, "cards");

  const typeChars = Math.floor(headerP * PROJECTS_TITLE.length);
  const subChars = Math.floor(Math.max(0, headerP - 0.35) * PROJECTS_SUBTITLE.length);

  const cardProgress = (index: number) => {
    if (cardsP <= 0) return 0;
    const n = Math.max(cardCount, 1);
    const segment = 1 / n;
    const start = index * segment;
    const local = (cardsP - start) / segment;
    return Math.min(1, Math.max(0, easeOutCubic(local)));
  };

  return {
    phase,
    layoutP,
    headerP,
    cardsP,
    typedTitle: phase === "complete" ? PROJECTS_TITLE : PROJECTS_TITLE.slice(0, typeChars),
    typedSubtitle:
      phase === "complete"
        ? PROJECTS_SUBTITLE
        : PROJECTS_SUBTITLE.slice(0, subChars),
    showHeader: layoutP > 0.08,
    showCards: cardsP > 0.05,
    cardProgress,
  };
}

export function frameForProjectsAgent(
  id: ProjectsAgentId,
  anchors: ProjectsAnchors,
  cardIndex?: number
): ProjectsRect {
  if (id === "layout") return anchors.section;
  if (id === "header") {
    return {
      x: anchors.section.x + 12,
      y: anchors.section.y + 12,
      w: anchors.section.w - 24,
      h: Math.min(120, anchors.section.h * 0.22),
    };
  }
  if (id === "cards" && cardIndex != null && anchors.cardRects[cardIndex]) {
    return anchors.cardRects[cardIndex]!;
  }
  return anchors.section;
}
