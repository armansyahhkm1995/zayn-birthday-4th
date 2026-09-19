import { motion } from "framer-motion";
import type { MemoryDefinition } from "../../types/game";
import { Button } from "../ui/button";
import { PhotoCard } from "../ui/photo-card";
import { ProgressStepper } from "../ui/progress-stepper";
import { ScreenShell } from "./screen-shell";

export type MemoryStageScreenProps = {
  memory: MemoryDefinition;
  currentStep: number;
  totalSteps: number;
  ctaLabel: string;
  onNext: () => void;
};

export function MemoryStageScreen({
  memory,
  currentStep,
  totalSteps,
  ctaLabel,
  onNext,
}: MemoryStageScreenProps) {
  return (
    <ScreenShell
      withCoralDecoration
      content={
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-4 pb-10"
        >
          <ProgressStepper currentStep={currentStep} totalSteps={totalSteps} />

          <div className="space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--color-ocean-100)]/80">
              memory moment
            </p>
            <h1 className="text-2xl font-black text-[var(--color-navy)]">
              {memory.title}
            </h1>
          </div>

          <PhotoCard
            imageSrc={memory.image ?? "/assets/memories/memory-placeholder.png"}
            alt={memory.title}
            title={memory.subtitle ?? memory.title}
            caption={memory.body}
            className="shadow-[var(--shadow-card)]"
          />

          <Button variant="primary" onClick={onNext}>
            {ctaLabel}
          </Button>
        </motion.div>
      }
    />
  );
}
