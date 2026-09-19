import type { NormalizedRect } from "../../types/game";

export type PixelRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export function normalizedRectToPixels(
  rect: NormalizedRect,
  boardWidth: number,
  boardHeight: number,
): PixelRect {
  return {
    x: rect.x * boardWidth,
    y: rect.y * boardHeight,
    width: rect.width * boardWidth,
    height: rect.height * boardHeight,
  };
}

export function pixelsToNormalizedRect(
  rect: PixelRect,
  boardWidth: number,
  boardHeight: number,
): NormalizedRect {
  if (boardWidth === 0 || boardHeight === 0) {
    return { x: 0, y: 0, width: 0, height: 0 };
  }

  return {
    x: rect.x / boardWidth,
    y: rect.y / boardHeight,
    width: rect.width / boardWidth,
    height: rect.height / boardHeight,
  };
}

export function getBoardPointFromPointer(
  pointerX: number,
  pointerY: number,
  boardRect: Pick<DOMRect, "left" | "top" | "width" | "height">,
): { x: number; y: number } {
  const x =
    boardRect.width === 0 ? 0 : (pointerX - boardRect.left) / boardRect.width;
  const y =
    boardRect.height === 0 ? 0 : (pointerY - boardRect.top) / boardRect.height;

  return { x: Number.isFinite(x) ? x : 0, y: Number.isFinite(y) ? y : 0 };
}

export function clampPieceToBoard(
  rect: PixelRect,
  boardWidth: number,
  boardHeight: number,
): PixelRect {
  const maxX = Math.max(0, boardWidth - rect.width);
  const maxY = Math.max(0, boardHeight - rect.height);

  return {
    x: Math.min(Math.max(rect.x, 0), maxX),
    y: Math.min(Math.max(rect.y, 0), maxY),
    width: rect.width,
    height: rect.height,
  };
}

export function getRectCenter(rect: PixelRect): { x: number; y: number } {
  return {
    x: rect.x + rect.width / 2,
    y: rect.y + rect.height / 2,
  };
}

export function calculateOverlapRatio(
  pieceRect: PixelRect,
  targetRect: PixelRect,
): number {
  const overlapLeft = Math.max(pieceRect.x, targetRect.x);
  const overlapTop = Math.max(pieceRect.y, targetRect.y);
  const overlapRight = Math.min(
    pieceRect.x + pieceRect.width,
    targetRect.x + targetRect.width,
  );
  const overlapBottom = Math.min(
    pieceRect.y + pieceRect.height,
    targetRect.y + targetRect.height,
  );

  if (overlapRight <= overlapLeft || overlapBottom <= overlapTop) {
    return 0;
  }

  const overlapArea =
    (overlapRight - overlapLeft) * (overlapBottom - overlapTop);
  const targetArea = targetRect.width * targetRect.height;
  const safeTargetArea = Math.max(targetArea, 1);

  return overlapArea / safeTargetArea;
}

export function calculateCenterDistance(
  pieceRect: PixelRect,
  targetRect: PixelRect,
): number {
  const pieceCenter = getRectCenter(pieceRect);
  const targetCenter = getRectCenter(targetRect);

  return Math.hypot(
    pieceCenter.x - targetCenter.x,
    pieceCenter.y - targetCenter.y,
  );
}

export function isInsideSnapTolerance(
  pieceRect: PixelRect,
  targetRect: PixelRect,
  tolerancePx = 24,
): boolean {
  const overlapRatio = calculateOverlapRatio(pieceRect, targetRect);
  const centerDistance = calculateCenterDistance(pieceRect, targetRect);

  return overlapRatio >= 0.5 || centerDistance <= tolerancePx;
}
