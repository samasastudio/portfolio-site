# Technical Specification: gridlock-graphical-atlas (Temporal Technical Atlas)

## 1. Overview & Motivation
- **Problem Statement**: The physical footprint of artificial intelligence in Central Texas (hyperscale data centers, semiconductor fabs, grid substations, transmission corridors) is invisible in daily life and obscured on generic commercial maps. Standard web maps treat facilities as flat points of interest and lack temporal depth. Pure generative diffusion workflows suffer from "continuity roulette," hallucinating roads, parcels, and coordinates across time steps.
- **User Story**: As a researcher, journalist, or civic observer, I need an interactive temporal technical atlas that couples deterministic GIS accuracy with an evocative living architectural aesthetic, allowing me to perceive the accumulation of compute infrastructure across Texas and inspect meaningful state changes over time without spatial hallucinations.
- **Repository Isolation**: Dedicated Git repository at `projects/gridlock-graphical-atlas` maintaining complete architectural separation of concerns from the portfolio presentation gateway.

---

## 2. Architecture & Seams

### 2.1 Decoupled Rendering Pipeline
```text
┌─────────────────────────────────────────────────────────────┐
│ 1. Deterministic GIS Vector Base (MapLibre GL / Canvas)     │
│ • Real parcel boundaries (TNRIS / county CAD)               │
│ • Highway and arterial road network                         │
│ • High-voltage transmission lines & substations (ERCOT)     │
│ • Aquifers and watershed boundaries (TWDB)                  │
│ • Sub-50ms vector hitboxes and pointer events               │
└──────────────────────────────┬──────────────────────────────┘
                               │ Aligned Projections (EPSG:3857)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. Stateful Semantic Visual Plate (Gemini Interactions API) │
│ • Model: gemini-3.1-flash-lite-image (NB2Lite)              │
│ • Bootstrapped from local GIS vector base (edit_local_image)│
│ • Persistent visual context chained via interaction_id      │
│ • Lifecycle state evolution (Stage 1 faint -> Stage 6 ghost)│
│ • Aspect ratio locked at generation time (1:1 or 16:9)      │
│ • High-resolution WebP raster tiles cached in object storage │
└──────────────────────────────┬──────────────────────────────┘
                               │ Time Parameter (T) or Delta (T1 -> T2)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. Temporal Scrubber & State Projector                      │
│ • STATE Mode: Reconstructs known reality at date T          │
│ • DELTA Mode: Highlights additions, progress, withdrawals   │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Public Interfaces & API Routes

All endpoints return JSON and adhere to standard HTTP status codes:

1. **`GET /api/atlas/state`**
   - **Query Parameters**:
     - `date`: ISO date string (`YYYY-MM-DD`). Default: current UTC date.
     - `jurisdictions`: Optional comma-separated list (e.g. `Austin,Taylor,RoundRock`).
   - **Response**:
     ```typescript
     interface AtlasStateResponse {
       date: string;
       features: GeoJSON.FeatureCollection<GeoJSON.Geometry, AtlasFeatureProperties>;
       activeCount: number;
       totalPowerDemandMw: number;
     }
     ```

2. **`GET /api/atlas/delta`**
   - **Query Parameters**:
     - `from`: Start ISO date (`YYYY-MM-DD`).
     - `to`: End ISO date (`YYYY-MM-DD`).
     - `jurisdictions`: Optional filter.
   - **Response**:
     ```typescript
     interface AtlasDeltaResponse {
       from: string;
       to: string;
       added: AtlasFeatureProperties[];
       progressed: { id: string; fromStage: string; toStage: string }[];
       withdrawn: AtlasFeatureProperties[];
       unchangedCount: number;
     }
     ```

3. **`GET /api/atlas/projects/:id/geometry`**
   - **Response**: GeoJSON `Feature` with parcel boundaries, building footprints, and transmission interconnection lines.

4. **`GET /api/atlas/plates/:projectId/:stage`**
   - **Response**: `{ imageUrl: string; interactionId: string; thinkingLevel: "low" | "high"; createdAt: string }`

### 2.3 Data Models & Drizzle Schema

```typescript
// src/schema/atlas.ts
import { pgTable, uuid, text, timestamp, numeric, jsonb, integer, pgEnum } from "drizzle-orm/pg-core";

export const lifecycleStageEnum = pgEnum("lifecycle_stage", [
  "proposed",
  "permitting",
  "approved",
  "construction",
  "operational",
  "withdrawn"
]);

export const thinkingLevelEnum = pgEnum("thinking_level", ["low", "high"]);

export const visualPlates = pgTable("visual_plates", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id").notNull(),
  facilityId: uuid("facility_id"),
  stage: lifecycleStageEnum("stage").notNull(),
  interactionId: text("interaction_id").notNull().unique(),
  previousInteractionId: text("previous_interaction_id"), // Null for bootstrap turn
  promptUsed: text("prompt_used").notNull(),
  thinkingLevel: thinkingLevelEnum("thinking_level").notNull().default("low"),
  storagePath: text("storage_path").notNull(), // gs://compute-atlas-plates/{projectId}/{stage}.webp
  aspectRatio: text("aspect_ratio").notNull().default("16:9"),
  byteSize: integer("byte_size").notNull(),
  generatedAt: timestamp("generated_at").defaultNow().notNull(),
});

export const projectGeometries = pgTable("project_geometries", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id").notNull().unique(),
  parcelGeojson: jsonb("parcel_geojson").notNull(),
  centroidLng: numeric("centroid_lng", { precision: 10, scale: 7 }).notNull(),
  centroidLat: numeric("centroid_lat", { precision: 10, scale: 7 }).notNull(),
  county: text("county").notNull(),
  jurisdiction: text("jurisdiction").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
```

### 2.4 Component Hierarchy
```text
<AtlasShell>
  ├── <AtlasViewport> (MapLibre GL Container, EPSG:3857)
  │     ├── <GISVectorLayers> (Parcels, roads, transmission lines, water basins)
  │     ├── <SemanticPlateLayer> (Canvas overlay with WebP background plates)
  │     └── <VectorHitboxLayer> (Sub-50ms pointer events & hover states)
  ├── <TemporalScrubber> (STATE vs DELTA modes, playback controls, tick marks)
  ├── <JurisdictionFilter> (Multi-select: Central Texas / ERCOT corridors)
  └── <ProjectDetailDrawer> (Slide-out panel linking directly to Evidence Viewer)
```

---

## 3. Visual Grammar & Lifecycle Evolution

### 3.1 Lifecycle Progression via Gemini Interactions API

| Stage | Regulatory State | Visual Plate Representation | Incremental Edit Prompt (`edit_image`) | Thinking Level |
|---|---|---|---|---|
| **01: Proposed** | Zoning case or annexation petition filed | Faint blueprint linework, dashed perimeter | `Bootstrap from parcel GIS vector: Archival technical blueprint plate, faint dashed perimeter lines, sepia paper background.` | `low` |
| **02: Permitting** | TDLR registration, TCEQ air permit pending | Survey boundary markers, site grid subdivision | `Add civil survey boundary markers, topographic contour lines, and site grid subdivision.` | `low` |
| **03: Approved** | Site plan approved, council resolution passed | Civil engineering grading, foundation layout lines | `Add concrete foundation outlines, access roads, and civil grading lines.` | `high` |
| **04: Construction** | Building permits issued, active grading | Structural steel framing, crane indicators, utility trench lines | `Add crane rigging, structural steel framing, and underground utility trenching.` | `high` |
| **05: Operational** | Certificate of occupancy, energization confirmed | Fully resolved industrial facility, transformer yard, switchgear | `Render completed industrial shell, high-voltage transformer yard, switchgear, and active transmission link.` | `high` |
| **06: Withdrawn** | Application denied or formally rescinded | Faded ghosted linework with diagonal strikethrough | `Apply faded ghosted linework, cross-hatched cedar diagonal strikethrough across the facility.` | `high` |

### 3.2 Temporal Modes
1. **STATE Mode (`mode=state&date=YYYY-MM-DD`)**:
   - Queries `StateProjector` for all valid observations active on or before the selected date.
   - Restores the geographic landscape to that historical timestamp.
2. **DELTA Mode (`mode=delta&from=YYYY-MM-DD&to=YYYY-MM-DD`)**:
   - Queries `DeltaProjector` to highlight changes between the two dates.
   - Additions glow amber; structural advancements glow rust; withdrawals render in muted cedar strikeout; unchanged infrastructure is de-emphasized.

---

## 4. Edge Cases & Error Handling

1. **Stale `interaction_id` Forking**:
   - Chaining an older `interaction_id` silently creates a new branch from that historical point. The generation worker queries `visual_plates` for `MAX(generatedAt)` for the entity before issuing an edit.
2. **Expired Server-Side Context**:
   - If Google's servers purge context for an older `interaction_id` (returning 404/invalid argument), worker falls back to `edit_local_image` using the highest-stage cached WebP asset to re-bootstrap the session.
3. **Thinking Level Invariant Violation**:
   - Reject any API request specifying `minimal` or `medium` (which return HTTP 400 on `gemini-3.1-flash-lite-image`). Enforce compile-time Zod enum allowing only `"low"` and `"high"`.
4. **MapLibre WebGL Context Loss**:
   - Bind `webglcontextlost` event on canvas. Re-initialize map layers and restore viewport center/zoom from React state without a full page reload.
5. **Missing Parcel GIS Geometries**:
   - In rural or unincorporated Texas counties lacking digitized GIS shapefiles, fall back to county appraisal district (CAD) centroid bounding boxes with a dashed "Approximate Boundary" indicator.
6. **Mobile High-DPI Canvas Memory Bounding**:
   - Cap canvas rendering resolution at 2x pixel ratio on mobile viewports to prevent browser GPU crashes.

---

## 5. Acceptance Criteria

- [ ] **Deterministic Coordinate Fidelity**:
  - *Given* a project with known TNRIS parcel coordinates,
  - *When* rendered in `AtlasViewport`,
  - *Then* vector parcel boundary aligns with sub-millisecond precision and 0 spatial drift against MapLibre basemap tiles.
- [ ] **Stateful Visual Continuity**:
  - *Given* an entity progressing from Stage 01 (Proposed) to Stage 04 (Construction),
  - *When* visual plates are generated via the Interactions API,
  - *Then* camera angle, surrounding topography, and parcel boundary remain identical while structural steel and crane elements are added incrementally.
- [ ] **Interactive Latency Floor**:
  - *Given* 500+ active compute infrastructure entities loaded in the Central Texas viewport,
  - *When* hovering or clicking on a parcel hitbox,
  - *Then* pointer response and selection highlight trigger in under 50ms without network roundtrips.
- [ ] **Scrubber Frame Rate**:
  - *Given* the user drags `TemporalScrubber` across a 5-year timeline range,
  - *When* time steps are evaluated,
  - *Then* vector layer updates maintain 60fps on standard desktop hardware.
- [ ] **Thinking Level Compliance**:
  - *Given* a draft plate generation task,
  - *When* dispatched to the worker,
  - *Then* `thinking_level` is strictly set to `"low"` (for sub-2s generation) or `"high"` (for crisp text), never emitting `"minimal"` or `"medium"`.
- [ ] **State vs Delta Projection Accuracy**:
  - *Given* a project permitted on 2024-03-01 and withdrawn on 2025-01-15,
  - *When* queried in STATE mode for 2024-06-01, it renders as active permitting;
  - *When* queried in STATE mode for 2025-06-01, it renders as withdrawn;
  - *When* queried in DELTA mode between 2025-01-01 and 2025-02-01, it is highlighted specifically as a withdrawal event.

---

## 6. Non-Goals (Out of Scope)

1. **3D Photorealistic Mesh Rendering**: The atlas explicitly rejects generic Unreal Engine / Cesium 3D photorealistic meshes in favor of the curated archival technical plate aesthetic.
2. **Global Satellite Imagery Hosting**: No self-hosted multi-terabyte satellite tile caches. Basemaps use vector line tiles (MapLibre OpenMapTiles / Stadia / Carto).
3. **Direct User GIS Geometry Editing**: End users cannot sketch or mutate parcel polygons. All geometry is ingested deterministically from authoritative state sources.
