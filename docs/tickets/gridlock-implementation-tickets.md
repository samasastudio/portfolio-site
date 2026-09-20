# Gridlock Implementation Tickets (Compute Atlas Tracer Bullets)
*Derived from: [gridlock-scraper.md](file:///c:/Users/Owner/projects/sam-johnson-portfolio/docs/specs/gridlock-scraper.md), [gridlock-graphical-atlas.md](file:///c:/Users/Owner/projects/sam-johnson-portfolio/docs/specs/gridlock-graphical-atlas.md), and [gridlock-generative-console.md](file:///c:/Users/Owner/projects/sam-johnson-portfolio/docs/specs/gridlock-generative-console.md)*

---

## Overview & Execution Strategy

Implementation proceeds along a 4-phase tracer-bullet sequence across the decoupled repositories:
1. **Phase 1: Ingestion Engine (`gridlock-scraper`)** — Tickets 01–07: Scaffolding, artifact storage, deterministic connectors, out-of-band repair agent, and replay sandbox.
2. **Phase 2: Temporal Technical Atlas (`gridlock-graphical-atlas`)** — Tickets 08–12: MapLibre GIS base, temporal projectors, Gemini Interactions API plate generator, and temporal scrubber.
3. **Phase 3: Generative Analytical Workspace (`gridlock-generative-console`)** — Tickets 13–17: UI AST planner, in-place workspace mutation, curated widget palette, and forensic Evidence Viewer.
4. **Phase 4: Portfolio Gateway Integration (`sam-johnson-portfolio`)** — Ticket 18: Live gateway surface wiring and Source Health console.

---

## Phase 1: Ingestion Engine (`gridlock-scraper`)

### Ticket 01: Scaffold `gridlock-scraper` Repository & Drizzle Schema
- **Objective**: Initialize standalone Node.js 22 + TypeScript repo with Drizzle ORM schema, Vitest runner, and Husky pre-commit hooks.
- **Scope / Files**:
  - `projects/gridlock-scraper/package.json`
  - `projects/gridlock-scraper/tsconfig.json`
  - `projects/gridlock-scraper/src/schema.ts`
  - `projects/gridlock-scraper/tests/schema.test.ts`
- **Acceptance Criteria**:
  - [ ] Package scripts configured (`build`, `test`, `typecheck`, `lint`).
  - [ ] Drizzle tables defined: `source_artifacts`, `observations`, `connector_configs`, `repair_audits`.
  - [ ] Test verifies SQLite/D1 database migration and foreign key constraints.
- **Verification**: `npm test tests/schema.test.ts`
- **Dependencies**: None

### Ticket 02: Immutable Raw Artifact Store
- **Objective**: Build Gzip compression and SHA-256 cryptographic hashing pipeline for raw HTML, JSON, and PDF payloads.
- **Scope / Files**:
  - `projects/gridlock-scraper/src/storage/artifact-store.ts`
  - `projects/gridlock-scraper/tests/artifact-store.test.ts`
- **Acceptance Criteria**:
  - [ ] Payloads compressed with gzip; SHA-256 hash verified against uncompressed stream.
  - [ ] Duplicate payload ingest returns existing artifact record without re-uploading.
  - [ ] Metadata recorded in `source_artifacts` table.
- **Verification**: `npm test tests/artifact-store.test.ts`
- **Dependencies**: Ticket 01

### Ticket 03: TDLR TABS Construction Filings Connector
- **Objective**: Implement deterministic HTML extractor for Texas Department of Licensing and Regulation (TDLR) TABS records.
- **Scope / Files**:
  - `projects/gridlock-scraper/src/connectors/tdlr-tabs.ts`
  - `projects/gridlock-scraper/tests/fixtures/tdlr_sample.html`
  - `projects/gridlock-scraper/tests/tdlr-tabs.test.ts`
- **Acceptance Criteria**:
  - [ ] Extracts project number, estimated cost, square footage, address, county, owner, and architect.
  - [ ] Validates extracted records against Zod `TdlrRecordSchema`.
  - [ ] Emits atomic `observations` rows linked to captured `source_artifact_id`.
- **Verification**: `npm test tests/tdlr-tabs.test.ts`
- **Dependencies**: Ticket 02

### Ticket 04: City of Austin Permitting (AB+C / Socrata) Connector
- **Objective**: Implement Austin Open Data Socrata API and AB+C portal commercial building permit extractor.
- **Scope / Files**:
  - `projects/gridlock-scraper/src/connectors/austin-permits.ts`
  - `projects/gridlock-scraper/tests/fixtures/austin_permits.json`
  - `projects/gridlock-scraper/tests/austin-permits.test.ts`
- **Acceptance Criteria**:
  - [ ] Queries Socrata endpoint with incremental date bounds.
  - [ ] Extracts permit number, status, valuation, applicant, and GIS parcel ID.
  - [ ] Handles 429 rate limiting with exponential backoff and jitter.
- **Verification**: `npm test tests/austin-permits.test.ts`
- **Dependencies**: Ticket 02

### Ticket 05: TCEQ Permits & ERCOT Large-Load Queue Connectors
- **Objective**: Build parsers for Texas Commission on Environmental Quality (air/water permits) and ERCOT interconnection spreadsheets.
- **Scope / Files**:
  - `projects/gridlock-scraper/src/connectors/tceq-permits.ts`
  - `projects/gridlock-scraper/src/connectors/ercot-queue.ts`
  - `projects/gridlock-scraper/tests/fixtures/ercot_sample.xlsx`
  - `projects/gridlock-scraper/tests/ercot-queue.test.ts`
- **Acceptance Criteria**:
  - [ ] Ingests Excel (.xlsx) ERCOT queue data into structured load records (MW, county, substation tie-in).
  - [ ] Extracts TCEQ air quality permits for backup diesel generator clusters.
  - [ ] Flags projects matching the 143.5 GW data center queue.
- **Verification**: `npm test tests/ercot-queue.test.ts`
- **Dependencies**: Ticket 02

### Ticket 06: Out-of-Band Gemini Flash Repair Agent & Replay Sandbox
- **Objective**: Build anomaly detection guard and sandboxed LLM repair agent for broken selectors.
- **Scope / Files**:
  - `projects/gridlock-scraper/src/guards/invariant-guard.ts`
  - `projects/gridlock-scraper/src/agent/repair-agent.ts`
  - `projects/gridlock-scraper/src/sandbox/replay-runner.ts`
  - `projects/gridlock-scraper/tests/repair-agent.test.ts`
- **Acceptance Criteria**:
  - [ ] Flags $>30\%$ volume drop or missing required fields as anomaly.
  - [ ] Synthesizes sanitized DOM skeleton and prompts Gemini 2.5 Flash for patch.
  - [ ] Executes patch against 5 historical fixture files in sandboxed runner.
  - [ ] Only promotes patch to `connector_configs.manifest` if replay pass rate is 100%.
- **Verification**: `npm test tests/repair-agent.test.ts`
- **Dependencies**: Ticket 03

### Ticket 07: Scraper HTTP API & Source Health Exporter
- **Objective**: Expose worker HTTP endpoints for triggering ingestion runs, querying status, and streaming telemetry.
- **Scope / Files**:
  - `projects/gridlock-scraper/src/server.ts`
  - `projects/gridlock-scraper/src/routes/health.ts`
  - `projects/gridlock-scraper/tests/server.test.ts`
- **Acceptance Criteria**:
  - [ ] `POST /api/ingest/trigger` dispatches asynchronous connector runs.
  - [ ] `GET /api/ingest/status` returns run metrics and invariant state.
  - [ ] `GET /api/source-health/telemetry` reports connector uptime and repair audits.
- **Verification**: `npm test tests/server.test.ts`
- **Dependencies**: Ticket 06

---

## Phase 2: Temporal Technical Cartography (`gridlock-graphical-atlas`)

### Ticket 08: Scaffold `gridlock-graphical-atlas` Repository
- **Objective**: Initialize Next.js 16 + React 19 + MapLibre GL repository with Tailwind CSS v4 design tokens.
- **Scope / Files**:
  - `projects/gridlock-graphical-atlas/package.json`
  - `projects/gridlock-graphical-atlas/tsconfig.json`
  - `projects/gridlock-graphical-atlas/app/globals.css`
  - `projects/gridlock-graphical-atlas/tests/atlas-scaffold.test.ts`
- **Acceptance Criteria**:
  - [ ] MapLibre GL CSS and Canvas initialized in React tree.
  - [ ] Theme tokens from `sam-johnson-portfolio` (`--paper`, `--ink`, `--rust`, `--indigo`, `--moss`) imported.
  - [ ] Basic test verifies component render without WebGL crash.
- **Verification**: `npm test tests/atlas-scaffold.test.ts`
- **Dependencies**: None

### Ticket 09: Deterministic MapLibre GIS Vector Base Layer
- **Objective**: Implement high-performance vector rendering for Central Texas parcels, transmission lines, and water basins.
- **Scope / Files**:
  - `projects/gridlock-graphical-atlas/src/components/AtlasViewport.tsx`
  - `projects/gridlock-graphical-atlas/src/layers/vector-layers.ts`
  - `projects/gridlock-graphical-atlas/tests/vector-layers.test.ts`
- **Acceptance Criteria**:
  - [ ] Renders parcel boundaries (TNRIS), ERCOT high-voltage lines, and TWDB aquifers in EPSG:3857.
  - [ ] Vector hitboxes respond to click/hover in $<50\text{ ms}$.
  - [ ] Handles WebGL context loss gracefully with automatic layer re-attachment.
- **Verification**: `npm test tests/vector-layers.test.ts`
- **Dependencies**: Ticket 08

### Ticket 10: State & Delta Projector Engines with Temporal REST Endpoints
- **Objective**: Build temporal state reconstructor for point-in-time (`STATE`) and difference (`DELTA`) queries.
- **Scope / Files**:
  - `projects/gridlock-graphical-atlas/src/engine/state-projector.ts`
  - `projects/gridlock-graphical-atlas/src/engine/delta-projector.ts`
  - `projects/gridlock-graphical-atlas/app/api/atlas/state/route.ts`
  - `projects/gridlock-graphical-atlas/app/api/atlas/delta/route.ts`
  - `projects/gridlock-graphical-atlas/tests/projectors.test.ts`
- **Acceptance Criteria**:
  - [ ] `STATE` query returns only observations active on or before date $T$.
  - [ ] `DELTA` query computes additions, lifecycle advancements, and withdrawals between $T_1$ and $T_2$.
  - [ ] Tested against simulated observation timelines.
- **Verification**: `npm test tests/projectors.test.ts`
- **Dependencies**: Ticket 01, Ticket 08

### Ticket 11: Gemini Interactions API Stateful Plate Generator
- **Objective**: Implement stateful plate generation using `gemini-3.1-flash-lite-image` (NB2Lite) with `interaction_id` chaining.
- **Scope / Files**:
  - `projects/gridlock-graphical-atlas/src/generator/plate-generator.ts`
  - `projects/gridlock-graphical-atlas/src/schema/plates.ts`
  - `projects/gridlock-graphical-atlas/tests/plate-generator.test.ts`
- **Acceptance Criteria**:
  - [ ] Bootstraps from local GIS vector base raster via `edit_local_image`.
  - [ ] Chains `previous_interaction_id` through lifecycle stages 01 to 06 with incremental delta prompts.
  - [ ] Enforces `thinking_level: "low"` for draft scrubbing and `"high"` for crisp technical labels; rejects `minimal`/`medium`.
  - [ ] Stores generated WebP and `interaction_id` in `visual_plates` table.
- **Verification**: `npm test tests/plate-generator.test.ts`
- **Dependencies**: Ticket 09, Ticket 10

### Ticket 12: Interactive Temporal Scrubber Component
- **Objective**: Build 60fps interactive timeline scrubber slider with STATE/DELTA mode toggle.
- **Scope / Files**:
  - `projects/gridlock-graphical-atlas/src/components/TemporalScrubber.tsx`
  - `projects/gridlock-graphical-atlas/src/hooks/useTemporalPlayback.ts`
  - `projects/gridlock-graphical-atlas/tests/temporal-scrubber.test.ts`
- **Acceptance Criteria**:
  - [ ] Smooth 60fps timeline scrubbing with quarter/year tick markers.
  - [ ] Mode switch dynamically toggles single-date vs dual-date range slider.
  - [ ] Play/pause controls animate historical compute accumulation chronologically.
- **Verification**: `npm test tests/temporal-scrubber.test.ts`
- **Dependencies**: Ticket 10, Ticket 11

---

## Phase 3: Generative Analytical Workspace (`gridlock-generative-console`)

### Ticket 13: Scaffold `gridlock-generative-console` Repository
- **Objective**: Initialize Next.js 16 + React 19 repository with Zod validation, Vitest, and design system tokens.
- **Scope / Files**:
  - `projects/gridlock-generative-console/package.json`
  - `projects/gridlock-generative-console/tsconfig.json`
  - `projects/gridlock-generative-console/src/types/ui-ast.ts`
  - `projects/gridlock-generative-console/tests/ast-schema.test.ts`
- **Acceptance Criteria**:
  - [ ] Zod schemas defined for all 13 widgets: `MapView`, `Timeline`, `EntityHeader`, `EvidenceViewer`, `MetricGroup`, `DataTable`, `Comparison`, `RelationshipGraph`, `DocumentViewer`, `SourceDiff`, `MethodologyPanel`, `Alert`, `Metric`.
  - [ ] Tests verify schema validation and reject malformed ASTs.
- **Verification**: `npm test tests/ast-schema.test.ts`
- **Dependencies**: None

### Ticket 14: Investigation Planner & Intent-to-AST Engine
- **Objective**: Build Gemini 2.5 Flash query planner emitting validated `WorkspaceLayoutAST` structures.
- **Scope / Files**:
  - `projects/gridlock-generative-console/src/planner/investigation-planner.ts`
  - `projects/gridlock-generative-console/app/api/investigate/plan/route.ts`
  - `projects/gridlock-generative-console/tests/investigation-planner.test.ts`
- **Acceptance Criteria**:
  - [ ] Translates natural language queries into layout grids (`single_column`, `split_panel`, `dashboard_grid`, `forensic_split`).
  - [ ] Extracts entity filters and queries observation store for cited facts.
  - [ ] End-to-end response time under 1500ms.
  - [ ] Rejects plans lacking source citations.
- **Verification**: `npm test tests/investigation-planner.test.ts`
- **Dependencies**: Ticket 13

### Ticket 15: In-Place Workspace Mutation Engine
- **Objective**: Implement follow-up query mutation handler transforming active layout trees without full page reload.
- **Scope / Files**:
  - `projects/gridlock-generative-console/src/engine/workspace-mutator.ts`
  - `projects/gridlock-generative-console/app/api/investigate/mutate/route.ts`
  - `projects/gridlock-generative-console/tests/workspace-mutator.test.ts`
- **Acceptance Criteria**:
  - [ ] Handles `filter`, `pivot`, `add_widget`, `remove_widget`, and `compare` actions.
  - [ ] Preserves unmutated widget state across turns.
  - [ ] Debounces rapid inputs (300ms) to prevent layout thrashing.
- **Verification**: `npm test tests/workspace-mutator.test.ts`
- **Dependencies**: Ticket 14

### Ticket 16: Curated Widget Palette Implementation
- **Objective**: Implement core React widgets styled with design tokens (`--paper`, `--ink`, `--rust`, `--indigo`).
- **Scope / Files**:
  - `projects/gridlock-generative-console/src/widgets/EntityHeader.tsx`
  - `projects/gridlock-generative-console/src/widgets/Comparison.tsx`
  - `projects/gridlock-generative-console/src/widgets/Timeline.tsx`
  - `projects/gridlock-generative-console/src/widgets/RelationshipGraph.tsx`
  - `projects/gridlock-generative-console/src/widgets/DataTable.tsx`
  - `projects/gridlock-generative-console/tests/widgets.test.ts`
- **Acceptance Criteria**:
  - [ ] Responsive layout conforming to WCAG AA contrast against paper background.
  - [ ] `RelationshipGraph` caps depth at 2 degrees to avoid node cycle explosion.
  - [ ] Zero unstyled raw HTML; 100% token-driven styling.
- **Verification**: `npm test tests/widgets.test.ts`
- **Dependencies**: Ticket 13

### Ticket 17: Forensic Evidence Viewer & Citation Links
- **Objective**: Build split-screen source artifact inspection pane with highlighted extraction spans.
- **Scope / Files**:
  - `projects/gridlock-generative-console/src/widgets/EvidenceViewer.tsx`
  - `projects/gridlock-generative-console/app/api/evidence/[artifactId]/route.ts`
  - `projects/gridlock-generative-console/tests/evidence-viewer.test.ts`
- **Acceptance Criteria**:
  - [ ] Clicking any metric or status chip opens `EvidenceViewer` targeting the specific `sourceArtifactId`.
  - [ ] Highlights extracted text spans with confidence rating and source URL.
  - [ ] Handles missing or corrupted artifacts with an alert badge.
- **Verification**: `npm test tests/evidence-viewer.test.ts`
- **Dependencies**: Ticket 02, Ticket 16

---

## Phase 4: Portfolio Gateway Integration (`sam-johnson-portfolio`)

### Ticket 18: Gateway Route Integration & Source Health Dashboard
- **Objective**: Wire active gateway routes (`/systems/scraper`, `/systems/graphical-atlas`, `/systems/generative-ui`) and embed the Source Health console into the portfolio.
- **Scope / Files**:
  - `sam-johnson-portfolio/app/systems/scraper/page.tsx`
  - `sam-johnson-portfolio/app/systems/graphical-atlas/page.tsx`
  - `sam-johnson-portfolio/app/systems/generative-ui/page.tsx`
  - `sam-johnson-portfolio/app/systems/source-health/page.tsx`
  - `sam-johnson-portfolio/tests/gateway-routes.test.ts`
- **Acceptance Criteria**:
  - [ ] Gateway routes render system status cards, spec links, and live embedded console views.
  - [ ] Source Health view displays connector uptime, volume trends, and repair audit logs.
  - [ ] Zero hydration errors; passes full `npm test` and `npx tsc --noEmit`.
- **Verification**: `npm test`
- **Dependencies**: Ticket 07, Ticket 12, Ticket 17
