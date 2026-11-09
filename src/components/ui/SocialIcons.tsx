import { FaLinkedin } from "react-icons/fa6";
import { SiGithub, SiGmail, SiMedium } from "react-icons/si";
import { cn } from "@/lib/utils";

type IconProps = {
  className?: string;
};

export function GmailIcon({ className }: IconProps) {
  return (
    <SiGmail
      className={cn("h-4 w-4 shrink-0 text-[#EA4335]", className)}
      aria-hidden
    />
  );
}

export function GitHubIcon({ className }: IconProps) {
  return (
    <SiGithub className={cn("h-5 w-5 text-white", className)} aria-hidden />
  );
}

export function LinkedInIcon({ className }: IconProps) {
  return (
    <FaLinkedin
      className={cn("h-5 w-5 text-[#0a66c2]", className)}
      aria-hidden
    />
  );
}

export function MediumIcon({ className }: IconProps) {
  return (
    <SiMedium
      className={cn("h-5 w-5 text-[#ff5722]", className)}
      aria-hidden
    />
  );
}
