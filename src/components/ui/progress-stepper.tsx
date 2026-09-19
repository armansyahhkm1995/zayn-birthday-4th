import { cn } from "../../lib/cn";

export type ProgressStepperProps = {
  currentStep: number;
  totalSteps: number;
  completedSteps?: number[];
  lockedSteps?: number[];
  className?: string;
};

export function ProgressStepper({
  currentStep,
  totalSteps,
  completedSteps = [],
  lockedSteps = [],
  className,
}: ProgressStepperProps) {
  const steps = Array.from({ length: totalSteps }, (_, index) => index + 1);

  return (
    <nav
      aria-label="Progress"
      aria-live="polite"
      aria-current={currentStep ? "step" : undefined}
      className={cn("w-full", className)}
    >
      <ol className="flex items-center gap-2">
        {steps.map((step) => {
          const isCurrent = step === currentStep;
          const isCompleted = completedSteps.includes(step);
          const isLocked = lockedSteps.includes(step);

          return (
            <li key={step} className="flex-1">
              <div
                aria-current={isCurrent ? "step" : undefined}
                data-current={isCurrent ? "true" : undefined}
                data-completed={isCompleted ? "true" : undefined}
                data-locked={isLocked ? "true" : undefined}
                className={cn(
                  "relative h-2 overflow-hidden rounded-full bg-white/15",
                  isCurrent && "bg-[var(--color-ocean-500)]",
                  isCompleted && "bg-[var(--color-green)]",
                  isLocked && "bg-[var(--color-disabled)]",
                )}
              >
                <span className="sr-only">
                  {isCurrent ? `Current step ${step}` : `Step ${step}`}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
