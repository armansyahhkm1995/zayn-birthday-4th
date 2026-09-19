import { Button } from "../ui/button";
import { ScreenShell } from "./screen-shell";

export type ErrorScreenProps = {
  title?: string;
  message?: string;
  onRetry?: () => void;
  onBack?: () => void;
};

export function ErrorScreen({
  title = "Something went wrong",
  message = "The adventure hit a small hiccup. You can retry or go back to the last safe stage.",
  onRetry,
  onBack,
}: ErrorScreenProps) {
  return (
    <ScreenShell
      withCoralDecoration
      content={
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full rounded-[var(--radius-xl)] border border-[var(--color-coral)]/40 bg-white/10 p-6 text-center backdrop-blur-sm">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--color-navy)]/70">
              Oops
            </p>
            <h2 className="mt-2 text-2xl font-black text-[var(--color-navy)]">
              {title}
            </h2>
            <p className="mt-3 text-sm leading-6 text-[var(--color-navy)]/75">
              {message}
            </p>

            <div className="mt-5 flex flex-col gap-3">
              {onRetry ? (
                <Button variant="primary" onClick={onRetry}>
                  Try again
                </Button>
              ) : null}
              {onBack ? (
                <Button variant="secondary" onClick={onBack}>
                  Go back
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      }
    />
  );
}
