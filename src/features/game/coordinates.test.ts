import { describe, expect, it } from "vitest";
import {
  calculateCenterDistance,
  calculateOverlapRatio,
  clampPieceToBoard,
  getBoardPointFromPointer,
  getRectCenter,
  isInsideSnapTolerance,
  normalizedRectToPixels,
  pixelsToNormalizedRect,
} from "./coordinates";
import { evaluatePlacement } from "./puzzle-game";

describe("coordinate utilities", () => {
  it("converts normalized rectangles to pixels and back", () => {
    const rect = { x: 0.25, y: 0.2, width: 0.4, height: 0.3 };
    const pixels = normalizedRectToPixels(rect, 100, 200);

    expect(pixels).toEqual({ x: 25, y: 40, width: 40, height: 60 });
    expect(pixelsToNormalizedRect(pixels, 100, 200)).toEqual(rect);
  });

  it("converts pointer coordinates relative to the board origin", () => {
    const boardRect = { left: 20, top: 40, width: 200, height: 400 } as DOMRect;

    expect(getBoardPointFromPointer(70, 180, boardRect)).toEqual({
      x: 0.25,
      y: 0.35,
    });
  });

  it("clamps a piece inside the board bounds", () => {
    const rect = { x: 1200, y: -20, width: 40, height: 40 };

    expect(clampPieceToBoard(rect, 300, 200)).toEqual({
      x: 260,
      y: 0,
      width: 40,
      height: 40,
    });
  });

  it("calculates a rectangle center accurately", () => {
    expect(getRectCenter({ x: 20, y: 30, width: 40, height: 60 })).toEqual({
      x: 40,
      y: 60,
    });
  });

  it("calculates overlap ratio between two rects", () => {
    const first = { x: 0, y: 0, width: 100, height: 100 };
    const second = { x: 50, y: 0, width: 100, height: 100 };

    expect(calculateOverlapRatio(first, second)).toBeCloseTo(0.5, 3);
  });

  it("calculates center distance exactly", () => {
    const first = { x: 0, y: 0, width: 40, height: 40 };
    const second = { x: 60, y: 0, width: 40, height: 40 };

    expect(calculateCenterDistance(first, second)).toBe(60);
  });

  it("recognizes a valid snap using overlap or center tolerance", () => {
    const piece = { x: 45, y: 30, width: 50, height: 50 };
    const target = { x: 60, y: 30, width: 50, height: 50 };

    expect(isInsideSnapTolerance(piece, target, 24)).toBe(true);
  });

  it("matches a piece to its target and reports placement quality", () => {
    const piece = { x: 0, y: 0, width: 100, height: 100 };
    const target = { x: 0, y: 0, width: 100, height: 100 };

    expect(
      evaluatePlacement("piece-1", "piece-1", piece, target),
    ).toMatchObject({
      matchedTarget: true,
      correct: true,
    });
  });
});
