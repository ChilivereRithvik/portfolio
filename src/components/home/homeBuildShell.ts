import type { HomeBuildView } from "@/components/home/HomeBuildContext";
import { HERO_META_LINE } from "@/components/home/homeBuildTimeline";

/** Static hero/nav shell before agents start (anchors not measured yet). */
export function homeBuildShellView(heroTitleFull: string): HomeBuildView {
  return {
    phase: "building",
    typedHeroTitle: "",
    typedHeroMeta: "",
    heroMetaFull: HERO_META_LINE,
    showHeroEmail: false,
    typedTechHeading: "",
    showHeroImage: false,
    showHeroMeta: false,
    showHeroLinks: false,
    techPillCount: 0,
    showTechSection: false,
    showLowerSections: false,
    heroTypeWorking: false,
    heroTitleFull,
    heroShellP: 0,
    heroLayoutP: 0,
    heroTypeP: 0,
    heroUiP: 0,
    techLayoutP: 0,
    techUiP: 0,
    heroShellReveal: 0,
    heroLayoutReveal: 0,
    heroTypeReveal: 0,
    heroUiReveal: 0,
    techLayoutReveal: 0,
    techUiReveal: 0,
  };
}
