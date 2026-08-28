---
name: domain-modeling
description: Defines and refines the project's ubiquitous language, entity boundaries, and domain invariants. Use when clarifying ambiguous terminology, designing data models, or updating CONTEXT.md.
---

# Domain Modeling & Ubiquitous Language Workflow

Use this skill to establish clear domain boundaries, eliminate ambiguous jargon, and document system invariants before building complex data schemas or business logic.

## Core Rules

1. **Ubiquitous Language**:
   - Every domain concept must have exactly **one** canonical name.
   - Refuse overloaded terms (e.g. if "User" means both an authenticated admin and an end customer, split them into `AdminUser` and `CustomerAccount`).
   - Keep terminology consistent across code identifiers, database schemas, and documentation.

2. **Explicit Invariants**:
   - Identify rules that must **never** be violated in valid system states (e.g., *"A project cannot have more than one active primary owner"*, *"Quantities cannot be negative"*).
   - Document how these invariants are enforced (types, database constraints, runtime validators like Zod).

3. **Seam & Boundary Clarity**:
   - Delineate where one domain module ends and another begins to prevent tangled state.

---

## Output & Context Updates

When executing this skill, ensure `CONTEXT.md` in the project root is created or updated with the following sections:

```markdown
# Domain Model & Project Context

## Ubiquitous Language
- **[Term 1]**: Exact definition, purpose, and distinction from related terms.
- **[Term 2]**: Exact definition, purpose, and distinction from related terms.

## Core Entities & Relationships
- **[Entity A]**: Attributes, lifecycle states, and relationship to Entity B.
- **[Entity B]**: Attributes, lifecycle states, and relationship to Entity A.

## System Invariants
- [Invariant 1]: Rule that must always hold true.
- [Invariant 2]: Rule that must always hold true.

## State Transitions
- Describe valid state lifecycles (e.g., `Draft -> Pending Review -> Published -> Archived`).
```

---

## Step-by-Step Procedure

1. **Identify Ambiguities**: Review proposed features or existing code for overloaded terms or unclear boundaries.
2. **Interrogate Terms**: Ask clarifying questions to define exact entity lifecycles, states, and relationships.
3. **Define Invariants & Constraints**: Document what cannot happen and which layer enforces each rule.
4. **Update `CONTEXT.md`**: Persist the canonical definitions and entities in `CONTEXT.md`.
5. **Align Code**: Ensure database migrations, TypeScript types/interfaces, and variable names match the ubiquitous language exactly.
