# Dev Portfolio Design Doc

## Overview
A Next.js 15 App Router portfolio mirroring the design language of https://nikhilsai.in — dashed borders, Tailwind CSS dark mode, Lucide icons, card-grid layouts, micro-animations, and status badges.

## Architecture

### Stack
- **Next.js 15** (App Router, React 19)
- **Tailwind CSS 4** (dark mode via class strategy)
- **Lucide React** (icons)
- **next/font** (Inter, Geist Mono for monospace)

### Directory Structure
```
portfolio/
├── app/
│   ├── layout.tsx          (root layout, theme provider, font setup)
│   ├── page.tsx            (hero + projects grid + labs + blog)
│   ├── projects/
│   │   └── page.tsx        (full projects listing)
│   ├── projects/[slug]/
│   │   └── page.tsx        (project detail page)
│   ├── lab/
│   │   └── page.tsx        (UI labs listing)
│   ├── lab/[slug]/
│   │   └── page.tsx        (lab detail page)
│   ├── blogs/
│   │   └── page.tsx        (blog listing)
│   └── blogs/[slug]/
│       └── page.tsx        (blog post page)
├── components/
│   ├── ui/                 (StatusBadge, Card, Button, Tag, etc.)
│   ├── Hero.tsx
│   ├── ProjectCard.tsx
│   ├── LabCard.tsx
│   ├── BlogCard.tsx
│   ├── SectionHeader.tsx
│   └── DashedContainer.tsx
├── data/
│   ├── projects.ts
│   ├── labs.ts
│   └── blogs.ts
├── lib/
│   └── utils.ts
├── styles/
│   └── globals.css
└── public/
    ├── favicon.ico
    └── images/
```

## Visual Language

### Signature Patterns
1. **Dashed borders** — `border-2 border-dashed border-border` as dividers, card edges, section separators
2. **Color accents** — rose→orange gradients for "Live" projects, amber for "Experimenting", emerald→teal for featured
3. **Monospace tags** — `font-mono text-xs uppercase tracking-widest` for category labels and status
4. **Line clamping** — `line-clamp-2` / `line-clamp-3` for description previews
5. **Hover micro-animations** — `group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5` on arrow icons, scale on badges

### Component Inventory
- `DashedContainer` — wrapper with dashed border, used for card containers
- `SectionHeader` — title + "View All" link in a dashed-bottom bar
- `StatusBadge` — colored pill: "Live", "Experimenting", "Exp / 01", etc.
- `Tag` — small monospace pill for categories (e.g., "Node.js", "React")
- `ProjectCard` — image preview, title, description, tags, status badge
- `LabCard` — square aspect preview, category tag, description
- `BlogCard` — read time, title, description, tags
- `Hero` — name, title, bio, social links
- `Nav` — top navigation with theme toggle

### Color Palette (Tailwind)
- Background: `bg-background` (white / `dark:bg-neutral-900`)
- Borders: `border-border` (subtle, dashed)
- Text: `text-neutral-900` (dark / `dark:text-neutral-50`)
- Muted: `text-neutral-500 dark:text-neutral-400`
- Status colors: rose/orange (Live), amber (Experimenting), emerald/teal (Featured)

## Data Model
```ts
type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  url: string;
  tags: string[];
  status: "live" | "experimenting" | "archived";
};

type Lab = {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
  category: string;
  experimentNumber: string;  // "Exp / 01"
  deps: number;              // dependency count badge
};

type Blog = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;          // "4 min read"
  tags: string[];
  href: string;
};
```

## Responsive Behavior
- Mobile: single column cards, compact spacing
- md+: two-column grid for labs and projects
- lg+: three-column grid for projects, larger typography

## Implementation Order
1. Scaffold Next.js app with Tailwind + dark mode
2. Create reusable UI components (DashedContainer, StatusBadge, Tag, Button)
3. Create section components (Hero, SectionHeader, ProjectCard, LabCard, BlogCard)
4. Create data files with seed content
5. Assemble homepage (page.tsx)
6. Create detail pages for each content type
7. Add theme toggle + font system
8. Add README and verify build

## Seed Data
- 3-4 example projects (mixing "Live" and "Experimenting" statuses)
- 2-3 UI labs with experiment numbering
- 3-4 blog posts with read times and dates
