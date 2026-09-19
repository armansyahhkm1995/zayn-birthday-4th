import {
  normalizeRect,
  type PuzzleDefinition,
  type PuzzlePieceDefinition,
} from "../types/puzzle";

const beachPieces: PuzzlePieceDefinition[] = [
  {
    id: "beach-whale",
    label: "Whale",
    tileImage: "/assets/puzzles/beach/beach-piece-whale.png",
    pieceImage: "/assets/puzzles/beach/beach-piece-whale.png",
    home: normalizeRect(0.72, 0.74, 0.2, 0.18),
    target: normalizeRect(0.15, 0.16, 0.24, 0.22),
    designedSize: { width: 0.2, height: 0.18 },
    calibrationNote:
      "TODO: confirm final Figma calibration against the exported board if the asset art shifts.",
  },
  {
    id: "beach-octopus",
    label: "Octopus",
    tileImage: "/assets/puzzles/beach/beach-piece-octopus.png",
    pieceImage: "/assets/puzzles/beach/beach-piece-octopus.png",
    home: normalizeRect(0.12, 0.76, 0.18, 0.17),
    target: normalizeRect(0.44, 0.2, 0.2, 0.24),
    designedSize: { width: 0.18, height: 0.17 },
    calibrationNote:
      "TODO: confirm final Figma calibration against the exported board if the asset art shifts.",
  },
  {
    id: "beach-seaweed",
    label: "Seaweed",
    tileImage: "/assets/puzzles/beach/beach-piece-seaweed.png",
    pieceImage: "/assets/puzzles/beach/beach-piece-seaweed.png",
    home: normalizeRect(0.5, 0.78, 0.18, 0.16),
    target: normalizeRect(0.32, 0.52, 0.22, 0.2),
    designedSize: { width: 0.18, height: 0.16 },
    calibrationNote:
      "TODO: confirm final Figma calibration against the exported board if the asset art shifts.",
  },
];

const spacePieces: PuzzlePieceDefinition[] = [
  {
    id: "space-dad-whale",
    label: "Dad whale",
    tileImage: "/assets/puzzles/space/space-piece-dad-whale.png",
    pieceImage: "/assets/puzzles/space/space-piece-dad-whale-illustration.png",
    targetMask: "/assets/puzzles/space/space-piece-dad-whale-empty.png",
    home: normalizeRect(0.12, 0.8, 0.22, 0.18),
    target: normalizeRect(0.18, 0.2, 0.24, 0.22),
    designedSize: { width: 0.22, height: 0.18 },
    calibrationNote:
      "TODO: confirm final Figma calibration against the exported board if the asset art shifts.",
  },
  {
    id: "space-mom-whale",
    label: "Mom whale",
    tileImage: "/assets/puzzles/space/space-piece-mom-whale.png",
    pieceImage: "/assets/puzzles/space/space-piece-mom-whale-illustration.png",
    targetMask: "/assets/puzzles/space/space-piece-mom-whale-empty.png",
    home: normalizeRect(0.42, 0.8, 0.22, 0.18),
    target: normalizeRect(0.48, 0.22, 0.22, 0.22),
    designedSize: { width: 0.22, height: 0.18 },
    calibrationNote:
      "TODO: confirm final Figma calibration against the exported board if the asset art shifts.",
  },
  {
    id: "space-son-whale",
    label: "Son whale",
    tileImage: "/assets/puzzles/space/space-piece-son-whale.png",
    pieceImage: "/assets/puzzles/space/space-piece-son-whale-illustration.png",
    targetMask: "/assets/puzzles/space/space-piece-son-whale-empty.png",
    home: normalizeRect(0.7, 0.8, 0.22, 0.18),
    target: normalizeRect(0.68, 0.46, 0.24, 0.2),
    designedSize: { width: 0.22, height: 0.18 },
    calibrationNote:
      "TODO: confirm final Figma calibration against the exported board if the asset art shifts.",
  },
];

const teddyPieces: PuzzlePieceDefinition[] = [
  {
    id: "teddy-cheering",
    label: "Cheering teddy",
    tileImage: "/assets/puzzles/teddy/teddy-piece-cheering.png",
    pieceImage: "/assets/puzzles/teddy/teddy-piece-cheering.png",
    home: normalizeRect(0.14, 0.76, 0.22, 0.18),
    target: normalizeRect(0.18, 0.18, 0.26, 0.24),
    designedSize: { width: 0.22, height: 0.18 },
    calibrationNote:
      "TODO: confirm final Figma calibration against the exported board if the asset art shifts.",
  },
  {
    id: "teddy-sitting",
    label: "Sitting teddy",
    tileImage: "/assets/puzzles/teddy/teddy-piece-sitting.png",
    pieceImage: "/assets/puzzles/teddy/teddy-piece-sitting.png",
    home: normalizeRect(0.46, 0.78, 0.22, 0.18),
    target: normalizeRect(0.46, 0.18, 0.26, 0.24),
    designedSize: { width: 0.22, height: 0.18 },
    calibrationNote:
      "TODO: confirm final Figma calibration against the exported board if the asset art shifts.",
  },
  {
    id: "teddy-waving",
    label: "Waving teddy",
    tileImage: "/assets/puzzles/teddy/teddy-piece-waving.png",
    pieceImage: "/assets/puzzles/teddy/teddy-piece-waving.png",
    home: normalizeRect(0.76, 0.76, 0.22, 0.18),
    target: normalizeRect(0.68, 0.52, 0.22, 0.2),
    designedSize: { width: 0.22, height: 0.18 },
    calibrationNote:
      "TODO: confirm final Figma calibration against the exported board if the asset art shifts.",
  },
];

const finalPieces: PuzzlePieceDefinition[] = [
  {
    id: "final-01",
    label: "Piece 1",
    tileImage: "/assets/puzzles/zayn/final-piece-01.png",
    pieceImage: "/assets/puzzles/zayn/final-piece-01-illustration.png",
    targetMask: "/assets/puzzles/zayn/final-piece-01-empty.png",
    home: normalizeRect(0.08, 0.78, 0.2, 0.18),
    target: normalizeRect(0.1, 0.16, 0.22, 0.2),
    designedSize: { width: 0.2, height: 0.18 },
    calibrationNote:
      "TODO: confirm final Figma calibration against the exported board if the asset art shifts.",
  },
  {
    id: "final-02",
    label: "Piece 2",
    tileImage: "/assets/puzzles/zayn/final-piece-02.png",
    pieceImage: "/assets/puzzles/zayn/final-piece-02-illustration.png",
    targetMask: "/assets/puzzles/zayn/final-piece-02-empty.png",
    home: normalizeRect(0.3, 0.78, 0.2, 0.18),
    target: normalizeRect(0.34, 0.16, 0.22, 0.2),
    designedSize: { width: 0.2, height: 0.18 },
    calibrationNote:
      "TODO: confirm final Figma calibration against the exported board if the asset art shifts.",
  },
  {
    id: "final-03",
    label: "Piece 3",
    tileImage: "/assets/puzzles/zayn/final-piece-03.png",
    pieceImage: "/assets/puzzles/zayn/final-piece-03-illustration.png",
    targetMask: "/assets/puzzles/zayn/final-piece-03-empty.png",
    home: normalizeRect(0.52, 0.78, 0.2, 0.18),
    target: normalizeRect(0.58, 0.16, 0.22, 0.2),
    designedSize: { width: 0.2, height: 0.18 },
    calibrationNote:
      "TODO: confirm final Figma calibration against the exported board if the asset art shifts.",
  },
  {
    id: "final-04",
    label: "Piece 4",
    tileImage: "/assets/puzzles/zayn/final-piece-04.png",
    pieceImage: "/assets/puzzles/zayn/final-piece-04-illustration.png",
    targetMask: "/assets/puzzles/zayn/final-piece-04-empty.png",
    home: normalizeRect(0.74, 0.78, 0.2, 0.18),
    target: normalizeRect(0.1, 0.46, 0.22, 0.2),
    designedSize: { width: 0.2, height: 0.18 },
    calibrationNote:
      "TODO: confirm final Figma calibration against the exported board if the asset art shifts.",
  },
  {
    id: "final-05",
    label: "Piece 5",
    tileImage: "/assets/puzzles/zayn/final-piece-05.png",
    pieceImage: "/assets/puzzles/zayn/final-piece-05-illustration.png",
    targetMask: "/assets/puzzles/zayn/final-piece-05-empty.png",
    home: normalizeRect(0.18, 0.9, 0.2, 0.18),
    target: normalizeRect(0.34, 0.46, 0.22, 0.2),
    designedSize: { width: 0.2, height: 0.18 },
    calibrationNote:
      "TODO: confirm final Figma calibration against the exported board if the asset art shifts.",
  },
  {
    id: "final-06",
    label: "Piece 6",
    tileImage: "/assets/puzzles/zayn/final-piece-06.png",
    pieceImage: "/assets/puzzles/zayn/final-piece-06-illustration.png",
    targetMask: "/assets/puzzles/zayn/final-piece-06-empty.png",
    home: normalizeRect(0.6, 0.9, 0.2, 0.18),
    target: normalizeRect(0.58, 0.46, 0.22, 0.2),
    designedSize: { width: 0.2, height: 0.18 },
    calibrationNote:
      "TODO: confirm final Figma calibration against the exported board if the asset art shifts.",
  },
];

export const puzzleDefinitions: PuzzleDefinition[] = [
  {
    id: "beach",
    name: "Whale family beach puzzle",
    boardEmpty: "/assets/puzzles/beach/beach-empty.png",
    boardCompleted: "/assets/puzzles/beach/beach-board-completed.png",
    pieces: beachPieces,
  },
  {
    id: "space",
    name: "Whale family space puzzle",
    boardEmpty: "/assets/puzzles/space/space-board.png",
    boardCompleted: "/assets/puzzles/space/space-board-completed.png",
    pieces: spacePieces,
  },
  {
    id: "teddy",
    name: "Teddy bear puzzle",
    boardEmpty: "/assets/puzzles/teddy/teddy-empty.png",
    boardCompleted: "/assets/puzzles/teddy/teddy-board-completed.png",
    pieces: teddyPieces,
  },
  {
    id: "final",
    name: "Final six-piece photo puzzle",
    boardEmpty: "/assets/puzzles/zayn/final-board.png",
    boardCompleted: "/assets/puzzles/zayn/final-board-complete.png",
    pieces: finalPieces,
  },
];

export const puzzleMap = Object.fromEntries(
  puzzleDefinitions.map((puzzle) => [puzzle.id, puzzle]),
) as Record<string, PuzzleDefinition>;
