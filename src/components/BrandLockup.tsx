import { NextLogo } from "@/components/logos/NextLogo";
import { McpUseWordmark } from "@/components/logos/McpUseWordmark";

export function BrandLockup({ className }: { className?: string }) {
  return (
    <div className={"flex items-center gap-3" + (className ? " " + className : "")}>
      <NextLogo className="text-black dark:text-white" width={80} height={16} />
      <span
        className="block h-6 w-px bg-zinc-300 dark:bg-zinc-700"
        aria-hidden="true"
      />
      <McpUseWordmark className="text-black dark:text-white" />
    </div>
  );
}
