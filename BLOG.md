# Ship an MCP server from your existing Next.js app, without a second codebase

*by Pietro Zullo*

You have a Next.js app. 50 tools wired up with the Vercel AI SDK, shadcn components everywhere, a Supabase client that knows your schema. Now you want to expose some of that to Claude, ChatGPT, or Cursor as an MCP server.

Two options, both bad.

## Option 1: "The Next.js app *is* the MCP app"

Vercel published a walkthrough for this pattern. It works, but only if your Next.js app was built for it from day one. To retrofit it onto an existing app, you sign up for:

- `assetPrefix` rewriting so assets load from the MCP host
- A `<base href>` tag injected into every page
- `history.pushState` overridden so widgets don't navigate the parent frame
- `window.fetch` monkey-patched so relative fetches go to the right origin
- `MutationObserver` to catch DOM changes the patches miss
- `suppressHydrationWarning` sprinkled across the tree
- CORS middleware on every API route
- External link interception via `window.openai.openExternal()`

None of these are hard individually. Added on top of an existing app that already has an auth provider, an `OrganizationContext`, a root layout with Sentry + PostHog + FullStory, and a dozen API integrations, they are fragile. Vercel's own post says this out loud (which is the honest thing), but it doesn't help you if you already have the app.

## Option 2: Maintain a sibling MCP package

Your tools live in `apps/web/src/lib/`. You also have `apps/mcp/` with its own `package.json`, its own build, its own env. Every time you touch a service you update two call sites. Every time a shadcn component gets a styling tweak you copy it across. Every time you add an env var you set it in two dashboards.

Both paths end in the same place: two codebases, two mental models, two on-call rotations, the drift tax.

## Option 3: Physical process separation, shared source

The third option, which we shipped in [mcp-use#1332](https://github.com/mcp-use/mcp-use/pull/1332) and packaged as [mcp-use/next-js-mcp-app-template](https://github.com/mcp-use/next-js-mcp-app-template), is to run the MCP server as a **separate Node process** that still lives inside the Next.js repo.

```
my-app/
├── package.json                 # one install
├── tsconfig.json                # one @/* alias
├── src/
│   ├── app/                     # the Next.js app (unchanged)
│   ├── components/
│   │   └── GreetingCard.tsx     # shared: used by the page AND the widget
│   ├── lib/
│   │   └── greetings.ts         # shared: called by the page AND the MCP tool
│   └── mcp/                     # the only new subtree
│       ├── index.ts             # MCPServer + tool registrations
│       └── resources/
│           └── greeting_card/
│               └── widget.tsx
```

The Next.js app deploys to Vercel and never loads anything under `src/mcp/`. The MCP server deploys to Manufact Cloud (or wherever) and never runs `next build`. They share a repo, a `package.json`, a `node_modules/`, a tsconfig, and a component library. That's it.

From inside `src/mcp/index.ts`:

```ts
import { MCPServer, text } from "mcp-use/server";
import { z } from "zod";

// Import anything (services, DB clients, shared types) just like any
// other file in your Next.js app would.
import { buildGreeting } from "@/lib/greetings";

const server = new MCPServer({ name: "my-app", version: "0.1.0" });

server.tool(
  {
    name: "greet",
    description: "Generate a greeting for a given name.",
    schema: z.object({ name: z.string() }),
  },
  async ({ name }) => {
    const greeting = buildGreeting(name);
    return text(`${greeting.emoji} ${greeting.message}`);
  },
);

server.listen();
```

From inside `src/mcp/resources/greeting_card/widget.tsx`:

```tsx
import { McpUseProvider, useWidget } from "mcp-use/react";
// The SAME component the Next.js home page renders. Edit once,
// update everywhere on the next HMR cycle.
import { GreetingCard } from "@/components/GreetingCard";

export default function GreetingCardWidget() {
  const { props } = useWidget<{ greeting: Greeting }>();
  return (
    <McpUseProvider autoSize>
      <GreetingCard greeting={props.greeting} />
    </McpUseProvider>
  );
}
```

That's all the code. No `next.config.js` changes, no `<base>` tag, no CORS middleware, no sibling package.

## What the CLI does so you don't have to

The "drop in" feeling comes from four things `@mcp-use/cli` does when it sees `next` in your `package.json`:

**1. `@/*` resolution through your project tsconfig.** MCP tools compile through tsx; widgets compile through Vite. We wired both to read your project's `tsconfig.json` and its `paths` entries (the same way `next dev` does) via a namespace-less `tsx/esm/api.register` + `tsx/cjs/api.register` pair plus `vite-tsconfig-paths` in the widget build. `@/lib/...` imports resolve to the same files `next dev` resolves them to, using the same rules.

(An earlier iteration of this tried to use tsx's `tsImport` helper. That helper registers tsx with a *generated namespace*, and tsx's resolver bails with `return nextResolve(...)` for any specifier whose parent URL doesn't carry that namespace. That means transitive `@/lib/...` imports silently fall through to Node's default resolver and fail with `Cannot find package '@/lib'`. Dropping the namespace makes tsx's resolver run uniformly on every specifier.)

**2. Auto-shimmed Next.js server-runtime modules.** Anything you import from `@/lib/...` may transitively pull in `server-only`, `next/cache`, `next/headers`, `next/navigation`, or `next/server`. All of those throw or misbehave outside an RSC request context. The CLI detects `next` in your package.json and installs a pair of loader hooks that resolve each specifier to an inert stub: one hook covers ESM `import`, the other covers CJS `require` (the latter because tsx compiles `.ts` to CJS in any non-`"type": "module"` package). Your tool can `import { cookies } from "next/headers"` and get a `cookies()` that returns empty, not a crash.

**3. Next.js env cascade, mirrored.** `next dev` loads `.env` → `.env.development` → `.env.local` → `.env.development.local` in priority order. `mcp-use dev` runs the same cascade before starting your server, so `process.env.SUPABASE_SERVICE_ROLE_KEY` is populated the same way it would be under Next.

**4. React dedupe across the widget iframe.** Widgets run in an iframe with Vite-served React. Without aggressive dedupe, an HMR cycle can introduce a second React module instance and the next render throws `Cannot read properties of null (reading 'useState')`. That's the classic hooks-dispatcher-mismatch crash. We broadened Vite's `resolve.dedupe` to cover `react`, `react-dom`, `react/jsx-runtime`, `react/jsx-dev-runtime`, and `react-dom/client`, which keeps one runtime instance alive through any number of edits.

None of those show up in your code. You write `src/mcp/index.ts` the same way you'd write any other server file in your Next.js app.

## Two deployments, one repo

The Next.js side deploys to Vercel the way it always did. `next build` doesn't touch `src/mcp/`, so the web bundle doesn't ship MCP server code, doesn't pay the `mcp-use` bundle tax, doesn't care.

The MCP side deploys to Manufact Cloud (or any Node host) with explicit build and start commands that bypass Next entirely:

```bash
mcp-use deploy \
  --build-command 'npm run mcp:build' \
  --start-command 'npm run mcp:start'
```

Two pipelines, one source tree. The runtimes never overlap. When the MCP server crashes on Manufact, Vercel doesn't care. When Vercel rate-limits you, the MCP server keeps serving tools. Blast radius is contained, and you get both without operating two repos.

## Get started in 3 commands

New project:

```bash
gh repo create my-app --template mcp-use/next-js-mcp-app-template --clone
cd my-app && npm install
npm run dev &       # Next.js on :3000
npm run mcp:dev     # MCP server + inspector on :3001
```

The template is the standard `create-next-app --ts --tailwind --app --src-dir` output plus four files (`src/mcp/index.ts`, `src/mcp/resources/greeting_card/widget.tsx`, `src/components/GreetingCard.tsx`, `src/lib/greetings.ts`) and three npm scripts.

Retrofitting onto an existing Next.js app:

```bash
npm install mcp-use
npm install --save-dev @mcp-use/cli tsx vite-tsconfig-paths
```

Then add three scripts to your existing `package.json`:

```json
"mcp:dev":   "mcp-use dev --mcp-dir src/mcp",
"mcp:build": "mcp-use build --mcp-dir src/mcp",
"mcp:start": "mcp-use start --mcp-dir src/mcp"
```

And create `src/mcp/index.ts` with whatever tools you want exposed. Nothing in `next.config.js` changes. Nothing in `src/app/` changes.

## What this is not

Three honest caveats:

- **Widgets don't get server actions.** Widgets render in an iframe; to call back into your app from a widget, go through the MCP tool layer, not `"use server"`. This is the protocol, not a bug, but it's a shift if you're used to server actions.
- **Env vars on Manufact Cloud are set independently.** `.env.local` stays on Vercel. Your Manufact deploy gets its own subset through the Manufact dashboard. There's no magic sync.
- **The auto-shim is silent shimming.** If a tool transitively imports `cookies()` from `next/headers` and actually depends on real cookies, the shim returns empty instead of throwing. That's the right default for 95% of tools and a gotcha for the other 5%. If you need real request state, read it from the MCP request context, not from `next/headers`.

## Why we built this

The motivating customer has a Next.js 16 + React 19 + Supabase app with ~50 assistant tools already wired through the Vercel AI SDK and a shadcn component library. They wanted to expose a dozen of those tools to Claude and ChatGPT without forking the codebase. We tried six approaches before this one worked. The short version: anything that tried to make the Next.js app *be* the MCP app fought the existing layout, auth, and routing. Anything that maintained a sibling package demanded the drift tax. A separate process with a shared source tree was the only path that didn't ask the customer to change how they build their product.

If you've been putting off shipping MCP because it felt like a second codebase on the side of your main one, this is the fix.

- **Template:** https://github.com/mcp-use/next-js-mcp-app-template (click "Use this template")
- **PR:** https://github.com/mcp-use/mcp-use/pull/1332
- **CLI:** `@mcp-use/cli@canary` (ships with the next stable release)
