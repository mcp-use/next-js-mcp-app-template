import { BrandLockup } from "@/components/BrandLockup";
import { FileIcon } from "@/components/icons/FileIcon";
import { GlobeIcon } from "@/components/icons/GlobeIcon";
import { WindowIcon } from "@/components/icons/WindowIcon";
import { ManufactSymbol } from "@/components/logos/ManufactSymbol";

// The MCP widget at `src/mcp/resources/demo_page/widget.tsx` imports
// `StarterPage` from this file, so edits here show up in both the web
// page and the widget served to Inspector / ChatGPT / Claude.
// `theme` and `embed` are only used by the widget — the web page
// renders with the defaults.
export function StarterPage({
  theme,
  embed = false,
}: { theme?: "light" | "dark"; embed?: boolean } = {}) {
  const layoutClass = embed
    ? "flex flex-col items-center gap-10 p-8 sm:p-12"
    : "grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen gap-16 p-8 pb-20 sm:p-20";
  const wrapperClass =
    layoutClass +
    " font-sans bg-white text-black dark:bg-black dark:text-white" +
    (theme === "dark" ? " dark" : "");
  const mainClass = embed
    ? "flex flex-col items-center gap-8"
    : "row-start-2 flex flex-col items-center gap-8 sm:items-start";
  const footerClass = embed
    ? "flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
    : "row-start-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2";

  return (
    <div className={wrapperClass}>
      <main className={mainClass}>
        <BrandLockup />
        <ol className="list-inside list-decimal text-center font-mono text-sm/6 sm:text-left">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="rounded bg-black/[.05] px-1 py-0.5 font-mono font-semibold dark:bg-white/[.06]">
              app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <a
            className="flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded-full border border-solid border-transparent bg-foreground px-4 text-sm font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] sm:h-12 sm:w-auto sm:px-5 sm:text-base"
            href="https://manufact.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ManufactSymbol width={16} height={16} />
            Deploy now
          </a>
          <a
            className="flex h-10 w-full items-center justify-center whitespace-nowrap rounded-full border border-solid border-black/[.08] px-4 text-sm font-medium transition-colors hover:border-transparent hover:bg-[#f2f2f2] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] sm:h-12 sm:w-auto sm:min-w-[158px] sm:px-5 sm:text-base"
            href="https://docs.mcp-use.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className={footerClass}>
        <a
          className="flex items-center gap-2 text-sm hover:underline hover:underline-offset-4"
          href="https://docs.mcp-use.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FileIcon />
          Learn
        </a>
        <a
          className="flex items-center gap-2 text-sm hover:underline hover:underline-offset-4"
          href="https://github.com/mcp-use/next-js-mcp-app-template"
          target="_blank"
          rel="noopener noreferrer"
        >
          <WindowIcon />
          Examples
        </a>
        <a
          className="flex items-center gap-2 text-sm hover:underline hover:underline-offset-4"
          href="https://manufact.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GlobeIcon />
          Go to manufact.com →
        </a>
      </footer>
    </div>
  );
}

export default function Home() {
  return <StarterPage />;
}
