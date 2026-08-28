---
name: to-tickets
description: Deconstructs features, specifications, or complex goals into atomic, sequenceable implementation tickets (tracer bullets). Use when planning multi-step features or decomposing large tasks into manageable units.
---

# Feature Ticket Deconstruction Workflow

Use this skill to convert a high-level goal, plan, or specification into small, independently testable tasks.

## Principles of Tracer-Bullet Tickets

1. **Vertical Slices Over Horizontal Layers**:
   - Each ticket should implement a thin, end-to-end slice of functionality (e.g. schema $\rightarrow$ API $\rightarrow$ UI) rather than building all DB tables first, all APIs second, and all UIs third.

2. **Atomic & Independently Verifiable**:
   - Each ticket must have a distinct definition of done and a clear verification step (e.g. a specific test suite or UI assertion).

3. **Strict Dependency Ordering**:
   - Number and order tickets sequentially so each builds cleanly on the previous ticket's deliverables.

---

## Ticket Template

When generating tickets, use the following structure:

```markdown
### Ticket [N]: [Action-Oriented Title]

- **Objective**: What specific slice of functionality is being delivered.
- **Scope / Files**:
  - `path/to/target/file.ts`
  - `path/to/target/test.ts`
- **Acceptance Criteria**:
  - [ ] Criterion 1
  - [ ] Criterion 2
- **Verification**:
  - Command or test to verify completion (e.g. `npm test path/to/feature.test.ts`).
- **Dependencies**: Ticket [N-1] (or None)
```
