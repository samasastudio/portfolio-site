# ADR-0001: Technical Atlas Architecture with Deterministic GIS and Stateful Semantic Imagery

## Status
Accepted (Supersedes previous isometric nightlife cinemagraph concept)

## Context & Problem Statement
Compute Atlas visualizes the physical expansion of artificial intelligence (data centers, semiconductor fabs, grid substations, water pipelines) across Texas over time.
Pure generative image models hallucinate coordinates, invent fictitious parcels, and garble transmission corridors. Conversely, generic web map pins (Google Maps / Mapbox default styles) fail to communicate developmental density, institutional weight, and physical accumulation over time.

## Decision
Adopt a decoupled **Two-Tier Technical Atlas Architecture**:

1. **Deterministic GIS & Geometry Base (Vector Engine)**:
   - High-performance vector layer (MapLibre GL / Canvas / SVG) driven by authoritative public geographic sources: Texas Strategic Mapping (StratMap), TNRIS parcel boundaries, City of Austin GIS, TCEQ watershed data, and ERCOT transmission route estimates where public.
   - Preserves pixel-exact coordinates, real parcel footprints, and crisp vector interactions (pan, zoom, multi-select, click hitboxes).
   - Zero spatial hallucinations.

2. **Stateful Semantic Visual Layer (Living Technical Plate)**:
   - Built on Google GenAI image conditioning.
   - Style direction: High-craft technical plate—part topographic survey, architectural drawing, and utility schematic.
   - Entities receive a persistent visual seed that transforms across lifecycle states:
     - *Proposed / Permitting*: Unresolved, faint, blueprint-like linework.
     - *Approved / Under Construction*: Densifying geometries, structural footprints, ground grading.
     - *Operational*: Fully resolved, dense industrial facility representation.
     - *Withdrawn / Cancelled*: Depicted as ghosted, archived trace linework rather than vanishing from history.
   - Re-generation transforms previous visual state rather than starting from blank noise.

3. **Dual-Mode Temporal Scrubber**:
   - **STATE Mode**: Projects the landscape as understood at an arbitrary date $T$.
   - **DELTA Mode**: Emphasizes changes (new permits, ground breaking, status shifts) between $T_1$ and $T_2$, de-emphasizing invariant infrastructure.

## Consequences
- **Positive**:
  - Eliminates spatial errors while achieving museum-grade technical visualization.
  - Sub-50ms click and inspect performance: vector hitboxes handle user input instantly without waiting on generative renders.
  - Historical audibility: temporal state reconstruction shows what was known when.
- **Negative / Trade-offs**:
  - Requires maintaining coordinate translation between GIS projections (EPSG:3857 / EPSG:4326) and semantic plate raster coordinates.
  - Requires pre-generating and caching stateful plate transitions for key milestones.
