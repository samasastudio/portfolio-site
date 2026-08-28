---
name: composition-patterns
description: Enforces scalable React component composition patterns, compound components, slot architectures, and eliminates boolean prop proliferation. Use when designing, refactoring, or reviewing reusable UI components and design systems.
---

# React Component Composition & Architecture Patterns

Use this skill to build clean, maintainable, and flexible UI component APIs while avoiding bloated props and inflexible abstractions.

## 1. Eliminate Boolean Prop Proliferation

Avoid creating monolithic components that attempt to handle every visual variation via a dozen boolean flags.

```tsx
// ❌ Bad: Inflexible prop explosion
<Card 
  title="Project Alpha" 
  isCompact={true} 
  hasBorder={true} 
  withBadge={true} 
  badgeText="Active" 
  showFooter={true} 
  isClickable={true} 
/>

// ✅ Good: Composable, readable structure
<Card.Root variant="compact" bordered isInteractive>
  <Card.Header>
    <Card.Title>Project Alpha</Card.Title>
    <Badge>Active</Badge>
  </Card.Header>
  <Card.Content>...</Card.Content>
  <Card.Footer>...</Card.Footer>
</Card.Root>
```

---

## 2. Compound Components Pattern

When building complex widgets (modals, dropdowns, tabs, cards, accordions), use compound components connected via React Context:

```tsx
// Example: Tabs Component
<Tabs.Root defaultValue="account">
  <Tabs.List aria-label="Settings">
    <Tabs.Trigger value="account">Account</Tabs.Trigger>
    <Tabs.Trigger value="password">Password</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="account">
    <AccountForm />
  </Tabs.Content>
  <Tabs.Content value="password">
    <PasswordForm />
  </Tabs.Content>
</Tabs.Root>
```

### Benefits:
- Eliminates prop drilling.
- Allows consumers to reorder or omit sub-elements without rewriting component internals.
- Keeps component state self-contained and accessible.

---

## 3. Inversion of Control with Slots & `asChild`

- **Use Slots for Flexibility**:
  - Allow consumers to pass custom icons, action buttons, or media into predefined slots rather than forcing strict string types.
- **Polymorphism with `asChild` (Radix Pattern)**:
  - Allow components to merge their behavior and styles into custom child elements without generating unnecessary wrapper `<div>`s.
  ```tsx
  // Render a Button styled component as a Next.js <Link>
  <Button asChild variant="secondary">
    <Link href="/projects">View All Projects</Link>
  </Button>
  ```

---

## 4. Headless Logic vs. Presentation Layer

- **Separate State Logic into Custom Hooks**:
  - Extract complex interactions, keyboard handling, and async state into standalone headless hooks (e.g. `useDropdownState`, `useFilterList`).
  - Keep UI components focused on layout, styling, and rendering.

---

## Composition Review Checklist

- [ ] Does the component avoid boolean prop proliferation (fewer than 4-5 boolean flags)?
- [ ] Are complex UI widgets structured with compound components (`Component.Root`, `Component.Trigger`, etc.)?
- [ ] Are consumers given inversion of control over custom icons and sub-layouts via slots/children?
- [ ] Is complex business/state logic decoupled from presentational JSX via custom hooks?
