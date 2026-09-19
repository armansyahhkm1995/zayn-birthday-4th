import { stageDefinitions } from "../../data/stages";
import type { GameProgress, PuzzleId, StageId } from "../../types/game";
import { getNextStage } from "./helpers";

export function selectCurrentStage(state: { currentStageId: StageId }) {
  return (
    stageDefinitions.find((stage) => stage.id === state.currentStageId) ??
    stageDefinitions[0]
  );
}

export function selectCurrentPuzzle(
  state: Pick<GameProgress, "currentStageId" | "activePuzzleId">,
) {
  return state.activePuzzleId;
}

export function selectPuzzleProgress(state: GameProgress, puzzleId: PuzzleId) {
  const placed = state.placedPieceIds[puzzleId] ?? [];
  const totalPieces = state.placedPieceIds[puzzleId]?.length ?? 0;
  return {
    placed,
    totalPieces,
    completed: state.completedPuzzleIds.includes(puzzleId),
  };
}

export function selectIsPuzzleCompleted(
  state: GameProgress,
  puzzleId: PuzzleId,
) {
  return state.completedPuzzleIds.includes(puzzleId);
}

export function selectNextStage(state: { currentStageId: StageId }) {
  return getNextStage(state.currentStageId);
}

export function selectCanResume(state: Pick<GameProgress, "currentStageId">) {
  return state.currentStageId !== "start";
}

export function selectUnlockedMemories(
  state: Pick<GameProgress, "unlockedMemoryIds">,
) {
  return state.unlockedMemoryIds;
}
