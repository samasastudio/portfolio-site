# ADR-0003: Typed UI AST and Investigative Component Grammar in gridlock-generative-console

## Status
Accepted

## Context & Problem Statement
Users interrogate the forces shaping AI infrastructure through complex, open-ended analytical questions (*"Why were these permits withdrawn?"*, *"Compare Austin vs Taylor compute expansion"*, *"Which proposed data centers sit in sensitive water basins?"*).
Rendering unstructured LLM chat responses fails to provide rigorous analytical utility. Conversely, generating arbitrary JSX/HTML code on the fly causes visual degradation, CSS token drift, security risks, and layout instability. Static dashboards cannot anticipate the multidimensional nature of investigative queries.

## Decision
Adopt a **Typed UI AST and Curated Investigative Component Grammar**:

1. **Investigation Planner & UI AST**:
   - Natural language input is processed by Gemini 2.5 Flash as an **Investigation Planner**.
   - The planner executes data queries against canonical observations and emits a declarative, strongly-typed **UI AST (Abstract Syntax Tree)** in JSON.
   - The UI AST defines component layout, hierarchy, and strongly-typed props validated via Zod schemas.

2. **Curated Analytical Component Registry**:
   - The frontend implements a fixed library of high-craft React Server and Client Components styled to the tactile paper/ink design system:
     - `MapView`: Contextual GIS map bounding query-matched facilities and infrastructure.
     - `Timeline`: Multi-track chronological development and environmental milestones.
     - `EntityHeader`: Canonical project/facility summary, status badge, and operator attribution.
     - `EvidenceViewer`: Forensic document and source artifact viewer with highlighted extraction fields.
     - `RelationshipGraph`: SVG graph mapping connections between project, developer, utility, and permits.
     - `MetricGroup` / `Metric`: Key indicators (acreage, investment, square footage) with explicit citation chips.
     - `DataTable`: Filterable, sortable tabular records with export and deep drill-down.
     - `Comparison`: Side-by-side matrices comparing operators, jurisdictions, or facilities.
     - `SourceDiff`: Visual diff highlighting changes between two historical filings.
     - `MethodologyPanel`: Explicit disclosures regarding estimation methods, data freshness, and confidence.
     - `Alert`: Warnings regarding unverified claims, conflicting records, or data gaps.

3. **In-Place Workspace Mutation**:
   - The interface is the conversation: Follow-up prompts transform the existing workspace in-place (e.g. adding a filter, switching to a timeline view, or pivoting to a comparison matrix) rather than appending redundant chat messages.

## Consequences
- **Positive**:
  - Zero arbitrary code execution; 100% type-safe React component rendering.
  - Consistent visual identity: perfectly adheres to typography and theme variables in `app/globals.css`.
  - Evidence grounding: Every UI widget directly presents source citations and observations.
- **Negative / Trade-offs**:
  - UI layouts are bounded by the predefined component vocabulary. New visual representations require dedicated React component implementations.
