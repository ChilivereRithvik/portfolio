import type { HomeBuildView } from "@/components/home/HomeBuildContext";

/** Static hero/nav shell before agents start (anchors not measured yet). */
export function homeBuildShellView(heroTitleFull: string): HomeBuildView {
  return {
    phase: "building",
    typedHeroTitle: "",
    typedTechHeading: "",
    showHeroImage: true,
    showHeroMeta: false,
    showHeroLinks: false,
    techPillCount: 0,
    showTechSection: false,
    showLowerSections: false,
    heroTypeWorking: false,
    heroTitleFull,
    heroLayoutP: 0,
    heroTypeP: 0,
    heroUiP: 0,
    techLayoutP: 0,
    techUiP: 0,
    heroLayoutReveal: 0,
    heroTypeReveal: 0,
    heroUiReveal: 0,
    techLayoutReveal: 0,
    techUiReveal: 0,
  };
}
