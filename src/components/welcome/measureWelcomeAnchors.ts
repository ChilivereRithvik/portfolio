import type { WelcomeAnchors } from "@/components/welcome/welcomeTaskTimeline";

function toRect(el: DOMRect) {
  return {
    x: el.left,
    y: el.top,
    w: el.width,
    h: el.height,
  };
}

export function measureWelcomeAnchors(
  panel: HTMLElement | null,
  title: HTMLElement | null,
  button: HTMLElement | null
): WelcomeAnchors | null {
  if (!panel || !title) return null;

  const panelDom = panel.getBoundingClientRect();
  const titleDom = title.getBoundingClientRect();
  const buttonDom = button?.getBoundingClientRect();

  const buttonTopLeft = buttonDom
    ? { x: buttonDom.left, y: buttonDom.top }
    : { x: 0, y: 0 };
  const buttonBottomRight = buttonDom
    ? { x: buttonDom.right, y: buttonDom.bottom }
    : { x: 0, y: 0 };

  return {
    panelTopLeft: { x: panelDom.left + 8, y: panelDom.top + 8 },
    panelBottomRight: {
      x: panelDom.right - 12,
      y: panelDom.bottom - 12,
    },
    titleCaret: {
      x: titleDom.left + 12,
      y: titleDom.top + titleDom.height * 0.55,
    },
    buttonTopLeft,
    buttonBottomRight,
    panelRect: toRect(panelDom),
    titleRect: toRect(titleDom),
    buttonRect: buttonDom ? toRect(buttonDom) : null,
  };
}
