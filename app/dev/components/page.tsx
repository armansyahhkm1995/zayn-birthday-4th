"use client";

import { ScreenShell } from "../../../src/components/screens/screen-shell";
import { PuzzleBoard } from "../../../src/components/puzzle/puzzle-board";
import { PuzzlePiece } from "../../../src/components/puzzle/puzzle-piece";
import { PuzzleTarget } from "../../../src/components/puzzle/puzzle-target";
import { PuzzleTrayTile } from "../../../src/components/puzzle/puzzle-tray-tile";
import { Button } from "../../../src/components/ui/button";
import { FeedbackMessage } from "../../../src/components/ui/feedback-message";
import { PhotoCard } from "../../../src/components/ui/photo-card";
import { ProgressStepper } from "../../../src/components/ui/progress-stepper";
import { StateBadge } from "../../../src/components/ui/state-badge";

export default function ComponentGalleryPage() {
  return (
    <ScreenShell
      withCoralDecoration
      header={
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--color-ocean-100)]/90">
              component gallery
            </p>
            <h1 className="mt-2 text-2xl font-black text-[var(--color-navy)]">
              Phase 2 UI
            </h1>
          </div>
          <StateBadge variant="default" label="Preview" />
        </div>
      }
      content={
        <div className="space-y-6 pb-10">
          <section className="rounded-[var(--radius-xl)] border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
            <h2 className="mb-3 text-lg font-black text-[var(--color-navy)]">
              Buttons
            </h2>
            <div className="space-y-3">
              <Button variant="primary">Start adventure</Button>
              <Button variant="secondary">Resume</Button>
              <Button variant="disabled">Locked</Button>
              <Button variant="primary" loading>
                Loading
              </Button>
            </div>
          </section>

          <section className="rounded-[var(--radius-xl)] border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
            <h2 className="mb-3 text-lg font-black text-[var(--color-navy)]">
              Puzzle board
            </h2>
            <PuzzleBoard
              emptyBoardImage="/assets/puzzles/beach/beach-empty.png"
              completedBoardImage="/assets/puzzles/beach/beach-board-completed.png"
              completed
              aspectRatio={0.82}
              accessibleLabel="Completed beach puzzle board"
            >
              <PuzzleTarget
                targetId="target-demo"
                maskImage="/assets/puzzles/space/space-piece-dad-whale-empty.png"
                state="highlighted"
                label="Highlighted target"
                normalizedRect={{ x: 0.18, y: 0.18, width: 0.2, height: 0.2 }}
              />
              <PuzzlePiece
                pieceId="demo-piece"
                image="/assets/puzzles/beach/beach-piece-whale.png"
                alt="Whale piece"
                state="correct"
                style={{
                  left: "56%",
                  top: "72%",
                  width: "22%",
                  height: "18%",
                  position: "absolute",
                }}
              />
            </PuzzleBoard>
          </section>

          <section className="rounded-[var(--radius-xl)] border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
            <h2 className="mb-3 text-lg font-black text-[var(--color-navy)]">
              Tray tiles
            </h2>
            <div className="grid grid-cols-3 gap-3">
              <PuzzleTrayTile
                pieceId="beach-whale"
                tileImage="/assets/puzzles/beach/beach-piece-whale.png"
                label="Whale tile"
                state="default"
              />
              <PuzzleTrayTile
                pieceId="space-dad"
                tileImage="/assets/puzzles/space/space-piece-dad-whale.png"
                label="Dad whale tile"
                state="selected"
                selected
              />
              <PuzzleTrayTile
                pieceId="space-mom"
                tileImage="/assets/puzzles/space/space-piece-mom-whale.png"
                label="Mom whale tile"
                state="disabled"
                disabled
              />
            </div>
          </section>

          <section className="rounded-[var(--radius-xl)] border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
            <h2 className="mb-3 text-lg font-black text-[var(--color-navy)]">
              Piece states
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <PuzzlePiece
                pieceId="default"
                image="/assets/puzzles/space/space-piece-dad-whale-illustration.png"
                alt="Default illustration"
                state="default"
                style={{ position: "relative", width: "100%", height: "120px" }}
              />
              <PuzzlePiece
                pieceId="dragging"
                image="/assets/puzzles/space/space-piece-dad-whale-illustration.png"
                alt="Dragging illustration"
                state="dragging"
                style={{ position: "relative", width: "100%", height: "120px" }}
              />
              <PuzzlePiece
                pieceId="wrong"
                image="/assets/puzzles/space/space-piece-mom-whale-illustration.png"
                alt="Wrong illustration"
                state="wrong"
                style={{ position: "relative", width: "100%", height: "120px" }}
              />
              <PuzzlePiece
                pieceId="correct"
                image="/assets/puzzles/space/space-piece-son-whale-illustration.png"
                alt="Correct illustration"
                state="correct"
                style={{ position: "relative", width: "100%", height: "120px" }}
              />
            </div>
          </section>

          <section className="rounded-[var(--radius-xl)] border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
            <h2 className="mb-3 text-lg font-black text-[var(--color-navy)]">
              Targets and badges
            </h2>
            <div className="flex flex-wrap gap-2">
              <StateBadge variant="default" label="default" />
              <StateBadge variant="drag" label="drag" />
              <StateBadge variant="wrong" label="wrong" />
              <StateBadge variant="correct" label="correct" />
              <StateBadge variant="completed" label="done" />
            </div>
            <div className="relative mt-4 h-28 rounded-[var(--radius-lg)] border border-dashed border-white/20 bg-white/5">
              <PuzzleTarget
                targetId="slot-demo"
                maskImage="/assets/puzzles/zayn/final-piece-01-empty.png"
                state="filled"
                label="Filled target"
                normalizedRect={{ x: 0.1, y: 0.18, width: 0.2, height: 0.2 }}
              />
              <PuzzleTarget
                targetId="highlight-demo"
                maskImage="/assets/puzzles/zayn/final-piece-02-empty.png"
                state="highlighted"
                label="Highlighted target"
                normalizedRect={{ x: 0.44, y: 0.18, width: 0.2, height: 0.2 }}
              />
            </div>
          </section>

          <section className="rounded-[var(--radius-xl)] border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
            <h2 className="mb-3 text-lg font-black text-[var(--color-navy)]">
              Progress and feedback
            </h2>
            <ProgressStepper
              currentStep={2}
              totalSteps={4}
              completedSteps={[1, 2]}
              className="mb-4"
            />
            <FeedbackMessage
              variant="info"
              message="Ketuk keping, lalu ketuk tempatnya"
            />
            <div className="mt-3">
              <FeedbackMessage variant="success" message="Yeay, benar!" />
            </div>
            <div className="mt-3">
              <FeedbackMessage
                variant="error"
                message="Belum cocok, coba lagi ya"
              />
            </div>
          </section>

          <section className="rounded-[var(--radius-xl)] border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
            <h2 className="mb-3 text-lg font-black text-[var(--color-navy)]">
              Photo card
            </h2>
            <PhotoCard
              imageSrc="/assets/memories/underwater-content.png"
              alt="Memory photo"
              title="Age 1"
              caption="First splashy memory"
              objectPosition="center"
            />
          </section>
        </div>
      }
    />
  );
}
