"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { PuzzleBoard } from "../../components/puzzle/puzzle-board";
import { PuzzlePiece } from "../../components/puzzle/puzzle-piece";
import { PuzzleTarget } from "../../components/puzzle/puzzle-target";
import { PuzzleTrayTile } from "../../components/puzzle/puzzle-tray-tile";
import { FeedbackMessage } from "../../components/ui/feedback-message";
import { StateBadge } from "../../components/ui/state-badge";
import { cn } from "../../lib/cn";
import type {
  NormalizedRect,
  PieceId,
  PuzzleDefinition,
  PuzzleId,
} from "../../types/game";
import {
  calculatePuzzleProgress,
  isPuzzleComplete,
  placePiece,
} from "./helpers";
import {
  calculateCenterDistance,
  calculateOverlapRatio,
  clampPieceToBoard,
  getBoardPointFromPointer,
  isInsideSnapTolerance,
  normalizedRectToPixels,
  pixelsToNormalizedRect,
  type PixelRect,
} from "./coordinates";
import { useBoardRect } from "./use-board-rect";
import { useGameStore } from "./store";

export type PuzzleGameProps = {
  puzzle: PuzzleDefinition;
  onComplete?: (puzzleId: PuzzleId) => void;
  className?: string;
  reducedMotionOverride?: boolean;
};

export type PlacementEvaluation = {
  correct: boolean;
  matchedTarget: boolean;
  overlapRatio: number;
  centerDistance: number;
};

const EMPTY_PLACED_PIECES: PieceId[] = [];

export function evaluatePlacement(
  pieceId: PieceId,
  targetId: PieceId,
  pieceRect: PixelRect,
  targetRect: PixelRect,
  tolerancePx = 24,
): PlacementEvaluation {
  const matchedTarget = pieceId === targetId;
  const overlapRatio = calculateOverlapRatio(pieceRect, targetRect);
  const centerDistance = calculateCenterDistance(pieceRect, targetRect);

  return {
    matchedTarget,
    correct:
      matchedTarget &&
      isInsideSnapTolerance(pieceRect, targetRect, tolerancePx),
    overlapRatio,
    centerDistance,
  };
}

type FeedbackState = {
  variant: "info" | "success" | "error";
  message: string;
};

const defaultFeedback: FeedbackState = {
  variant: "info",
  message: "Tap a puzzle piece, then choose its matching space.",
};

export function PuzzleGame({
  puzzle,
  onComplete,
  className,
  reducedMotionOverride = false,
}: PuzzleGameProps) {
  const boardRef = useRef<HTMLDivElement | null>(null);
  const boardRect = useBoardRect(boardRef);
  const shouldReduceMotion = useReducedMotion() || reducedMotionOverride;

  const placedIds = useGameStore(
    (state) => state.placedPieceIds[puzzle.id] ?? EMPTY_PLACED_PIECES,
  );
  const completedIds = useGameStore((state) => state.completedPuzzleIds);
  const selectedPieceId = useGameStore((state) => state.selectedPieceId);
  const markPiecePlaced = useGameStore((state) => state.markPiecePlaced);
  const completePuzzle = useGameStore((state) => state.completePuzzle);
  const selectPiece = useGameStore((state) => state.selectPiece);

  const pieceMap = useMemo(
    () => Object.fromEntries(puzzle.pieces.map((piece) => [piece.id, piece])),
    [puzzle],
  );

  const [piecePositions, setPiecePositions] = useState<
    Record<string, NormalizedRect>
  >(() =>
    Object.fromEntries(puzzle.pieces.map((piece) => [piece.id, piece.home])),
  );
  const [draggingPieceId, setDraggingPieceId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [flashState, setFlashState] = useState<
    Record<string, "wrong" | "correct" | null>
  >({});
  const [feedback, setFeedback] = useState<FeedbackState>(defaultFeedback);

  const puzzleComplete = completedIds.includes(puzzle.id);
  const placedSet = new Set(placedIds);
  const progress = calculatePuzzleProgress(placedIds, puzzle.pieces.length);

  const applyCorrectPlacement = (pieceId: string) => {
    const piece = pieceMap[pieceId];
    if (!piece) {
      return;
    }

    const nextPlaced = placePiece(placedIds, pieceId);
    const isComplete = isPuzzleComplete(puzzle, nextPlaced);

    setPiecePositions((current) => ({
      ...current,
      [pieceId]: piece.target,
    }));
    setFlashState((current) => ({
      ...current,
      [pieceId]: "correct",
    }));
    setFeedback({
      variant: "success",
      message: `${piece.label} snapped into place!`,
    });
    markPiecePlaced(puzzle.id, pieceId);
    selectPiece(null);

    if (isComplete) {
      completePuzzle(puzzle.id);
      setFeedback({
        variant: "success",
        message: `${puzzle.name} complete!`,
      });
      onComplete?.(puzzle.id);
    }
  };

  const resetPieceToHome = (pieceId: string) => {
    const piece = pieceMap[pieceId];
    if (!piece) {
      return;
    }

    setPiecePositions((current) => ({
      ...current,
      [pieceId]: piece.home,
    }));
    setFlashState((current) => ({
      ...current,
      [pieceId]: "wrong",
    }));
    setFeedback({
      variant: "error",
      message: "Not quite yet. Try a different spot.",
    });
    window.setTimeout(
      () => {
        setFlashState((current) => ({
          ...current,
          [pieceId]: null,
        }));
        setPiecePositions((current) => ({
          ...current,
          [pieceId]: piece.home,
        }));
        setDraggingPieceId(null);
      },
      shouldReduceMotion ? 10 : 220,
    );
  };

  const handleTileSelect = (pieceId: string) => {
    if (placedSet.has(pieceId)) {
      return;
    }

    if (selectedPieceId === pieceId) {
      selectPiece(null);
      setFeedback({
        variant: "info",
        message: "Selection cleared. Pick another piece.",
      });
      return;
    }

    selectPiece(pieceId);
    setFeedback({
      variant: "info",
      message: `${pieceMap[pieceId]?.label ?? "Piece"} selected. Tap the matching target.`,
    });
  };

  const handleTargetTap = (targetId: string) => {
    const selectedId = selectedPieceId;
    if (!selectedId) {
      setFeedback({
        variant: "info",
        message: "Choose a tray piece before placing it.",
      });
      return;
    }

    const targetPiece = pieceMap[targetId];
    const activePiece = pieceMap[selectedId];

    if (!targetPiece || !activePiece) {
      return;
    }

    const currentPieceRect = normalizedRectToPixels(
      piecePositions[selectedId] ?? activePiece.home,
      boardRect.width,
      boardRect.height,
    );
    const targetRect = normalizedRectToPixels(
      targetPiece.target,
      boardRect.width,
      boardRect.height,
    );
    const result = evaluatePlacement(
      selectedId,
      targetId,
      currentPieceRect,
      targetRect,
      24,
    );

    if (result.correct) {
      applyCorrectPlacement(selectedId);
      return;
    }

    setFeedback({
      variant: "error",
      message: "That target does not match this piece.",
    });
  };

  const handlePointerDown = (
    pieceId: string,
    event: ReactPointerEvent<HTMLDivElement>,
  ) => {
    if (placedSet.has(pieceId)) {
      return;
    }

    const currentPosition = piecePositions[pieceId] ?? pieceMap[pieceId]?.home;
    if (!currentPosition || !boardRef.current) {
      return;
    }

    event.currentTarget.setPointerCapture(event.pointerId);
    const boardPoint = getBoardPointFromPointer(
      event.clientX,
      event.clientY,
      boardRect,
    );
    const nextOffset = {
      x: boardPoint.x - currentPosition.x,
      y: boardPoint.y - currentPosition.y,
    };

    setDraggingPieceId(pieceId);
    setDragOffset(nextOffset);
    selectPiece(pieceId);
    setFeedback({
      variant: "info",
      message: `${pieceMap[pieceId]?.label ?? "Piece"} is being dragged.`,
    });
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingPieceId) {
      return;
    }

    const piece = pieceMap[draggingPieceId];
    if (!piece || !boardRef.current) {
      return;
    }

    const boardPoint = getBoardPointFromPointer(
      event.clientX,
      event.clientY,
      boardRect,
    );

    const nextX = clampPieceToBoard(
      {
        x: (boardPoint.x - dragOffset.x) * boardRect.width,
        y: (boardPoint.y - dragOffset.y) * boardRect.height,
        width: piece.home.width * boardRect.width,
        height: piece.home.height * boardRect.height,
      },
      boardRect.width,
      boardRect.height,
    );

    const nextNormalized = pixelsToNormalizedRect(
      nextX,
      boardRect.width,
      boardRect.height,
    );
    setPiecePositions((current) => ({
      ...current,
      [draggingPieceId]: nextNormalized,
    }));
  };

  const handlePointerUp = (pieceId: string) => {
    if (draggingPieceId !== pieceId) {
      return;
    }

    const piece = pieceMap[pieceId];
    if (!piece) {
      return;
    }

    const nextPosition = piecePositions[pieceId] ?? piece.home;
    const currentRect = normalizedRectToPixels(
      nextPosition,
      boardRect.width,
      boardRect.height,
    );
    const targetRect = normalizedRectToPixels(
      piece.target,
      boardRect.width,
      boardRect.height,
    );
    const result = evaluatePlacement(
      pieceId,
      pieceId,
      currentRect,
      targetRect,
      24,
    );

    if (result.correct) {
      applyCorrectPlacement(pieceId);
    } else {
      resetPieceToHome(pieceId);
    }

    setDraggingPieceId(null);
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between gap-2">
        <StateBadge
          variant={puzzleComplete ? "completed" : "drag"}
          label={puzzleComplete ? "Completed" : "In progress"}
        />
        <span className="text-sm font-bold text-[var(--color-navy)]/80">
          {Math.round(progress * 100)}%
        </span>
      </div>

      <div ref={boardRef} className="relative">
        <PuzzleBoard
          emptyBoardImage={puzzle.boardEmpty}
          completedBoardImage={puzzle.boardCompleted}
          completed={puzzleComplete}
          accessibleLabel={`${puzzle.name} board`}
          className="relative"
        >
          {puzzle.pieces.map((piece) => {
            const isPlaced = placedSet.has(piece.id);
            const piecePosition = piecePositions[piece.id] ?? piece.home;
            const placementSignal = flashState[piece.id];
            const pieceState = isPlaced
              ? "locked"
              : placementSignal === "wrong"
                ? "wrong"
                : placementSignal === "correct"
                  ? "correct"
                  : draggingPieceId === piece.id
                    ? "dragging"
                    : "default";

            return (
              <motion.div
                key={piece.id}
                className="absolute"
                initial={false}
                animate={{
                  left: `${piecePosition.x * 100}%`,
                  top: `${piecePosition.y * 100}%`,
                  width: `${piecePosition.width * 100}%`,
                  height: `${piecePosition.height * 100}%`,
                  scale:
                    draggingPieceId === piece.id
                      ? shouldReduceMotion
                        ? 1
                        : 1.04
                      : 1,
                  zIndex:
                    draggingPieceId === piece.id ? 30 : isPlaced ? 12 : 10,
                }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0.01 }
                    : { type: "spring", stiffness: 420, damping: 30 }
                }
                style={{
                  position: "absolute",
                  cursor: isPlaced ? "default" : "grab",
                }}
                whileDrag={shouldReduceMotion ? undefined : { scale: 1.06 }}
                onPointerDown={(event) => handlePointerDown(piece.id, event)}
                onPointerMove={handlePointerMove}
                onPointerUp={() => handlePointerUp(piece.id)}
                onPointerLeave={() => {
                  if (draggingPieceId === piece.id) {
                    handlePointerUp(piece.id);
                  }
                }}
              >
                <PuzzlePiece
                  pieceId={piece.id}
                  image={piece.pieceImage}
                  alt={`${piece.label} puzzle piece`}
                  state={pieceState}
                  disabled={isPlaced}
                  className="h-full w-full"
                  style={{
                    width: "100%",
                    height: "100%",
                    pointerEvents: isPlaced ? "none" : "auto",
                  }}
                />
              </motion.div>
            );
          })}

          {puzzle.pieces.map((piece) => {
            const isPlaced = placedSet.has(piece.id);
            const isHighlighted = selectedPieceId === piece.id && !isPlaced;
            return (
              <div
                key={`${piece.id}-target`}
                className="absolute inset-0"
                onClick={() => handleTargetTap(piece.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    handleTargetTap(piece.id);
                  }
                }}
              >
                <PuzzleTarget
                  targetId={piece.id}
                  maskImage={piece.targetMask}
                  label={`${piece.label} target`}
                  normalizedRect={piece.target}
                  state={
                    isPlaced
                      ? "filled"
                      : isHighlighted
                        ? "highlighted"
                        : "default"
                  }
                />
              </div>
            );
          })}
        </PuzzleBoard>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {puzzle.pieces.map((piece) => {
          const isPlaced = placedSet.has(piece.id);
          const isSelected = selectedPieceId === piece.id;
          return (
            <PuzzleTrayTile
              key={piece.id}
              pieceId={piece.id}
              tileImage={piece.tileImage}
              label={`${piece.label} tray tile`}
              selected={isSelected}
              disabled={isPlaced}
              onSelect={handleTileSelect}
            />
          );
        })}
      </div>

      <FeedbackMessage
        variant={feedback.variant}
        message={feedback.message}
        className="min-h-[48px]"
      />

      {puzzleComplete ? (
        <div className="rounded-[var(--radius-xl)] border border-[var(--color-yellow)]/50 bg-[var(--color-yellow)]/10 p-3 text-sm font-bold text-[var(--color-navy)]">
          Puzzle completed. Great job!
        </div>
      ) : null}
    </div>
  );
}
