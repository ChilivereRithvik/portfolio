"use client";

import type { RefObject } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { offTheClock } from "@/config/portfolio";
import { useHomeBuild } from "@/components/home/HomeBuildContext";
import { cn } from "@/lib/utils";

type HomeOffTheClockProps = {
  sectionRef: RefObject<HTMLElement | null>;
  bodyRef: RefObject<HTMLDivElement | null>;
};

export function HomeOffTheClock({
  sectionRef,
  bodyRef,
}: HomeOffTheClockProps) {
  const build = useHomeBuild();
  const building = build.phase === "building";
  const visible = build.showOffClockSection || build.phase === "complete";

  const sectionOpacity =
    build.phase === "complete"
      ? 1
      : !visible
        ? 0
        : build.offClockLayoutP >= 1
          ? 1
          : build.offClockLayoutReveal;

  const contentOpacity =
    build.phase === "complete"
      ? 1
      : build.showOffClockContent
        ? build.offClockContentP
        : 0;

  return (
    <section
      ref={sectionRef}
      aria-hidden={building && !visible ? true : undefined}
      className={cn(
        "home-build-animated border-t border-dashed border-border pb-4",
        building && !visible && "pointer-events-none border-transparent"
      )}
      style={{ opacity: sectionOpacity }}
    >
      <div className="space-y-6 px-4 py-10 md:px-6">
        <header className="space-y-1">
          <h2 className="min-h-[1.75rem] text-xl font-semibold text-foreground">
            {build.phase === "complete"
              ? offTheClock.title
              : build.typedOffClockHeading || "\u00a0"}
          </h2>
          <p
            className="text-sm text-muted-foreground"
            style={{
              opacity: build.phase === "complete" ? 1 : build.offClockLayoutP,
            }}
          >
            {offTheClock.subtitle}
          </p>
        </header>

        <div
          ref={bodyRef}
          className={cn(
            "space-y-3 home-build-animated",
            building && !build.showOffClockContent && "pointer-events-none"
          )}
          style={{ opacity: contentOpacity }}
          data-offclock-body
        >
          {offTheClock.games.map((game) => (
            <a
              key={game.href}
              href={game.href}
              target="_blank"
              rel="noopener noreferrer"
              data-offclock-game
              className="group flex flex-col gap-4 border border-dashed border-border p-4 transition-colors hover:bg-muted/15"
            >
              {game.images && game.images.length > 0 ? (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {game.images.map((src, i) => (
                    <div
                      key={src}
                      className="relative aspect-[16/10] overflow-hidden rounded-md border border-dashed border-border bg-muted/20"
                    >
                      <Image
                        src={src}
                        alt={
                          i === 0
                            ? `${game.name} village`
                            : `${game.name} player profile`
                        }
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 640px) 100vw, 50vw"
                        unoptimized
                      />
                    </div>
                  ))}
                </div>
              ) : null}
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <span className="text-sm font-semibold text-foreground">
                    {game.name}
                  </span>
                  {game.playerName || game.playerTag ? (
                    <p className="text-xs font-medium text-foreground/90">
                      {game.playerName}
                      {game.playerName && game.playerTag ? (
                        <span className="text-muted-foreground/60"> · </span>
                      ) : null}
                      {game.playerTag ? (
                        <span className="font-mono text-muted-foreground">
                          {game.playerTag}
                        </span>
                      ) : null}
                    </p>
                  ) : null}
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {game.detail}
                  </p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-muted-foreground group-hover:text-foreground">
                  Profile
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
