"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { personalInfo } from "@/config/portfolio";
import { cn } from "@/lib/utils";

const HalftoneReveal = dynamic(
  () => import("@/components/HalftoneReveal/HalftoneReveal"),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full animate-pulse bg-white/5" aria-hidden />
    ),
  }
);

type HeroProfileImageProps = {
  visible: boolean;
  opacity: number;
  preferHalftone?: boolean;
  className?: string;
};

export function HeroProfileImage({
  visible,
  opacity,
  preferHalftone = true,
  className,
}: HeroProfileImageProps) {
  const { profileImage, name } = personalInfo;

  if (!profileImage || !visible) {
    return null;
  }

  if (!preferHalftone) {
    return (
      <Image
        src={profileImage}
        alt={name}
        fill
        sizes="(max-width: 768px) 200px, 240px"
        className={cn("object-cover ease-out transition-opacity duration-500", className)}
        style={{ opacity }}
        unoptimized
        priority
      />
    );
  }

  return (
  <HalftoneReveal
      src={profileImage}
      mode="mono"
      shape="dot"
      cellSize={6}
      angle={45}
      inkColor="#d4d4d4"
      paperColor="#0a0a0a"
      revealRadius={120}
      dotScale={1}
      contrast={1.1}
      brightness={0}
      invert={false}
      roughness={0}
      misregistration={0}
      fit="cover"
      accentColor="#ff4f2a"
      softness={0.6}
      linger={1.2}
      reverse={false}
      wander={false}
      clickBurst
      intro
      className={className}
      style={{ opacity }}
    />
  );
}
