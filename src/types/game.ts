export type StageId =
  | "start"
  | "beach-puzzle"
  | "memory-age-1"
  | "space-puzzle"
  | "memory-age-2"
  | "teddy-puzzle"
  | "memory-age-3"
  | "final-puzzle"
  | "final-puzzle-completed"
  | "birthday-reveal"
  | "daddy-letter";

export type StageType = "start" | "puzzle" | "memory" | "reveal" | "letter";
export type PuzzleId = "beach" | "space" | "teddy" | "final";
export type PieceId = string;
export type MemoryId =
  | "memory-age-1"
  | "memory-age-2"
  | "memory-age-3"
  | "birthday-reveal"
  | "daddy-letter";
export type PuzzleState =
  | "default"
  | "selected"
  | "dragging"
  | "wrong"
  | "correct"
  | "completed";

export type NormalizedRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type DesignedSize = {
  width: number;
  height: number;
};

export type PuzzlePieceDefinition = {
  id: PieceId;
  label: string;
  tileImage: string;
  pieceImage: string;
  targetMask?: string;
  home: NormalizedRect;
  target: NormalizedRect;
  designedSize: DesignedSize;
  calibrationNote?: string;
};

export type PuzzleDefinition = {
  id: PuzzleId;
  name: string;
  boardEmpty: string;
  boardCompleted?: string;
  pieces: PuzzlePieceDefinition[];
};

export type MemoryDefinition = {
  id: MemoryId;
  title: string;
  subtitle?: string;
  body: string;
  image?: string;
};

export type StageDefinition = {
  id: StageId;
  type: StageType;
  path: string;
  label: string;
  nextStageId?: StageId;
  previousStageId?: StageId;
  puzzleId?: PuzzleId;
  memoryId?: MemoryId;
  requiresPuzzleCompletion?: PuzzleId;
  requiresMemoryUnlocked?: MemoryId;
  unlocksMemoryId?: MemoryId;
};

export type GameProgress = {
  currentStageId: StageId;
  activePuzzleId?: PuzzleId;
  placedPieceIds: Partial<Record<PuzzleId, PieceId[]>>;
  completedPuzzleIds: PuzzleId[];
  unlockedMemoryIds: MemoryId[];
  soundEnabled: boolean;
  lastUpdatedAt: number;
};

export type PersistedGameState = {
  version: number;
  currentStageId: StageId;
  placedPieceIds: Partial<Record<PuzzleId, PieceId[]>>;
  completedPuzzleIds: PuzzleId[];
  unlockedMemoryIds: MemoryId[];
  soundEnabled: boolean;
  lastUpdatedAt: number;
};

export function normalizeRect(
  x: number,
  y: number,
  width: number,
  height: number,
): NormalizedRect {
  return { x, y, width, height };
}
