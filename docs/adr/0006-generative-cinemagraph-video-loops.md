# ADR-0006: Stateful Semantic Visual Identities and Entity Lifecycle Evolution
*Normative Technology: Gemini Interactions API (`gemini-3.1-flash-lite-image` / NB2Lite)*

## Status
Accepted (Supersedes previous nightlife cinemagraph video loops concept; amended to formalize Gemini Interactions API)

## Context & Problem Statement
Compute Atlas needs to communicate the developmental reality and physical scale of industrial compute infrastructure across Central Texas.
Rendering standard photorealistic 3D renders or generic glowing map pins fails to convey uncertainty, lifecycle progression, or regulatory history. Furthermore, regenerating visual assets from unconditioned noise causes visual inconsistency across time steps ("continuity roulette").

## Decision
Adopt a **Stateful Semantic Visual Identity and Lifecycle Metaphor Engine** powered by the **Gemini Interactions API** (`gemini-3.1-flash-lite-image`):

1. **Aesthetic Direction: Living Technical Atlas**:
   - Visual styling resembles archival technical plates, architectural blueprints, and regional utility diagrams.
   - Textures: tactile paper grain, sepia/ink linework, precise drafting aesthetics adhering to `--paper`, `--ink`, `--rust`, `--indigo`, and `--moss` CSS design tokens.

2. **Stateful Context Memory via Gemini Interactions API**:
   - Replace unconditioned seeds with server-side visual memory managed through Gemini's Interactions API (`client.interactions.create(..., store=True)`).
   - Generative state changes chain `previous_interaction_id`, passing only the incremental delta prompt per lifecycle stage:
     - **Stage 1 (Proposed / Permitting)**: Bootstrapped from local GIS vector base raster (`edit_local_image`). Faint, diagrammatic linework, dashed boundary lines.
     - **Stage 2 (Approved / Site Preparation)**: Incremental edit adding ground grading marks, parcel demarcation, civil engineering layout lines.
     - **Stage 3 (Under Construction)**: Incremental edit adding densifying structural grids, crane markers, substation framing.
     - **Stage 4 (Operational)**: Incremental edit resolving fully dense industrial facility plate with active transmission tie-in indicators.
     - **Stage 5 (Withdrawn / Terminated)**: Incremental edit applying faded, ghosted historical trace with cross-hatching, preserving the memory of the canceled initiative.

3. **Execution Constraints & Invariants**:
   - **Thinking Levels**: Use `thinking_level: "low"` for fast draft atlas preview scrubbing (sub-2s latency); use `thinking_level: "high"` for crisp technical typography and substation linework. Reject `minimal` and `medium` (triggers HTTP 400).
   - **Aspect Ratio Lock**: Aspect ratio is locked at bootstrap (1:1 or 16:9) matching MapLibre tile coordinate bounds; mid-session aspect ratio mutations are prohibited to preserve pixel continuity.
   - **Lineage Auditing**: Every visual plate record stores `interaction_id` and `previous_interaction_id` in the Drizzle relational schema.

4. **Layer Decoupling & Motion Performance**:
   - Visual plates are rendered to high-resolution WebP/SVG assets and displayed as background textures.
   - All interactive pins, hitboxes, boundary lines, and data tooltips remain hardware-accelerated vector elements rendered independently in the DOM.

## Consequences
- **Positive**:
  - Eliminates visual continuity roulette; spatial bounds and terrain stay fixed across regulatory lifecycle evolution.
  - Transparently communicates project maturity and regulatory uncertainty through visual density.
  - Zero interference with interactive map performance (60fps pan/zoom).
  - Sub-2 second draft generation via NB2Lite (`gemini-3.1-flash-lite-image`).
- **Negative / Trade-offs**:
  - Dependent on Google GenAI Interactions API server-side session persistence.
  - Requires fallback re-bootstrapping mechanism if interaction context expires or forks unintentionally.
  - Image generation runs must be cached in object storage (GCS/R2) tied directly to lifecycle observation milestones.
