"use client";

import Image from "next/image";
import { cn } from "../../lib/cn";

export type PuzzleTrayTileState = "default" | "selected" | "disabled";

export type PuzzleTrayTileProps = {
  pieceId: string;
  tileImage?: string;
  pieceImage?: string;
  label: string;
  state?: PuzzleTrayTileState;
  selected?: boolean;
  disabled?: boolean;
  onSelect?: (pieceId: string) => void;
  className?: string;
};

export function PuzzleTrayTile({
  pieceId,
  tileImage,
  pieceImage,
  label,
  state,
  selected = false,
  disabled = false,
  onSelect,
  className,
}: PuzzleTrayTileProps) {
  const resolvedState =
    state ?? (disabled ? "disabled" : selected ? "selected" : "default");
  const imageSource = tileImage ?? pieceImage ?? "";

  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={selected || resolvedState === "selected"}
      disabled={disabled}
      onClick={() => onSelect?.(pieceId)}
      onKeyDown={(event) => {
        if ((event.key === "Enter" || event.key === " ") && !disabled) {
          event.preventDefault();
          onSelect?.(pieceId);
        }
      }}
      className={cn(
        "group relative flex min-h-[44px] min-w-[44px] items-center justify-center rounded-[var(--radius-lg)] border-[3px] border-transparent bg-white/10 p-2 text-left transition-all duration-150 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-ocean-500)]/40 motion-reduce:transition-none",
        resolvedState === "selected" &&
          "border-[var(--color-ocean-500)] bg-[var(--color-ocean-500)]/12 shadow-[var(--shadow-soft)]",
        resolvedState === "disabled" && "cursor-not-allowed opacity-40",
        className,
      )}
    >
      {imageSource ? (
        <div className="relative h-16 w-16 overflow-hidden rounded-[var(--radius-md)]">
          <Image
            src={imageSource}
            alt={label}
            fill
            sizes="64px"
            className="object-contain"
          />
        </div>
      ) : null}
      <span className="sr-only">{label}</span>
    </button>
  );
}
