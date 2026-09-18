# Technical Specification: gridlock-generative-console (Investigative Analytical Workspace)

## 1. Overview & Motivation
- **Problem Statement**: Standard AI interfaces force analytical investigations into linear chat transcripts. When interrogating complex infrastructure questions (*"Why were these permits withdrawn?"*, *"Compare water exposure across operators in Central Texas"*, *"Are Project Eagle B and C the same facility?"*), users need structured workspaces—timelines, comparative matrices, relationship graphs, and forensic source document viewers. Conversely, generating raw JSX/HTML on the fly causes layout breakage, security flaws, and CSS drift.
- **User Story**: As an analyst, researcher, or evaluator, I want to ask natural-language questions about Texas compute infrastructure and have the system compose a purpose-built, interactive, and evidence-grounded analytical workspace that updates in-place as I refine my inquiry.

---

## 2. Architecture & Pipeline

### 2.1 Intent-to-AST Pipeline
```text
[User Natural-Language Query] (e.g. "Compare AWS and Microsoft expansion in Central Texas")
       │
       ▼
[Investigation Planner (Gemini 2.5 Flash)]
       │
       ├──► [Extract Filters, Entities & Intent]
       │
       ├──► [Query Observation Spine & Knowledge Graph]
       │        │
       │        ▼
       │    [Hydrated Data Records + Source Artifact Citations]
       │
       ▼
[Emit Declarative UI AST] (Validated via Zod)
       │
       ▼
[Deterministic React Renderer] ──(Curated Design System Palette)
       │
       ├──► <EntityHeader />
       ├──► <ComparisonMatrix />
       ├──► <Timeline />
       ├──► <EvidenceViewer />
       └──► <MethodologyPanel />
```

### 2.2 In-Place Workspace Mutation
- Follow-up prompts transform the active workspace state rather than appending chat bubbles:
  - Initial query: *"Show all Central Texas projects over $500M"* $\to$ Renders `MapView` + `DataTable`.
  - Refinement: *"Only show proposed or permitting"* $\to$ Applies filter to active `MapView` and `DataTable` without reloading layout.
  - Deep-dive: *"Compare the top two by water basin"* $\to$ Morphs layout to include `Comparison` and `RelationshipGraph` with TWDB aquifer overlays.

---

## 3. UI AST Grammar & Component Palette

### 3.1 AST TypeScript Definitions

```typescript
// src/types/ui-ast.ts
import { z } from "zod";

export const ComponentTypeSchema = z.enum([
  "MapView",
  "Timeline",
  "EntityHeader",
  "EvidenceViewer",
  "MetricGroup",
  "Metric",
  "DataTable",
  "Comparison",
  "RelationshipGraph",
  "DocumentViewer",
  "SourceDiff",
  "MethodologyPanel",
  "Alert"
]);

export type ComponentType = z.infer<typeof ComponentTypeSchema>;

export interface UIWidgetNode {
  id: string;
  type: ComponentType;
  props: Record<string, unknown>;
  children?: UIWidgetNode[];
}

export interface WorkspaceLayoutAST {
  version: "1.0";
  title: string;
  intentSummary: string;
  layoutGrid: "single_column" | "split_panel" | "dashboard_grid" | "forensic_split";
  rootNodes: UIWidgetNode[];
  activeCitations: {
    sourceArtifactId: string;
    sourceFamily: string;
    citationLabel: string;
  }[];
}
```

### 3.2 Curated Component Registry
All components are pre-built React components styled using CSS variables from `app/globals.css` (`--paper`, `--ink`, `--rust`, `--indigo`, `--moss`, `--cedar`):

1. **`EntityHeader`**: Displays canonical project name, operator, lifecycle status chip, and primary location.
2. **`MapView`**: Bounded GIS vector view highlighting targeted facilities, municipal boundaries, and grid routes.
3. **`Timeline`**: Multi-track timeline separating development actions (zoning/permits) from environmental actions (TCEQ notices).
4. **`EvidenceViewer`**: Forensic split-pane displaying the original source artifact (HTML render or PDF) with highlighted extracted text and confidence scores.
5. **`RelationshipGraph`**: Interactive SVG node-link graph mapping connections across `Project`, `Facility`, `Organization`, `Utility`, and `Permit` nodes.
6. **`Comparison`**: Structured side-by-side comparison matrix evaluating acreage, power requirements, water basin exposure, and incentive values.
7. **`DataTable`**: High-density sortable and filterable data grid with export capability.
8. **`SourceDiff`**: Visual line-by-line comparison of two historical filings for the same project.
9. **`MethodologyPanel`**: Explains data provenance, entity resolution confidence, and caveats for inferred metrics.
10. **`Alert`**: Emphasizes conflicting public filings, withdrawn applications, or pending regulatory review.

---

## 4. Source Health Console Surface

The console incorporates a dedicated architectural view (`/systems/source-health`) demonstrating the reliability of the ingestion infrastructure:
- **Connector Dashboard**: Real-time status badges (`healthy`, `repairing`, `anomaly`, `paused`) for each connected public records source.
- **Invariant Monitor**: Extraction volume graphs, required field coverage rates, and schema validation histories.
- **Repair Sandbox Log**: Detailed audit trail for every automated repair proposal, showing:
  - Input diagnostic bundle & failing selector.
  - Synthesized patch diff.
  - Replay test results against historical fixtures.
  - Automated promotion or escalation record.

---

## 5. Verification & Testing Strategy
- **AST Schema Validation**: 100% of LLM planner responses validated against `WorkspaceLayoutAST` Zod schema before dispatching to the React tree.
- **Widget Unit Tests**: Every widget in the component palette tested with mock props under Vitest to ensure layout stability, accessibility (ARIA), and error boundary containment.
- **Interaction Testing**: Playwright tests verifying in-place workspace mutation when follow-up prompts are submitted.
