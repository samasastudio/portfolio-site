---
name: handoff
description: Summarizes and serializes the active session context, decisions, and immediate next steps. Use at the end of a work session or before starting a fresh context window to ensure seamless continuity.
---

# Session Handoff & Context Compaction

Use this skill when concluding a coding session, switching tasks, or creating a context briefing for another developer or a fresh agent session.

## Rules for Effective Handoffs

1. **Reference, Don't Duplicate**:
   - Reference files, diffs, commits, or issue links rather than copy-pasting entire documents.
   - Keep the handoff document concise, actionable, and focused on momentum.

2. **Capture Decision Rationale**:
   - Briefly record *why* specific paths or architectures were chosen over alternatives.

3. **Explicit Next Steps**:
   - State the exact command to run, file to open, or next test to write so work can resume immediately without re-investigation.

---

## Handoff Document Structure

When invoking or writing a handoff, generate a structured summary following this template:

```markdown
# Session Handoff: [Feature / Task Name]

## 1. Accomplished This Session
- [x] [Summary of changes made, tests added, or bugs fixed]
- [x] [Key files created or modified with file links]

## 2. Current State & Verification
- **Build / Test Status**: (e.g. Tests passing, 1 known failure at `path/to/test.ts`)
- **Working Branch / Commits**: `branch-name` / `commit-hash`

## 3. Decisions & Tradeoffs
- [Brief rationale for any non-obvious design choices made during this session]

## 4. Blockers & Open Questions
- [Any pending user decisions, external API requirements, or unresolved questions]

## 5. Immediate Next Steps
1. [Next concrete action item - e.g. "Run `npm test`, then implement function X in `src/service.ts`"]
2. [Follow-up verification or PR creation]
```
