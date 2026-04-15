import { McpUseProvider, useWidget, type WidgetMetadata } from "mcp-use/react";
import { z } from "zod";

// The SAME component that the Next.js home page uses. Resolved through the
// project's `@/*` tsconfig path — no copy-paste, no parallel component
// library. Edit GreetingCard once, see the change in both places.
import { GreetingCard } from "@/components/GreetingCard";

const propsSchema = z.object({
  greeting: z.object({
    name: z.string(),
    message: z.string(),
    emoji: z.string(),
    generatedAt: z.string(),
  }),
});

type Props = z.infer<typeof propsSchema>;

export const widgetMetadata: WidgetMetadata = {
  description: "Greeting Card",
  props: propsSchema,
};

export default function GreetingCardWidget() {
  const { props, isPending } = useWidget<Props>();

  if (isPending) {
    return (
      <McpUseProvider autoSize>
        <div className="p-5 text-sm text-zinc-500">Loading…</div>
      </McpUseProvider>
    );
  }

  return (
    <McpUseProvider autoSize>
      <div className="w-[360px] p-1">
        <GreetingCard greeting={props.greeting} />
      </div>
    </McpUseProvider>
  );
}
