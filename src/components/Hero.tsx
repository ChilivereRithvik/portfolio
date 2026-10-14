import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";
import { personalInfo } from "@/config/portfolio";
import { GitHubIcon, LinkedInIcon, MediumIcon } from "@/components/ui/SocialIcons";

export function Hero() {
  const { profileImage, socialLinks, email, resumePath } = personalInfo;

  const iconMap: Record<string, React.ElementType> = {
    github: GitHubIcon,
    linkedin: LinkedInIcon,
    medium: MediumIcon,
    gmail: Mail,
  };

  const socialItems = [
    ...socialLinks,
    ...(resumePath
      ? [{ name: "Resume", url: resumePath, icon: "resume" as const }]
      : []),
    { name: "Email", url: `mailto:${email}`, icon: "gmail" as const },
  ];

  return (
    <section className="border-t border-border py-16 bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-2 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[280px] lg:max-w-none aspect-[3/4] border border-[#262626] rounded-[32px] overflow-hidden bg-muted">
            {profileImage ? (
              <Image
                src={profileImage}
                alt={personalInfo.name}
                fill
                sizes="(max-width: 1024px) 280px, 40vw"
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-6xl font-bold text-muted-foreground/50">
                CR
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-3 flex flex-col justify-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Hey Hi, I&apos;m{" "}
                <span className="font-semibold text-foreground">
                  {personalInfo.displayName}
                </span>
                !
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                {personalInfo.title}
              </h1>
              <p className="text-sm text-muted-foreground">
                {personalInfo.location}
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-sm md:text-base text-foreground max-w-md">
                {personalInfo.heroHeadline}
              </p>
            </div>

            <div className="flex flex-wrap gap-4 items-center pt-2">
              {socialItems.map((link) => {
                const Icon = iconMap[link.icon] || Mail;
                return (
                  <Link
                    key={link.name}
                    href={link.url}
                    target={link.url.startsWith("http") ? "_blank" : undefined}
                    rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
