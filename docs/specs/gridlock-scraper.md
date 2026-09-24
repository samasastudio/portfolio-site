# Technical Specification: gridlock-scraper (Compute Infrastructure Ingestion Engine)

## 1. Overview & Motivation
- **Problem Statement**: Texas public records tracking compute infrastructure (data centers, semiconductor fabs, substations) are fragmented across siloed state agencies (TDLR, TCEQ), municipal permitting portals (Austin AB+C, Taylor City Council), and utility datasets (ERCOT, TWDB). Markup, table formats, and agenda packet structures frequently shift without notice. Routine LLM scraping is slow, fragile, and cost-prohibitive.
- **User Story**: As the Compute Atlas platform, I need a scheduled, resilient, and verifiable ingestion service that deterministically extracts public infrastructure filings, stores immutable source artifacts, auto-repairs broken selectors via sandboxed LLM replay, resolves multi-source entity ambiguities, and emits atomic temporal observations.
- **Repository Isolation**: Dedicated Git repository at `projects/gridlock-scraper` maintaining complete architectural separation of concerns from the portfolio presentation gateway.

---

## 2. Architecture & Seams

### 2.1 Pipeline Flow
```text
[Cron / Ingestion Scheduler]
       │
       ▼
[Deterministic Connector Fast Path] ──(REST API / Cheerio / PDF Parser)
       │
       ├──► [Raw Artifact Captured] ──► [Object Storage (GCS / R2)] (SHA-256)
       │
       ├──► [Extraction Valid & Invariants Pass?]
       │        │
       │        ├──► YES ──► [Entity Resolution] ──► [Append to Observations]
       │        │                                                ▲
       │        └──► NO (Invariant Breach / Schema Anomaly)     │
       │                 │                                       │
       │                 ▼                                       │
       │          [Diagnostic Bundle Created]                    │
       │                 │                                       │
       │                 ▼                                       │
       │          [Out-of-Band Repair Agent] ──► [Gemini 2.5 Flash]
       │                 │                       (Synthesize patch)
       │                 ▼                                       │
       │          [Sandbox Replay Gates]                         │
       │          • Historical fixture regression                │
       │          • Live artifact validation                     │
       │          • Invariant check: 100% pass                   │
       │                 │                                       │
       │                 ├──► PASS ──► [Promote Patch] ──────────┘
       │                 └──► FAIL ──► [Escalate to Source Health / Human Alert]
```

### 2.2 Public Interfaces & API Routes

All endpoints communicate via JSON and require bearer token authentication in production:

1. **`POST /api/ingest/trigger`**
   - **Request Payload**:
     ```typescript
     interface TriggerIngestRequest {
       connectorId?: string; // e.g. "tdlr_tabs", "austin_permits", "tceq", "ercot_queue"
       dryRun?: boolean;
       targetDateRange?: { from: string; to: string };
     }
     ```
   - **Response**: `{ runId: string; status: "queued" | "running"; timestamp: string }`

2. **`GET /api/ingest/status?runId=:id`**
   - **Response**:
     ```typescript
     interface IngestStatusResponse {
       runId: string;
       connectorId: string;
       recordsExtracted: number;
       artifactsStored: number;
       invariantStatus: "passed" | "anomaly_detected" | "repairing";
       durationMs: number;
     }
     ```

3. **`GET /api/artifacts/:sha256`**
   - **Response**: Returns gzipped raw artifact stream with `Content-Type`, `X-Source-Url`, and `X-Captured-At` headers.

4. **`POST /api/repair/sandbox-replay`**
   - **Request Payload**:
     ```typescript
     interface SandboxReplayRequest {
       connectorId: string;
       patch: { selectors?: Record<string, string>; extractorScript?: string };
       fixtureIds: string[];
     }
     ```
   - **Response**: `{ allPassed: boolean; passedCount: number; totalCount: number; errors: string[] }`

### 2.3 Data Models & Drizzle Schemas

```typescript
// src/schema/scraper.ts
import { pgTable, uuid, text, timestamp, numeric, jsonb, boolean, integer } from "drizzle-orm/pg-core";

export const sourceArtifacts = pgTable("source_artifacts", {
  id: uuid("id").primaryKey().defaultRandom(),
  sha256Hash: text("sha256_hash").notNull().unique(),
  sourceFamily: text("source_family").notNull(), // "tdlr_tabs", "austin_permits", "tceq", "municipal_agenda", "ercot_queue"
  sourceUrl: text("source_url").notNull(),
  storagePath: text("storage_path").notNull(), // gs://compute-atlas-artifacts/{source_family}/{year}/{sha256}.{ext}.gz
  byteSize: integer("byte_size").notNull(),
  mimeType: text("mime_type").notNull(),
  capturedAt: timestamp("captured_at").defaultNow().notNull(),
  connectorVersion: text("connector_version").notNull(),
});

export const observations = pgTable("observations", {
  id: uuid("id").primaryKey().defaultRandom(),
  subjectType: text("subject_type").notNull(), // "project", "facility", "organization", "location"
  subjectId: uuid("subject_id").notNull(),
  property: text("property").notNull(), // "status", "estimated_cost", "square_footage", "operator", "power_mw"
  valueJson: jsonb("value_json").notNull(),
  observedAt: timestamp("observed_at").defaultNow().notNull(),
  effectiveAt: timestamp("effective_at"), // Filing date or official action date
  sourceArtifactId: uuid("source_artifact_id").references(() => sourceArtifacts.id).notNull(),
  connectorVersion: text("connector_version").notNull(),
  confidence: numeric("confidence", { precision: 4, scale: 3 }).notNull().default("1.000"),
  resolutionMethod: text("resolution_method").notNull().default("deterministic"), // "deterministic", "agent_adjudicated", "manual"
});

export const connectorConfigs = pgTable("connector_configs", {
  id: text("id").primaryKey(), // e.g. "tdlr_tabs_v1"
  sourceFamily: text("source_family").notNull(),
  enabled: boolean("enabled").notNull().default(true),
  manifest: jsonb("manifest").notNull(), // selectors, URL templates, header configs
  invariants: jsonb("invariants").notNull(),
  lastRunAt: timestamp("last_run_at"),
  lastStatus: text("last_status").notNull().default("idle"), // "ok", "anomaly", "repairing", "error"
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const repairAudits = pgTable("repair_audits", {
  id: uuid("id").primaryKey().defaultRandom(),
  connectorId: text("connector_id").references(() => connectorConfigs.id).notNull(),
  failureReason: text("failure_reason").notNull(),
  proposedPatch: jsonb("proposed_patch").notNull(),
  replayResults: jsonb("replay_results").notNull(),
  status: text("status").notNull(), // "promoted", "rejected", "pending_review"
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
```

### 2.4 Core Modules
1. **Connector Framework (`src/connectors/`)**:
   - `tdlr-tabs.ts`: TDLR TABS construction registration extractor.
   - `austin-permits.ts`: City of Austin Socrata Open Data API & AB+C portal.
   - `municipal-agendas.ts`: City council/planning commission PDF/HTML agenda packet monitor.
   - `tceq-permits.ts`: Air quality and industrial wastewater permits parser.
   - `ercot-queue.ts`: ERCOT large-load interconnection spreadsheet ingestion.
2. **Artifact Store (`src/storage/`)**: SHA-256 hash calculation, Gzip compression, and Cloud Storage persistence.
3. **Invariant Guard (`src/guards/`)**: Volume drop detection, required field checks, and Zod type assertions.
4. **Out-of-Band Repair Agent (`src/agent/`)**: Gemini 2.5 Flash patch synthesis and sandbox regression runner.
5. **Entity Resolution Engine (`src/engine/`)**: Address normalization, parcel matching, and probabilistic adjudication.

### 2.5 Deployment Architecture & Hosting Strategy

The ingestion engine executes on a decoupled, batch-oriented compute tier separate from edge presentation gateways:

```text
┌────────────────────────────────────────────────────────────────────────┐
│ Phase 1 Ingestion Runtime: GitHub Actions Cron (.github/workflows/)    │
│ Phase 2 Ingestion Runtime: Cloud Run Job / Dedicated VPS (Hetzner)     │
│ • Container: mcr.microsoft.com/playwright:v1.63.0-noble (Node.js 22)   │
│ • Execution: Unprivileged 'pwuser' with Playwright Chromium            │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
           ┌────────────────────────┴────────────────────────┐
           ▼                                                 ▼
┌─────────────────────────────────────┐   ┌──────────────────────────────────┐
│ Pre-Run State Ingestion Hook        │   │ Post-Run State Publishing Hook   │
│ • Pull latest 'gridlock.db' from R2 │   │ • Push updated 'gridlock.db'     │
│ • Fetch artifact SHA-256 cache      │   │ • Sync new raw blobs to R2       │
│                                     │   │ • Publish dist/exports/*.json    │
└─────────────────────────────────────┘   └──────────────────────────────────┘
```

1. **Two-Phase Hosting Topology**:
   - **Phase 1 (Immediate / MVP / Verification)**: **GitHub Actions Scheduled Workflow** (`.github/workflows/ingest.yml`).
     - **Cadence**: Cron schedule (`cron: '0 */6 * * *'`).
     - **Runtime**: `ubuntu-latest` with native Playwright Chromium support.
     - **Storage Lifecycle**: Pulls previous `gridlock.db` state from Cloudflare R2 before sweep; pushes updated SQLite database and new artifacts to R2 on completion.
   - **Phase 2 (Production / Dedicated)**: **Google Cloud Run Job** or **Dedicated Linux VPS** ($4–$6/mo on Hetzner Cloud / DigitalOcean).
     - **Rationale**: Provides static datacenter/residential IP to eliminate CDN bot challenges (Cloudflare Turnstile, Akamai) on Texas government portals, and persistent NVMe disk for local SQLite without pre/post network sync.

2. **Container Specification (`Dockerfile`)**:
   - **Base Image**: `mcr.microsoft.com/playwright:v1.63.0-noble`.
   - **Node Runtime**: Node.js >= 22 (ESM).
   - **Execution Command**: `node dist/cli.js --all`.
   - **Security**: Runs as non-root `pwuser`.

3. **CLI Execution Contract (`src/cli.ts`)**:
   - **Interface**:
     ```typescript
     export interface CliArgs {
       source?: "tdlr" | "ercot" | "tceq" | "municipal" | "all";
       dryRun?: boolean;
       force?: boolean;
     }
     ```
   - **Exit Codes**:
     - `0`: Ingestion completed cleanly or content-hash early exit triggered.
     - `1`: Fatal network / runtime crash.
     - `2`: Invariant breach / selector anomaly quarantined (triggers out-of-band repair alert).

4. **Environment & Secrets Matrix**:
   - `CLOUDFLARE_R2_ACCOUNT_ID`: Cloudflare account identifier.
   - `CLOUDFLARE_R2_ACCESS_KEY_ID`: S3-compatible R2 access key.
   - `CLOUDFLARE_R2_SECRET_ACCESS_KEY`: S3-compatible R2 secret key.
   - `CLOUDFLARE_R2_BUCKET_NAME`: Target artifact bucket (e.g. `gridlock-artifacts`).
   - `GEMINI_API_KEY`: Google GenAI API key for Gemini 2.5 Flash repair agent.
   - `ALERT_WEBHOOK_URL`: Optional Discord/Slack webhook for anomaly notifications.

---

## 3. Edge Cases & Error Handling

1. **Bot Protection & Anti-Scraping Defenses**:
   - If an agency portal deploys Cloudflare Turnstile or Akamai bot protection returning HTTP 403/503, the connector does *not* brute-force requests. It logs a `bot_block` error code, suspends the connector, and notifies the Source Health console.
2. **Record Volume Drop (>30% Anomaly Threshold)**:
   - If an ingestion run yields $>30\%$ fewer records than the 30-day moving median, the Invariant Guard halts automatic observation promotion and triggers the Out-of-Band Repair Agent.
3. **Portal Layout / Selector Drift**:
   - When CSS selectors return null elements, the repair agent extracts a sanitized DOM skeleton (stripping `<script>`, `<style>`, and SVG paths), bundles the last 3 valid records, and prompts Gemini 2.5 Flash to synthesize replacement selectors.
4. **Corrupted or Scanned PDF Packets**:
   - Municipal agenda packets containing scanned non-text PDF pages automatically route through local OCR preprocessing (tesseract/pdf-parse) before text extraction.
5. **Rate Limiting & Transient Network Outages**:
   - All network requests implement exponential backoff with randomized jitter (initial 500ms, max 3 retries) for HTTP 429 and 5xx responses.

---

## 4. Acceptance Criteria

- [ ] **Deterministic Extraction Fidelity**:
  - *Given* a valid TDLR TABS project page,
  - *When* processed by `tdlr-tabs.ts`,
  - *Then* project number, estimated cost, square footage, address, and owner are extracted with 100% precision against verified fixtures.
- [ ] **Immutable Artifact Storage**:
  - *Given* any incoming HTTP response or PDF file,
  - *When* ingested by `src/storage/artifact-store.ts`,
  - *Then* an immutable gzipped file is written to object storage under its exact SHA-256 hash, and verified before writing to `source_artifacts`.
- [ ] **Append-Only Observation Invariant**:
  - *Given* an updated permit status for an existing project,
  - *When* entity resolution links it to the existing `subjectId`,
  - *Then* a new row is appended to `observations` with `observedAt` and `effectiveAt`; historical observation rows are never overwritten or deleted.
- [ ] **Out-of-Band Repair Sandbox Gate**:
  - *Given* a broken connector selector injected into the test harness,
  - *When* the repair agent synthesizes a patch,
  - *Then* the patch is tested against 5 historical fixture files in sandboxed replay and rejected if test pass rate is $<100\%$.
- [ ] **Zero Autonomous Production Code Commits**:
  - *Given* a passing repair patch,
  - *When* promoted,
  - *Then* the patch is applied only to `connector_configs.manifest` in the database; production application source code files are never mutated directly by the model.
- [ ] **Containerized Production Build**:
  - *Given* the official Playwright base image `mcr.microsoft.com/playwright:v1.63.0-noble`,
  - *When* `docker build -t gridlock-scraper .` executes,
  - *Then* the build completes with zero vulnerabilities, installs Chromium dependencies, and compiles TypeScript source cleanly.
- [ ] **Pre-Run State Hydration & Post-Run Push**:
  - *Given* an ephemeral runner execution (GitHub Actions / Cloud Run Job),
  - *When* the scraper initializes,
  - *Then* it pulls the latest `gridlock.db` and artifact manifest from Cloudflare R2; and upon successful ingestion, uploads the mutated SQLite database, new `.artifacts/` blobs, and `dist/exports/*.json` with verified SHA-256 checksums.
- [ ] **Deterministic CLI Exit Codes**:
  - *Given* a running connector sweep via `src/cli.ts`,
  - *When* an invariant failure or selector anomaly is quarantined,
  - *Then* the process logs the failure to `repair_audits` and exits with code `2`, notifying downstream monitoring without corrupting the canonical database.

---

## 5. Non-Goals (Out of Scope)

1. **Sub-Second Streaming Ingestion**: Texas regulatory agencies update filings on daily or weekly cycles; streaming websockets or real-time polling are out of scope.
2. **Circumvention of Hard Legal Paywalls**: The scraper targets only public records, open government portals, and public FOIA/open data APIs.
3. **Autonomous Production Code Deployment**: The repair agent modifies runtime connector configuration manifests in the database; it does not push git commits directly to production branches.
