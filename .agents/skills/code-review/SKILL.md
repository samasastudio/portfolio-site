---
name: code-review
description: Performs a structured code review on git diffs or modified files. Use before committing changes or submitting a pull request to verify correctness, edge cases, type safety, performance, and security.
---

# Code Review & Quality Assurance Workflow

Use this skill to audit recent code changes against engineering standards and quality gates.

## Review Checklist

### 1. Correctness & Logic
- [ ] Does the implementation fulfill all specified requirements and acceptance criteria?
- [ ] Are all edge cases handled (empty states, boundary numbers, null/undefined, unexpected inputs)?
- [ ] Are async operations handled safely without unhandled promise rejections or race conditions?

### 2. Testing & Verification
- [ ] Are there unit or integration tests covering the new behavior?
- [ ] Are negative/failure test cases present?
- [ ] Do all tests pass locally without flaky behavior?

### 3. Type Safety & Maintainability
- [ ] Are TypeScript types precise (avoiding unnecessary `any` or loose `unknown` casts)?
- [ ] Are function and variable names descriptive and self-documenting?
- [ ] Is there unnecessary code duplication that should be extracted?

### 4. Security & Performance
- [ ] Are inputs sanitized and validated at boundaries?
- [ ] Are secrets, credentials, and API keys protected (not hardcoded)?
- [ ] Are expensive operations or database queries optimized (no N+1 queries or memory leaks)?

---

## Output Format

Organize review findings clearly:

1. **Summary**: High-level assessment (Pass / Action Required).
2. **Critical Issues (Blockers)**: Must be addressed before merging (bugs, regressions, security risks).
3. **Suggestions (Non-blocking)**: Refactoring opportunities, naming improvements, or style consistency.
4. **Positive Highlights**: Well-structured patterns or good test coverage noted in the diff.
