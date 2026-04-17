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
 * The widget at `src/mcp/resources/demo_page/widget.tsx` renders in an
 * iframe inside Inspector / ChatGPT / Claude and imports the SAME
 * `NextStarter` component the Next.js home page uses.
 */

import { MCPServer, text, widget } from "mcp-use/server";
import { z } from "zod";

const server = new MCPServer({
  name: "nextjs-dropin-template",
  version: "0.1.0",
  description:
    "Demo MCP server living alongside a Next.js app at src/mcp/. Renders the Next.js starter page inside the MCP widget to show the shared-component story.",
});

server.tool(
  {
    name: "show_demo_page",
    description:
      "Render the Next.js create-next-app starter page inside an MCP widget, using the same component the Next.js home page renders.",
    schema: z.object({}),
    widget: {
      name: "demo_page",
      invoking: "Rendering Next.js starter...",
      invoked: "Next.js starter ready",
    },
  },
  async () => {
    return widget({
      props: {},
      output: text(
        "Rendered the Next.js starter page inside the MCP widget — same React component as src/app/page.tsx.",
      ),
    });
  },
);

server.listen().then(() => {
  console.log("[mcp] nextjs-dropin-template server ready");
});
