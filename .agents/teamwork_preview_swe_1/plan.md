# Orchestrator Plan — SWE Light

## Objective
Execute SWE Light workflow to fulfill all requirements R1-R5 in `ORIGINAL_REQUEST.md`.

## Steps
1. **Initial Dispatch**: Spawn `teamwork_preview_implementer` with verbatim original task.
2. **Implementer Evaluation**:
   - Verify diff and run verification commands (`npx tsc --noEmit`, `npm test`, `npm run validate:artifact`).
   - Populate Open-Issues Ledger.
3. **Refinement Round 1**:
   - Spawn `teamwork_preview_reviewer` (Round 1) with verbatim original task, implementer report, and open issues.
   - Verify changes and test results.
4. **Refinement Round 2**:
   - Spawn `teamwork_preview_reviewer` (Round 2) with verbatim original task, previous report, and open issues.
   - Verify changes and test results.
5. **Refinement Round 3**:
   - Spawn `teamwork_preview_reviewer` (Round 3) with verbatim original task, previous report, and open issues.
   - Verify changes and test results.
6. **Victory Audit**:
   - Spawn `teamwork_preview_victory_auditor` for independent verification.
7. **Final Reporting**:
   - Transmit completion report to Sentinel / parent agent.
