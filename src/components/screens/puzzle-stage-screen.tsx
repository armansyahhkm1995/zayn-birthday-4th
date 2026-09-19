import { motion } from "framer-motion";
import { stageOrder } from "../../data/stages";
import type { PuzzleDefinition, StageDefinition } from "../../types/game";
import { Button } from "../ui/button";
import { ProgressStepper } from "../ui/progress-stepper";
import { StateBadge } from "../ui/state-badge";
import { PuzzleGame } from "../../features/game/puzzle-game";
import { ScreenShell } from "./screen-shell";

export type PuzzleStageScreenProps = {
  stage: StageDefinition;
  puzzle: PuzzleDefinition;
  progress: number;
  completed: boolean;
  onNext: () => void;
};

export function PuzzleStageScreen({
  stage,
  puzzle,
  progress,
  completed,
  onNext,
}: PuzzleStageScreenProps) {
  const currentStep = Math.max(1, stageOrder.indexOf(stage.id) + 1);
  const nextLabel =
    stage.id === "final-puzzle" ? "LIHAT KEJUTANNYA" : "Lanjutkan";

  return (
    <ScreenShell
      withCoralDecoration
      header={
        <div className="mb-4 flex items-center justify-between gap-3">
          <StateBadge
            variant={completed ? "completed" : "drag"}
            label={completed ? "Completed" : "In progress"}
          />
          <span className="text-sm font-bold text-[var(--color-navy)]/80">
            {Math.round(progress * 100)}%
          </span>
        </div>
      }
      content={
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-4 pb-10"
        >
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--color-ocean-100)]/80">
              stage {currentStep}
            </p>
            <h1 className="mt-2 text-2xl font-black text-[var(--color-navy)]">
              {puzzle.name}
            </h1>
            <p className="mt-2 text-sm leading-6 text-[var(--color-navy)]/75">
              Ketuk keping, lalu pasang ke tempat yang tepat.
            </p>
          </div>

          <ProgressStepper
            currentStep={currentStep}
            totalSteps={stageOrder.length}
            completedSteps={stageOrder
              .slice(0, Math.max(0, stageOrder.indexOf(stage.id)))
              .filter((entry) => entry !== "start")
              .map((_, index) => index + 1)}
            className="mb-1"
          />

          <PuzzleGame puzzle={puzzle} onComplete={onNext} className="pt-2" />

          {completed ? (
            <Button variant="primary" onClick={onNext}>
              {nextLabel}
            </Button>
          ) : null}
        </motion.div>
      }
    />
  );
}
