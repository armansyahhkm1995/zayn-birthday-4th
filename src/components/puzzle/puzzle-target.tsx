import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "../../lib/cn";
import type { NormalizedRect } from "../../types/puzzle";

export type PuzzleTargetState = "default" | "highlighted" | "wrong" | "filled";

export type PuzzleTargetProps = {
  targetId: string;
  maskImage?: string;
  state?: PuzzleTargetState;
  label: string;
  normalizedRect?: NormalizedRect;
  className?: string;
  children?: ReactNode;
};

const stateStyles: Record<PuzzleTargetState, string> = {
  default: "border border-dashed border-white/25 bg-white/5",
  highlighted:
    "border-[3px] border-[var(--color-ocean-500)] bg-[var(--color-ocean-500)]/12 shadow-[0_0_0_3px_rgba(46,156,244,0.18)]",
  wrong: "border-[3px] border-[var(--color-coral)] bg-[var(--color-coral)]/10",
  filled: "border-[3px] border-[var(--color-green)] bg-[var(--color-green)]/10",
};

export function PuzzleTarget({
  targetId,
  maskImage,
  state = "default",
  label,
  normalizedRect,
  className,
  children,
}: PuzzleTargetProps) {
  const style = normalizedRect
    ? {
        left: `${normalizedRect.x * 100}%`,
        top: `${normalizedRect.y * 100}%`,
        width: `${normalizedRect.width * 100}%`,
        height: `${normalizedRect.height * 100}%`,
      }
    : undefined;

  return (
    <div
      style={style}
      data-target-id={targetId}
      data-state={state}
      className={cn(
        "absolute flex min-h-[44px] min-w-[44px] items-center justify-center overflow-hidden rounded-[var(--radius-md)]",
        stateStyles[state],
        className,
      )}
      aria-label={label}
      role="button"
      tabIndex={state === "filled" ? -1 : 0}
    >
      {maskImage ? (
        <div className="relative h-full w-full">
          <Image
            src={maskImage}
            alt={label}
            fill
            sizes="120px"
            className="object-contain"
          />
        </div>
      ) : null}

      {children}
    </div>
  );
}
