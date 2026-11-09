export const personalInfo = {
  name: "Chiliveri Rithvik",
  displayName: "Rithvik",
  title: "Full-Stack Developer",
  location: "Hyderabad, India",
  heroHeadline:
    "I build high-performance web systems, mobile applications, and AI-powered automation.",
  profileImage: "/images/profile.png",
  email: "chiliveririthvik444@gmail.com",
  resumePath: "/images/Rithvik_Resume_V1.pdf",
  socialLinks: [
    {
      name: "GitHub",
      url: "https://github.com/ChilivereRithvik",
      icon: "github",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/ch-rithvik-b3338823a/",
      icon: "linkedin",
    },
    {
      name: "Medium",
      url: "https://medium.com/@chiliveririthvik444",
      icon: "medium",
    },
  ],
};

export const availability = {
  status: null,
  label: null,
};

export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  achievements: string[];
  metrics?: {
    label: string;
    value: string;
  }[];
  technologies: string[];
  links: {
    github?: string;
    live?: string;
  };
  status: "live" | "open-source" | "archived";
  contribution: "professional" | "individual";
  /** Shown in meta for individual work tied to an employer (e.g. solo delivery at Zeto). */
  employer?: string;
  image?: string;
  badge?: "live" | "development";
};

export const projects: Project[] = [
  {
    id: "trunkie",
    title: "Trunkie",
    category: "Enterprise EdTech Platform",
    description:
      "A multi-tenant education management platform with role-based access control, academic and administrative workflows, AI processing pipelines, school transport management, and cross-platform mobile functionality.",
    achievements: [
      "Supported a platform serving over 100,000 users.",
      "Implemented tenant-aware RBAC across 13 user roles.",
      "Reduced API response latency by over 80%, from ~3,000 ms to under 600 ms, through PostgreSQL query optimization, indexing, and Redis caching.",
      "Built asynchronous AI processing pipelines and background job orchestration with Inngest, including token consumption tracking and API usage metering.",
      "Developed a node-based visual workflow automation interface using React Flow.",
      "Developed school transport management with live bus tracking.",
      "Contributed cross-platform mobile functionality using React Native, Expo, and Expo Router.",
      "Contributed to production infrastructure using AWS ECS Fargate, RDS, ECR, S3, Terraform, Docker, and CI/CD.",
    ],
    metrics: [
      { label: "requests", value: "94,968" },
      { label: "concurrent users", value: "20" },
      { label: "peak throughput", value: "76.8 req/s" },
      { label: "pass rate", value: "93.3%" },
    ],
    technologies: [
      "TypeScript",
      "React.js",
      "Next.js",
      "React Native",
      "Expo",
      "Redux Toolkit",
      "Tailwind CSS",
      "Node.js",
      "PostgreSQL",
      "Redis",
      "Prisma",
      "React Flow",
      "Inngest",
      "AWS ECS Fargate",
      "AWS RDS",
      "Terraform",
      "Docker",
    ],
    links: {
      live: "https://trunkie.in",
    },
    status: "live",
    contribution: "professional",
    image: "/images/projects/trunkie-hero.jpg",
  },
  {
    id: "anantix",
    title: "Anantix",
    category: "Omnichannel AI Automation Platform",
    description:
      "An AI-powered customer operations and automation platform built around voice communication, WhatsApp, and email workflows.",
    achievements: [
      "Architected and developed the frontend using Next.js, Redux Toolkit, and shadcn/ui.",
      "Developed interfaces for managing AI agents, customer interactions, and automation workflows.",
      "Worked on automated voice communication using FreeSWITCH and dialplans for call routing and processing.",
      "Implemented asynchronous email automation using Inngest and cron-based scheduling.",
      "Integrated communication workflows across Voice, WhatsApp, and Email.",
      "Managed deployments on Railway and contributed to AWS ECS deployment automation through CI/CD pipelines.",
    ],
    technologies: [
      "TypeScript",
      "Next.js",
      "Redux Toolkit",
      "shadcn/ui",
      "FreeSWITCH",
      "Inngest",
      "Node.js",
      "Railway",
      "AWS ECS",
    ],
    links: {
      live: "https://anantix.ai",
    },
    status: "live",
    contribution: "professional",
    image: "/images/projects/anantix-hero.png",
  },
  {
    id: "call-the-doctor",
    title: "Call the Doctor",
    category: "Healthcare Platform",
    description:
      "A healthcare application across web, iOS, and Android covering frontend, backend APIs, authentication, payments, and location-based features.",
    achievements: [
      "Independently architected and developed using React.js, React Native, and the T3 Stack.",
      "Implemented REST APIs, backend business logic, and PostgreSQL integrations.",
      "Integrated Better Auth for authentication.",
      "Integrated Razorpay for payment processing.",
      "Used Google Maps APIs for real-time location tracking.",
      "Configured AWS EC2, Amazon S3, and Redis for hosting, object storage, and caching.",
      "Deployed web application and published mobile apps on App Store and Google Play Store.",
    ],
    technologies: [
      "TypeScript",
      "React.js",
      "React Native",
      "T3 Stack",
      "PostgreSQL",
      "Better Auth",
      "Razorpay",
      "Google Maps API",
      "AWS EC2",
      "AWS S3",
      "Redis",
    ],
    links: {
      live: "https://play.google.com/store/apps/details?id=com.callthedoctor.app",
    },
    image: "/images/projects/call-the-doctor-hero.png",
    status: "live",
    contribution: "individual",
    employer: "Zeto Studio",
  },
  {
    id: "ops-ai",
    title: "Ops AI",
    category: "AI Operations Platform",
    description:
      "An AI operations application focused on reusable UI components, authenticated workflows, and API-driven frontend functionality.",
    achievements: [
      "Developed reusable frontend components using React.js and shadcn/ui.",
      "Implemented JWT-based authentication.",
      "Integrated REST APIs through TanStack Query.",
      "Used asynchronous data fetching, caching, and server-state management.",
    ],
    technologies: ["React.js", "shadcn/ui", "JWT", "TanStack Query", "TypeScript"],
    links: {},
    image: "/images/projects/ops-ai-hero.png",
    status: "live",
    contribution: "professional",
  },
  {
    id: "agent-swarm-ui",
    title: "Agent Swarm UI",
    category: "Agent Orchestration UI",
    description:
      "An independent open-source UI for visualizing and driving multi-agent swarms, plus the agent skill that powers Agent Swarm UI workflows in Cursor.",
    achievements: [
      "Building the Agent Swarm UI repository and companion agent skill end to end.",
      "Designing interaction patterns for swarm coordination, task handoff, and live build feedback.",
      "Open-sourcing the project under the MIT license on GitHub.",
    ],
    technologies: ["TypeScript", "React.js", "Next.js", "Tailwind CSS"],
    links: {
      github: "https://github.com/ChilivereRithvik/agent-swarm-ui",
    },
    status: "open-source",
    contribution: "individual",
    image: "/images/projects/agent-swarm-ui-hero.jpg",
    badge: "development",
  },
  {
    id: "telephony-voice-bot",
    title: "Real-Time Telephony Voice Bot",
    category: "Voice AI & Telephony",
    description:
      "Built a production-style voice agent that handles live phone calls over Twilio. Users pick Telugu, Hindi, English, or Gujarati via IVR; speech is transcribed, answered by an LLM, and spoken back with low-latency TTS. A Python orchestrator coordinates STT → context → LLM → TTS, with multilingual switching, circuit breakers, and integration tests.",
    achievements: [
      "Live Twilio call handling with IVR language selection (Telugu, Hindi, English, Gujarati).",
      "Python orchestration pipeline: speech-to-text, conversational context, LLM replies, and text-to-speech.",
      "Low-latency multilingual switching on active calls.",
      "Circuit breakers and integration tests for production-style reliability.",
    ],
    technologies: [
      "Python",
      "Twilio",
      "IVR",
      "STT",
      "TTS",
      "LLM",
    ],
    links: {},
    status: "open-source",
    contribution: "individual",
    badge: "development",
    image: "/images/projects/telephony-voice-bot-hero.jpg",
  },
];

/** Side projects highlighted on the home page (below Experience). */
export const HOME_INDIVIDUAL_PROJECT_IDS = [
  "agent-swarm-ui",
  "telephony-voice-bot",
] as const;

export type OffTheClockGame = {
  name: string;
  href: string;
  detail: string;
  playerName?: string;
  playerTag?: string;
  images?: string[];
};

export const offTheClock = {
  title: "Off The Clock",
  subtitle: "Mobile games I play to unwind.",
  games: [
    {
      name: "Clash of Clans",
      playerName: "Rithvik",
      playerTag: "#GG0UUUYLV",
      href: "https://www.clashofstats.com/players/rithvik-GG0UUUYLV/summary",
      detail: "Village strategy & clan wars — view my Clash of Stats profile.",
      images: [
        "/images/off-the-clock/clash-of-clans-base.jpg",
        "/images/off-the-clock/clash-of-clans-profile.jpg",
      ],
    },
  ] satisfies OffTheClockGame[],
};

export type Experience = {
  id: string;
  role: string;
  company: string;
  location: string;
  duration: string;
  description: string;
  projects: { title: string; slug: string; category: string }[];
};

export const experiences: Experience[] = [
  {
    id: "zeto-senior",
    role: "Full Stack Developer",
    company: "Zeto Studio",
    location: "Hyderabad, India",
    duration: "May 2025 – Present",
    description:
      "Contributed to the development and deployment of enterprise applications across EdTech and AI-powered customer operations, including full-stack architecture, backend optimization, workflow automation, performance testing, and cloud infrastructure.",
    projects: [
      { title: "Trunkie", slug: "trunkie", category: "Enterprise EdTech Platform" },
      { title: "Anantix", slug: "anantix", category: "Omnichannel AI Automation Platform" },
    ],
  },
  {
    id: "zeto-intern",
    role: "Full Stack Developer Intern",
    company: "Zeto Studio",
    location: "Hyderabad, India",
    duration: "January 2025 – April 2025",
    description:
      "Contributed to healthcare and AI operations platform development, focusing on full-stack architecture, backend APIs, authentication, payments, and real-time features.",
    projects: [
      { title: "Call the Doctor", slug: "call-the-doctor", category: "Healthcare Platform" },
      { title: "Ops AI", slug: "ops-ai", category: "AI Operations Platform" },
    ],
  },
];

export type Technology = {
  name: string;
  category: "language" | "frontend" | "backend" | "database" | "ai" | "testing" | "devops" | "tools";
};

export const technologies: Technology[] = [
  // Languages
  { name: "TypeScript", category: "language" },
  { name: "JavaScript", category: "language" },
  { name: "Python", category: "language" },
  // Frontend
  { name: "React.js", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "React Native", category: "frontend" },
  { name: "Expo", category: "frontend" },
  { name: "Expo Router", category: "frontend" },
  { name: "Redux Toolkit", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "shadcn/ui", category: "frontend" },
  { name: "TanStack Query", category: "frontend" },
  { name: "React Flow", category: "frontend" },
  // Backend
  { name: "Node.js", category: "backend" },
  { name: "Express.js", category: "backend" },
  { name: "NestJS", category: "backend" },
  { name: "Fastify", category: "backend" },
  { name: "Bun", category: "backend" },
  { name: "tRPC", category: "backend" },
  { name: "REST APIs", category: "backend" },
  // Database
  { name: "PostgreSQL", category: "database" },
  { name: "MongoDB", category: "database" },
  { name: "Redis", category: "database" },
  { name: "Prisma", category: "database" },
  { name: "Drizzle ORM", category: "database" },
  { name: "JWT", category: "database" },
  { name: "Better Auth", category: "database" },
  { name: "Zod", category: "database" },
  // AI
  { name: "LangChain", category: "ai" },
  { name: "LangGraph", category: "ai" },
  { name: "Inngest", category: "ai" },
  { name: "FreeSWITCH", category: "ai" },
  { name: "API Usage Metering", category: "ai" },
  // Testing
  { name: "Grafana k6", category: "testing" },
  { name: "Playwright", category: "testing" },
  // DevOps
  { name: "AWS EC2", category: "devops" },
  { name: "AWS ECS Fargate", category: "devops" },
  { name: "AWS RDS", category: "devops" },
  { name: "AWS ECR", category: "devops" },
  { name: "AWS S3", category: "devops" },
  { name: "AWS Lambda", category: "devops" },
  { name: "Docker", category: "devops" },
  { name: "Terraform", category: "devops" },
  { name: "GitHub Actions", category: "devops" },
  { name: "Railway", category: "devops" },
  { name: "Vercel", category: "devops" },
  { name: "Git", category: "devops" },
  // Tools
  { name: "GitHub", category: "tools" },
  { name: "VS Code", category: "tools" },
  { name: "Figma", category: "tools" },
  { name: "Cursor", category: "tools" },
];

export const techCategories = [
  { id: "all", label: "All" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "language", label: "Languages" },
  { id: "database", label: "Database" },
  { id: "ai", label: "AI" },
  { id: "devops", label: "DevOps" },
  { id: "testing", label: "Testing" },
  { id: "tools", label: "Tools" },
];

export type Education = {
  institution: string;
  degree: string;
  duration: string;
};

export const education: Education = {
  institution: "Vidya Jyothi Institute of Technology",
  degree: "Bachelor of Technology — Computer Science and Engineering",
  duration: "2021–2025",
};

export type Blog = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  url: string;
};

export const blogs: Blog[] = [
  {
    id: "cron-vs-redis-notifications-vs-job-queues",
    title:
      "Cron vs Redis Notifications vs Job Queues: What Should You Actually Use?",
    excerpt:
      "While working on backend scheduling, how to trigger a job at the right time—and what happens when something goes wrong—with cron, Redis, and SQS.",
    date: "2026-10-24",
    readTime: "7 min read",
    tags: ["Redis", "AWS Lambda", "AWS SQS", "Caching"],
    url: "https://medium.com/@chiliveririthvik444/cron-vs-redis-notifications-vs-job-queues-what-should-you-actually-use-f481448c0337",
  },
  {
    id: "secure-voice-agent-freeswitch-python",
    title: "Building a Secure Voice Agent Architecture with FreeSWITCH and Python",
    excerpt:
      "How call routing, agent execution, tool calling, and security controls fit together in a real-time telephony system with dialplan, WebSockets, and rate limiting.",
    date: "2026-10-24",
    readTime: "12 min read",
    tags: [
      "FreeSWITCH",
      "AI Agents",
      "Distributed Systems",
      "Backend",
    ],
    url: "https://medium.com/@chiliveririthvik444/building-a-secure-voice-agent-architecture-with-freeswitch-and-python-dbe61091f245",
  },
  {
    id: "automating-outbound-call-campaigns",
    title: "Automating Outbound Call Campaigns with Redis and Inngest",
    excerpt:
      "Automatically trigger outbound calls at the scheduled time without constantly checking every campaign or creating Redis keys far in advance.",
    date: "2026-10-14",
    readTime: "8 min read",
    tags: ["Inngest", "Redis", "TypeScript", "AWS S3"],
    url: "https://medium.com/@chiliveririthvik444/automating-outbound-call-campaigns-with-redis-and-inngest-caa869bd950c",
  },
  {
    id: "calling-architecture-redis-inngest",
    title: "Building a Calling Architecture with Redis and Inngest",
    excerpt:
      "When building a calling system, handling the phone call is only one part—conversation data, call status, recordings, and post-call processing matter too.",
    date: "2026-10-14",
    readTime: "7 min read",
    tags: ["Redis", "Inngest", "PostgreSQL", "FreeSWITCH"],
    url: "https://medium.com/@chiliveririthvik444/building-a-calling-architecture-with-redis-and-inngest-787e506a00cc",
  },
];
