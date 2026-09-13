# Sam Johnson Portfolio & Compute Atlas Gateway — Local Setup

Complete local development and verification guide for the portfolio and Compute Atlas gateway systems.

## Prerequisites

- Node.js `>=22.13.0`
- npm (bundled with Node.js)
- Bash-compatible terminal (on Windows 11, WSL2 or Git Bash)

## Development Workflow

1. **Install locked dependencies**:
   ```bash
   npm ci
   ```

2. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

3. **Stop the development server**:
   Press `Ctrl+C`.

## Production Build & Verification

The production build scripts package the application into a Cloudflare Workers Sites artifact in `dist/`:

```bash
# Full test suite: production build, artifact validation, and rendered HTML assertions
npm test

# Strict TypeScript verification across all modules
npx tsc --noEmit

# Recheck packaged Sites manifest and ESM default export
npm run validate:artifact

# Generate Drizzle ORM migrations from schema definitions
npm run db:generate
```

## Key Directory Map

- `app/layout.tsx` — Root layout rendering `SiteShell` with inverted RSC slots (`header`, `nav`, `footer`).
- `app/_components/layout/` — Shell frame, `TopBar` (RSC), `SiteFooter` (RSC), and interactive leaves (`LiveClock`, `NavRail`).
- `app/_components/home/` — Home page presentation components (`HeroCopy`, `BrandEmblem`, `CapabilityShelves`).
- `app/work/` — Selected work archive route and interactive `ProjectArchive` component.
- `app/profile/` — Reading room manifesto, capabilities grid, and tools wall.
- `app/contact/` — Communication channels and contact route.
- `app/_data/systems.ts` — Metadata and status contracts for the 3 gateway surfaces.
- `app/_types/system.ts` — Strongly-typed `SystemGatewayContract` and `SystemItem` interfaces.
- `app/globals.css` — Design tokens (`--paper`, `--ink`, `--rust`, etc.) and responsive layout grids.
- `db/schema.ts` — Typed Drizzle ORM schemas for the 11 Compute Atlas entities per ADR-0004.
- `db/index.ts` — D1 database binding initialization.
- `worker/index.ts` — Cloudflare Worker fetch handler and image optimization entry.
- `worker/worker-env.d.ts` — Ambient type declarations for Cloudflare Worker runtime bindings.
