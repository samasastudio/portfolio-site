---
name: improve-codebase-architecture
description: Analyzes code structure, module boundaries, coupling, and architectural patterns. Use when refactoring technical debt, decoupling modules, reorganizing folders, or preparing a codebase for scale.
---

# Codebase Architecture & Refactoring Workflow

Use this skill to audit, diagnose, and improve the architectural design and maintainability of the project without breaking existing behavior.

## Core Architectural Principles

1. **Clear Seams & Separation of Concerns**:
   - Separate data access (database/repositories), business domain logic, and presentation/UI layers.
   - Keep UI components focused on layout and user interaction; extract complex business logic and state management into dedicated hooks, services, or domain modules.

2. **Directional Dependency Graph**:
   - High-level policy and domain logic should not depend on low-level implementation details or UI components.
   - Eliminate circular imports and tangled dependencies.

3. **Incremental & Safe Refactoring**:
   - Never perform large destructive rewrites in a single pass.
   - Refactor behind existing interfaces and tests (Strangler Fig pattern). Ensure test suites remain green at every intermediate step.

---

## Architectural Audit & Refactoring Steps

### Step 1: Analyze Current Structure & Seams
- Map the directory tree, entry points, and module boundaries.
- Inspect import graphs to identify:
  - Circular dependencies.
  - Leaky abstractions (e.g., UI directly executing raw database queries or third-party SDK calls).
  - Bloated files ("god modules" > 300-500 lines with multiple unrelated responsibilities).

### Step 2: Propose Target Architecture & Seams
- Define the desired module boundaries and interfaces.
- Specify:
  - Domain / Service layer boundaries.
  - Shared types and schema definitions.
  - Public export contracts (index files / clean module APIs).

### Step 3: Plan Incremental Migrations
- Break the refactoring into bite-sized, non-breaking steps:
  1. Introduce new abstractions/interfaces alongside old ones.
  2. Migrate callers one-by-one.
  3. Deprecate and remove old implementations.

### Step 4: Execute with Continuous Verification
- Run type checkers (`tsc --noEmit`) and test suites after each module change.
- Ensure dead code and unused imports are cleaned up systematically.
