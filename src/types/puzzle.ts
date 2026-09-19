export type NormalizedRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type PuzzlePieceDefinition = {
  id: string;
  tileImage: string;
  pieceImage: string;
  targetMask?: string;
  home: NormalizedRect;
  target: NormalizedRect;
};

export type PuzzleDefinition = {
  id: string;
  boardEmpty: string;
  boardCompleted?: string;
  pieces: PuzzlePieceDefinition[];
};

export function normalizeRect(
  x: number,
  y: number,
  width: number,
  height: number,
): NormalizedRect {
  return { x, y, width, height };
}
