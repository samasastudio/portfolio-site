# Project Context: Compute Atlas (ATX Compute Infrastructure)

## Overview
Compute Atlas is a temporal intelligence platform and portfolio gateway reconstructing the physical expansion of artificial intelligence from fragmented public records across Texas (Central Texas initial focus). Built on Next.js 16, React 19, TypeScript, Drizzle ORM, and Google Cloud / Gemini AI systems.

Editorial Thesis: AI is not immaterial. It is becoming physical infrastructure (data centers, chip fabs, substations, water pipelines, tax abatements, zoning shifts), and that transformation is difficult to perceive while it is occurring.

---

## The Three Systems & Boundary Model

1. **`gridlock-scraper` (Deterministic Ingestion & Self-Healing Repair)**:
   - Ingestion across heterogeneous Texas public records: TDLR TABS (state construction registrations), Austin Open Data & AB+C, municipal planning agendas/packets (e.g., Taylor, Round Rock), TCEQ (environmental/air/water permits), ERCOT (large-load interconnections), and TWDB (water context).
   - Deterministic fast path: REST APIs, Cheerio HTML extractors, structured PDF/tabular parsers.
   - Out-of-band LLM repair agent: Powered by Gemini 2.5 Flash. Wakes *only* when deterministic extraction fails, schemas violate invariants, or DOM layouts break.
   - Replay & test gates: Agent proposes connector patches tested in sandboxed replay against cached immutable artifacts before promotion.
   - Source Health surface: Full visibility into connector status, invariant checks, failure telemetry, and audit logs.

2. **`gridlock-graphical-atlas` (Temporal Technical Atlas)**:
   - Living technical atlas visualizing the physical compute buildout across Central Texas.
   - Decoupled two-tier rendering model:
     - *Deterministic GIS Base*: Exact parcel boundaries, roads, municipal jurisdictions, power transmission lines, and water basins rendered via vector maps (MapLibre / Canvas / SVG). Zero spatial hallucinations.
     - *Stateful Semantic Visual Layer*: Living technical aesthetic (topographic plate, architectural drawing, utility schematic) generated/conditioned via Google GenAI. Entities carry a stable visual seed evolving with lifecycle state: proposed projects appear faint/diagrammatic; active construction/operational sites resolve into dense structures; withdrawn projects leave visible ghosted traces.
   - Temporal scrubber: Supports `STATE` mode (reconstruct world as understood at date $T$) and `DELTA` mode (highlight changes between $T_1$ and $T_2$).

3. **`gridlock-generative-console` (Investigative Analytical Workspace)**:
   - Dynamic investigative workspace driven by natural-language inquiry.
   - Not a chat transcript. Gemini Flash acts as an intent interpreter and layout planner, emitting a strongly-typed UI AST composed from a curated component palette.
   - Component grammar: `MapView`, `Timeline`, `EntityHeader`, `EvidenceViewer`, `MetricGroup`, `DataTable`, `Comparison`, `RelationshipGraph`, `DocumentViewer`, `SourceDiff`, `MethodologyPanel`, `Alert`.
   - In-place mutation: Follow-up prompts transform the active workspace (filter, pivot, expand, compare) rather than appending chat bubbles.
   - Evidence-first provenance: Every metric, status, and assertion links directly to underlying source artifacts in the Evidence Viewer.

---

## Ubiquitous Language & Entities

- **Project**: Canonical umbrella real-world compute development (e.g., "Project Eagle", "Skybox Austin I", "Samsung Taylor Campus").
- **Facility / Building**: Physical subcomponent, shell, or phase of a project campus.
- **Organization**: Corporate entity, operator, hyperscaler, developer, utility provider, or government body.
- **Location**: Geographic footprint including address, parcel ID, county, coordinates, and jurisdiction boundaries.
- **Development Action**: Municipal or state filing: zoning change, annexation, site plan, building permit, hearing, approval, withdrawal.
- **Environmental Action**: Permitting event for air emissions, industrial water consumption, wastewater, or stormwater (TCEQ).
- **Infrastructure Relationship**: Grid interconnect, dedicated substation, transmission tie-in, or municipal water utility agreement.
- **Economic Relationship**: Chapter 312/380/381 tax abatements, reinvestment zones, or municipal infrastructure grant commitments.
- **Source Artifact**: Immutable captured HTML, PDF, open data JSON, or document with cryptographic hash (SHA-256) and capture metadata.
- **Observation**: Atomic assertion about an entity: `{ subject, property, value, observedAt, effectiveAt, sourceArtifactId, connectorVersion, confidence }`.
- **Canonical State**: Derived current interpretation of an entity projected from valid historical observations.
- **State Projector**: Deterministic engine reconstructing entity or regional state at an arbitrary date $T$.
- **Delta Projector**: Computes structured differences (new permits, status changes, expanded acreage, withdrawals) between $T_1$ and $T_2$.
- **UI AST**: Declarative JSON tree emitted by the investigation planner representing component hierarchy and hydrated props.
- **Source Health**: Diagnostic console exposing connector execution metrics, invariant failures, repair proposals, and replay test passes.

---

## Data & Storage Spine

- **Relational Store (PostgreSQL via Drizzle ORM)**:
  - All schemas managed via typed Drizzle definitions (`drizzle-orm`, `drizzle-kit`).
  - Core tables: `projects`, `facilities`, `organizations`, `locations`, `development_actions`, `environmental_actions`, `infrastructure_relationships`, `economic_relationships`, `observations`, `source_artifacts`, `connector_configs`, `repair_audits`.
- **Artifact Object Storage (Google Cloud Storage / Cloudflare R2)**:
  - Immutable raw source artifacts (gzipped HTML, original PDFs, API payloads) indexed by SHA-256 content hashes.
  - Cached stateful visual plates generated for the atlas.

---

## Core Architectural Invariants

1. **Deterministic by Default**: Routine extraction uses versioned code parsers and official APIs. LLMs are never used for commodity data plumbing.
2. **AI at Uncertainty Boundaries**: Models are isolated to: (a) out-of-band connector repair, (b) ambiguous entity resolution with cited evidence, (c) stateful semantic visual synthesis, and (d) investigative UI AST planning.
3. **Evidence Before Synthesis**: Every fact, metric, and timeline event must trace to an immutable `SourceArtifact`. Hallucinated facts are prohibited.
4. **Time is First-Class**: Never mutate or overwrite historical observations. When an application changes status (e.g. pending $\to$ withdrawn), append a new observation with `observedAt` and `effectiveAt`.
5. **The Interface is the Conversation**: Natural language drives dynamic layout transformation; it does not append text bubbles.
6. **Uncertainty is Visible**: Conflicting agency records, low confidence matches, or missing utility data are rendered explicitly; "insufficient evidence" is a valid primary state.
7. **Safe Promotion Gates**: The repair agent cannot commit code or modify canonical data directly. Repairs must pass historical fixture replay, schema invariants, and diff bounds.
