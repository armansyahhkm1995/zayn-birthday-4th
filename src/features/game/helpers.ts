import { stageDefinitions } from "../../data/stages";
import type {
  GameProgress,
  MemoryId,
  PersistedGameState,
  PieceId,
  PuzzleDefinition,
  PuzzleId,
  StageId,
} from "../../types/game";

export const PERSISTENCE_VERSION = 1;

export function getNextStage(
  currentStageId: StageId,
  stages = stageDefinitions,
): StageId | undefined {
  const current = stages.find((stage) => stage.id === currentStageId);
  return current?.nextStageId;
}

export function calculatePuzzleProgress(
  placedPieces: PieceId[],
  totalPieces: number,
): number {
  if (totalPieces === 0) {
    return 0;
  }

  return Math.min(1, Math.max(0, placedPieces.length / totalPieces));
}

export function isPuzzleComplete(
  puzzle: PuzzleDefinition,
  placedPieceIds: PieceId[],
): boolean {
  const uniquePlaced = new Set(placedPieceIds);
  const requiredPieces = puzzle.pieces.map((piece) => piece.id);

  return requiredPieces.every((pieceId) => uniquePlaced.has(pieceId));
}

export function placePiece(
  placedPieceIds: PieceId[],
  pieceId: PieceId,
): PieceId[] {
  const next = [...placedPieceIds, pieceId].filter((id) => id !== "");
  return Array.from(new Set(next));
}

export function resetPuzzle(placedPieceIds: PieceId[]): PieceId[] {
  return [...placedPieceIds].filter(Boolean);
}

export function validatePersistedState(
  value: unknown,
): PersistedGameState | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const candidate = value as Partial<PersistedGameState>;

  if (typeof candidate.currentStageId !== "string") {
    return null;
  }

  if (candidate.version !== PERSISTENCE_VERSION) {
    return null;
  }

  return {
    version: PERSISTENCE_VERSION,
    currentStageId: candidate.currentStageId as StageId,
    placedPieceIds: candidate.placedPieceIds ?? {},
    completedPuzzleIds: candidate.completedPuzzleIds ?? [],
    unlockedMemoryIds: candidate.unlockedMemoryIds ?? [],
    soundEnabled: candidate.soundEnabled ?? true,
    lastUpdatedAt: candidate.lastUpdatedAt ?? Date.now(),
  };
}

export function migratePersistedState(value: unknown): PersistedGameState {
  const validState = validatePersistedState(value);

  if (validState) {
    return validState;
  }

  return {
    version: PERSISTENCE_VERSION,
    currentStageId: "start",
    placedPieceIds: {},
    completedPuzzleIds: [],
    unlockedMemoryIds: [],
    soundEnabled: true,
    lastUpdatedAt: Date.now(),
  };
}

export function normalizeProgress(
  progress: Partial<GameProgress> | undefined,
): GameProgress {
  return {
    currentStageId: progress?.currentStageId ?? "start",
    activePuzzleId: progress?.activePuzzleId,
    placedPieceIds: progress?.placedPieceIds ?? {},
    completedPuzzleIds: progress?.completedPuzzleIds ?? [],
    unlockedMemoryIds: progress?.unlockedMemoryIds ?? [],
    soundEnabled: progress?.soundEnabled ?? true,
    lastUpdatedAt: progress?.lastUpdatedAt ?? Date.now(),
  };
}

export function getActivePuzzleIdForStage(
  stageId: StageId,
): PuzzleId | undefined {
  const stage = stageDefinitions.find((item) => item.id === stageId);
  return stage?.puzzleId;
}

export function isMemoryUnlocked(
  memoryId: MemoryId,
  unlockedMemoryIds: MemoryId[],
): boolean {
  return unlockedMemoryIds.includes(memoryId);
}

export function getDefaultPersistedState(): PersistedGameState {
  return {
    version: PERSISTENCE_VERSION,
    currentStageId: "start",
    placedPieceIds: {},
    completedPuzzleIds: [],
    unlockedMemoryIds: [],
    soundEnabled: true,
    lastUpdatedAt: Date.now(),
  };
}
