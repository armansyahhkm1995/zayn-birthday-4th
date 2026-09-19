"use client";

import { useMemo, useState } from "react";
import { ScreenShell } from "../../../src/components/screens/screen-shell";
import { Button } from "../../../src/components/ui/button";
import { FeedbackMessage } from "../../../src/components/ui/feedback-message";
import { puzzleDefinitions } from "../../../src/data/puzzles";
import { PuzzleGame } from "../../../src/features/game/puzzle-game";
import { useGameStore } from "../../../src/features/game/store";
import { calculatePuzzleProgress } from "../../../src/features/game/helpers";

const EMPTY_PLACED_PIECES: string[] = [];

const puzzleChoices = [
  { id: "beach", label: "Beach" },
  { id: "space", label: "Space" },
  { id: "teddy", label: "Teddy" },
  { id: "final", label: "Final" },
] as const;

export default function PuzzlePlaygroundPage() {
  const [selectedPuzzleId, setSelectedPuzzleId] =
    useState<(typeof puzzleChoices)[number]["id"]>("beach");
  const [reducedMotion, setReducedMotion] = useState(false);

  const puzzle = useMemo(
    () =>
      puzzleDefinitions.find((entry) => entry.id === selectedPuzzleId) ??
      puzzleDefinitions[0],
    [selectedPuzzleId],
  );

  const placedPieceIds = useGameStore(
    (state) => state.placedPieceIds[puzzle.id] ?? EMPTY_PLACED_PIECES,
  );
  const selectedPieceId = useGameStore((state) => state.selectedPieceId);
  const resetGame = useGameStore((state) => state.resetGame);
  const markPiecePlaced = useGameStore((state) => state.markPiecePlaced);
  const completePuzzle = useGameStore((state) => state.completePuzzle);
  const selectPiece = useGameStore((state) => state.selectPiece);

  const progress = calculatePuzzleProgress(
    placedPieceIds,
    puzzle.pieces.length,
  );

  const handleReset = () => {
    resetGame();
    selectPiece(null);
  };

  const handleComplete = () => {
    for (const piece of puzzle.pieces) {
      if (!placedPieceIds.includes(piece.id)) {
        markPiecePlaced(puzzle.id, piece.id);
      }
    }
    completePuzzle(puzzle.id);
  };

  return (
    <ScreenShell
      withCoralDecoration
      header={
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--color-ocean-100)]/90">
              puzzle playground
            </p>
            <h1 className="mt-2 text-2xl font-black text-[var(--color-navy)]">
              Phase 4 engine
            </h1>
          </div>
        </div>
      }
      content={
        <div className="space-y-4 pb-10">
          <div className="rounded-[var(--radius-xl)] border border-white/15 bg-white/10 p-4">
            <div className="mb-3 flex flex-wrap gap-2">
              {puzzleChoices.map((choice) => (
                <Button
                  key={choice.id}
                  variant={
                    selectedPuzzleId === choice.id ? "primary" : "secondary"
                  }
                  onClick={() => setSelectedPuzzleId(choice.id)}
                >
                  {choice.label}
                </Button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" onClick={handleReset}>
                Reset puzzle
              </Button>
              <Button variant="primary" onClick={handleComplete}>
                Simulate completed
              </Button>
              <Button
                variant="secondary"
                onClick={() => setReducedMotion((current) => !current)}
              >
                {reducedMotion ? "Reduced motion on" : "Reduced motion off"}
              </Button>
            </div>
          </div>

          <div className="rounded-[var(--radius-xl)] border border-white/15 bg-white/10 p-4">
            <PuzzleGame
              key={puzzle.id}
              puzzle={puzzle}
              reducedMotionOverride={reducedMotion}
              className={
                reducedMotion ? "motion-reduce:transition-none" : undefined
              }
            />
          </div>

          <div className="grid gap-3 rounded-[var(--radius-xl)] border border-white/15 bg-white/10 p-4">
            <div className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--color-navy)]/70">
              Debug state
            </div>
            <div className="space-y-2 text-sm text-[var(--color-navy)]/80">
              <p>Selected piece: {selectedPieceId ?? "none"}</p>
              <p>Placed pieces: {placedPieceIds.join(", ") || "none"}</p>
              <p>Progress: {Math.round(progress * 100)}%</p>
            </div>
            <FeedbackMessage
              variant="info"
              message={`Current puzzle: ${puzzle.name}`}
            />
          </div>
        </div>
      }
    />
  );
}
