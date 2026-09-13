# Original User Request

## 2026-09-12T21:20:37Z

This is a single self-contained fix; keep it small and focused.

Clean up and harden the `sam-johnson-portfolio` codebase into a pristine, production-grade foundation by eliminating unreferenced template code, fixing Cloudflare Worker TypeScript declarations, enforcing pure RSC boundaries via slot composition, and establishing the typed Drizzle ORM data spine for Compute Atlas.

Working directory: c:/Users/Owner/projects/sam-johnson-portfolio
Integrity mode: development

## Requirements

### R1. Dead Code & Template Artifact Elimination
Remove all unreferenced starter boilerplate including `app/chatgpt-auth.ts`, the `examples/d1/` directory, and unused Next.js starter icons (`public/file.svg`, `public/globe.svg`, `public/window.svg`). Update `README.md` and `LOCAL-SETUP.md` to accurately reflect the portfolio and gateway architecture instead of template boilerplate.

### R2. Strict TypeScript & Cloudflare Worker Runtime Typing
Provide ambient type declarations for Cloudflare Worker runtime bindings (`cloudflare:workers`, `Fetcher`, `D1Database`) in `worker/worker-env.d.ts` and ensure `tsconfig.json` compiles the entire project with zero errors under `npx tsc --noEmit`.

### R3. Pure RSC Architecture & Slot Inversion
Refactor `app/_components/layout/SiteShell.tsx` to eliminate client boundary leakage. `SiteShell` must accept `header`, `nav`, `footer`, and `children` as slot props so that presentational server components (`TopBar`, `SiteFooter`) remain pure Server Components rendered from `app/layout.tsx`.

### R4. Compute Atlas Relational Data Spine (Drizzle ORM)
Implement typed Drizzle ORM schemas in `db/schema.ts` for the canonical Compute Atlas domain per ADR-0004:
- Immutable provenance: `sourceArtifacts`, `observations`
- Projected entities: `projects`, `facilities`, `organizations`, `locations`
- Regulatory relationships: `developmentActions`, `environmentalActions`, `infrastructureRelationships`
- Telemetry: `connectorConfigs`, `repairAudits`

### R5. Gateway Models & Tooling Configuration
Align `app/_types/system.ts` and establish `app/_data/systems.ts` defining metadata and status contracts for the 3 gateway surfaces (`atx-scraper`, `atx-graphical-atlas`, `atx-generative-console`). Ensure `eslint.config.mjs` ignores `.sites-runtime/**`, `.vinext/**`, `.wrangler/**`, and `dist/**`.

## Verification Resources
- `npm test`: Runs production vinext build and validates rendered HTML across `/`, `/work`, `/profile`, `/contact`.
- `npx tsc --noEmit`: Strict TypeScript compilation across all app, worker, and test modules.
- `npm run validate:artifact`: Verifies packaged Sites manifest and ESM default export.

## Acceptance Criteria

### Type Safety & Compilation
- [ ] `npx tsc --noEmit` exits with code 0 and outputs 0 errors.
- [ ] No untyped or `any`-cast bindings in `db/index.ts` or `worker/index.ts`.

### Regression Testing & Build Verification
- [ ] `npm test` passes all 4 test suites with 0 failures.
- [ ] Production build (`npm run build`) and artifact validation (`npm run validate:artifact`) succeed without errors or warnings.

### Clean Codebase & Zero Dead Code
- [ ] `app/chatgpt-auth.ts`, `examples/`, and unused template SVGs do not exist in the working directory.
- [ ] No references to deleted files remain in active code or documentation.

### Component Composition
- [ ] `SiteShell.tsx` receives `header`, `nav`, and `footer` via props/slots without statically importing them.
- [ ] `TopBar.tsx` and `SiteFooter.tsx` remain Server Components in `app/layout.tsx`.

### Relational Schema
- [ ] `db/schema.ts` exports typed Drizzle table definitions for all 11 Compute Atlas entities matching ADR-0004.
