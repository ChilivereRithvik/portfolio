import Image from "next/image";
import Link from "next/link";
import { Mail, Download } from "lucide-react";
import { personalInfo } from "@/config/portfolio";
import { Tag } from "@/components/ui/Tag";
import { GitHubIcon, LinkedInIcon, MediumIcon } from "@/components/ui/SocialIcons";

export function Hero() {
  const { profileImage, socialLinks, email, resumePath } = personalInfo;

  const iconMap: Record<string, React.ElementType> = {
    github: GitHubIcon,
    linkedin: LinkedInIcon,
    medium: MediumIcon,
    gmail: Mail,
  };

  return (
    <section className="py-16">
      <div className="space-y-8">
        <div className="flex items-start gap-6">
          <div className="shrink-0">
            {profileImage ? (
              <Image
                src={profileImage}
                alt={personalInfo.name}
                width={80}
                height={80}
                className="rounded-full object-cover"
                unoptimized
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center text-2xl font-semibold text-foreground">
                CR
              </div>
            )}
          </div>
          <div className="space-y-4 flex-1">
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Hey Hi, I&apos;m{" "}
                <span className="font-semibold text-foreground">
                  {personalInfo.displayName}
                </span>
                !
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                {personalInfo.title}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                {personalInfo.location}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {personalInfo.statusLabels.map((label) => (
                <Tag key={label} variant="outline">
                  {label}
                </Tag>
              ))}
            </div>

            <p className="text-sm text-foreground max-w-md">
              {personalInfo.heroHeadline}
            </p>
            <p className="text-sm text-muted-foreground max-w-md">
              {personalInfo.description}
            </p>

            <div className="flex items-center gap-4 pt-2">
              {socialLinks.map((link) => {
                const Icon = iconMap[link.icon] || Mail;
                return (
                  <Link
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                    {link.name}
                  </Link>
                );
              })}
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="w-4 h-4" />
                Email
              </a>
              {resumePath && (
                <Link
                  href={resumePath}
                  className="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Resume
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
