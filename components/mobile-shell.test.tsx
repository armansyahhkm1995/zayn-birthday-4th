import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { puzzleDefinitions } from "../src/data/puzzles";
import { MobileAppShell } from "./mobile-shell";

describe("MobileAppShell", () => {
  it("renders the app shell and children content", () => {
    render(
      <MobileAppShell>
        <div>Story begins</div>
      </MobileAppShell>,
    );

    expect(screen.getByText("Zayn Birthday 4th")).toBeInTheDocument();
    expect(screen.getByText("Story begins")).toBeInTheDocument();
  });
});

describe("Puzzle definition model", () => {
  it("defines normalized board and piece assets for each puzzle", () => {
    expect(puzzleDefinitions.length).toBeGreaterThan(0);

    for (const puzzle of puzzleDefinitions) {
      expect(puzzle.boardEmpty).toMatch(/^\/assets\//);
      expect(puzzle.pieces.length).toBeGreaterThan(0);

      for (const piece of puzzle.pieces) {
        expect(piece.tileImage).toMatch(/^\/assets\//);
        expect(piece.pieceImage).toMatch(/^\/assets\//);
        expect(piece.home.x).toBeGreaterThanOrEqual(0);
        expect(piece.home.y).toBeGreaterThanOrEqual(0);
        expect(piece.home.width).toBeGreaterThan(0);
        expect(piece.home.height).toBeGreaterThan(0);
        expect(piece.target.x).toBeGreaterThanOrEqual(0);
        expect(piece.target.y).toBeGreaterThanOrEqual(0);
        expect(piece.target.width).toBeGreaterThan(0);
        expect(piece.target.height).toBeGreaterThan(0);
      }
    }
  });
});
