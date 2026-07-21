# Sam Johnson Portfolio — Version 3

This archive contains the complete source for the third portfolio edition: the
Austin flash-tattoo identity, Nordic color, and Japanese-library-inspired layout.

## Requirements

- Node.js 22.13.0 or newer
- npm (included with Node.js)
- A terminal that can run Bash commands

On Windows 11, WSL2 is the most reliable environment for both development and
production builds. Git Bash is also suitable for the development command.

## Start the development site

Open a terminal in the extracted `sam-johnson-portfolio-v3` folder, then run:

```bash
npm ci
npm run dev
```

Open the local address printed by the terminal. Vite normally uses
`http://localhost:5173`.

Stop the server with `Ctrl+C`.

## Production build

The production helper scripts target Linux and require Bash plus GNU `timeout`.
On Windows, run these commands in WSL2:

```bash
npm ci
npm run build
```

The validated production output is written to `dist/`.

## Useful files

- `app/ui.tsx` — page content, navigation, and project interactions
- `app/globals.css` — the complete visual system and responsive layouts
- `public/sam-johnson-snake-mark.png` — the portfolio emblem
- `app/page.tsx` — home route
- `app/work/page.tsx` — selected-work route
- `app/profile/page.tsx` — profile route
- `app/contact/page.tsx` — contact route

## Notes

- `node_modules/`, generated builds, caches, and local runtime files are not
  included. `npm ci` recreates the exact dependency tree from `package-lock.json`.
- The site does not require a database, environment variables, or API keys.
- Keep the included `.openai/hosting.json`; the build uses its empty binding
  declarations even when running locally.
