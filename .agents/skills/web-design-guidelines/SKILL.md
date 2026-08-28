---
name: web-design-guidelines
description: Audits and guides UI/UX design, visual hierarchy, 4px/8px spacing systems, contrast ratios, and WCAG accessibility standards. Use when designing, building, or reviewing user interfaces and layouts.
---

# Web Interface & Design Guidelines

Use this skill to ensure user interfaces are visually polished, responsive, accessible (WCAG AA/AAA compliant), and ergonomically sound.

## 1. Spacing, Alignment & Visual Rhythm

- **Strict 4px/8px Spacing Scale**:
  - Always use multiples of 4px / 8px for margins, padding, and gap spacing (e.g. Tailwind `p-2` (8px), `p-4` (16px), `gap-6` (24px), `p-8` (32px)).
  - Avoid arbitrary, unaligned values (e.g. `margin: 13px`).
- **Consistent Layout Containers**:
  - Use max-width containers (`max-w-5xl`, `max-w-7xl`) with symmetrical horizontal padding to ensure content does not stretch awkwardly on ultra-wide screens.
- **Visual Hierarchy & Whitespace**:
  - Give elements room to breathe. Use generous whitespace between distinct content sections rather than cramming UI elements together.

---

## 2. Typography & Contrast Standards

- **Type Hierarchy**:
  - Establish clear scale contrast between H1 (display), H2 (section), H3 (card title), and body text with proportional line-heights (`leading-tight` for headings, `leading-relaxed` for long prose).
- **Contrast Ratios (WCAG AA Compliance)**:
  - Text must maintain at least a **4.5:1** contrast ratio against its background (3:1 for large display text).
  - Avoid using low-contrast light grey text on white backgrounds or faint dark grey on dark mode backgrounds.
- **Avoid Pure #000 on Pure #FFF**:
  - Prefer soft, rich dark tones (e.g., `zinc-900` / `neutral-900`) for text on light backgrounds to reduce eye strain.

---

## 3. Accessibility & Interactive States

- **Keyboard Navigation & Visible Focus Rings**:
  - Every interactive element (buttons, links, inputs) must have a clearly visible focus state (e.g. `focus-visible:ring-2 focus-visible:ring-offset-2`).
  - Never set `outline: none` without providing an accessible alternative.
- **Semantic HTML Elements**:
  - Use `<button>` for actions and `<a>` / `<Link>` for navigation. Never use a `<div>` with an `onClick` when a button or link is semantically correct.
- **Accessible Labels**:
  - Any icon-only button (e.g. search, close, menu toggle) must have an explicit `aria-label` or visually hidden screen reader text.
- **Touch Targets on Mobile**:
  - Interactive touch targets must be at least **44x44px** on mobile viewports.

---

## 4. Layout Shifts & Micro-Interactions

- **Prevent Cumulative Layout Shift (CLS)**:
  - Always specify explicit `width` and `height` (or aspect ratio) on images, videos, and avatars.
  - Render skeleton placeholders with identical dimensions while data loads.
- **Subtle, Purposeful Motion**:
  - Keep interactive transitions fast and snappy ($\le 150-200\text{ms}$ ease-out).
  - Respect user accessibility preferences with `@media (prefers-reduced-motion)` or Tailwind `motion-reduce:transition-none`.

---

## UI Quality Audit Checklist

- [ ] Does all spacing follow a consistent 4px/8px rhythm?
- [ ] Is text contrast compliant with WCAG AA standards (minimum 4.5:1)?
- [ ] Do all interactive elements have visible `:focus-visible` states?
- [ ] Are icon buttons accompanied by `aria-label`s?
- [ ] Are images and dynamic containers styled to prevent Cumulative Layout Shift?
- [ ] Does the layout adapt cleanly across mobile, tablet, and desktop breakpoints?
