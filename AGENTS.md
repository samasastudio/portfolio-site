# Agent Steering & Project Rules

## 1. Always-On Communication Style: Caveman Mode
- **Always active**: Adhere strictly to the [`caveman`](./.agents/skills/caveman/SKILL.md) skill on every turn.
- **Drop fluff & pleasantries**: Never say *"Certainly"*, *"Sure"*, *"I'd be happy to help"*, *"Of course"*, or conversational filler (*"basically"*, *"actually"*, *"simply"*).
- **High-density brevity**: Speak in short phrases, fragments, and direct bullet points.
- **Preserve technical exactness**: Code blocks, diffs, terminal commands, file paths, and error traces remain 100% exact and complete.
- **Safety override**: Revert to full clarity only for destructive operations or critical security warnings.

---

## 2. Project Stack & Invariants
- **Framework**: Next.js 16 (App Router) + React 19 + TypeScript + Vite / Cloudflare Workers runtime (`vinext`).
- **Database**: Drizzle ORM (`drizzle-orm`, `drizzle-kit`). All data access must use typed Drizzle schema definitions; never write raw untyped SQL strings.
- **Styling**: Tailwind CSS v4 (`@tailwindcss/postcss`). Never use arbitrary inline CSS strings when classes/variables exist.

---

## 3. Architecture & Component Standards
- **Server-First (RSC)**: Keep all pages and layouts in `app/` as Server Components by default. Only add `'use client'` to tiny, interactive leaf nodes.
- **Zero Waterfalls**: Always parallelize independent async data fetches using `Promise.all()`.
- **Component Composition**: Avoid boolean prop proliferation (e.g. `isOpen`, `isCompact`, `withBadge`). Use compound components (`Component.Root`, `Component.Header`, `Component.Content`) and slots.

---

## 4. Visual Identity & Design System
- **Theme Variables**: Always reference the project's CSS variables defined in [`app/globals.css`](./app/globals.css):
  - Base Paper: `--paper` (`#f2eadc`), `--paper-light` (`#faf5ea`), `--paper-deep` (`#dfd1bc`)
  - Ink: `--ink` (`#191b18`)
  - Accents: `--rust` (`#b64c31`), `--indigo` (`#263b61`), `--moss` (`#67745a`), `--cedar` (`#805b42`), `--yellow` (`#d6a934`)
  - Transitions: `--ease` (`cubic-bezier(.16, 1, .3, 1)`)
- **Typographic Hierarchy**:
  - Headings: Display sans with tight tracking.
  - Emphasis: Georgia serif italics (`em`).
  - Metadata / Micro-labels: Uppercase monospace (`font-mono text-[7px] tracking-widest`).
- **Anti-AI Slop**: No generic purple-on-white gradients, unstyled system fonts, or cookie-cutter templates. Preserve tactile noise textures, subtle drop shadows, and editorial framing.

---

## 5. Engineering Workflows & Verification
- Follow the workflows defined in [`docs/ENGINEERING_WORKFLOWS.md`](./docs/ENGINEERING_WORKFLOWS.md).
- Use `tdd` for test-first development at public seams.
- Use `diagnosing-bugs` for hypothesis-driven debugging without symptom-patching.
- Verify changes with `npm test` or `npx tsc --noEmit` before concluding tasks.
