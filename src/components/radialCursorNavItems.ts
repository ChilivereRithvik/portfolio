import {
  BookOpen,
  Briefcase,
  FileUser,
  Home,
  Mail,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { personalInfo } from "@/config/portfolio";

export type RadialNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  external?: boolean;
};

export const radialCursorNavItems: RadialNavItem[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Projects", href: "/projects", icon: Briefcase },
  { label: "Blogs", href: "/blogs", icon: BookOpen },
  {
    label: "Connect",
    href: `mailto:${personalInfo.email}`,
    icon: Mail,
    external: true,
  },
  { label: "Experience", href: "/#experience", icon: Sparkles },
  { label: "Resume", href: "/resume", icon: FileUser },
];
