import type { Greeting } from "@/lib/greetings";

/**
 * Shared component used by BOTH the Next.js app and the MCP widget.
 *
 * Because `src/mcp/resources/greeting_card/widget.tsx` imports this from
 * `@/components/GreetingCard`, a single style + markup change here shows up
 * in the Next.js page AND in the MCP widget on the next HMR cycle. No
 * duplication, no second component library.
 */
export function GreetingCard({ greeting }: { greeting: Greeting }) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center gap-3">
        <span className="text-3xl leading-none" aria-hidden>
          {greeting.emoji}
        </span>
        <div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Greeting</p>
          <p className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            {greeting.name}
          </p>
        </div>
      </div>
      <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        {greeting.message}
      </p>
      <p className="text-xs text-zinc-400 dark:text-zinc-500">
        Generated {new Date(greeting.generatedAt).toLocaleTimeString()}
      </p>
    </div>
  );
}
