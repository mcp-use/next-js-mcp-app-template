/**
 * MCP server that lives inside a Next.js app.
 *
 * Run this file via `npm run mcp:dev` (which wraps
 * `mcp-use dev --mcp-dir src/mcp`). The CLI:
 *
 *   - resolves `@/lib/...` / `@/components/...` through the project's own
 *     tsconfig paths, so this server can import directly from the app;
 *   - auto-shims Next.js server-runtime modules (`server-only`,
 *     `next/cache`, `next/headers`, etc.) that throw when imported outside
 *     a Next.js request;
 *   - auto-loads `.env*` files the same way `next dev` does.
 *
 * The widget at `src/mcp/resources/greeting_card/widget.tsx` renders in an
 * iframe inside Inspector / ChatGPT / Claude and imports the SAME
 * `GreetingCard` component the Next.js home page uses.
 */

import { MCPServer, text, widget } from "mcp-use/server";
import { z } from "zod";

import { buildGreeting } from "@/lib/greetings";

const server = new MCPServer({
  name: "nextjs-dropin-template",
  version: "0.1.0",
  description:
    "Demo MCP server living alongside a Next.js app at src/mcp/. Shows how to reuse shared services and components in MCP tools.",
});

// A plain tool — no widget. Shows the simple case: import a function from
// the Next.js app, return the result as text.
server.tool(
  {
    name: "greet",
    description: "Generate a greeting for a given name.",
    schema: z.object({
      name: z.string().describe("Who to greet"),
    }),
  },
  async ({ name }) => {
    const greeting = buildGreeting(name);
    return text(`${greeting.emoji} ${greeting.message}`);
  },
);

// A widget tool — the agent only passes `{ name }`. The server builds the
// greeting and hands the structured props to the widget for rendering
// through the shared GreetingCard component.
server.tool(
  {
    name: "show_greeting_card",
    description:
      "Render a greeting card widget built from the Next.js app's shared component library.",
    schema: z.object({
      name: z.string().describe("Who to greet"),
    }),
    widget: {
      name: "greeting_card",
      invoking: "Building greeting...",
      invoked: "Greeting ready",
    },
  },
  async ({ name }) => {
    const greeting = buildGreeting(name);
    return widget({
      props: { greeting },
      output: text(
        `Rendered a greeting for ${greeting.name}: ${greeting.message}`,
      ),
    });
  },
);

server.listen().then(() => {
  console.log("[mcp] nextjs-dropin-template server ready");
});
