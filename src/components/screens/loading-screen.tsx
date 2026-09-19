import { ScreenShell } from "./screen-shell";

export type LoadingScreenProps = {
  message?: string;
};

export function LoadingScreen({
  message = "Loading your birthday adventure...",
}: LoadingScreenProps) {
  return (
    <ScreenShell
      withCoralDecoration
      content={
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full rounded-[var(--radius-xl)] border border-white/15 bg-white/10 p-6 text-center backdrop-blur-sm">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-[var(--color-ocean-500)]/40 border-t-[var(--color-yellow)]" />
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-ocean-100)]/80">
              loading
            </p>
            <h2 className="mt-2 text-2xl font-black text-[var(--color-navy)]">
              {message}
            </h2>
          </div>
        </div>
      }
    />
  );
}
