# Gridlock Implementation Tickets (Compute Atlas Tracer Bullets)
*Derived from: [gridlock-scraper.md](file:///c:/Users/Owner/projects/sam-johnson-portfolio/docs/specs/gridlock-scraper.md), [gridlock-graphical-atlas.md](file:///c:/Users/Owner/projects/sam-johnson-portfolio/docs/specs/gridlock-graphical-atlas.md), and [gridlock-generative-console.md](file:///c:/Users/Owner/projects/sam-johnson-portfolio/docs/specs/gridlock-generative-console.md)*

---

## Overview & Execution Strategy

Implementation proceeds along a 5-phase tracer-bullet sequence across the decoupled repositories:
1. **Phase 1: Ingestion Engine (`gridlock-scraper`)** — Tickets 01–07: Scaffolding, artifact storage, deterministic connectors, out-of-band repair agent, and replay sandbox.
2. **Phase 2: Temporal Technical Atlas (`gridlock-graphical-atlas`)** — Tickets 08–12: MapLibre GIS base, temporal projectors, Gemini Interactions API plate generator, and temporal scrubber.
3. **Phase 3: Generative Analytical Workspace (`gridlock-generative-console`)** — Tickets 13–17: UI AST planner, in-place workspace mutation, curated widget palette, and forensic Evidence Viewer.
4. **Phase 4: Portfolio Gateway Integration (`sam-johnson-portfolio`)** — Ticket 18: Live gateway surface wiring and Source Health console.
5. **Phase 5: Ingestion Deployment & Production Scheduling (`gridlock-scraper`)** — Tickets 19–22: Containerization, CLI runner, state/artifact R2 sync, and scheduled GitHub Actions orchestration.
6. **Phase 6: Scraper Hardening & Review Follow-ups (`gridlock-scraper`)** — Tickets 23–29: ERCOT asset download lifecycle, quarantine approval gating, manifest patch persistence, strict status validation, action type inference, and quarantine media types.

---

## Phase 1: Ingestion Engine (`gridlock-scraper`)

### Ticket 01: Scaffold `gridlock-scraper` Repository & Drizzle Schema
- **Status**: [x] Completed
- **Objective**: Initialize standalone Node.js 22 + TypeScript repo with Drizzle ORM schema, test runner, and Husky pre-commit hooks.
- **Scope / Files**:
  - `projects/gridlock-scraper/package.json`
  - `projects/gridlock-scraper/tsconfig.json`
  - `projects/gridlock-scraper/src/schema.ts`
  - `projects/gridlock-scraper/tests/schema.test.ts`
- **Acceptance Criteria**:
  - [x] Package scripts configured (`build`, `test`, `typecheck`, `lint`).
  - [x] Drizzle tables defined: `source_artifacts`, `observations`, `connector_configs`, `repair_audits`.
  - [x] Test verifies SQLite database schema and foreign key constraints.
- **Verification**: `npm test tests/schema.test.ts`
- **Dependencies**: None

### Ticket 02: Immutable Raw Artifact Store
- **Status**: [x] Completed
- **Objective**: Build content-addressable storage and SHA-256 cryptographic hashing pipeline for raw HTML, JSON, and PDF payloads (ADR-0003).
- **Scope / Files**:
  - `projects/gridlock-scraper/src/storage/artifact-store.ts`
  - `projects/gridlock-scraper/src/storage/db.ts`
  - `projects/gridlock-scraper/tests/pipeline.test.ts`
- **Acceptance Criteria**:
  - [x] Payloads hashed with SHA-256 upon capture.
  - [x] Duplicate payload ingest triggers Content-Hash Gated Early-Exit without redundant DB writes.
  - [x] Metadata recorded in `source_artifacts` table.
- **Verification**: `npm test tests/pipeline.test.ts`
- **Dependencies**: Ticket 01

### Ticket 03: TDLR TABS Construction Filings Connector
- **Status**: [x] Completed
- **Objective**: Implement step-layered Playwright extractor and pure parser for Texas Department of Licensing and Regulation (TDLR) TABS records (ADR-0001, ADR-0002).
- **Scope / Files**:
  - `projects/gridlock-scraper/src/extractors/tdlr.ts`
  - `projects/gridlock-scraper/src/parsers/tdlr.ts`
  - `projects/gridlock-scraper/src/schemas/tdlr.ts`
  - `projects/gridlock-scraper/tests/fixtures/tdlr/tabs-sample.html`
  - `projects/gridlock-scraper/tests/parsers.test.ts`
- **Acceptance Criteria**:
  - [x] Extracts project number, estimated cost, square footage, address, and county.
  - [x] Validates extracted records against Zod `TdlrProjectSchema` domain invariants.
  - [x] Emits atomic `observations` rows linked to captured `source_artifact_id`.
  - [x] Hermetic offline fixture testing with zero outbound network calls (ADR-0005).
- **Verification**: `npm test tests/parsers.test.ts`
- **Dependencies**: Ticket 02

### Ticket 04: Texas Municipal Dockets & Planning Agendas Connector
- **Status**: [ ] Ready for Execution
- **Objective**: Implement step-layered Playwright extractor and pure parser for municipal agendas and zoning dockets (Austin, Taylor, San Marcos, Hutto).
- **Scope / Files**:
  - `projects/gridlock-scraper/src/extractors/municipal.ts`
  - `projects/gridlock-scraper/src/parsers/municipal.ts`
  - `projects/gridlock-scraper/src/schemas/municipal.ts`
  - `projects/gridlock-scraper/tests/fixtures/municipal/agenda-sample.html`
  - `projects/gridlock-scraper/tests/parsers.test.ts`
- **Acceptance Criteria**:
  - [x] Scaffolded initial pure parser, Zod schema, and fixture.
  - [ ] Implement pagination across municipal council and planning commission meeting calendars.
  - [ ] Extracts case number, zoning change type, jurisdiction, and approval status.
  - [ ] Emits atomic `observations` rows linked to captured `source_artifact_id`.
- **Verification**: `npm test tests/parsers.test.ts`
- **Dependencies**: Ticket 02

### Ticket 05: TCEQ Permits & ERCOT Large-Load Queue Connectors
- **Status**: [x] Completed
- **Objective**: Build step-layered extractors and pure parsers for Texas Commission on Environmental Quality (air/water permits) and ERCOT interconnection spreadsheets.
- **Scope / Files**:
  - `projects/gridlock-scraper/src/extractors/ercot.ts`
  - `projects/gridlock-scraper/src/parsers/ercot.ts`
  - `projects/gridlock-scraper/src/schemas/ercot.ts`
  - `projects/gridlock-scraper/src/extractors/tceq.ts`
  - `projects/gridlock-scraper/src/parsers/tceq.ts`
  - `projects/gridlock-scraper/src/schemas/tceq.ts`
  - `projects/gridlock-scraper/tests/fixtures/ercot/queue-sample.csv`
  - `projects/gridlock-scraper/tests/fixtures/tceq/permit-sample.html`
  - `projects/gridlock-scraper/tests/parsers.test.ts`
- **Acceptance Criteria**:
  - [x] Ingests ERCOT queue tabular data into structured load records (MW, county, fuel type).
  - [x] Extracts TCEQ air standard permits for backup generator facilities.
  - [x] Validates positive capacity invariants (`capacityMw > 0`) via Zod.
  - [x] Offline fixture tests green in `tests/parsers.test.ts`.
- **Verification**: `npm test tests/parsers.test.ts`
- **Dependencies**: Ticket 02

### Ticket 06: Out-of-Band Self-Healing Anomaly Handler & Replay Sandbox
- **Status**: [/] In Progress
- **Objective**: Build anomaly detection quarantine and historical replay sandbox test harness for selector drift (ADR-0004).
- **Scope / Files**:
  - `projects/gridlock-scraper/src/repair/quarantine.ts`
  - `projects/gridlock-scraper/src/repair/replay.ts`
  - `projects/gridlock-scraper/tests/pipeline.test.ts`
- **Acceptance Criteria**:
  - [x] Invariant failure isolates raw payload, flags connector `last_status = "anomaly"`, records audit row.
  - [x] Candidate patch replayed against historical fixture set in sandboxed runner.
  - [x] Only promotes patch to `connector_configs.manifest` if replay pass rate is 100%.
  - [ ] Add CLI/worker automation command for Gemini Flash out-of-band synthesis.
- **Verification**: `npm test tests/pipeline.test.ts`
- **Dependencies**: Ticket 03

### Ticket 07: Scraper HTTP API & Source Health Exporter
- **Status**: [ ] Todo
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

---

## Phase 5: Ingestion Deployment & Production Scheduling (`gridlock-scraper`)

### Ticket 19: Containerize `gridlock-scraper` with Playwright Base
- **System**: `gridlock-scraper`
- **Objective**: Package the scraper into a secure, reproducible Linux container using Microsoft's official Playwright base image.
- **Scope / Files**:
  - `projects/gridlock-scraper/Dockerfile`
  - `projects/gridlock-scraper/.dockerignore`
  - `projects/gridlock-scraper/package.json`
- **Acceptance Criteria**:
  - [ ] Multi-stage `Dockerfile` based on `mcr.microsoft.com/playwright:v1.63.0-noble`.
  - [ ] Installs Node.js >= 22 dependencies via `npm ci` and runs `npm run build`.
  - [ ] Drops root privileges to run as unprivileged `pwuser`.
  - [ ] Image compiles and verifies offline tests cleanly inside container.
- **Verification**: `docker build -t gridlock-scraper .`
- **Dependencies**: Ticket 01, Ticket 06

### Ticket 20: Ingestion CLI Entrypoint & Process Exit Protocol
- **System**: `gridlock-scraper`
- **Objective**: Implement a command-line entrypoint with source filtering and deterministic process exit codes for orchestrators.
- **Scope / Files**:
  - `projects/gridlock-scraper/src/cli.ts`
  - `projects/gridlock-scraper/tests/cli.test.ts`
  - `projects/gridlock-scraper/package.json`
- **Acceptance Criteria**:
  - [ ] CLI parses arguments: `--source=<tdlr|ercot|tceq|municipal|all>`, `--dry-run`, `--force`.
  - [ ] Exits with code `0` on clean completion or content-hash early exit.
  - [ ] Exits with code `1` on uncaught network/runtime crashes.
  - [ ] Exits with code `2` when an invariant breach or anomaly is quarantined (notifies external monitoring).
  - [ ] Unit tests verify argument parsing and exit code mapping.
- **Verification**: `npm test tests/cli.test.ts`
- **Dependencies**: Ticket 03, Ticket 05, Ticket 06

### Ticket 21: Cloudflare R2 State Hydration & Snapshot Publishing Hooks
- **System**: `gridlock-scraper`
- **Objective**: Build pre-run hydration and post-run sync scripts to pull and push `gridlock.db`, raw `.artifacts/`, and `dist/exports/*.json` to S3/R2 storage.
- **Scope / Files**:
  - `projects/gridlock-scraper/scripts/sync-state.ts`
  - `projects/gridlock-scraper/tests/sync-state.test.ts`
  - `projects/gridlock-scraper/package.json`
- **Acceptance Criteria**:
  - [ ] Pre-run pulls existing `gridlock.db` and SHA-256 hash manifest from Cloudflare R2 (falls back to fresh schema if empty).
  - [ ] Post-run pushes mutated `gridlock.db` atomically (upload to `.tmp` key then move).
  - [ ] Syncs new content-addressable raw payload blobs to R2 bucket.
  - [ ] Verifies payload SHA-256 checksums before and after upload.
- **Verification**: `npm test tests/sync-state.test.ts`
- **Dependencies**: Ticket 02, Ticket 20

### Ticket 22: Scheduled Ingestion Workflow & Anomaly Webhook Alerts
- **System**: `gridlock-scraper`
- **Objective**: Configure scheduled CI/CD runner execution with automated secret binding and anomaly alerting.
- **Scope / Files**:
  - `projects/gridlock-scraper/.github/workflows/ingest.yml`
  - `projects/gridlock-scraper/scripts/notify-anomaly.ts`
- **Acceptance Criteria**:
  - [ ] GitHub Actions workflow triggers every 6 hours (`cron: '0 */6 * * *'`) and supports `workflow_dispatch`.
  - [ ] Runs pre-sync -> CLI ingestion sweep -> post-sync sequentially.
  - [ ] Binds repository secrets: `CLOUDFLARE_R2_*`, `GEMINI_API_KEY`, `ALERT_WEBHOOK_URL`.
  - [ ] Dispatches webhook alert (Discord/Slack) if CLI exits with code `2` (anomaly quarantined).
- **Verification**: `gh workflow view ingest.yml` or manual dry-run
- **Dependencies**: Ticket 19, Ticket 20, Ticket 21

---

## Phase 6: Scraper Hardening & Review Follow-ups (`gridlock-scraper`)

### Ticket 23: Playwright Download Lifecycle for ERCOT Interconnection Queue
- **System**: `gridlock-scraper`
- **Objective**: Intercept and download linked XLSX/CSV spreadsheet payloads during ERCOT queue extraction instead of capturing portal HTML.
- **Reference**: Codex PR #1 comment on `src/extractors/ercot.ts:27`
- **Scope / Files**:
  - `projects/gridlock-scraper/src/extractors/ercot.ts`
  - `projects/gridlock-scraper/tests/extractors.test.ts`
- **Acceptance Criteria**:
  - [ ] Implement Playwright download listener (`page.waitForEvent('download')`) to capture linked ERCOT GIS report spreadsheet.
  - [ ] Set accurate extraction content type (`text/csv` or Excel MIME type).
  - [ ] Pipe downloaded binary buffer to raw extraction result content.
  - [ ] Fall back gracefully or raise extraction anomaly on network timeout.
- **Verification**: `npm test` and mock offline extractor tests.
- **Dependencies**: Ticket 05

### Ticket 24: Replay Audit Approval Gate for Quarantine Reprocessing
- **System**: `gridlock-scraper`
- **Objective**: Gate quarantine payload release on verified out-of-band promotion, requiring a verified `repair_audits` record before re-evaluating and promoting a quarantined artifact.
- **Reference**: Codex PR #1 comment on `src/jobs/runner.ts:80`
- **Scope / Files**:
  - `projects/gridlock-scraper/src/jobs/runner.ts`
  - `projects/gridlock-scraper/src/storage/db.ts`
  - `projects/gridlock-scraper/tests/pipeline.test.ts`
- **Acceptance Criteria**:
  - [ ] Query `repair_audits` for connector status `promoted` before attempting quarantine re-ingestion.
  - [ ] Unreviewed parser runs leave failing payload in quarantine without false anomaly clearing.
  - [ ] Reprocessing requires verified promotion proof.
- **Verification**: `npm test tests/pipeline.test.ts`
- **Dependencies**: Ticket 06

### Ticket 25: Patch Manifest Persistence on Promoted Replay Verification
- **System**: `gridlock-scraper`
- **Objective**: Persist candidate patch descriptions (`proposedPatchDescription`) into `connector_configs.manifest` atomically upon successful replay verification.
- **Reference**: Codex PR #1 comment on `src/repair/replay.ts:73`
- **Scope / Files**:
  - `projects/gridlock-scraper/src/repair/replay.ts`
  - `projects/gridlock-scraper/src/storage/db.ts`
  - `projects/gridlock-scraper/tests/pipeline.test.ts`
- **Acceptance Criteria**:
  - [ ] When `evaluateCandidatePatch` passes 100%, update `connector_configs.manifest` with the proposed patch.
  - [ ] Atomically commit audit record, manifest update, and connector status `ok`.
  - [ ] Subsequent scraper executions load updated selectors from `connector_configs.manifest`.
- **Verification**: `npm test tests/pipeline.test.ts`
- **Dependencies**: Ticket 06

### Ticket 26: Mandatory Semantic Oracles for Replay Fixture Evaluation
- **System**: `gridlock-scraper`
- **Objective**: Require semantic assertions (`expectedMinCount` or `expectedSubjectIds` or `expectedAssertion`) on all `ReplayFixture` instances, prohibiting expectation-free fixture promotion.
- **Reference**: Codex PR #1 comment on `src/repair/replay.ts:10`
- **Scope / Files**:
  - `projects/gridlock-scraper/src/repair/replay.ts`
  - `projects/gridlock-scraper/tests/pipeline.test.ts`
- **Acceptance Criteria**:
  - [ ] Enforce in TypeScript and runtime that `ReplayFixture` must provide at least one semantic oracle.
  - [ ] Reject any fixture evaluation where no semantic oracle is specified.
  - [ ] Update all pipeline and repair tests to provide explicit expected counts and IDs.
- **Verification**: `npm test tests/pipeline.test.ts`
- **Dependencies**: Ticket 06

### Ticket 27: Strict Municipal Docket Status Validation
- **System**: `gridlock-scraper`
- **Objective**: Eliminate synthetic fallback to `"under_review"` when `.action-status` is missing or contains unsupported values, failing validation to trigger anomaly quarantine.
- **Reference**: Codex PR #1 comment on `src/parsers/municipal.ts:39`
- **Scope / Files**:
  - `projects/gridlock-scraper/src/parsers/municipal.ts`
  - `projects/gridlock-scraper/src/schemas/municipal.ts`
  - `projects/gridlock-scraper/tests/parsers.test.ts`
- **Acceptance Criteria**:
  - [ ] Remove `|| "under_review"` fallback from `parseMunicipalAgenda`.
  - [ ] Missing or unmapped status values pass raw or undefined to `validateMunicipalInvariants`.
  - [ ] Zod schema rejects invalid statuses, triggering quarantine isolation on selector drift.
- **Verification**: `npm test tests/parsers.test.ts`
- **Dependencies**: Ticket 04

### Ticket 28: Dynamic Municipal Action Type Classification
- **System**: `gridlock-scraper`
- **Objective**: Extract and derive the actual municipal action type (`zoning`, `annexation`, `site_plan`, `building_permit`, `hearing`, `variance`) from agenda docket items rather than hardcoding `"zoning"`.
- **Reference**: Codex PR #1 comment on `src/parsers/municipal.ts:44`
- **Scope / Files**:
  - `projects/gridlock-scraper/src/parsers/municipal.ts`
  - `projects/gridlock-scraper/src/schemas/municipal.ts`
  - `projects/gridlock-scraper/tests/parsers.test.ts`
- **Acceptance Criteria**:
  - [ ] Extract explicit `.action-type` element or classify from title/body regex.
  - [ ] Map into validated `MunicipalActionType` enum in `src/schemas/municipal.ts`.
  - [ ] Fail validation on unclassifiable or missing action types.
- **Verification**: `npm test tests/parsers.test.ts`
- **Dependencies**: Ticket 04

### Ticket 29: Quarantine Media Type & Storage Extension Preservation
- **System**: `gridlock-scraper`
- **Objective**: Preserve the actual `contentType` and file extension of failing payloads during quarantine instead of hardcoding `text/html`.
- **Reference**: Codex PR #1 comment on `src/repair/quarantine.ts:34`
- **Scope / Files**:
  - `projects/gridlock-scraper/src/repair/quarantine.ts`
  - `projects/gridlock-scraper/src/jobs/runner.ts`
  - `projects/gridlock-scraper/tests/pipeline.test.ts`
- **Acceptance Criteria**:
  - [ ] Pass `contentType` and deducted file extension into `quarantineExtractionFailure`.
  - [ ] Store CSV/PDF/JSON payloads under their canonical format in `ArtifactStore` and `source_artifacts`.
  - [ ] Accurate provenance metadata recorded for downstream replay tooling.
- **Verification**: `npm test tests/pipeline.test.ts`
- **Dependencies**: Ticket 02, Ticket 06


