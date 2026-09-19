import Image from "next/image";
import type { CSSProperties, HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export type PuzzlePieceState =
  | "default"
  | "dragging"
  | "wrong"
  | "correct"
  | "locked";

export type PuzzlePieceProps = HTMLAttributes<HTMLDivElement> & {
  pieceId: string;
  image: string;
  alt: string;
  state?: PuzzlePieceState;
  disabled?: boolean;
  style?: CSSProperties;
};

const stateStyles: Record<PuzzlePieceState, string> = {
  default: "border-transparent",
  dragging:
    "border-[var(--color-ocean-500)]/70 shadow-[0_12px_22px_rgba(13,43,69,0.18)] scale-[1.05]",
  wrong:
    "border-[var(--color-coral)]/70 animate-[shake_0.25s_ease-in-out_infinite]",
  correct: "border-[var(--color-green)]/70",
  locked: "border-[var(--color-yellow)]/70 pointer-events-none opacity-100",
};

export function PuzzlePiece({
  pieceId,
  image,
  alt,
  state = "default",
  disabled = false,
  className,
  style,
  ...props
}: PuzzlePieceProps) {
  const isLocked = state === "locked" || disabled;

  return (
    <div
      data-piece-id={pieceId}
      data-state={state}
      className={cn(
        "relative overflow-hidden rounded-[var(--radius-md)] border-[3px] border-transparent bg-transparent transition-all duration-180 ease-out motion-reduce:transition-none",
        stateStyles[state],
        isLocked && "pointer-events-none",
        className,
      )}
      style={{
        ...style,
      }}
      {...props}
    >
      <Image
        src={image}
        alt={alt}
        fill
        sizes="120px"
        className={cn(
          "object-contain select-none",
          state === "dragging" &&
            "drop-shadow-[0_10px_18px_rgba(13,43,69,0.2)]",
          state === "wrong" && "opacity-90",
          isLocked && "opacity-100",
        )}
      />
    </div>
  );
}
