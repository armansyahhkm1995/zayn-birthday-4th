import {
  normalizeRect,
  type PuzzleDefinition,
  type PuzzlePieceDefinition,
} from "../types/puzzle";

const beachPieces: PuzzlePieceDefinition[] = [
  {
    id: "beach-whale",
    tileImage: "/assets/puzzles/beach/beach-piece-whale.png",
    pieceImage: "/assets/puzzles/beach/beach-piece-whale.png",
    home: normalizeRect(0.72, 0.74, 0.2, 0.18),
    target: normalizeRect(0.15, 0.16, 0.24, 0.22),
  },
  {
    id: "beach-octopus",
    tileImage: "/assets/puzzles/beach/beach-piece-octopus.png",
    pieceImage: "/assets/puzzles/beach/beach-piece-octopus.png",
    home: normalizeRect(0.12, 0.76, 0.18, 0.17),
    target: normalizeRect(0.44, 0.2, 0.2, 0.24),
  },
  {
    id: "beach-seaweed",
    tileImage: "/assets/puzzles/beach/beach-piece-seaweed.png",
    pieceImage: "/assets/puzzles/beach/beach-piece-seaweed.png",
    home: normalizeRect(0.5, 0.78, 0.18, 0.16),
    target: normalizeRect(0.32, 0.52, 0.22, 0.2),
  },
];

const spacePieces: PuzzlePieceDefinition[] = [
  {
    id: "space-dad-whale",
    tileImage: "/assets/puzzles/space/space-piece-dad-whale.png",
    pieceImage: "/assets/puzzles/space/space-piece-dad-whale-illustration.png",
    targetMask: "/assets/puzzles/space/space-piece-dad-whale-empty.png",
    home: normalizeRect(0.12, 0.8, 0.22, 0.18),
    target: normalizeRect(0.18, 0.2, 0.24, 0.22),
  },
  {
    id: "space-mom-whale",
    tileImage: "/assets/puzzles/space/space-piece-mom-whale.png",
    pieceImage: "/assets/puzzles/space/space-piece-mom-whale-illustration.png",
    targetMask: "/assets/puzzles/space/space-piece-mom-whale-empty.png",
    home: normalizeRect(0.42, 0.8, 0.22, 0.18),
    target: normalizeRect(0.48, 0.22, 0.22, 0.22),
  },
  {
    id: "space-son-whale",
    tileImage: "/assets/puzzles/space/space-piece-son-whale.png",
    pieceImage: "/assets/puzzles/space/space-piece-son-whale-illustration.png",
    targetMask: "/assets/puzzles/space/space-piece-son-whale-empty.png",
    home: normalizeRect(0.7, 0.8, 0.22, 0.18),
    target: normalizeRect(0.68, 0.46, 0.24, 0.2),
  },
];

const teddyPieces: PuzzlePieceDefinition[] = [
  {
    id: "teddy-cheering",
    tileImage: "/assets/puzzles/teddy/teddy-piece-cheering.png",
    pieceImage: "/assets/puzzles/teddy/teddy-piece-cheering.png",
    home: normalizeRect(0.14, 0.76, 0.22, 0.18),
    target: normalizeRect(0.18, 0.18, 0.26, 0.24),
  },
  {
    id: "teddy-sitting",
    tileImage: "/assets/puzzles/teddy/teddy-piece-sitting.png",
    pieceImage: "/assets/puzzles/teddy/teddy-piece-sitting.png",
    home: normalizeRect(0.46, 0.78, 0.22, 0.18),
    target: normalizeRect(0.46, 0.18, 0.26, 0.24),
  },
  {
    id: "teddy-waving",
    tileImage: "/assets/puzzles/teddy/teddy-piece-waving.png",
    pieceImage: "/assets/puzzles/teddy/teddy-piece-waving.png",
    home: normalizeRect(0.76, 0.76, 0.22, 0.18),
    target: normalizeRect(0.68, 0.52, 0.22, 0.2),
  },
];

const finalPieces: PuzzlePieceDefinition[] = [
  {
    id: "final-01",
    tileImage: "/assets/puzzles/zayn/final-piece-01.png",
    pieceImage: "/assets/puzzles/zayn/final-piece-01-illustration.png",
    targetMask: "/assets/puzzles/zayn/final-piece-01-empty.png",
    home: normalizeRect(0.08, 0.78, 0.2, 0.18),
    target: normalizeRect(0.1, 0.16, 0.22, 0.2),
  },
  {
    id: "final-02",
    tileImage: "/assets/puzzles/zayn/final-piece-02.png",
    pieceImage: "/assets/puzzles/zayn/final-piece-02-illustration.png",
    targetMask: "/assets/puzzles/zayn/final-piece-02-empty.png",
    home: normalizeRect(0.3, 0.78, 0.2, 0.18),
    target: normalizeRect(0.34, 0.16, 0.22, 0.2),
  },
  {
    id: "final-03",
    tileImage: "/assets/puzzles/zayn/final-piece-03.png",
    pieceImage: "/assets/puzzles/zayn/final-piece-03-illustration.png",
    targetMask: "/assets/puzzles/zayn/final-piece-03-empty.png",
    home: normalizeRect(0.52, 0.78, 0.2, 0.18),
    target: normalizeRect(0.58, 0.16, 0.22, 0.2),
  },
  {
    id: "final-04",
    tileImage: "/assets/puzzles/zayn/final-piece-04.png",
    pieceImage: "/assets/puzzles/zayn/final-piece-04-illustration.png",
    targetMask: "/assets/puzzles/zayn/final-piece-04-empty.png",
    home: normalizeRect(0.74, 0.78, 0.2, 0.18),
    target: normalizeRect(0.1, 0.46, 0.22, 0.2),
  },
  {
    id: "final-05",
    tileImage: "/assets/puzzles/zayn/final-piece-05.png",
    pieceImage: "/assets/puzzles/zayn/final-piece-05-illustration.png",
    targetMask: "/assets/puzzles/zayn/final-piece-05-empty.png",
    home: normalizeRect(0.18, 0.9, 0.2, 0.18),
    target: normalizeRect(0.34, 0.46, 0.22, 0.2),
  },
  {
    id: "final-06",
    tileImage: "/assets/puzzles/zayn/final-piece-06.png",
    pieceImage: "/assets/puzzles/zayn/final-piece-06-illustration.png",
    targetMask: "/assets/puzzles/zayn/final-piece-06-empty.png",
    home: normalizeRect(0.6, 0.9, 0.2, 0.18),
    target: normalizeRect(0.58, 0.46, 0.22, 0.2),
  },
];

export const puzzleDefinitions: PuzzleDefinition[] = [
  {
    id: "beach",
    boardEmpty: "/assets/puzzles/beach/beach-empty.png",
    boardCompleted: "/assets/puzzles/beach/beach-board-completed.png",
    pieces: beachPieces,
  },
  {
    id: "space",
    boardEmpty: "/assets/puzzles/space/space-board.png",
    boardCompleted: "/assets/puzzles/space/space-board-completed.png",
    pieces: spacePieces,
  },
  {
    id: "teddy",
    boardEmpty: "/assets/puzzles/teddy/teddy-empty.png",
    boardCompleted: "/assets/puzzles/teddy/teddy-board-completed.png",
    pieces: teddyPieces,
  },
  {
    id: "final",
    boardEmpty: "/assets/puzzles/zayn/final-board.png",
    boardCompleted: "/assets/puzzles/zayn/final-board-complete.png",
    pieces: finalPieces,
  },
];

export const puzzleMap = Object.fromEntries(
  puzzleDefinitions.map((puzzle) => [puzzle.id, puzzle]),
) as Record<string, PuzzleDefinition>;
