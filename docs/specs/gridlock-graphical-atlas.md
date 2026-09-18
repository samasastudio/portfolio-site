# Technical Specification: gridlock-graphical-atlas (Temporal Technical Atlas)

## 1. Overview & Motivation
- **Problem Statement**: The physical footprint of artificial intelligence in Central Texas (hyperscale data centers, semiconductor fabs, grid substations, transmission corridors) is invisible in daily life and obscured on generic commercial maps. Standard web maps treat facilities as flat points of interest and lack temporal depth. Pure generative imagery hallucinates roads, parcels, and coordinates.
- **User Story**: As a researcher, journalist, or civic observer, I need an interactive, temporal technical atlas that couples deterministic GIS accuracy with an evocative living architectural aesthetic, allowing me to perceive the accumulation of compute infrastructure across Texas and inspect meaningful state changes over time.
- **Repository Isolation**: Dedicated Git repository at `projects/gridlock-graphical-atlas` maintaining complete architectural separation of concerns from the portfolio presentation gateway.

---

## 2. Architecture & Rendering Pipeline

### 2.1 Decoupled Architecture
```text
┌─────────────────────────────────────────────────────────────┐
│ 1. Deterministic GIS Vector Base (MapLibre GL / Canvas)     │
│ • Real parcel boundaries (TNRIS / county CAD)               │
│ • Highway and arterial road network                         │
│ • High-voltage transmission lines & substations (ERCOT)     │
│ • Aquifers and watershed boundaries (TWDB)                  │
│ • Sub-millisecond vector hitboxes and pointer events        │
└──────────────────────────────┬──────────────────────────────┘
                               │ Aligned Projections (EPSG:3857)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. Stateful Semantic Visual Plate (Google GenAI Engine)     │
│ • Archival technical drawing / blueprint aesthetic          │
│ • Persistent visual seed per tracked project                │
│ • Lifecycle state evolution (Stage 1 faint -> Stage 4 dense)│
│ • Ghosted historical traces for withdrawn filings           │
│ • High-resolution WebP/SVG raster background plate          │
└──────────────────────────────┬──────────────────────────────┘
                               │ Time Parameter (T) or Delta (T1 -> T2)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. Temporal Scrubber & State Projector                      │
│ • STATE Mode: Reconstructs known reality at date T          │
│ • DELTA Mode: Highlights additions, progress, withdrawals   │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Visual Grammar & Lifecycle Evolution

### 3.1 Entity Lifecycle Progression
Every tracked facility follows a deterministic visual progression tied to its underlying observation state:

| Stage | Regulatory State | Visual Plate Representation | Vector Layer Styling |
|---|---|---|---|
| **01: Proposed** | Zoning case filed, annexation petition | Faint blueprint linework, dashed perimeter | Thin dotted amber stroke, pulsing anchor ring |
| **02: Permitting** | TDLR registration, TCEQ air permit pending | Survey boundary markers, site grid subdivision | Solid amber boundary, pending badge |
| **03: Approved** | Site plan approved, council resolution passed | Civil engineering grading, foundation layout lines | Solid rust stroke, active permit counter |
| **04: Construction** | Building permits issued, active grading | Structural steel framing, crane indicators, utility trench lines | Cross-hatched fill, heavy rust border |
| **05: Operational** | Certificate of occupancy, energization confirmed | Fully resolved industrial facility, transformer yard, switchgear | Solid ink fill, high-voltage connection link |
| **06: Withdrawn** | Application denied or formally rescinded | Faded ghosted linework with diagonal strikethrough | Ghosted cedar outline, archived badge |

### 3.2 Temporal Modes
1. **STATE Mode (`mode=state&date=YYYY-MM-DD`)**:
   - Queries `StateProjector` for all valid observations active on or before the selected date.
   - Restores the geographic landscape to that historical timestamp (even rendering facilities that were later canceled).
2. **DELTA Mode (`mode=delta&from=YYYY-MM-DD&to=YYYY-MM-DD`)**:
   - Queries `DeltaProjector` to highlight only what changed between the two dates.
   - New filings glow in amber; groundbreaking/structural advancements glow in rust; withdrawals render in muted cedar strikeout; unchanged stable infrastructure is de-emphasized.

---

## 4. Component Structure & Public API

```typescript
// src/types/atlas.ts
export interface AtlasProjectNode {
  id: string;
  slug: string;
  name: string;
  operator: string | null;
  stage: "proposed" | "permitting" | "approved" | "construction" | "operational" | "withdrawn";
  coordinates: [longitude: number, latitude: number];
  acreage: number | null;
  estimatedCostUsd: number | null;
  powerDemandMw: number | null;
  lastMeaningfulChange: {
    date: string;
    description: string;
    sourceFamily: string;
  };
}

export interface AtlasTemporalState {
  mode: "state" | "delta";
  currentDate: string; // ISO date string
  compareDate?: string; // ISO date string for delta mode
  activeJurisdictions: string[]; // e.g. ["Austin", "Taylor", "Round Rock"]
  selectedProjectId: string | null;
}
```

### 4.1 Core UI Components
- **`AtlasViewport.tsx`**: High-performance MapLibre canvas container managing vector base layers and viewport zoom bounds (Central Texas bounding box: `[-98.2, 29.8, -97.1, 30.8]`).
- **`SemanticPlateLayer.tsx`**: Decoupled background canvas overlaying stateful generated raster tiles aligned to coordinate bounds.
- **`TemporalScrubber.tsx`**: Scrubbing slider with month/quarter tick marks, mode toggle (`STATE` vs `DELTA`), and play/pause timeline animation.
- **`EntityHoverCard.tsx`**: Contextual flyout displaying project identity, operator, lifecycle status, power/acreage metrics, and direct link to investigation console.
- **`AtlasLegend.tsx`**: Technical chart legend explaining lifecycle linework, transmission voltages, and watershed layers.

---

## 5. Verification & Performance Invariants
- **Rendering Budget**: 60fps pan/zoom across 1,000+ vector nodes and boundary geometries.
- **Click Latency**: Hover card and node selection trigger in $<50\text{ms}$ with zero network roundtrip for pre-loaded temporal states.
- **Spatial Exactness**: Zero visual hallucination on parcel boundaries; all boundary polygons derived from official county CAD GeoJSON.
