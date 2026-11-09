"use client";

import { useRef } from "react";
import { Hero } from "@/components/Hero";
import { TechStack } from "@/components/TechStack";
import { HomeAgentBuild } from "@/components/home/HomeAgentBuild";
import { HomeExperience } from "@/components/home/HomeExperience";
import { HomeWritings } from "@/components/home/HomeWritings";
import { blogs, experiences } from "@/config/portfolio";

export function HomePageContent() {
  const heroShellRef = useRef<HTMLElement>(null);
  const heroPhotoRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroCopyRef = useRef<HTMLDivElement>(null);
  const heroLinksRef = useRef<HTMLDivElement>(null);
  const techSectionRef = useRef<HTMLElement>(null);
  const techHeadingRef = useRef<HTMLHeadingElement>(null);
  const techPillsRef = useRef<HTMLDivElement>(null);
  const experienceSectionRef = useRef<HTMLElement>(null);
  const experienceBodyRef = useRef<HTMLDivElement>(null);
  const writingsSectionRef = useRef<HTMLElement>(null);
  const writingsGridRef = useRef<HTMLDivElement>(null);

  return (
    <HomeAgentBuild
      heroShellRef={heroShellRef}
      heroPhotoRef={heroPhotoRef}
      heroTitleRef={heroTitleRef}
      heroCopyRef={heroCopyRef}
      heroLinksRef={heroLinksRef}
      techSectionRef={techSectionRef}
      techHeadingRef={techHeadingRef}
      techPillsRef={techPillsRef}
      experienceSectionRef={experienceSectionRef}
      experienceBodyRef={experienceBodyRef}
      writingsSectionRef={writingsSectionRef}
      writingsGridRef={writingsGridRef}
    >
      <main className="pb-16">
        <div className="space-y-0">
          <Hero
            sectionRef={heroShellRef}
            photoRef={heroPhotoRef}
            titleRef={heroTitleRef}
            copyRef={heroCopyRef}
            linksRef={heroLinksRef}
          />

          <TechStack
            sectionRef={techSectionRef}
            headingRef={techHeadingRef}
            pillsRef={techPillsRef}
          />

          <HomeExperience
            sectionRef={experienceSectionRef}
            bodyRef={experienceBodyRef}
            experiences={experiences}
          />

          <HomeWritings
            sectionRef={writingsSectionRef}
            gridRef={writingsGridRef}
            blogs={blogs}
          />
        </div>
      </main>
    </HomeAgentBuild>
  );
}
