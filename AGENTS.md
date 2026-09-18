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

## 3. High-Level Architecture & Gateway Model
- **Server-First (RSC)**: All route pages (`/`, `/work`, `/profile`, `/contact`) and layouts are Server Components by default.
- **Isolated Leaf Hydration**: Only interactive leaves take `'use client'` (`LiveClock`, `NavRail`, and `ProjectArchive`).
- **System Gateway Surface**: The portfolio serves as the primary frontend gateway for the Three Compute Atlas systems (canonical `gridlock-` prefix):
  1. *`gridlock-scraper`*: Deterministic ingestion across TDLR, municipal agendas, TCEQ, and ERCOT queues with out-of-band self-healing repair (`/systems/scraper`).
  2. *`gridlock-graphical-atlas`*: Living temporal technical cartography combining GIS vector geometry with stateful generative plates (`/systems/graphical-atlas`).
  3. *`gridlock-generative-console`*: Dynamic investigative workspace translating intent into strongly-typed UI AST layouts (`/systems/generative-ui`).
- **Gateway Compatibility Invariant**: System ID renames must preserve backward-compatible alias resolution (`LEGACY_ID_MAP` in `app/_data/systems.ts`) for legacy identifiers (`atx-*`) and historical URL slugs.
- **Workspace Mount Preservation**: When renaming workspace project folders on disk, always maintain NTFS directory junctions from legacy paths to ensure active IDE workspace sessions and task monitors never sever.
- **Zero Waterfalls**: Parallelize independent async data fetches with `Promise.all()`.
- **Config-Driven Props & Clear Seams**: Components accept explicit typed data props. Avoid boolean prop explosions and unneeded React Context overhead.

---

## 4. Map of Project Organization

```text
app/
├── _components/
│   ├── home/
│   │   ├── BrandEmblem.tsx         # Brand illustration container
│   │   ├── CapabilityShelves.tsx   # 01/02/03 Vertical capability shelves
│   │   └── HeroCopy.tsx            # Headline, description, and round CTA
│   ├── layout/
│   │   ├── LiveClock.tsx           # 'use client' Austin CT live timer
│   │   ├── NavRail.tsx             # 'use client' Navigation rail with active route tracker
│   │   ├── SiteFooter.tsx          # Server Component footer & ticker
│   │   ├── SiteShell.tsx           # Master grid frame with route state class
│   │   └── TopBar.tsx              # Server Component header bar
│   └── ui/
│       ├── BrandMark.tsx           # SAM ASA JOHNSON mark
│       └── RoundLink.tsx           # Reusable circular CTA link
├── _data/
│   ├── navigation.ts               # Navigation route definitions
│   └── site.ts                     # Global site constants & metadata
├── _hooks/
│   └── useClock.ts                 # Headless clock interval hook
├── _types/
│   ├── navigation.ts               # NavigationItem interface
│   ├── project.ts                  # ProjectItem interface
│   └── system.ts                   # Gateway system console interfaces
├── contact/
│   ├── _components/
│   │   ├── ContactCopy.tsx         # Bio text & LinkedIn action button
│   │   ├── ContactLead.tsx         # Contact heading
│   │   └── SignalStatus.tsx        # Signal open indicator
│   ├── _data.ts                    # Contact copy & channel config
│   └── page.tsx                    # Server Component route entry
├── profile/
│   ├── _components/
│   │   ├── CapabilityMap.tsx       # 3-part capability grid with center badge
│   │   ├── Manifesto.tsx           # Reading room manifesto paragraphs
│   │   ├── ProfileIntro.tsx        # Profile heading
│   │   └── ToolsWall.tsx           # Working set tool list
│   ├── _data.ts                    # Manifesto, capabilities, and toolset data
│   └── page.tsx                    # Server Component route entry
├── work/
│   ├── _components/
│   │   └── ProjectArchive.tsx      # 'use client' Interactive tablist & project card
│   ├── _data.ts                    # Selected work archive items
│   └── page.tsx                    # Server Component route entry
├── globals.css                     # Design system, tokens, and responsive layout grids
├── layout.tsx                      # Root layout rendering SiteShell (RSC)
└── page.tsx                        # Home page route entry (RSC)
```

---

## 5. Visual Identity & Design System
- **Creative North Star**: *"Japanese Library Meets American Traditional Tattoo Shop"* — disciplined shōji grid structures and unbleached paper density meeting indelible tattoo flash pigments, sumi linework, and physical presence.
- **Design Authority**: Normative tokens and rules live in [`DESIGN.md`](./DESIGN.md) and [`PRODUCT.md`](./PRODUCT.md).
- **Theme Variables**: Always reference the project's CSS variables defined in [`app/globals.css`](./app/globals.css):
  - Base Paper: `--paper` (Washi Rice Paper `#f2eadc`), `--paper-light` (Clean Sheet `#faf5ea`), `--paper-deep` (Cardstock Deep `#dfd1bc`)
  - Ink: `--ink` (Sumi Tattoo Ink `#191b18`)
  - Flash & Accents: `--rust` (Vermilion Cinnabar `#b64c31`), `--indigo` (Deep Indigo `#263b61`), `--moss` (Sumi Pine `#67745a`), `--cedar` (Aged Cedar `#805b42`), `--yellow` (Ochre Gold `#d6a934`)
  - Transitions: `--ease` (`cubic-bezier(.16, 1, .3, 1)`)
- **Typographic Hierarchy**:
  - Headings: Display sans with tight tracking.
  - Emphasis: Georgia serif italics (`em`).
  - Metadata / Micro-labels: Uppercase monospace (`font-mono text-[9px] tracking-widest`).
- **Named System Invariants**:
  - *The Flash Rarity Rule*: Cinnabar and Ochre Gold are reserved for focal accents ($\le 10\%$ of surface).
  - *The No-Faux-White Rule*: Pure digital white (`#ffffff`) is banned; surfaces use warm paper stock.
  - *The Indelible Offset Rule*: Zero Gaussian blur shadows; elevation is physical hard offsets (`4px 4px 0`, `5px 5px 0`).
  - *The Accessible Linotype Rule*: Monospace micro-labels must maintain an accessible floor of 8.5px–10px; sub-8px text is banned. Archival density is achieved through uppercase tracking (`0.12em`) and muted ink opacity (`opacity-60`), not sub-readable font sizes.
  - *The Soul in Italics Rule*: Reflective emphasis lives in Georgia serif italics.
  - *The Tactile Grain Rule*: Preserve the ambient fractal noise overlay across viewports.
  - *The Zero-Pulsing-Dot Rule*: Banned cosmetic pulsing dots (`@keyframes pulse`) and ambient gradient halos (`radial-halo`). Status beacons must be steady, static marks; only genuinely streaming data channels may animate.
  - *The Complete Slop Sweep Rule*: When auditing or eliminating AI slop patterns (per `impeccable.style/slop`), sweep all shell zones (TopBar, NavRail, Stage, Footer) without rationalizing exceptions for cosmetic animations.
  - *The Singular Triad Rule*: The "Rule of Three" (3-line headings, 3-column grids, 3-part lists, 3-part slogans) is an over-used AI template trope. In this project, the triad structure is strictly and exclusively reserved for the **Three Systems** (the Work archive and upcoming gateway consoles). All other surfaces must use 2-part, asymmetrical, or fluid compositions.
  - *The Grid Infrastructure Scope Rule*: Compute Atlas is an observatory of electric transmission bottlenecks, ERCOT large load queues, and the Data Center Trilemma (Large, Fast, Firm) across Texas and national RTOs. Never artificially restrict system domain modeling, scraping targets, or visual cartography to Austin municipal limits.
  - *The Grounded Seam Rule*: Banned negative absolute offsets that protrude across container boundary seams (e.g. `right: -36px`) and centered floating badges that occlude content text. All stamp seals, badges, and action buttons must be structurally grounded and contained within their respective panels.
  - *The Authentic Voice Rule*: Banned kickers/eyebrows above headings, slogan-generator buzzwords ("Wayfinder", "Wild ideas"), repetitive "Make it [adj]" formulas, and folksy greetings ("Pull up a chair"). Headings speak directly with authentic systems-engineering clarity.
- **Anti-AI Slop**: No generic purple-on-white gradients, unstyled system fonts, or cookie-cutter templates. Preserve tactile noise textures, subtle drop shadows, and editorial framing.

---

## 6. Engineering Workflows & Verification
- Follow the workflows defined in [`docs/ENGINEERING_WORKFLOWS.md`](./docs/ENGINEERING_WORKFLOWS.md).
- Use `tdd` for test-first development at public seams.
- Use `diagnosing-bugs` for hypothesis-driven debugging without symptom-patching.
- **Impeccable Workflow**: New surfaces default to `comp-first` (generate visual comp before code) per [`.impeccable/config.json`](./.impeccable/config.json). Maintain [`DESIGN.md`](./DESIGN.md) and [`.impeccable/design.json`](./.impeccable/design.json) synchronization. For comp and plate image generation, use the harness-native `generate_image` tool directly; never require or prompt for `OPENAI_API_KEY` (Impeccable CLI fallback is unnecessary in Antigravity).
- Verify changes with `npm test` or `npx tsc --noEmit` before concluding tasks.
