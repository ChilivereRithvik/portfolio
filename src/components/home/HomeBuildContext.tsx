"use client";

import { createContext, useContext, type ReactNode } from "react";

export type HomeBuildView = {
  phase: "idle" | "building" | "complete";
  typedHeroTitle: string;
  typedTechHeading: string;
  showHeroImage: boolean;
  showHeroMeta: boolean;
  showHeroLinks: boolean;
  techPillCount: number;
  showTechSection: boolean;
  showLowerSections: boolean;
  heroTypeWorking: boolean;
  heroTitleFull: string;
  heroLayoutP: number;
  heroTypeP: number;
  heroUiP: number;
  techLayoutP: number;
  techUiP: number;
  heroLayoutReveal: number;
  heroTypeReveal: number;
  heroUiReveal: number;
  techLayoutReveal: number;
  techUiReveal: number;
};

const defaultView: HomeBuildView = {
  phase: "complete",
  typedHeroTitle: "",
  typedTechHeading: "",
  showHeroImage: true,
  showHeroMeta: true,
  showHeroLinks: true,
  techPillCount: Number.POSITIVE_INFINITY,
  showTechSection: true,
  showLowerSections: true,
  heroTypeWorking: false,
  heroTitleFull: "",
  heroLayoutP: 1,
  heroTypeP: 1,
  heroUiP: 1,
  techLayoutP: 1,
  techUiP: 1,
  heroLayoutReveal: 1,
  heroTypeReveal: 1,
  heroUiReveal: 1,
  techLayoutReveal: 1,
  techUiReveal: 1,
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
