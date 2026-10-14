import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, FileText } from "lucide-react";
import { personalInfo } from "@/config/portfolio";
import { EmailCopyBadge } from "@/components/EmailCopyBadge";
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

function HeroLinkCard({ name, href, icon, external, className }: HeroLink) {
  return (
       <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(
                "group relative flex min-h-[4.5rem] items-center gap-3 border-b border-border px-5 py-4 transition-colors hover:bg-muted/40 last:border-b-0 sm:border-b-0 sm:border-r sm:[&:nth-child(2)]:border-r-0 sm:last:border-r-0",
        className
      )}
    >
      {icon}
      <span className="text-sm font-medium text-foreground">{name}</span>
      <ArrowUpRight
        className="absolute right-4 top-4 h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        aria-hidden
      />
    </Link>
  );
}

export function Hero() {
  const { profileImage, socialLinks, email, resumePath } = personalInfo;

  const github = socialLinks.find((link) => link.icon === "github");
  const linkedin = socialLinks.find((link) => link.icon === "linkedin");
  const medium = socialLinks.find((link) => link.icon === "medium");

  const heroLinks: HeroLink[] = [
    // {
    //   name: "Gmail",
    //   href: `mailto:${email}`,
    //   icon: <GmailIcon />,
    // },
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
            icon: <FileText className="h-5 w-5 text-foreground" strokeWidth={1.5} />,
          },
        ]
      : []),
  ];

  return (
       <section className="-mx-4 border-b border-border bg-background">
      <div className="grid grid-cols-1 md:grid-cols-[minmax(220px,280px)_1fr]">
        <div className="flex items-center justify-center border-b border-border p-6 md:border-b-0">
          <div className="relative aspect-square w-full max-w-[220px] overflow-hidden rounded-2xl bg-muted md:max-w-none">
            {profileImage ? (
              <Image
                src={profileImage}
                alt={personalInfo.name}
                fill
                sizes="(max-width: 768px) 220px, 280px"
                className="object-cover"
                unoptimized
                priority
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-5xl font-bold text-muted-foreground/50">
                {personalInfo.displayName.slice(0, 2).toUpperCase()}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-center gap-4 px-6 py-10 md:px-10 md:py-12">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            Hey Hi, I&apos;m {personalInfo.displayName}!
          </h1>
          <p className="text-sm text-muted-foreground md:text-base">
            {personalInfo.title} · {personalInfo.location}
          </p>
          <EmailCopyBadge email={email} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-border">
        {heroLinks.map((link) => (
          <HeroLinkCard key={link.name} {...link} />
        ))}
      </div>
    </section>
  );
}
