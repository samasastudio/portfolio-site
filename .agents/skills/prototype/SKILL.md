---
name: prototype
description: Rapidly builds throwaway prototypes, spikes, or minimal mockups to validate technical feasibility or UX directions before formal specification and TDD.
---

# Rapid Prototyping & Spike Workflow

Use this skill when you need to answer an unknown technical question, explore alternative UI ergonomics, or build a fast proof-of-concept before committing to production architecture and tests.

## Core Rules

1. **Spike Mindset (Speed Over Rigor)**:
   - Relax strict TDD and full architectural decoupling during the spike.
   - The goal is answering a specific question (e.g. *"Can we get CSS animations smooth on mobile?"*, *"Does library X work with Cloudflare Workers?"*), not building production-ready code.

2. **Isolate or Make Disposable**:
   - Keep prototype code isolated in dedicated sandbox files, routes (e.g., `app/sandbox/page.tsx`), or standalone scratch HTML/TS files.
   - Do not pollute production core modules with disposable spike hacks.

3. **Explicit Graduation Decision**:
   - At the conclusion of the prototype, summarize findings:
     1. **Adopt**: Throw away or refactor the prototype code cleanly using `/to-spec` $\rightarrow$ `/to-tickets` $\rightarrow$ `/tdd`.
     2. **Pivot/Discard**: Reject the approach if ergonomics, performance, or library compatibility fail expectations.

---

## Prototyping Procedure

1. **Define the Hypothesis**: Identify the single unknown or design question the spike needs to answer.
2. **Build Minimal Runnable Slice**: Implement the quickest working version (mock data, inline styles, simplified state).
3. **Evaluate & Demonstrate**: Test the spike locally, verifying ergonomics, performance, and visual appeal.
4. **Capture Takeaways**: Note any unforeseen limitations or dependencies discovered during the spike.
5. **Clean Up or Graduate**: Decide whether to discard the spike or formalize it into a proper specification.
