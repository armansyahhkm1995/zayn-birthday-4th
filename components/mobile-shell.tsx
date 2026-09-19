import type { ReactNode } from "react";
import { UnderwaterBackground } from "./underwater-background";

type MobileAppShellProps = {
  children: ReactNode;
  className?: string;
};

type LayoutProps = {
  children: ReactNode;
  className?: string;
};

export function PageContainer({ children, className = "" }: LayoutProps) {
  return (
    <div
      className={[
        "relative mx-auto flex min-h-dvh w-full max-w-[430px] flex-col",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

export function ScreenShell({ children, className = "" }: LayoutProps) {
  return (
    <div
      className={[
        "relative z-10 flex flex-1 flex-col px-6 pb-[calc(var(--safe-area-bottom,0px)+24px)] pt-[calc(var(--safe-area-top,0px)+24px)",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

export function MobileAppShell({
  children,
  className = "",
}: MobileAppShellProps) {
  return (
    <div
      className={[
        "relative min-h-dvh overflow-hidden bg-[var(--color-ocean-900)] text-[var(--color-navy)]",
        className,
      ].join(" ")}
    >
      <UnderwaterBackground />

      <PageContainer>
        <ScreenShell>
          <header className="relative z-10 mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-ocean-100)]/90">
              Birthday adventure
            </p>
            <h1 className="mt-3 text-3xl font-black leading-none text-[var(--color-navy)]">
              Zayn Birthday 4th
            </h1>
          </header>

          <div className="relative z-10 flex flex-1 flex-col">{children}</div>
        </ScreenShell>
      </PageContainer>
    </div>
  );
}
