import { easeOutCubic } from "@/components/welcome/welcomeTaskTimeline";

export const HOME_INTRO_TITLE = "Hey There Welcome";
export const HOME_INTRO_STATUS = "Agents are getting ready";
/** Pause on welcome this long after all intro agents finish. */
export const HOME_INTRO_HOLD_MS = 2000;

export type HomeIntroPrepId = "prep-layout" | "prep-hey" | "prep-status";

export type HomeIntroRect = { x: number; y: number; w: number; h: number };

export type HomeIntroAnchors = {
  copyBounds: HomeIntroRect;
  titleRect: HomeIntroRect;
  statusRect: HomeIntroRect;
  titleCaret: { x: number; y: number };
  statusCaret: { x: number; y: number };
  copyTL: { x: number; y: number };
  copyBR: { x: number; y: number };
};

export function introFrameForAgent(
  id: HomeIntroPrepId,
  anchors: HomeIntroAnchors
): HomeIntroRect {
  switch (id) {
    case "prep-layout":
      return anchors.copyBounds;
    case "prep-hey":
      return anchors.titleRect;
    case "prep-status":
      return anchors.statusRect;
  }
}

const PREP_ORDER: HomeIntroPrepId[] = [
  "prep-layout",
  "prep-hey",
  "prep-status",
];

export const HOME_INTRO_PREP_META: Record<
  HomeIntroPrepId,
  {
    label: string;
    color: string;
    startMs: number;
    durationMs: number;
    exitMs: number;
  }
> = {
  "prep-layout": {
    label: "Layout",
    color: "#94a3b8",
    startMs: 0,
    durationMs: 2600,
    exitMs: 420,
  },
  "prep-hey": {
    label: "Hey",
    color: "#a78bfa",
    startMs: 80,
    durationMs: 2600,
    exitMs: 420,
  },
  "prep-status": {
    label: "Status",
    color: "#38bdf8",
    startMs: 160,
    durationMs: 2600,
    exitMs: 420,
  },
};

export function homeIntroSwarmEndMs() {
  return Math.max(
    ...PREP_ORDER.map(
      (id) =>
        HOME_INTRO_PREP_META[id].startMs + HOME_INTRO_PREP_META[id].durationMs
    )
  );
}

const PREVIEW_MS = 280;

export type HomeIntroAgentRuntime = {
  id: HomeIntroPrepId;
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

export function introAgentTaskProgress(
  elapsedMs: number,
  id: HomeIntroPrepId
) {
  const { startMs, durationMs } = HOME_INTRO_PREP_META[id];
  const local = elapsedMs - startMs;
  if (local <= 0) return 0;
  if (local >= durationMs) return 1;
  return local / durationMs;
}

function taskProgress(elapsedMs: number, id: HomeIntroPrepId) {
  return introAgentTaskProgress(elapsedMs, id);
}

/** Pin cursor to the growing frame corner (matches WelcomeSectionFrame). */
function layoutCursorPoint(
  bounds: HomeIntroRect,
  linearProgress: number
) {
  const p = Math.min(1, Math.max(0, linearProgress));
  return {
    x: bounds.x + bounds.w * p,
    y: bounds.y + bounds.h * p,
  };
}

function pathForPrep(
  id: HomeIntroPrepId,
  anchors: HomeIntroAnchors,
  linearProgress: number
): { x: number; y: number } {
  const { copyBounds, titleCaret, statusCaret } = anchors;
  switch (id) {
    case "prep-layout":
      return layoutCursorPoint(copyBounds, linearProgress);
    case "prep-hey":
      return titleCaret;
    case "prep-status":
      return statusCaret;
  }
}

export function computeHomeIntroAgentsAt(
  elapsedMs: number,
  anchors: HomeIntroAnchors | null,
  spawnCorner: (index: number) => { x: number; y: number }
): HomeIntroAgentRuntime[] {
  const cx = typeof window !== "undefined" ? window.innerWidth / 2 : 600;
  const cy = typeof window !== "undefined" ? window.innerHeight / 2 : 400;

  return PREP_ORDER.map((id, index) => {
    const meta = HOME_INTRO_PREP_META[id];
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
    }

    const fallback = spawnCorner(index);
    let x = fallback.x;
    let y = fallback.y;

    if (anchors) {
      const linearT = taskProgress(elapsedMs, id);
      const t = easeOutCubic(linearT);
      if (working) {
        const pathT = id === "prep-layout" ? progress : linearT;
        const pt = pathForPrep(id, anchors, pathT);
        x = pt.x;
        y = pt.y;
      } else if (visible && progress >= 1) {
        const exitT = pastExitT(elapsedMs, meta);
        const off = exitT * 90;
        const end = pathForPrep(id, anchors, 1);
        x = end.x + off * 0.4;
        y = end.y - off * 0.35;
      } else if (local < 0) {
        const approach =
          (elapsedMs - (meta.startMs - PREVIEW_MS)) / PREVIEW_MS;
        const approachT = easeOutCubic(Math.min(1, Math.max(0, approach)));
        const target = pathForPrep(id, anchors, 0);
        x = lerp(fallback.x, target.x, approachT);
        y = lerp(fallback.y, target.y, approachT);
      }
    } else if (local < 0 || working) {
      const approach = Math.min(1, Math.max(0, elapsedMs / 900));
      x = lerp(fallback.x, cx, approach);
      y = lerp(fallback.y, cy, approach);
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

function pastExitT(
  elapsedMs: number,
  meta: (typeof HOME_INTRO_PREP_META)[HomeIntroPrepId]
) {
  return (elapsedMs - meta.startMs - meta.durationMs) / meta.exitMs;
}

export function deriveHomeIntroAt(elapsedMs: number, reducedMotion: boolean) {
  if (reducedMotion) {
    return {
      typedTitle: HOME_INTRO_TITLE,
      typedStatus: HOME_INTRO_STATUS,
      layoutReveal: 1,
      ready: true,
    };
  }

  const layoutP = introAgentTaskProgress(elapsedMs, "prep-layout");
  const heyP = introAgentTaskProgress(elapsedMs, "prep-hey");
  const statusP = introAgentTaskProgress(elapsedMs, "prep-status");

  const typedTitle =
    heyP <= 0
      ? ""
      : heyP >= 1
        ? HOME_INTRO_TITLE
        : HOME_INTRO_TITLE.slice(0, Math.floor(heyP * HOME_INTRO_TITLE.length));

  const typedStatus =
    statusP <= 0
      ? ""
      : statusP >= 1
        ? HOME_INTRO_STATUS
        : HOME_INTRO_STATUS.slice(
            0,
            Math.floor(statusP * HOME_INTRO_STATUS.length)
          );

  const swarmDone = layoutP >= 1 && heyP >= 1 && statusP >= 1;
  const ready =
    swarmDone && elapsedMs >= homeIntroSwarmEndMs() + HOME_INTRO_HOLD_MS;

  return {
    typedTitle:
      heyP >= 1 || ready ? HOME_INTRO_TITLE : typedTitle,
    typedStatus:
      statusP >= 1 || ready ? HOME_INTRO_STATUS : typedStatus,
    layoutReveal: layoutP >= 1 ? 1 : layoutP,
    ready,
  };
}
