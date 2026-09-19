import type { ReactNode } from "react";
import { UnderwaterBackground } from "../../../components/underwater-background";
import { cn } from "../../lib/cn";

export type ScreenShellProps = {
  header?: ReactNode;
  content?: ReactNode;
  footer?: ReactNode;
  className?: string;
  withCoralDecoration?: boolean;
};

export function ScreenShell({
  header,
  content,
  footer,
  className,
  withCoralDecoration = false,
}: ScreenShellProps) {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-[var(--color-ocean-900)] text-[var(--color-navy)]">
      <UnderwaterBackground />

      {withCoralDecoration && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-28 opacity-90"
        >
          <div className="absolute bottom-0 left-0 h-20 w-[42%] rounded-t-[44%] border-t-[6px] border-x-[4px] border-[#1a7a97]/60 bg-[#103b55]/45" />
          <div className="absolute bottom-0 right-0 h-20 w-[38%] rounded-t-[48%] border-t-[6px] border-x-[4px] border-[#1a7a97]/60 bg-[#103b55]/45" />
        </div>
      )}

      <div className="relative mx-auto flex min-h-dvh w-full max-w-[430px] flex-col">
        <div
          className={cn(
            "relative z-10 flex flex-1 flex-col px-6 pb-[calc(var(--safe-area-bottom,0px)+24px)] pt-[calc(var(--safe-area-top,0px)+24px)]",
            className,
          )}
        >
          {header && <header className="relative z-10">{header}</header>}
          {content && (
            <main className="relative z-10 flex flex-1 flex-col">
              {content}
            </main>
          )}
          {footer && <footer className="relative z-10">{footer}</footer>}
        </div>
      </div>
    </div>
  );
}
