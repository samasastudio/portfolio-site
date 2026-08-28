---
name: react-best-practices
description: Applies performance optimization rules for React and Next.js, including waterfall elimination, bundle size reduction, fine-grained re-rendering, and efficient server-client boundaries. Use when writing, optimizing, or reviewing React/Next.js code.
---

# React & Next.js Performance Best Practices

Use this skill when building new React/Next.js components, optimizing existing pages, or auditing code for performance bottlenecks.

## 1. Eliminate Network & Async Waterfalls

- **Parallel Data Fetching**:
  - Never await independent promises sequentially.
  - Use `Promise.all()` or `Promise.allSettled()` for concurrent fetching.
  ```tsx
  // ❌ Bad: Sequential waterfall (takes time A + time B)
  const user = await fetchUser(id);
  const posts = await fetchUserPosts(id);

  // ✅ Good: Parallel fetch (takes max(time A, time B))
  const [user, posts] = await Promise.all([
    fetchUser(id),
    fetchUserPosts(id)
  ]);
  ```
- **Streaming with Suspense**:
  - Wrap slow or secondary data components in `<Suspense>` boundaries with instant fallback skeletons so initial page shell renders immediately.
- **Start Fetches Early**:
  - Initiate async requests as high up in the component tree or route loader as possible rather than waiting for deeply nested child components to mount.

---

## 2. Server vs. Client Component Boundaries

- **Push `'use client'` to the Leaves**:
  - Keep parent layouts, pages, and containers as Server Components.
  - Isolate interactivity (e.g. an interactive search input or dropdown trigger) into tiny, focused Client Components.
- **Minimize Serialization Payloads**:
  - Only pass the specific fields needed by Client Components across the boundary. Avoid passing large, unneeded database records.
- **Pass Server Components as Children / Props**:
  - If a Client Component needs to wrap server-rendered content, pass it via `children` rather than converting the entire subtree into Client Components.

---

## 3. Bundle Size & Code Splitting

- **Dynamic Imports for Heavy Components**:
  - Lazy load heavy dialogs, rich text editors, charts, and modal components using `next/dynamic` or `React.lazy` with `ssr: false` where appropriate:
  ```tsx
  const AnalyticsChart = dynamic(() => import('@/components/AnalyticsChart'), {
    ssr: false,
    loading: () => <ChartSkeleton />
  });
  ```
- **Specific Module Imports**:
  - Avoid barrel file wildcard imports that pull in unnecessary libraries (e.g. import specific Lucide icons `import { Check } from 'lucide-react'` or specific utility functions).

---

## 4. Re-render Optimization & State Placement

- **Push State Down**:
  - Keep transient state (e.g., hover states, input typing, open modals) local to the leaf component that needs it so ancestors don't re-render on every keystroke.
- **Stable References**:
  - Wrap callbacks passed to heavily rendered lists or memoized children in `useCallback`.
  - Memoize expensive transformations using `useMemo`.
- **Prefer CSS Transitions Over State-Driven Animations**:
  - Use CSS classes or Tailwind transitions instead of React state timers where possible to keep the main JS thread unblocked.

---

## Performance Review Checklist

- [ ] Are all independent async requests executed in parallel?
- [ ] Is `'use client'` restricted only to components requiring browser APIs or state?
- [ ] Are heavy non-critical components (modals/charts) dynamically imported?
- [ ] Are list items uniquely and stably keyed (avoiding array index keys when reordering)?
- [ ] Is layout shifting prevented during asynchronous data loading?
