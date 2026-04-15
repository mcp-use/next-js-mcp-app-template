# Next.js + MCP drop-in template

A standard [`create-next-app`](https://nextjs.org/docs/app/api-reference/create-next-app) scaffold with one new folder: `src/mcp/`. That folder holds an MCP server and its widgets, and it imports from the rest of the Next.js app via the same `@/` alias `src/app/` uses. No sibling package, no duplicated components, no second codebase.

```
src/
├── app/                          # the Next.js app (unchanged)
├── components/
│   └── GreetingCard.tsx          # shared — used by the page AND the widget
├── lib/
│   └── greetings.ts              # shared — called by the page AND the MCP tool
└── mcp/                          # drop-in MCP server (this folder is the only addition)
    ├── index.ts                  # MCPServer + tool registrations
    └── resources/
        └── greeting_card/
            └── widget.tsx        # imports '@/components/GreetingCard'
```

The Next.js page (`src/app/page.tsx`) and the MCP widget both call `buildGreeting(name)` from `@/lib/greetings` and render `<GreetingCard>` from `@/components/GreetingCard`. Edit either once; both update on the next HMR cycle.

## Getting started

```bash
yarn install
```

Two dev servers — run them in separate terminals:

```bash
# Terminal 1 — Next.js app on http://localhost:3000
yarn dev

# Terminal 2 — MCP server + inspector on http://localhost:3001
yarn mcp:dev
```

Open the inspector at `http://localhost:3001/inspector`, try the `greet` tool with any name, then try `show_greeting_card` — the widget renders the same `GreetingCard` component the home page shows.

## What the `mcp:*` scripts actually do

| Command         | Wrapper around                              |
| --------------- | ------------------------------------------- |
| `yarn mcp:dev`  | `mcp-use dev --mcp-dir src/mcp`             |
| `yarn mcp:build`| `mcp-use build --mcp-dir src/mcp`           |
| `yarn mcp:start`| `mcp-use start --mcp-dir src/mcp`           |

The `--mcp-dir` flag tells the CLI where your server entry and widget resources live. With `src/mcp`:

- entry resolves to `src/mcp/index.ts`
- widgets discovered under `src/mcp/resources/<name>/widget.tsx`

Everything else — tsconfig, package.json, `node_modules` — is shared with the Next.js app.

## What the CLI does for you

When `mcp-use` detects `next` in your `package.json`, it:

1. **Resolves `@/*` imports** through your project's tsconfig paths (via `vite-tsconfig-paths`), so widgets can `import '@/components/...'` and the server can `import '@/lib/...'`.
2. **Auto-shims Next.js server-runtime modules** (`server-only`, `client-only`, `next/cache`, `next/headers`, `next/navigation`, `next/server`). These throw or are unavailable outside an RSC/request context; the CLI replaces them with inert stubs so your tools can safely import anything the Next.js app imports.
3. **Auto-loads `.env*` files** in the same priority order `next dev` uses (`.env` → `.env.development` → `.env.local` → `.env.development.local`). No duplicate env plumbing.
4. **Dedupes React** across the widget iframe's module graph so HMR stays reliable — edit your widget mid-flight, no `useState` / hooks errors.

## Deploying

Two independent deployments from the same repo:

- **The Next.js app** deploys wherever it already goes (Vercel, self-hosted, etc.). It never loads `src/mcp/`.
- **The MCP server** deploys to Manufact Cloud:
  ```bash
  yarn mcp:build
  mcp-use deploy --build-command 'yarn mcp:build' --start-command 'yarn mcp:start'
  ```
  Manufact builds from your repo but only runs `mcp:build` + `mcp:start` — it never calls `next build`.

Env vars are managed independently on each provider. `.env.local` stays on Vercel; Manufact gets its own subset (DB URLs, API keys, feature flags) through the Manufact dashboard or `--env` at deploy time.

## Extending the template

- **Add a tool** — register it in `src/mcp/index.ts` with `server.tool(...)`. Anything you import from `@/lib/...` works.
- **Add a widget** — create `src/mcp/resources/<name>/widget.tsx`, export a `widgetMetadata` object and a default component, then register a tool with `widget: { name: "<name>", ... }` and return `widget({ props, output })` from the handler.
- **Share a component** — drop it in `src/components/` and import from both `src/app/` and `src/mcp/resources/`.

## Version requirement

This template relies on `mcp-use` with the drop-in Next.js features (`--mcp-dir` flag, auto-shim, widget dedupe). If you're on a pre-release, pin to the latest canary:

```bash
yarn add mcp-use@canary
```

Once the drop-in feature is in a stable release, `mcp-use: "latest"` is enough.
