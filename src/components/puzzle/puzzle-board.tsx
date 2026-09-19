import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export type PuzzleBoardProps = {
  emptyBoardImage: string;
  completedBoardImage?: string;
  completed?: boolean;
  children?: ReactNode;
  aspectRatio?: number;
  accessibleLabel: string;
  className?: string;
};

export function PuzzleBoard({
  emptyBoardImage,
  completedBoardImage,
  completed = false,
  children,
  aspectRatio = 0.78,
  accessibleLabel,
  className,
}: PuzzleBoardProps) {
  const boardImage =
    completed && completedBoardImage ? completedBoardImage : emptyBoardImage;

  return (
    <div
      aria-label={accessibleLabel}
      role="img"
      className={cn(
        "relative w-full overflow-hidden rounded-[var(--radius-xl)] border border-white/15 bg-white/5",
        className,
      )}
      style={{ aspectRatio }}
    >
      <div className="absolute inset-0">
        <Image
          src={boardImage}
          alt=""
          aria-hidden="true"
          fill
          sizes="(max-width: 430px) 100vw, 430px"
          className="object-contain"
          priority={false}
        />
      </div>

      <div className="absolute inset-0">{children}</div>
    </div>
  );
}
