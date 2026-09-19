import { describe, expect, it } from "vitest";
import { puzzleDefinitions } from "../../data/puzzles";
import {
  getNextStage,
  isPuzzleComplete,
  migratePersistedState,
  placePiece,
  validatePersistedState,
} from "./helpers";

describe("game helpers", () => {
  it("advances to the next stage from the beach puzzle", () => {
    expect(getNextStage("beach-puzzle")).toBe("memory-age-1");
  });

  it("marks a puzzle complete when all pieces are placed", () => {
    const puzzle = puzzleDefinitions[0];
    const placedIds = puzzle.pieces.map((piece) => piece.id);

    expect(isPuzzleComplete(puzzle, placedIds)).toBe(true);
  });

  it("deduplicates placed pieces", () => {
    const placed = ["beach-whale", "beach-whale", "beach-octopus"];

    expect(placePiece(placed, "beach-whale")).toEqual([
      "beach-whale",
      "beach-octopus",
    ]);
  });

  it("validates persisted game state and falls back safely when empty", () => {
    expect(validatePersistedState(null)).toBeNull();
    expect(
      migratePersistedState({ currentStageId: "beach-puzzle" }),
    ).toMatchObject({
      currentStageId: "start",
    });
  });
});
