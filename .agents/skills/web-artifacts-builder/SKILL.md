---
name: web-artifacts-builder
description: Suite of tools for creating elaborate, multi-component HTML and React web artifacts using modern frontend technologies (React, Tailwind CSS, shadcn/ui, Vite). Use for building complex, interactive web widgets, calculators, and standalone prototypes.
---

# Web Artifacts Builder

Use this skill when building self-contained, interactive frontend applications, rich UI widgets, dashboards, or calculators.

## Stack & Architecture
- **Framework**: React + TypeScript + Tailwind CSS + Lucide Icons
- **Output**: Single-file self-contained HTML bundle or modular Next.js / Vite components

## Guidelines for Quality Web Artifacts

1. **State & Interactivity**:
   - Manage realistic local state with React hooks (`useState`, `useReducer`, `useMemo`).
   - Include realistic mock data and interactive filtering, search, or calculation logic.

2. **Visual Distinction**:
   - Avoid generic "AI slop": no excessive centered layouts, flat gray backgrounds, or cliched purple gradients.
   - Use intentional typography hierarchy, subtle borders, and smooth transitions.

3. **Self-Contained & Resilient**:
   - Inline styles, SVG icons, and dependencies so the artifact functions reliably anywhere without external asset 404s.
