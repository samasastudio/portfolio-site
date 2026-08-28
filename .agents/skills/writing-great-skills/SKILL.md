---
name: writing-great-skills
description: Guidelines, best practices, and templates for authoring high-leverage agent skills and rules. Use when creating or refining skills for your team or repository.
---

# Writing Great Agent Skills & Guidelines

Use this skill when designing, authoring, or evaluating custom agent skills in `.agents/skills/<name>/SKILL.md` or global configurations.

## Core Design Principles

1. **Progressive Disclosure Friendly**:
   - The YAML frontmatter `name` and `description` are loaded into agent context at all times.
   - **Crucial**: The `description` must clearly articulate *when* and *why* the agent should invoke the skill (triggers, intent, problem type). Keep it under 2-3 sentences.
   - The body of `SKILL.md` is only read when the skill activates. Keep the body focused, actionable, and under 200 lines.

2. **Actionable Checklists Over Conversational Prose**:
   - AI agents follow structured numbered steps, Markdown tables, and checkbox criteria far better than dense paragraphs.
   - Define exact input/output expectations and file paths.

3. **Establish Clear Constraints & Anti-Patterns**:
   - State what the agent **must not** do (e.g. "Do not write code before tests", "Do not modify files outside directory X").

4. **Composable & Modular**:
   - Keep each skill focused on a single responsibility (e.g. debugging vs testing vs ticketing).
   - Let skills hand off cleanly to one another (e.g. `grill-with-docs` $\rightarrow$ `to-spec` $\rightarrow$ `to-tickets` $\rightarrow$ `tdd`).

---

## Standard Antigravity Skill Template

```markdown
---
name: skill-identifier
description: Concise explanation of what the skill accomplishes and the exact triggers for when to activate it.
---

# [Skill Title] Workflow

Brief context and problem statement.

## Core Rules & Constraints
1. **Rule 1**: Strict guideline or invariant.
2. **Rule 2**: Strict guideline or invariant.

## Step-by-Step Procedure
### Step 1: [Action]
- Specific instruction.

### Step 2: [Action]
- Specific instruction.

## Output Format / Verification
- What files to write/update and what commands to run for verification.
```
