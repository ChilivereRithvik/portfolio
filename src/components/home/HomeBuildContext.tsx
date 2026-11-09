"use client";

import { createContext, useContext, type ReactNode } from "react";
import type {
  ExperienceEntryPreview,
  WritingsCardPreview,
} from "@/components/home/homeBuildTimeline";

export type HomeBuildView = {
  phase: "idle" | "intro" | "building" | "complete";
  typedHeroTitle: string;
  typedHeroMeta: string;
  heroMetaFull: string;
  showHeroEmail: boolean;
  typedTechHeading: string;
  typedExperienceHeading: string;
  typedWritingsHeading: string;
  typedIndividualHeading: string;
  typedOffClockHeading: string;
  experienceEntryPreviews: ExperienceEntryPreview[];
  writingsCardPreviews: WritingsCardPreview[];
  showHeroImage: boolean;
  showHeroMeta: boolean;
  showHeroLinks: boolean;
  techPillCount: number;
  showTechSection: boolean;
  showExperienceSection: boolean;
  showExperienceEntries: boolean;
  showExperienceContent: boolean;
  showIndividualSection: boolean;
  showIndividualCards: boolean;
  showOffClockSection: boolean;
  showOffClockContent: boolean;
  showWritingsSection: boolean;
  showWritingsCards: boolean;
  showWritingsContent: boolean;
  showLowerSections: boolean;
  heroTypeWorking: boolean;
  heroTitleFull: string;
  heroShellP: number;
  heroLayoutP: number;
  heroTypeP: number;
  heroUiP: number;
  techLayoutP: number;
  techUiP: number;
  experienceLayoutP: number;
  experienceEntriesP: number;
  experienceContentP: number;
  individualLayoutP: number;
  individualCardsP: number;
  offClockLayoutP: number;
  offClockContentP: number;
  writingsLayoutP: number;
  writingsCardsP: number;
  writingsContentP: number;
  heroShellReveal: number;
  heroLayoutReveal: number;
  heroTypeReveal: number;
  heroUiReveal: number;
  techLayoutReveal: number;
  techUiReveal: number;
  experienceLayoutReveal: number;
  experienceEntriesReveal: number;
  experienceContentReveal: number;
  individualLayoutReveal: number;
  individualCardsReveal: number;
  offClockLayoutReveal: number;
  offClockContentReveal: number;
  writingsLayoutReveal: number;
  writingsCardsReveal: number;
  writingsContentReveal: number;
};

const defaultView: HomeBuildView = {
  phase: "complete",
  typedHeroTitle: "",
  typedHeroMeta: "",
  heroMetaFull: "",
  showHeroEmail: true,
  typedTechHeading: "",
  typedExperienceHeading: "",
  typedWritingsHeading: "",
  typedIndividualHeading: "Projects",
  typedOffClockHeading: "Off The Clock",
  experienceEntryPreviews: [],
  writingsCardPreviews: [],
  showHeroImage: true,
  showHeroMeta: true,
  showHeroLinks: true,
  techPillCount: Number.POSITIVE_INFINITY,
  showTechSection: true,
  showExperienceSection: true,
  showExperienceEntries: true,
  showExperienceContent: true,
  showIndividualSection: true,
  showIndividualCards: true,
  showOffClockSection: true,
  showOffClockContent: true,
  showWritingsSection: true,
  showWritingsCards: true,
  showWritingsContent: true,
  showLowerSections: true,
  heroTypeWorking: false,
  heroTitleFull: "",
  heroShellP: 1,
  heroLayoutP: 1,
  heroTypeP: 1,
  heroUiP: 1,
  techLayoutP: 1,
  techUiP: 1,
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
  heroShellReveal: 1,
  heroLayoutReveal: 1,
  heroTypeReveal: 1,
  heroUiReveal: 1,
  techLayoutReveal: 1,
  techUiReveal: 1,
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
};

const HomeBuildContext = createContext<HomeBuildView>(defaultView);

export function HomeBuildProvider({
  value,
  children,
}: {
  value: HomeBuildView;
  children: ReactNode;
}) {
  return (
    <HomeBuildContext.Provider value={value}>{children}</HomeBuildContext.Provider>
  );
}

export function useHomeBuild() {
  return useContext(HomeBuildContext);
}
