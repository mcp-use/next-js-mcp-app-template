import {
  McpUseProvider,
  useWidget,
  useWidgetTheme,
  type WidgetMetadata,
} from "mcp-use/react";
import { z } from "zod";

// Pull in the Next.js app's globals.css so the widget inherits the same
// `@custom-variant dark (.dark *)` definition. Without this, Tailwind's
// `dark:` variants in the widget bundle would fall back to the default
// `prefers-color-scheme` gate and stop responding to `useWidgetTheme()`.
import "@/app/globals.css";

// The SAME component the Next.js home page renders. Resolved through the
// project's `@/*` tsconfig path — one source of truth for both the web
// page and the MCP widget. Edit NextStarter once, see the change in
// both places on the next HMR cycle.
import { NextStarter } from "@/components/NextStarter";

const propsSchema = z.object({});

type Props = z.infer<typeof propsSchema>;

export const widgetMetadata: WidgetMetadata = {
  description:
    "The Next.js create-next-app starter page, rendered inside the MCP widget iframe.",
  props: propsSchema,
};

export default function DemoPageWidget() {
  const { isPending } = useWidget<Props>();
  const theme = useWidgetTheme();

  if (isPending) {
    return (
      <McpUseProvider autoSize>
        <div className="p-5 text-sm text-zinc-500">Loading…</div>
      </McpUseProvider>
    );
  }

  return (
    <McpUseProvider autoSize>
      <NextStarter theme={theme} embed />
    </McpUseProvider>
  );
}
