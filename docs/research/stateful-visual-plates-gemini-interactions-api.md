# Research Digest: Stateful Visual Plates via Gemini Interactions API
*Reference: "Teaching Google Antigravity to Paint: A Stateful Image-Editing Skill Built on Gemini's Interactions API and MCP"*
*Model: `gemini-3.1-flash-lite-image` (NB2Lite) • Interface: Google GenAI Interactions API*

---

## 1. Executive Summary & Problem Fit

- **The Problem in Generative Cartography**: Standard diffusion and generative image workflows are strictly stateless. Passing repeated prompts with varying lifecycle descriptions causes "continuity roulette"—every generation alters parcel boundaries, viewpoint elevation, road topology, and lighting.
- **The Solution**: Google's **Gemini Interactions API** paired with `gemini-3.1-flash-lite-image` (NB2Lite) provides **server-side visual context persistence**. Instead of re-describing the entire scene, callers pass a `previous_interaction_id` and specify *only the delta* ("Add civil grading lines and survey stakes").
- **Compute Atlas Fit**: Solves the core challenge of [ADR-0006](file:///c:/Users/Owner/projects/sam-johnson-portfolio/docs/adr/0006-generative-cinemagraph-video-loops.md)—visualizing the lifecycle progression of compute infrastructure across Central Texas (Proposed $\to$ Permitting $\to$ Approved $\to$ Construction $\to$ Operational $\to$ Withdrawn) while locking the physical coordinate canvas.

---

## 2. Technical Mechanisms & Execution Loop

### 2.1 The Stateful Interactions Loop
```text
┌────────────────────────────────────────────────────────────────────────┐
│                        GEMINI INTERACTIONS API LOOP                     │
│                                                                        │
│   1. Bootstrap Canvas (Local GIS Vector Render)                       │
│      client.interactions.create({                                      │
│        model: "gemini-3.1-flash-lite-image",                           │
│        input: [gisVectorImageBuffer, "Draft technical blueprint..."],   │
│        store: true                                                     │
│      })                                                                │
│           │                                                            │
│           ▼                                                            │
│   2. Server Returns { image, interaction_id: "v1_alpha..." }           │
│      • Persist interaction_id to database alongside visual plate       │
│           │                                                            │
│           ▼ (Lifecycle Event: Site Plan Approved -> Construction)      │
│   3. Incremental Turn (Stateful Edit)                                  │
│      client.interactions.create({                                      │
│        previous_interaction_id: "v1_alpha...",                         │
│        input: ["Add structural steel framing and utility trenching"],  │
│        thinking_level: "high"                                          │
│      })                                                                │
│           │                                                            │
│           ▼                                                            │
│   4. Server Returns { image, interaction_id: "v1_beta..." }            │
│      • Continuous pixel identity preserved; no spatial hallucination   │
└────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Core Operational Constraints

1. **Interaction ID Lineage**:
   - Every stateful turn returns a **new** `interaction_id`.
   - The system must chain the latest ID. Calling an older ID silently forks a new branch from that historical point in time.
2. **Aspect Ratio Immutability**:
   - Aspect ratio is set at generation/bootstrap time (e.g. `1:1` or `16:9` matching MapLibre tile coordinate bounds).
   - The Interactions API inherits the aspect ratio on all subsequent stateful edits. Altering aspect ratio mid-lineage degrades pixel continuity and is rejected.
3. **Thinking Levels (`low` vs `high`)**:
   - **`thinking_level: "low"`**: Fast draft synthesis (sub-2 second latency). Used during development scrubbing and preview plate generation.
   - **`thinking_level: "high"`**: High-precision rendering with legible typography, intricate substation wiring, transformer yards, and technical labeling.
   - *API Invariant Alert*: While generic Gemini API documentation references `minimal` and `medium`, the live `gemini-3.1-flash-lite-image` endpoint returns **HTTP 400** if `minimal` or `medium` is requested. Only `low` and `high` are supported.
4. **Local Image Bootstrapping (`edit_local_image`)**:
   - Ingests deterministic GIS base renders (parcels, highway corridors, water features) rendered via MapLibre/Canvas as base64 buffers.
   - Anchors generative synthesis to real geographic coordinates before any lifecycle progression begins.

---

## 3. Application to Compute Atlas (`gridlock-graphical-atlas`)

### 3.1 Lifecycle Progression Prompt Grammar

| Stage | Regulatory Trigger | Incremental Delta Prompt | Thinking Level |
|---|---|---|---|
| **01: Proposed** | Zoning case or annexation filed | `Bootstrap from parcel GIS vector: Archival technical blueprint plate, faint dashed perimeter lines, sepia paper background.` | `low` |
| **02: Permitting** | TDLR registration or TCEQ air filing | `Add civil survey boundary markers, topographic contour lines, and site grid subdivision.` | `low` |
| **03: Approved** | Site plan approval or council vote | `Add concrete foundation outlines, access roads, and civil grading lines.` | `high` |
| **04: Construction** | Building permit issued, grading | `Add crane rigging, structural steel framing, and underground utility trenching.` | `high` |
| **05: Operational** | Certificate of Occupancy, energization | `Render completed industrial shell, high-voltage transformer yard, switchgear, and active transmission link.` | `high` |
| **06: Withdrawn** | Application formally rescinded/denied | `Apply faded ghosted linework, cross-hatched cedar diagonal strikethrough across the facility.` | `high` |

---

## 4. Architectural Invariants

1. **Deterministic Coordinate Grounding**: Never generate ungrounded raw images. All plate lineages must originate from a verified GIS vector base raster (`edit_local_image`).
2. **Immutable Lineage Persistence**: Every generated plate record stores both its current `interaction_id` and parent `previous_interaction_id` for reproducible rollbacks.
3. **Graceful Error Handling**: Handle expired or stale interaction IDs with automatic re-bootstrapping from the nearest verified historical checkpoint.
