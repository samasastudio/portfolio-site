---
name: grill-with-docs
description: Interactive design interview that maps plans as a design tree and commits decisions directly into CONTEXT.md and ADRs. Use during early feature planning, architectural changes, or technical design sessions.
---

# Grill With Docs: Architectural & Design Interview Workflow

Use this skill to thoroughly stress-test a proposed feature, architecture change, or technical design before writing code, while capturing decisions directly into documentation on disk.

## Core Principles

1. **Relentless Constructive Friction**:
   - Do not accept vague requirements or hand-waving.
   - Challenge unspoken assumptions, missing failure states, security considerations, and edge cases.
   - Force explicit decisions on ambiguous trade-offs before any code is written.

2. **The Design Tree Approach**:
   - Model the problem as a tree of decisions (root question $\rightarrow$ branching options $\rightarrow$ leaf trade-offs).
   - Traverse the tree **one branch at a time**. Do not jump across multiple branches simultaneously.
   - Once a branch is resolved, summarize the decision and move to the next branch.

3. **Inline Documentation (Write As You Go)**:
   - Do not wait until the end of the conversation to write documentation.
   - Capture terms in `CONTEXT.md` as soon as they are clarified.
   - Create an ADR in `docs/adr/` as soon as a major architectural choice is finalized.

---

## Documentation Artifacts

### 1. `CONTEXT.md` (Project Memory & Glossary)
Update or create `CONTEXT.md` in the project root to record:
- **Ubiquitous Language**: Canonical definitions for domain entities to avoid overloaded or ambiguous words.
- **System Constraints**: Agreed invariants, security rules, and platform constraints.

### 2. ADRs (Architecture Decision Records)
Create a new record under `docs/adr/XXXX-title.md` when a decision meets **all three criteria**:
1. **Hard to reverse** (e.g. database schema engine, auth architecture, major library choices).
2. **Involves genuine trade-offs** (chose option A over option B for specific reasons).
3. **Surprising without context** (a future engineer or agent would ask "why was this done this way?").

#### ADR Template:
```markdown
# ADR-[NUMBER]: [Title of Decision]

## Status
[Proposed | Accepted | Superseded]

## Context & Problem Statement
What problem were we solving, and what factors influenced this decision?

## Decision
What is the chosen solution and how will it be implemented?

## Consequences
- **Positive**: What benefits do we gain?
- **Negative / Trade-offs**: What complexity or limitations do we accept?
```

---

## Step-by-Step Interview Procedure

1. **Kickoff**: Ask the user to describe their high-level goal or feature proposal.
2. **Map the Design Tree**: Identify the 2-4 critical architectural branches (data model, state flow, external APIs, security/errors).
3. **Explore Branch-by-Branch**:
   - Ask focused questions exploring options and failure modes.
   - Suggest concrete recommendations with pros/cons.
4. **Crystallize & Record**:
   - Update `CONTEXT.md` with new terms or definitions.
   - Draft an ADR in `docs/adr/` if the decision warrants it.
5. **Wrap-up**: Confirm the full design tree is resolved and hand off to `/to-spec` or `/to-tickets` for implementation.
