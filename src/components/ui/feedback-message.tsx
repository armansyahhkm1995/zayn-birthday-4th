import { cn } from "../../lib/cn";

export type FeedbackMessageVariant = "info" | "success" | "error";

export type FeedbackMessageProps = {
  variant?: FeedbackMessageVariant;
  message: string;
  className?: string;
};

const variantStyles: Record<FeedbackMessageVariant, string> = {
  info: "border border-[var(--color-ocean-500)]/30 bg-[var(--color-ocean-500)]/10 text-[var(--color-navy)]",
  success:
    "border border-[var(--color-green)]/40 bg-[var(--color-green)]/10 text-[var(--color-navy)]",
  error:
    "border border-[var(--color-coral)]/40 bg-[var(--color-coral)]/10 text-[var(--color-navy)]",
};

export function FeedbackMessage({
  variant = "info",
  message,
  className,
}: FeedbackMessageProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "rounded-[var(--radius-lg)] px-4 py-3 text-sm font-medium leading-6",
        variantStyles[variant],
        className,
      )}
    >
      {message}
    </div>
  );
}
