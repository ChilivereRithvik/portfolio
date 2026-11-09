import type { IconType } from "react-icons";
import { FaAws } from "react-icons/fa6";
import {
  HiBolt,
  HiChartBar,
  HiGlobeAlt,
  HiPhone,
} from "react-icons/hi2";
import {
  TbBrandReactNative,
  TbBrandVscode,
  TbTestPipe,
} from "react-icons/tb";
import {
  SiBetterauth,
  SiBun,
  SiCursor,
  SiDocker,
  SiDrizzle,
  SiExpress,
  SiExpo,
  SiFastify,
  SiFigma,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiJavascript,
  SiJsonwebtokens,
  SiK6,
  SiLangchain,
  SiLanggraph,
  SiMongodb,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiRailway,
  SiReact,
  SiReactquery,
  SiReactrouter,
  SiRedis,
  SiRedux,
  SiShadcnui,
  SiTailwindcss,
  SiTerraform,
  SiTrpc,
  SiTypescript,
  SiVercel,
  SiXyflow,
  SiZod,
} from "react-icons/si";
import { cn } from "@/lib/utils";

const TECH_ICONS: Record<string, IconType> = {
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  Python: SiPython,
  "React.js": SiReact,
  "Next.js": SiNextdotjs,
  "React Native": TbBrandReactNative,
  Expo: SiExpo,
  "Expo Router": SiReactrouter,
  "Redux Toolkit": SiRedux,
  "Tailwind CSS": SiTailwindcss,
  "shadcn/ui": SiShadcnui,
  "TanStack Query": SiReactquery,
  "React Flow": SiXyflow,
  "Node.js": SiNodedotjs,
  "Express.js": SiExpress,
  NestJS: SiNestjs,
  Fastify: SiFastify,
  Bun: SiBun,
  tRPC: SiTrpc,
  "REST APIs": HiGlobeAlt,
  PostgreSQL: SiPostgresql,
  MongoDB: SiMongodb,
  Redis: SiRedis,
  Prisma: SiPrisma,
  "Drizzle ORM": SiDrizzle,
  JWT: SiJsonwebtokens,
  "Better Auth": SiBetterauth,
  Zod: SiZod,
  LangChain: SiLangchain,
  LangGraph: SiLanggraph,
  Inngest: HiBolt,
  FreeSWITCH: HiPhone,
  "API Usage Metering": HiChartBar,
  "Grafana k6": SiK6,
  Playwright: TbTestPipe,
  "AWS EC2": FaAws,
  "AWS ECS Fargate": FaAws,
  "AWS RDS": FaAws,
  "AWS ECR": FaAws,
  "AWS S3": FaAws,
  "AWS Lambda": FaAws,
  Docker: SiDocker,
  Terraform: SiTerraform,
  "GitHub Actions": SiGithubactions,
  Railway: SiRailway,
  Vercel: SiVercel,
  Git: SiGit,
  GitHub: SiGithub,
  "VS Code": TbBrandVscode,
  Figma: SiFigma,
  Cursor: SiCursor,
};

/** Brand tints on dark pills (fallback: currentColor). */
const TECH_ICON_COLORS: Partial<Record<string, string>> = {
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  Python: "#3776AB",
  "React.js": "#61DAFB",
  "Next.js": "#ffffff",
  "Node.js": "#339933",
  MongoDB: "#47A248",
  PostgreSQL: "#4169E1",
  Redis: "#DC382D",
  Docker: "#2496ED",
  "AWS EC2": "#FF9900",
  "AWS ECS Fargate": "#FF9900",
  "AWS RDS": "#FF9900",
  "AWS ECR": "#FF9900",
  "AWS S3": "#FF9900",
  "AWS Lambda": "#FF9900",
  GitHub: "#ffffff",
  Figma: "#F24E1E",
  Vercel: "#ffffff",
  "Tailwind CSS": "#38BDF8",
  "Grafana k6": "#F46800",
  Playwright: "#2EAD33",
  Inngest: "#6366F1",
};

type TechIconProps = {
  name: string;
  className?: string;
};

export function TechIcon({ name, className }: TechIconProps) {
  const Icon = TECH_ICONS[name] ?? HiGlobeAlt;
  const tint = TECH_ICON_COLORS[name];

  return (
    <Icon
      className={cn("h-3.5 w-3.5 shrink-0", className)}
      style={tint ? { color: tint } : undefined}
      aria-hidden
    />
  );
}
