import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export type StateBadgeVariant =
  | "default"
  | "drag"
  | "wrong"
  | "correct"
  | "completed";

export type StateBadgeProps = {
  variant?: StateBadgeVariant;
  label?: ReactNode;
  className?: string;
};

const badgeStyles: Record<StateBadgeVariant, string> = {
  default: "border border-white/25 bg-white/10 text-[var(--color-navy)]/80",
  drag: "border border-[var(--color-ocean-500)]/70 bg-[var(--color-ocean-500)]/15 text-[var(--color-navy)]",
  wrong:
    "border border-[var(--color-coral)]/60 bg-[var(--color-coral)]/15 text-[var(--color-navy)]",
  correct:
    "border border-[var(--color-green)]/60 bg-[var(--color-green)]/15 text-[var(--color-navy)]",
  completed:
    "border border-[var(--color-yellow)]/70 bg-[var(--color-yellow)]/20 text-[var(--color-navy)]",
};

export function StateBadge({
  variant = "default",
  label,
  className,
}: StateBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em]",
        badgeStyles[variant],
        className,
      )}
    >
      {label ?? variant}
    </span>
  );
}
