# Technical Specification: gridlock-scraper (Compute Infrastructure Ingestion Engine)

## 1. Overview & Motivation
- **Problem Statement**: Texas public records tracking compute infrastructure (data centers, semiconductor fabs, substations) are fragmented across siloed state agencies (TDLR, TCEQ), municipal permitting portals (Austin AB+C, Taylor City Council), and utility datasets (ERCOT, TWDB). Markup, table formats, and agenda packet structures frequently shift. Routine LLM scraping is slow, fragile, and cost-prohibitive.
- **User Story**: As the Compute Atlas platform, I need a scheduled, resilient, and verifiable ingestion service that deterministically extracts public infrastructure filings, stores immutable source artifacts, auto-repairs broken selectors via sandboxed LLM replay, resolves multi-source entity ambiguities, and emits atomic temporal observations.

---

## 2. Architecture & Pipeline

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

### 2.2 Core Modules

1. **Connector Framework (`src/connectors/`)**:
   - **`tdlr-tabs.ts`**: Connects to Texas Department of Licensing and Regulation TABS portal. Extracts project number, estimated cost, square footage, owner/tenant, architect, location, and dates.
   - **`austin-permits.ts`**: Queries City of Austin Socrata Open Data API & AB+C portal for commercial building permits and site plans.
   - **`municipal-agendas.ts`**: Deterministic HTML/PDF scraper monitoring city council and planning commission agenda packets (Taylor, Hutto, Round Rock).
   - **`tceq-permits.ts`**: Extracts air quality standard permits (backup diesel generator clusters) and wastewater authorizations.
   - **`ercot-queue.ts`**: Parses published ERCOT large-load interconnection spreadsheets.

2. **Raw Artifact Storage (`src/storage/artifact-store.ts`)**:
   - Compresses raw payloads with Gzip and computes SHA-256 content hashes.
   - Saves to `gs://compute-atlas-artifacts/{source_family}/{year}/{sha256}.{ext}.gz`.
   - Records metadata in `source_artifacts` SQL table.

3. **Invariant Guard (`src/guards/invariant-guard.ts`)**:
   - Evaluates pre- and post-extraction conditions:
     - Record volume drop: Flags run if extracted records fall $>30\%$ below historical median.
     - Required field coverage: Every record must contain identifier, address/county, and filing date.
     - Type check: Zod schemas validate observation fields.

4. **Out-of-Band Repair Agent (`src/agent/repair-agent.ts`)**:
   - Wakes only on invariant failure.
   - Extracts a sanitized DOM skeleton (pruning styles, SVGs, and inline scripts) or document sample.
   - Bundles: (1) DOM skeleton, (2) failing selector manifest, (3) target schema, (4) last 3 successful extraction records.
   - Prompts Gemini 2.5 Flash to synthesize updated CSS/XPath selectors or regex extraction rules.
   - Executes patch in an isolated sandbox against 5 historical fixture files. Only promotes if all historical and live fixtures extract with 100% invariant compliance.

5. **Entity Resolution Engine (`src/engine/entity-resolver.ts`)**:
   - Deterministic matching: Parcel IDs, normalized physical addresses, applicant phone/email patterns, and legal descriptions.
   - Probabilistic candidate matching: Jaro-Winkler distance on project names ("Project Eagle Phase 1" vs "Eagle Facility B").
   - Gemini Flash adjudication: When confidence is between $0.60$ and $0.85$, agent evaluates source context and outputs match confidence and citation evidence without silent merging.

---

## 3. Data Models & Drizzle Schemas

```typescript
// src/schema.ts
import { pgTable, uuid, text, timestamp, numeric, jsonb, boolean, integer } from "drizzle-orm/pg-core";

export const sourceArtifacts = pgTable("source_artifacts", {
  id: uuid("id").primaryKey().defaultRandom(),
  sha256Hash: text("sha256_hash").notNull().unique(),
  sourceFamily: text("source_family").notNull(), // "tdlr_tabs", "austin_permits", "tceq", "municipal_agenda"
  sourceUrl: text("source_url").notNull(),
  storagePath: text("storage_path").notNull(),
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

---

## 4. Verification & Testing Strategy
- **Unit Tests (`npm test`)**: Connector parsers tested against static fixture files stored under `tests/fixtures/`.
- **Sandbox Replay Suite**: CLI runner `npm run test:replay -- --connector=tdlr_tabs` executes extractor against all archived historical fixtures.
- **Invariant Gate Simulation**: Test failure detection by injecting malformed HTML fixtures into the test runner and verifying that the anomaly guard triggers without crashing the process.
