---
name: webapp-testing
description: Toolkit for interacting with and testing local web applications using Playwright or Vitest. Supports verifying frontend functionality, debugging UI behavior, and running headless browser assertions.
---

# Web Application Testing Workflow

Use this skill when verifying frontend behavior, checking interactive UI components, or testing local web apps end-to-end.

## Core Testing Workflow

### 1. Identify Seams & Target URL
- Confirm the local development server is running (e.g. `http://localhost:5173` or `http://localhost:3000`).
- Identify the target route, component, and user interaction flow.

### 2. Reconnaissance & Selectors
- Use accessible, resilient selectors:
  - Prefer role and accessible name: `page.getByRole('button', { name: 'Submit' })`
  - Prefer text content: `page.getByText('Projects')`
  - Prefer labels and placeholders: `page.getByLabel('Email')`
  - Avoid brittle deep CSS selectors (e.g. `div > div:nth-child(3) > button`).

### 3. Timing & Network State
- Always wait for network and DOM stability before making assertions:
  ```typescript
  await page.goto('http://localhost:5173');
  await page.waitForLoadState('networkidle');
  ```

### 4. Interactive Assertions
- Assert on visible outcomes, DOM changes, URL navigations, or form submissions:
  ```typescript
  await page.getByRole('button', { name: 'Contact' }).click();
  await expect(page.getByRole('heading', { name: 'Get in touch' })).toBeVisible();
  ```

---

## Best Practices
- Run browser tests in **headless mode** for speed and CI consistency.
- Capture screenshots or DOM snapshots on failure for rapid root-cause diagnosis.
