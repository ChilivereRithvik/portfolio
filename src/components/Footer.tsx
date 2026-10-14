import { personalInfo } from "@/config/portfolio";
import { Mail } from "lucide-react";
import Link from "next/link";
import { GitHubIcon, LinkedInIcon, MediumIcon } from "@/components/ui/SocialIcons";
import { CurrentYear } from "@/components/CurrentYear";

export function Footer() {
  const socialLinks = personalInfo.socialLinks;

  const iconMap: Record<string, React.ElementType> = {
    github: GitHubIcon,
    linkedin: LinkedInIcon,
    medium: MediumIcon,
    gmail: Mail,
  };

  return (
    <footer className="border-t border-border py-8 mt-16">
      <div className="text-center space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">
            {personalInfo.name}
          </p>
          <p className="text-xs text-muted-foreground">
            Built with Next.js, shipped from {personalInfo.location}.
          </p>
        </div>

        <div className="flex items-center justify-center gap-4">
          {socialLinks.map((link) => {
            const Icon = iconMap[link.icon] || Mail;
            return (
              <Link
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label={link.name}
              >
                <Icon className="w-4 h-4" />
              </Link>
            );
          })}
          <a
            href={`mailto:${personalInfo.email}`}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        <p className="text-xs text-muted-foreground">
          © <CurrentYear /> {personalInfo.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
