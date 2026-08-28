---
name: diagnosing-bugs
description: Systematic, hypothesis-driven root-cause investigation for bugs, test failures, and unexpected behaviors. Use whenever troubleshooting errors, stack traces, race conditions, or performance regressions.
---

# Diagnosing Bugs & Root-Cause Analysis Workflow

Use this skill when investigating broken functionality, unexpected runtime errors, test failures, or performance regressions.

## Cardinal Rules

1. **Redact Sensitive Data First**:
   - Redact API keys, tokens, environment variables, credentials, and customer PII before printing or recording logs and command outputs.

2. **Never Guess or Symptom-Patch**:
   - Do not propose speculative code fixes without proving the root cause.
   - Do not apply surface-level patches (e.g., adding arbitrary `try/catch` or `null` checks) that mask the underlying problem without understanding why the state occurred.

3. **Separate Observations from Hypotheses**:
   - **Observation**: Facts that are directly measurable (exact error output, stack trace, HTTP status, variable payload).
   - **Hypothesis**: Plausible explanations for why the observed state occurred.

---

## 5-Step Investigation Procedure

### Step 1: Establish a Minimal Reproduction
- Create a minimal test case, CLI command, or script that reliably triggers the defect in isolation.
- If the bug is flaky or nondeterministic, identify the race condition, timeout, or external dependency causing variability.

### Step 2: Gather Evidence & Inspect State
- Collect the exact error message, stack trace, and execution path.
- Inspect the state (inputs, environment, database records, network payloads) immediately before the point of failure.

### Step 3: Formulate & Test Hypotheses
- List the most likely root causes based on the evidence.
- For each hypothesis, design a specific check to confirm or invalidate it (e.g., adding targeted log statements, checking git blame / recent diffs, inspecting type definitions).
- Test one hypothesis at a time to isolate variables.

### Step 4: Verify the Root Cause
- Confirm the specific mechanism that produces the bug.
- Ensure the failure is fully explained by the identified mechanism and that no secondary defects are masked.

### Step 5: Implement Fix & Add Regression Test
- Create a regression test (using the reproduction from Step 1) that fails on the buggy code and passes on the fix.
- Apply the minimal structural fix addressing the root cause.
- Run the full test suite to ensure no collateral damage or regressions.
