# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Peer engineers, tech collaborators, engineering leaders, and hiring managers exploring agentic tools, architecture patterns, shared infrastructure, and assessing senior frontend/DX craft.

## Product Purpose
Dual-purpose web surface:
1. Editorial engineering portfolio establishing Sam Johnson's background, engineering manifesto, and working set.
2. Active frontend gateway hub for three upcoming system consoles:
   - Generative UI Dashboard (`app/systems/generative-ui` / embedded console)
   - Self-Healing Web Scraper (`app/systems/scraper` with external compute API/SSE)
   - System Three (TBD)

Success means delivering a tactile, high-craft editorial reading experience while seamlessly hosting live, runnable agentic system interfaces without cognitive or aesthetic clash.

## Positioning
"Build the system · Leave the map · Make the hard part feel human."
Unlike generic software engineer portfolios relying on bulleted resumes and boilerplate screenshots, this platform treats systems thinking, developer enablement, and craft as a unified discipline—combining editorial rigor with active, runnable gateway surfaces.

## Operating Context
- Environments: Desktop and mobile web, evaluated in browsers by technical peers, engineering leaders, and collaborators.
- Architecture: Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4 running on Cloudflare Workers / Vite (`vinext`).
- Gateway console integration: Hybrid hosting of static editorial content alongside live client/server interactive consoles (SSE, async workers, generative components).

## Capabilities and Constraints
- Server-First (RSC): Core route pages (`/`, `/work`, `/profile`, `/contact`) and layouts are Server Components by default.
- Isolated Leaf Hydration: Client boundaries reserved strictly for interactive leaves (`LiveClock`, `NavRail`, `ProjectArchive`, and live consoles).
- Zero Waterfalls: Independent data fetches parallelized with `Promise.all()`.
- Typed persistence: Drizzle ORM (`drizzle-orm`, `drizzle-kit`) for data access; untyped raw SQL strings prohibited.
- Platform runtime: Cloudflare Workers runtime compatibility (`vinext`), keeping bundle footprints lean and cold starts minimal.

## Brand Commitments
- Name & Identity: Sam Asa Johnson (Sam Johnson), Austin, Texas.
- Mark: Custom snake emblem mark (`/sam-johnson-snake-mark.png`, `BrandMark.tsx`, `BrandEmblem.tsx`).
- Voice & Tone: Editorial, authoritative, grounded, restrained yet deeply crafted. Georgia serif italics for emphasis, tight sans tracking for display headings, uppercase monospace micro-labels (`font-mono text-[7px] tracking-widest`).
- Palette & Tactile Tokens: Warm paper canvas (`--paper: #f2eadc`, `--paper-light: #faf5ea`, `--paper-deep: #dfd1bc`), rich ink (`--ink: #191b18`), intentional accents (`--rust: #b64c31`, `--indigo: #263b61`, `--moss: #67745a`, `--cedar: #805b42`, `--yellow: #d6a934`).
- Anti-Slop: Anti-AI boilerplate aesthetic; no generic purple gradients, no cookie-cutter templates, no unstyled system defaults.

## Evidence on Hand
- Working archive projects: Accounting analysis & reporting (full-stack financial workflow), Shared component infrastructure (React design systems / DX), AI-enabled engineering practice (agentic workflows & steering).
- Live Austin CT local clock (`America/Chicago`), active navigation tracking, and editorial manifesto ("READING ROOM / 03").
- Upcoming system consoles in planning/implementation: Generative UI dashboard, Self-healing web scraper.

## Product Principles
1. Systems, not screens: Every surface is part of a coherent architecture and design system, not isolated one-off pages.
2. The hard part made human: Complex technical mechanisms (finance rules, agent loops, AST parsers) presented with editorial clarity and legibility.
3. Leaf-level interactivity: Fast, rock-solid server-rendered foundation with surgical client hydration only where genuine live interaction happens.
4. Tactile integrity: Physical print sensibility (paper, ink, editorial framing, meticulous typography) applied to modern web and agentic tooling.

## Accessibility & Inclusion
- High-contrast text compliance against paper background tokens.
- Accessible semantic HTML structure with ARIA landmark attributes (`tablist`, `tab`, `tabpanel`, `navigation`).
- Reduced motion consideration for subtle micro-interactions and transitions.
