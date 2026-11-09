"use client";

import type { CSSProperties, ReactNode, RefObject } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiArrowUpRight, HiOutlineDocumentText } from "react-icons/hi2";
import { personalInfo } from "@/config/portfolio";
import { EmailCopyBadge } from "@/components/EmailCopyBadge";
import { useHomeBuild } from "@/components/home/HomeBuildContext";
import {
  GitHubIcon,
  LinkedInIcon,
  MediumIcon,
} from "@/components/ui/SocialIcons";
import { cn } from "@/lib/utils";

type HeroLink = {
  name: string;
  href: string;
  icon: ReactNode;
  external?: boolean;
  className?: string;
};

type HeroProps = {
  sectionRef: RefObject<HTMLElement | null>;
  photoRef: RefObject<HTMLDivElement | null>;
  titleRef: RefObject<HTMLHeadingElement | null>;
  linksRef: RefObject<HTMLDivElement | null>;
};

function HeroLinkCard({
  name,
  href,
  icon,
  external,
  className,
  style,
}: HeroLink & { style?: CSSProperties }) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      style={style}
      className={cn(
        "group relative flex min-h-[4.25rem] flex-col items-center justify-center gap-2 border-border bg-transparent px-4 py-5 text-white transition-colors hover:bg-white/5 md:min-h-[4.5rem]",
        className
      )}
    >
      {icon}
      <span className="text-sm font-medium text-white">{name}</span>
      <HiArrowUpRight
        className="absolute right-3 top-3 h-3.5 w-3.5 text-white/50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
        aria-hidden
      />
    </Link>
  );
}

export function Hero({ sectionRef, photoRef, titleRef, linksRef }: HeroProps) {
  const build = useHomeBuild();
  const { profileImage, socialLinks, email, resumePath } = personalInfo;

  const github = socialLinks.find((link) => link.icon === "github");
  const linkedin = socialLinks.find((link) => link.icon === "linkedin");
  const medium = socialLinks.find((link) => link.icon === "medium");

  const heroLinks: HeroLink[] = [
    ...(github
      ? [
          {
            name: "Github",
            href: github.url,
            icon: <GitHubIcon className="h-5 w-5" />,
            external: true,
          },
        ]
      : []),
    ...(medium
      ? [
          {
            name: "Medium",
            href: medium.url,
            icon: <MediumIcon className="h-5 w-5" />,
            external: true,
          },
        ]
      : []),
    ...(linkedin
      ? [
          {
            name: "Linkedin",
            href: linkedin.url,
            icon: <LinkedInIcon className="h-5 w-5" />,
            external: true,
          },
        ]
      : []),
    ...(resumePath
      ? [
          {
            name: "Resume",
            href: resumePath,
            icon: <HiOutlineDocumentText className="h-5 w-5 text-white" />,
          },
        ]
      : []),
  ];

  const titleText =
    build.phase === "complete"
      ? `Hey Hi, I'm ${personalInfo.displayName}!`
      : build.phase === "building"
        ? build.typedHeroTitle || "\u00a0"
        : "\u00a0";

  const showTitleCaret =
    build.heroTypeWorking &&
    build.typedHeroTitle.length < build.heroTitleFull.length;

  const layoutOpacity =
    build.phase === "complete" ? 1 : Math.min(1, build.heroLayoutReveal);
  const metaOpacity =
    build.phase === "complete"
      ? 1
      : build.heroTypeP >= 1
        ? Math.min(1, build.heroUiP)
        : 0;
  const linksOpacity =
    build.phase === "complete" ? 1 : Math.min(1, build.heroUiP);

  const showMeta = build.showHeroMeta || build.phase === "complete";
  const showLinks = build.showHeroLinks || build.phase === "complete";

  return (
    <section
      ref={sectionRef}
      className="hero-surface -mx-4 border-b border-border"
    >
      <div className="grid grid-cols-1 items-center gap-6 px-4 py-8 md:grid-cols-12 md:gap-8 md:px-6 md:py-10">
        <div className="flex justify-center md:col-span-4 md:justify-center">
          <div
            ref={photoRef}
            className="relative aspect-square w-full max-w-[200px] overflow-hidden rounded-2xl md:max-w-[240px]"
          >
            {profileImage ? (
              <Image
                src={profileImage}
                alt={personalInfo.name}
                fill
                sizes="(max-width: 768px) 200px, 240px"
                className="object-cover transition-opacity duration-500 ease-out"
                style={{ opacity: layoutOpacity }}
                unoptimized
                priority
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted/30 text-5xl font-bold text-muted-foreground/50">
                {personalInfo.displayName.slice(0, 2).toUpperCase()}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-center gap-3 md:col-span-8 md:pr-2">
          <h1
            ref={titleRef}
            className={cn(
              "text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl",
              build.phase === "building" ? "min-h-[1.2em]" : "min-h-[2.5rem]"
            )}
          >
            {titleText}
            {showTitleCaret ? (
              <span className="welcome-type-caret ml-0.5 inline-block h-[1.1em] w-0.5 translate-y-0.5 bg-white align-middle" />
            ) : null}
          </h1>
          {showMeta ? (
            <div
              className="space-y-3"
              style={{ opacity: metaOpacity }}
            >
              <p className="text-sm text-white/80 md:text-base">
                {personalInfo.title} · {personalInfo.location}
              </p>
              <EmailCopyBadge email={email} />
            </div>
          ) : null}
        </div>
      </div>

      <div
        ref={linksRef}
        className={cn(
          "grid min-h-[4.25rem] grid-cols-2 divide-x divide-y divide-border border-t border-border bg-[#0a0a0a] md:min-h-[4.5rem] md:grid-cols-4 md:divide-y-0",
          !showLinks && "pointer-events-none opacity-0 max-h-0 min-h-0 overflow-hidden border-t-0"
        )}
      >
        {heroLinks.map((link) => (
          <HeroLinkCard
            key={link.name}
            {...link}
            style={{
              opacity: build.phase === "complete" ? 1 : linksOpacity,
            }}
          />
        ))}
      </div>
    </section>
  );
}
