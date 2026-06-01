# Irza's Portfolio Website

## Project Snapshot
A modern, single-package Next.js portfolio website leveraging the App Router. The tech stack focuses heavily on animations and 3D experiences using React 19, TypeScript, Tailwind CSS, Framer Motion, GSAP, and Three.js. It incorporates component libraries like Shadcn UI and custom Animate UI modules.

## Root Setup Commands
- Install dependencies: `npm install`
- Start development server: `npm run dev`
- Build for production: `npm run build`
- Run linter: `npm run lint`

## Universal Conventions
- **Routing**: Follows Next.js 16 App Router conventions (`app/page.tsx`, `app/layout.tsx`).
- **Styling**: Uses Tailwind CSS. Merge classes dynamically using `cn()` from `@/lib/utils`.
- **Animations**: Prefer `framer-motion` for state-driven UI animations and `gsap` for complex scroll/timeline sequences. Respect mobile performance (e.g., `will-change-transform`, disable heavy effects when out of view).
- **Client vs Server Components**: Mark interactive or animated components with `"use client";` at the very top. Keep data-fetching or static layouts as Server Components by default.

## Security & Secrets
- Never commit actual API keys or secrets. Use `.env.local` for local secrets and prefix public variables with `NEXT_PUBLIC_`.
- Do not expose PII or sensitive data in client bundles.

## JIT Index
### Key Directories
- Next.js App Router: `app/`
- Standard UI Components (Shadcn): `components/ui/`
- Animated UI Components: `components/animate-ui/`
- Portfolio Feature Components: `components/portfolio/`
- Utility Functions: `lib/`

### Quick Find Commands
- Search for Shadcn UI components: `rg -n "export.*" components/ui`
- Find portfolio sections: `rg -n "export function .*Section" components/portfolio`
- Search for animation components: `rg -n "export.*" components/animate-ui components/react-bits`
- Find main content/data file: `cat components/portfolio/content.ts`

## Pre-PR Checks
Before committing changes, always ensure the build succeeds to catch TypeScript and Next.js static generation errors:
`npm run build`
