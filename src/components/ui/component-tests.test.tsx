import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PuzzleBoard } from "../puzzle/puzzle-board";
import { PuzzlePiece } from "../puzzle/puzzle-piece";
import { PuzzleTarget } from "../puzzle/puzzle-target";
import { PuzzleTrayTile } from "../puzzle/puzzle-tray-tile";
import { Button } from "./button";
import { ProgressStepper } from "./progress-stepper";
import { ScreenShell } from "../screens/screen-shell";

describe("Button", () => {
  it("disables itself and exposes loading state", () => {
    render(
      <Button variant="primary" loading disabled>
        Please wait
      </Button>,
    );

    const button = screen.getByRole("button", { name: /please wait/i });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
  });
});

describe("PuzzleTrayTile", () => {
  it("selects on keyboard interaction", () => {
    const handleSelect = vi.fn();

    render(
      <PuzzleTrayTile
        pieceId="beach-whale"
        tileImage="/assets/puzzles/beach/beach-piece-whale.png"
        label="Whale tile"
        onSelect={handleSelect}
      />,
    );

    const tile = screen.getByRole("button", { name: /whale tile/i });
    fireEvent.keyDown(tile, { key: "Enter" });
    expect(handleSelect).toHaveBeenCalledWith("beach-whale");
  });
});

describe("PuzzlePiece", () => {
  it("applies the correct visual state classes", () => {
    render(
      <PuzzlePiece
        pieceId="piece-1"
        image="/assets/puzzles/beach/beach-piece-whale.png"
        alt="Whale piece"
        state="wrong"
      />,
    );

    const piece = screen
      .getByRole("img", { name: /whale piece/i })
      .closest("div");
    expect(piece).toHaveAttribute("data-state", "wrong");
  });
});

describe("PuzzleTarget", () => {
  it("is accessible and exposes the target state", () => {
    render(
      <PuzzleTarget
        targetId="target-1"
        maskImage="/assets/puzzles/space/space-piece-dad-whale-empty.png"
        label="Dad whale target"
        state="highlighted"
        normalizedRect={{ x: 0.1, y: 0.2, width: 0.2, height: 0.2 }}
      />,
    );

    const target = screen.getByRole("button", { name: /dad whale target/i });
    expect(target).toHaveAttribute("data-state", "highlighted");
  });
});

describe("ProgressStepper", () => {
  it("marks the current step as current", () => {
    render(
      <ProgressStepper currentStep={2} totalSteps={4} completedSteps={[1]} />,
    );
    const currentStep = screen.getByText("Current step 2");
    expect(currentStep).toBeInTheDocument();
  });
});

describe("PuzzleBoard", () => {
  it("renders the completed board image when completed is true", () => {
    render(
      <PuzzleBoard
        emptyBoardImage="/assets/puzzles/beach/beach-empty.png"
        completedBoardImage="/assets/puzzles/beach/beach-board-completed.png"
        completed
        accessibleLabel="Completed beach puzzle board"
      />,
    );

    expect(
      screen.getByRole("img", { name: /completed beach puzzle board/i }),
    ).toBeInTheDocument();
  });
});

describe("ScreenShell", () => {
  it("adds safe-area padding classes", () => {
    render(
      <ScreenShell
        header={<h1>Header</h1>}
        content={<div>Content</div>}
        footer={<div>Footer</div>}
      />,
    );

    expect(
      document.querySelector(
        ".pt-\\[calc\\(var\\(--safe-area-top\\,0px\\)\\+24px\\)\\]",
      ),
    ).toBeTruthy();
  });
});
