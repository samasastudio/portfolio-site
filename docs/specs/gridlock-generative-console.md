# Technical Specification: gridlock-generative-console (Investigative Analytical Workspace)

## 1. Overview & Motivation
- **Problem Statement**: Standard AI interfaces force analytical investigations into linear chat transcripts. When interrogating complex infrastructure questions (*"Why were these permits withdrawn?"*, *"Compare water exposure across operators in Central Texas"*, *"Are Project Eagle B and C the same facility?"*), users need structured workspaces—timelines, comparative matrices, relationship graphs, and forensic source document viewers. Conversely, generating raw JSX/HTML on the fly causes layout breakage, security flaws, and CSS drift.
- **User Story**: As an investigative researcher, journalist, or policy analyst, I need an interface that interprets intent and emits an in-place, typed UI AST composed from a curated component palette, allowing me to dynamically reshape workspaces while maintaining strict evidence traceability to immutable source documents.
- **Repository Isolation**: Dedicated Git repository at `projects/gridlock-generative-console` maintaining complete architectural separation of concerns from the portfolio presentation gateway.

---

## 2. Architecture & Seams

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
       ├──► <Comparison />
       ├──► <Timeline />
       ├──► <EvidenceViewer />
       └──► <MethodologyPanel />
```

### 2.2 Public Interfaces & API Routes

All endpoints communicate via JSON and require session tokens:

1. **`POST /api/investigate/plan`**
   - **Request Payload**: `{ query: string; activeWorkspaceId?: string; viewportContext?: Record<string, unknown> }`
   - **Response**: `WorkspaceLayoutAST` (validated JSON tree matching Zod schema).

2. **`POST /api/investigate/mutate`**
   - **Request Payload**:
     ```typescript
     interface MutateWorkspaceRequest {
       workspaceId: string;
       action: "filter" | "pivot" | "add_widget" | "remove_widget" | "compare";
       targetWidgetId?: string;
       refinementPrompt: string;
     }
     ```
   - **Response**: `WorkspaceLayoutAST` (transformed workspace tree preserving unaffected widget states).

3. **`GET /api/evidence/:artifactId`**
   - **Response**:
     ```typescript
     interface EvidenceResponse {
       artifactId: string;
       sourceFamily: string;
       sourceUrl: string;
       capturedAt: string;
       sha256Hash: string;
       renderedContent: string; // Sanitized HTML or PDF download URL
       extractedSpans: { text: string; confidence: number; boundingBox?: [number, number, number, number] }[];
     }
     ```

4. **`GET /api/source-health/telemetry`**
   - **Response**: List of connector statuses, median extraction volumes, error counts, and recent repair audits.

### 2.3 UI AST Data Contracts & Zod Schemas

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

export const UIWidgetNodeSchema: z.ZodType<UIWidgetNode> = z.lazy(() =>
  z.object({
    id: z.string(),
    type: ComponentTypeSchema,
    title: z.string().optional(),
    props: z.record(z.unknown()),
    children: z.array(UIWidgetNodeSchema).optional(),
  })
);

export interface UIWidgetNode {
  id: string;
  type: z.infer<typeof ComponentTypeSchema>;
  title?: string;
  props: Record<string, unknown>;
  children?: UIWidgetNode[];
}

export const WorkspaceLayoutASTSchema = z.object({
  version: z.literal("1.0"),
  title: z.string(),
  intentSummary: z.string(),
  layoutGrid: z.enum(["single_column", "split_panel", "dashboard_grid", "forensic_split"]),
  rootNodes: z.array(UIWidgetNodeSchema),
  activeCitations: z.array(
    z.object({
      sourceArtifactId: z.string(),
      sourceFamily: z.string(),
      citationLabel: z.string(),
      confidence: z.number().min(0).max(1),
    })
  ),
});

export type WorkspaceLayoutAST = z.infer<typeof WorkspaceLayoutASTSchema>;
```

### 2.4 Curated Component Palette
All widgets are pure React components styled using CSS design variables (`--paper`, `--ink`, `--rust`, `--indigo`, `--moss`, `--cedar`):
- `EntityHeader`: Canonical project branding, operator, lifecycle status chip.
- `MapView`: Bounded vector map displaying parcel polygons and substation lines.
- `Timeline`: Parallel tracks for municipal development actions and environmental filings.
- `EvidenceViewer`: Split-screen source document display with highlighted extraction spans.
- `RelationshipGraph`: Force-directed graph linking projects, operators, utilities, and permits.
- `Comparison`: Multi-column comparison grid evaluating acreage, power, water, and abatements.
- `DataTable`: High-density sortable, filterable tabular records.
- `SourceDiff`: Forensic visual line-by-line diff comparing sequential filings.
- `MethodologyPanel`: Disclosure of data sources, confidence metrics, and potential biases.
- `Alert`: Visual callout highlighting regulatory conflicts or withdrawn applications.

---

## 3. Edge Cases & Error Handling

1. **LLM AST Hallucination / Schema Invalidation**:
   - If Gemini Flash returns a layout payload that fails `WorkspaceLayoutASTSchema.safeParse()`, the renderer executes a recovery parse. If still invalid, it renders a fallback `dashboard_grid` containing standard `DataTable` and `Alert` widgets explaining the parse fallback.
2. **Missing Evidence Citations**:
   - Every metric or assertion must map to an active citation. The AST validator checks `activeCitations` against widget props; widgets lacking valid `sourceArtifactId` citations render an "Unverified Public Record" indicator badge.
3. **Relationship Graph Cycle & Node Explosions**:
   - When an operator (e.g. AWS or ERCOT) has hundreds of connected entities, the graph builder caps depth at 2 degrees and collapses high-cardinality clusters into aggregate badge nodes to prevent browser DOM freezes.
4. **Zero-Result / Out-of-Scope Queries**:
   - If an inquiry finds no matching public records, the console emits an `Alert` node offering suggested query alternatives rather than an empty screen.
5. **Layout Thrashing on Rapid Refinements**:
   - User refinement queries debounce at 300ms, and AST diffing applies React tree reconciliations in-place without unmounting stable subtrees.

---

## 4. Acceptance Criteria

- [ ] **100% AST Schema Enforcement**:
  - *Given* any natural-language input query,
  - *When* evaluated by the Investigation Planner,
  - *Then* the emitted layout conforms 100% to `WorkspaceLayoutASTSchema` before dispatching to the React tree.
- [ ] **In-Place Workspace Mutation**:
  - *Given* an active workspace displaying a `MapView` and `DataTable`,
  - *When* the user submits a follow-up refinement (e.g. *"Only show projects with water permits"*),
  - *Then* the active `MapView` and `DataTable` update their state in-place without page reload or creating conversational chat bubbles.
- [ ] **Forensic Evidence Verification**:
  - *Given* any metric rendered in a `Comparison` or `MetricGroup` widget,
  - *When* clicked by the user,
  - *Then* `EvidenceViewer` immediately displays the underlying `SourceArtifact` with highlighted source text.
- [ ] **Planner Latency Ceiling**:
  - *Given* an inquiry requiring database retrieval and AST planning,
  - *When* evaluated on standard infrastructure,
  - *Then* end-to-end response latency is $<1500\text{ ms}$.
- [ ] **Source Health Telemetry Accuracy**:
  - *Given* the `/systems/source-health` view,
  - *When* loaded by an administrator,
  - *Then* it displays real-time connector execution status, invariant failure logs, and repair audit trails.

---

## 5. Non-Goals (Out of Scope)

1. **Unsandboxed Code / Raw HTML Generation**: The model never generates raw HTML or executable JavaScript strings; it strictly configures typed widget AST nodes.
2. **Generic Conversational Chatbot**: No linear conversational chit-chat or text-heavy essay bubbles. All responses are structured analytical workspaces.
3. **Direct Write Access**: The console is an analytical observatory; it does not submit filings or modify regulatory agency databases.
