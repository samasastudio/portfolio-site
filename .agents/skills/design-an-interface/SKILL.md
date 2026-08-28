---
name: design-an-interface
description: Generates multiple radically different interface designs for a module or component using the "Design It Twice" philosophy. Use when designing an API, exploring component interface options, or comparing architectural shapes.
---

# Design an Interface ("Design It Twice")

Based on the core principle from *A Philosophy of Software Design*: **your first idea is rarely your best idea**. Generate multiple radically different interface designs, compare their trade-offs, and synthesize the strongest solution.

## Workflow

### 1. Gather Seams & Requirements
- **Problem**: What problem does this module/component solve?
- **Callers**: Who interacts with it (UI pages, other services, test suites)?
- **Key Operations**: What 2-3 core actions must it support?
- **Internal vs External**: What complexity should be hidden inside vs exposed to callers?

### 2. Generate Divergent Designs
Create at least 2-3 distinct approaches with opposing trade-offs:
- **Design A (Minimalist)**: Smallest possible API footprint (1-2 methods/props max).
- **Design B (Flexible / Composable)**: Highly configurable via slots, compound components, or callbacks.
- **Design C (Specialized / Ergonomic)**: Optimized for the 90% common use case with sensible defaults.

### 3. Evaluate & Compare
Compare designs on:
- **Interface Simplicity**: Fewer concepts to learn and lower cognitive overhead.
- **Depth**: Small interface hiding significant complexity (deep module = good) vs large interface with shallow implementation.
- **Misuse Resistance**: How difficult is it for a caller to introduce bugs or invalid states?

### 4. Synthesize
Combine the best insights from the competing designs into the final approved interface signature.
