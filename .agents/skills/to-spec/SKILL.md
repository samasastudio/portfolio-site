---
name: to-spec
description: Transforms conversational design plans or requirements into a formal, structured technical specification (PRD). Use when finalizing a feature design before decomposing into tickets or beginning implementation.
---

# Technical Specification (PRD) Authoring Workflow

Use this skill to convert conversational alignment, interview notes, or rough requirements into a rigorous, actionable Technical Specification.

## Core Rules

1. **Capture Decisions, Don't Re-interview**:
   - Synthesize all agreements already reached in the conversation.
   - Do not restart an exploratory interview if the design tree has already been resolved.

2. **Unambiguous Acceptance Criteria**:
   - Every requirement must have measurable, verifiable criteria (Given/When/Then or testable checkmarks).
   - Avoid vague words like "fast", "user-friendly", or "robust" without exact metrics or constraints.

3. **Define Public Seams & Data Contracts**:
   - Include TypeScript interfaces, database schemas (e.g. Drizzle tables), API payloads, and error codes directly in the specification.

---

## Technical Specification Template

Save generated specifications to `docs/specs/[feature-name].md`:

```markdown
# Technical Specification: [Feature Name]

## 1. Overview & Motivation
- **Problem Statement**: What problem is being solved?
- **User Story**: As a [role], I want [capability] so that [benefit].

## 2. Architecture & Seams
- **Public Interfaces / API Routes**: (HTTP methods, endpoints, request/response types)
- **Data Models & Schema**: (Drizzle tables, relations, fields, invariants)
- **Component Hierarchy**: (UI components and hook boundaries)

## 3. Edge Cases & Error Handling
- [Edge Case 1]: Expected behavior and fallback UI/error code.
- [Edge Case 2]: Rate limits, auth failures, empty states.

## 4. Acceptance Criteria
- [ ] Criterion 1 (Observable behavior)
- [ ] Criterion 2 (Observable behavior)

## 5. Non-Goals (Out of Scope)
- [Explicitly excluded functionality to prevent scope creep]
```

---

## Step-by-Step Procedure

1. **Gather Context**: Review recent conversation, `CONTEXT.md`, and any relevant ADRs.
2. **Draft Specification**: Populate the template with clear architecture diagrams, TypeScript types, and acceptance criteria.
3. **Review & Confirm**: Present the draft spec to the user for sign-off.
4. **Hand Off**: Proceed to `/to-tickets` to break the spec into tracer-bullet tasks.
