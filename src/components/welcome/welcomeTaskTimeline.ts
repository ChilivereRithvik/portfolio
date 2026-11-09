export const WELCOME_TITLE = "Welcome to My World";

export type AgentId = "layout" | "type" | "ui";

export type AnchorRect = { x: number; y: number; w: number; h: number };

export type WelcomeAnchors = {
  panelTopLeft: { x: number; y: number };
  panelBottomRight: { x: number; y: number };
  titleCaret: { x: number; y: number };
  buttonTopLeft: { x: number; y: number };
  buttonBottomRight: { x: number; y: number };
  panelRect: AnchorRect;
  titleRect: AnchorRect;
  buttonRect: AnchorRect | null;
};

const AGENT_ORDER: AgentId[] = ["layout", "type", "ui"];

export const AGENT_META: Record<
  AgentId,
  { label: string; color: string; startMs: number; durationMs: number; exitMs: number }
> = {
  layout: { label: "Layout", color: "#d4d4d4", startMs: 0, durationMs: 2200, exitMs: 700 },
  type: { label: "Type", color: "#a3a3a3", startMs: 800, durationMs: 3600, exitMs: 650 },
  ui: { label: "UI", color: "#737373", startMs: 3000, durationMs: 2000, exitMs: 650 },
};

export function easeOutCubic(t: number) {
  return 1 - (1 - Math.min(1, Math.max(0, t))) ** 3;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export type AgentRuntime = {
  id: AgentId;
  label: string;
  color: string;
  progress: number;
  working: boolean;
  visible: boolean;
  active: boolean;
  x: number;
  y: number;
};

export function timelineEndMs() {
  return Math.max(
    ...AGENT_ORDER.map(
      (id) => AGENT_META[id].startMs + AGENT_META[id].durationMs + AGENT_META[id].exitMs
    )
  );
}

export function computeAgentsAt(
  elapsedMs: number,
  anchors: WelcomeAnchors | null,
  spawnCorner: (index: number) => { x: number; y: number }
): AgentRuntime[] {
  const cx = typeof window !== "undefined" ? window.innerWidth / 2 : 600;
  const cy = typeof window !== "undefined" ? window.innerHeight / 2 : 400;

  return AGENT_ORDER.map((id, index) => {
    const meta = AGENT_META[id];
    const local = elapsedMs - meta.startMs;
    let progress = 0;
    let working = false;
    let visible = true;
    let active = false;

    if (local < 0) {
      visible = elapsedMs < 600;
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
        x = lerp(anchors.panelTopLeft.x, anchors.panelBottomRight.x, progress * 0.92);
        y = lerp(anchors.panelTopLeft.y, anchors.panelBottomRight.y, progress * 0.92);
      } else if (id === "type") {
        const drift = progress * 48;
        x = anchors.titleCaret.x + drift;
        y = anchors.titleCaret.y;
      } else if (id === "ui") {
        x = lerp(anchors.buttonTopLeft.x, anchors.buttonBottomRight.x, progress * 0.9);
        y = lerp(anchors.buttonTopLeft.y, anchors.buttonBottomRight.y, progress * 0.9);
      }
    } else if (anchors && progress >= 1 && visible) {
      const exitT = (elapsedMs - meta.startMs - meta.durationMs) / meta.exitMs;
      const off = exitT * 120;
      if (id === "layout") {
        x = anchors.panelTopLeft.x - off;
        y = anchors.panelTopLeft.y - off * 0.6;
      } else if (id === "type") {
        x = anchors.titleCaret.x + 40 + off;
        y = anchors.titleCaret.y - off * 0.4;
      } else if (id === "ui") {
        x = anchors.buttonBottomRight.x + off * 0.5;
        y = anchors.buttonBottomRight.y + off;
      }
    } else if (elapsedMs < meta.startMs) {
      x = lerp(fallback.x, cx, Math.min(1, elapsedMs / 900));
      y = lerp(fallback.y, cy, Math.min(1, elapsedMs / 900));
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

export function deriveContentAt(elapsedMs: number, reducedMotion: boolean) {
  if (reducedMotion) {
    return {
      panelProgress: 1,
      buttonProgress: 1,
      typedTitle: WELCOME_TITLE,
      layoutDone: true,
      typeStarted: true,
      uiStarted: true,
      ready: true,
    };
  }

  const layout = taskProgress(elapsedMs, "layout");
  const typeP = taskProgress(elapsedMs, "type");
  const uiP = taskProgress(elapsedMs, "ui");

  const typedTitle =
    typeP <= 0
      ? ""
      : WELCOME_TITLE.slice(0, Math.floor(typeP * WELCOME_TITLE.length));

  const end = timelineEndMs();
  const ready = elapsedMs >= end - 400;

  return {
    panelProgress: layout,
    buttonProgress: uiP,
    typedTitle: ready ? WELCOME_TITLE : typedTitle,
    layoutDone: layout >= 1,
    typeStarted: elapsedMs >= AGENT_META.type.startMs,
    uiStarted: elapsedMs >= AGENT_META.ui.startMs,
    ready,
  };
}

function taskProgress(elapsedMs: number, id: AgentId) {
  const { startMs, durationMs } = AGENT_META[id];
  const local = elapsedMs - startMs;
  if (local <= 0) return 0;
  if (local >= durationMs) return 1;
  return easeOutCubic(local / durationMs);
}
