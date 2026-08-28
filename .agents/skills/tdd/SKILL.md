---
name: tdd
description: Enforces a disciplined Test-Driven Development (Red-Green-Refactor) workflow at pre-agreed observable seams. Use whenever implementing new features, bug fixes, or modifying business logic where test coverage is required.
---

# Test-Driven Development (TDD) Workflow

Use this skill to implement features, components, or bug fixes with high confidence and minimal accidental complexity.

## Core Rules

1. **Test at Observable Seams Only**:
   - Always write tests against public, observable boundaries (e.g. exported functions, API endpoints, user interactions, database repository interfaces).
   - Never test private helper functions or internal implementation details that would couple tests to internal refactoring.
   - If the seam is ambiguous, confirm the seam before writing tests.

2. **Never Write Code Before a Failing Test**:
   - Do not write implementation code ahead of tests.
   - Do not write a batch of multiple passing tests at once; iterate slice by slice.

3. **Strict Red-Green-Refactor Cycle**:
   - **RED**: Write the smallest unit of test code that captures the next requirement or reproduces the bug.
   - **VERIFY FAILURE**: Run the test runner to confirm the test fails **for the expected reason** (not a syntax error or unrelated failure).
   - **GREEN**: Write the minimal amount of implementation code to make the test pass.
   - **REFACTOR**: Clean up names, remove duplication, and improve structure without altering external behavior. Ensure tests remain green throughout.

---

## Step-by-Step Procedure

### Step 1: Identify the Seam & Test Target
- Determine which file and test framework to use (e.g., Vitest, Jest, Playwright).
- Confirm the input, output, and failure conditions of the seam.

### Step 2: Write the Minimal Failing Test (RED)
- Add a single test case describing the specific behavior.
- Keep assertions clear, focused on one concept per test.
- Use realistic fixtures or mock data only where external I/O (network/disk) is involved.

### Step 3: Run the Test to Verify Failure
- Execute the test command (e.g., `npm test -- <test-file>` or `npx vitest run <test-file>`).
- Confirm that:
  1. The test executes.
  2. The failure message matches the missing implementation.

### Step 4: Write Minimal Implementation (GREEN)
- Write only enough code to satisfy the failing assertion.
- Avoid premature optimizations or speculative generalization.
- Re-run the test command to confirm it turns GREEN.

### Step 5: Refactor & Clean
- Remove duplicate logic, refine variable names, and ensure type safety.
- Re-run the full relevant test suite to guarantee zero regressions.
- Repeat the cycle for the next requirement or edge case until the feature is complete.
