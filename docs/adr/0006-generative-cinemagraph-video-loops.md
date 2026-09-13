# ADR-0006: Stateful Semantic Visual Identities and Entity Lifecycle Evolution

## Status
Accepted (Supersedes previous nightlife cinemagraph video loops concept)

## Context & Problem Statement
Compute Atlas needs to communicate the developmental reality and physical scale of industrial compute infrastructure across Central Texas.
Rendering standard photorealistic 3D renders or generic glowing map pins fails to convey uncertainty, lifecycle progression, or regulatory history. Furthermore, regenerating visual assets from unconditioned noise causes visual inconsistency across time steps.

## Decision
Adopt a **Stateful Semantic Visual Identity and Lifecycle Metaphor Engine**:

1. **Aesthetic Direction: Living Technical Atlas**:
   - Visual styling resembles archival technical plates, architectural blueprints, and regional utility diagrams.
   - Textures: tactile paper grain, sepia/ink linework, precise drafting aesthetics adhering to `--paper`, `--ink`, `--rust`, `--indigo`, and `--moss` CSS design tokens.

2. **Persistent Visual Seed & Lifecycle State Transitions**:
   - Each canonical project or facility receives a deterministic visual seed.
   - Generative state changes are conditioned on the previous visual state rather than created from scratch:
     - **Stage 1 (Proposed / Permitting)**: Faint, diagrammatic linework, dashed boundary lines, unresolved internal geometry.
     - **Stage 2 (Approved / Site Preparation)**: Ground grading marks, parcel demarcation, civil engineering layout lines.
     - **Stage 3 (Under Construction)**: Densifying structural grids, crane markers, substation framing.
     - **Stage 4 (Operational)**: Fully resolved, dense industrial facility plate with active transmission tie-in indicators.
     - **Stage 5 (Withdrawn / Terminated)**: Visual state transitions to a faded, ghosted historical trace with cross-hatching, preserving the memory of the canceled initiative.

3. **Cluster Accumulation Plates**:
   - When zooming out to regional corridor scale (e.g. Taylor/Hutto semiconductor corridor, South Austin data center cluster), semantic plates illustrate collective infrastructural concentration without inventing false factual geography.

4. **Layer Decoupling & Motion Performance**:
   - Visual plates are rendered to high-resolution WebP/SVG assets and displayed as background textures.
   - All interactive pins, hitboxes, boundary lines, and data tooltips remain hardware-accelerated vector elements rendered independently in the DOM.

## Consequences
- **Positive**:
  - Visually communicates the intangible transition of software into concrete physical reality.
  - Transparently communicates project maturity and regulatory uncertainty through visual density.
  - Zero interference with interactive map performance (60fps pan/zoom).
- **Negative / Trade-offs**:
  - Requires conditioned image generation pipelines that maintain visual coherence across lifecycle stages.
  - Image generation runs must be cached and tied directly to lifecycle observation milestones.
