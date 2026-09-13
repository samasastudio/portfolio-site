# Sam Johnson Portfolio & Compute Atlas Gateway

A high-performance portfolio, systems gateway, and temporal intelligence engine for Texas compute infrastructure. Built on Next.js 16 (App Router), React 19, TypeScript, Drizzle ORM, and Cloudflare Workers runtime via [vinext](https://github.com/cloudflare/vinext).

## Architecture & Gateway Model

The portfolio serves as the primary frontend gateway and temporal observation surface for Compute Atlas across three specialized systems:

1. **`atx-scraper` (Deterministic Ingestion & Self-Healing Repair)**:
   - Resilient public records ingestion across TDLR TABS (state construction filings), City of Austin Open Data & AB+C, municipal agenda packets (Taylor, Round Rock), TCEQ (environmental/air/water permits), and ERCOT queues.
   - Deterministic fast path with out-of-band Gemini 2.5 Flash repair agent triggered only on invariant breach.
   - Gated sandbox replay testing against historical fixtures before selector promotion.
   - Spec: `docs/specs/atx-scraper.md` | ADR: `docs/adr/0002-scraper-out-of-band-self-healing.md`.

2. **`atx-graphical-atlas` (Temporal Technical Atlas)**:
   - Living technical cartography coupling a deterministic GIS vector base (TNRIS parcels, ERCOT high-voltage lines, TWDB watersheds) with stateful semantic visual synthesis.
   - Dual-mode temporal scrubber supporting historical state reconstruction (`STATE` mode at date $T$) and differential impact analysis (`DELTA` mode between $T_1$ and $T_2$).
   - Spec: `docs/specs/atx-graphical-atlas.md` | ADR: `docs/adr/0001-graphical-atlas-visual-architecture.md`.

3. **`atx-generative-console` (Investigative Analytical Workspace)**:
   - Dynamic investigative workspace translating natural-language queries into strongly-typed UI AST layouts composed from a curated component palette (`MapView`, `Timeline`, `EntityHeader`, `EvidenceViewer`, `Comparison`, `RelationshipGraph`).
   - In-place workspace transformation with strict provenance tracing to immutable source documents.
   - Spec: `docs/specs/atx-generative-console.md` | ADR: `docs/adr/0003-generative-ui-component-palette.md`.

## Relational Data Spine (Drizzle ORM)

All persistence is defined with typed Drizzle schemas (`db/schema.ts`) over SQLite/Cloudflare D1 per ADR-0004:
- **Immutable Provenance**: `sourceArtifacts`, `observations`
- **Projected Entities**: `projects`, `facilities`, `organizations`, `locations`
- **Regulatory Relationships**: `developmentActions`, `environmentalActions`, `infrastructureRelationships`
- **Telemetry & Source Health**: `connectorConfigs`, `repairAudits`

## Component Organization & RSC Boundaries

- **Pure Server Components (RSC)**: Route pages (`/`, `/work`, `/profile`, `/contact`) and top-level layouts (`app/layout.tsx`, `TopBar`, `SiteFooter`) remain pure Server Components.
- **Slot Inversion (`SiteShell`)**: `SiteShell` accepts `header`, `nav`, `footer`, and `children` as slot props, preventing client boundary leakage to server components.
- **Isolated Leaf Hydration**: Only interactive leaves take `'use client'` (`LiveClock`, `NavRail`, `ProjectArchive`).
- **Design Tokens**: Standardized CSS variables defined in `app/globals.css` (`--paper`, `--ink`, `--rust`, `--indigo`, `--moss`, `--cedar`).

## Verification & Diagnostic Commands

- `npm test`: Runs production vinext build and validates rendered HTML across `/`, `/work`, `/profile`, `/contact`.
- `npx tsc --noEmit`: Strict TypeScript compilation across all app, worker, db, and test modules with zero errors.
- `npm run validate:artifact`: Verifies packaged Sites manifest and ESM default export.
- `npm run dev`: Starts the Vite/Vinext development server.
- `npm run build`: Builds and validates the deployable Sites artifact in `dist/`.
- `npm run db:generate`: Generates Drizzle migrations from `db/schema.ts`.
- `npm run lint`: Executes ESLint rules.

## Prerequisites

- Node.js `>=22.13.0`
- Linux or WSL2 on Windows with Bash and GNU utilities
