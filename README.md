# Dev Portfolio

A developer portfolio built with Next.js 15, TypeScript, and Tailwind CSS, inspired by [nikhilsai.in](https://nikhilsai.in). Features a clean, minimal design with solid borders, subtle card shadows, responsive layouts, and dark mode support.

## Getting Started

```bash
npm install
npm run dev
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with navigation and footer
│   ├── page.tsx            # Homepage (Hero, TechStack, Projects, Experience, GitHub, Blogs)
│   ├── globals.css         # Tailwind CSS with custom color system
│   ├── projects/
│   │   ├── page.tsx        # Full projects listing
│   │   └── [slug]/page.tsx # Project detail page (statically generated)
│   ├── blogs/
│   │   ├── page.tsx        # Blog listing
│   │   └── [slug]/page.tsx # Blog post page (statically generated)
│   └── globals.css
├── components/
│   ├── Hero.tsx            # Hero with profile placeholder and social links
│   ├── TechStack.tsx       # Technology chips with category filters
│   ├── ProjectCard.tsx     # Project card + grid components
│   ├── Experience.tsx      # Professional experience timeline
│   ├── GitHubContributions.tsx
│   ├── Footer.tsx
│   ├── ThemeToggle.tsx
│   ├── CurrentYear.tsx
│   └── ui/
│       ├── Card.tsx        # Card wrapper component
│       ├── Tag.tsx         # Technology tag component
│       ├── StatusBadge.tsx # Status badge (Live, Open Source, Archived)
│       └── SocialIcons.tsx # GitHub, LinkedIn, Medium SVG icons
├── config/
│   └── portfolio.ts        # Central content config (personal info, projects, experience, etc.)
├── lib/
│   └── utils.ts            # Utility functions (cn helper)
└── public/
    └── favicon.ico
```

## Adding Content

All portfolio content lives in `src/config/portfolio.ts`:

- **Projects**: Add entries to the `projects` array — automatically gets a detail page at `/projects/:id`
- **Experience**: Add entries to the `experiences` array
- **Technologies**: Add entries to the `technologies` array
- **Blogs**: Add entries to the `blogs` array
- **Social Links**: Configure in `personalInfo.socialLinks`

Set `profileImage: "/images/profile.jpg"` to use a real photo instead of the `CR` placeholder.

## Tech Stack

- **Framework**: Next.js 15 (App Router, static generation)
- **Styling**: Tailwind CSS 4 with custom CSS variables
- **Icons**: Lucide React + inline SVG social icons
- **TypeScript**: Strict mode enabled
- **Linting**: ESLint with Next.js config
# portfolio
