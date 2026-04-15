/**
 * Sample "service" used by both the Next.js app and the MCP server.
 *
 * In a real project this is where your DB calls / external API clients /
 * business logic live. The point of the drop-in template: ONE implementation
 * serves both your web UI and your MCP tools. The MCP server in
 * `src/mcp/index.ts` imports from `@/lib/greetings` the same way the Next.js
 * app does, via the project's existing `@/*` tsconfig alias.
 */

export type Greeting = {
  name: string;
  message: string;
  emoji: string;
  generatedAt: string;
};

const EMOJIS = ["👋", "✨", "🚀", "🎉", "☀️"] as const;

/** Deterministic emoji pick so the same name always gets the same glyph. */
function pickEmoji(name: string): string {
  const sum = [...name].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return EMOJIS[sum % EMOJIS.length];
}

export function buildGreeting(name: string): Greeting {
  const trimmed = name.trim() || "friend";
  return {
    name: trimmed,
    message: `Hello, ${trimmed}! Welcome to the drop-in template.`,
    emoji: pickEmoji(trimmed),
    generatedAt: new Date().toISOString(),
  };
}
