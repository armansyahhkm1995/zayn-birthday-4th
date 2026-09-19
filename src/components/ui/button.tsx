"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

type ButtonVariant = "primary" | "secondary" | "disabled";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-yellow)] text-[var(--color-navy)] shadow-[var(--shadow-soft)] hover:brightness-95",
  secondary:
    "border border-white/30 bg-white/10 text-[var(--color-navy)] backdrop-blur-sm hover:bg-white/15",
  disabled:
    "cursor-not-allowed bg-[var(--color-disabled)] text-[var(--color-navy)]/60",
};

export function Button({
  variant = "primary",
  fullWidth = true,
  loading = false,
  leftIcon,
  rightIcon,
  children,
  className,
  disabled,
  type = "button",
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading || variant === "disabled";

  return (
    <button
      type={type}
      aria-busy={loading || undefined}
      disabled={isDisabled}
      data-loading={loading ? "true" : undefined}
      className={cn(
        "relative inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full px-5 text-base font-bold tracking-[0.01em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-ocean-500)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent motion-reduce:transition-none",
        fullWidth ? "w-full" : "w-auto max-w-fit",
        variantStyles[variant],
        isDisabled && "pointer-events-none opacity-80",
        className,
      )}
      {...props}
    >
      {loading ? (
        <span
          aria-hidden="true"
          className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent motion-reduce:animate-none"
        />
      ) : (
        leftIcon
      )}

      <span>{children}</span>
      {!loading && rightIcon}
    </button>
  );
}
