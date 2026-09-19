"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { puzzleMap } from "../../data/puzzles";
import { stageMap } from "../../data/stages";
import { resolveStageRequest } from "../../features/game/route-guards";
import { useGameStore } from "../../features/game/store";
import type { StageDefinition } from "../../types/game";
import { LoadingScreen } from "./loading-screen";
import { MemoryStageScreen } from "./memory-stage-screen";
import { PuzzleStageScreen } from "./puzzle-stage-screen";

export type StageControllerProps = {
  stage: StageDefinition;
};

export function StageController({ stage }: StageControllerProps) {
  const router = useRouter();

  const hasHydrated = useGameStore((state) => state.hasHydrated);
  const currentStageId = useGameStore((state) => state.currentStageId);
  const completedPuzzleIds = useGameStore((state) => state.completedPuzzleIds);
  const unlockedMemoryIds = useGameStore((state) => state.unlockedMemoryIds);
  const goToStage = useGameStore((state) => state.goToStage);
  const unlockMemory = useGameStore((state) => state.unlockMemory);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    const resolution = resolveStageRequest(stage.id, {
      currentStageId,
      completedPuzzleIds,
      unlockedMemoryIds,
    });

    if (resolution.redirect) {
      const targetStage = stageMap[resolution.stageId];
      if (targetStage && targetStage.path !== stage.path) {
        router.replace(targetStage.path);
      }
      return;
    }

    if (currentStageId !== stage.id) {
      goToStage(stage.id);
    }

    if (
      stage.unlocksMemoryId &&
      !unlockedMemoryIds.includes(stage.unlocksMemoryId)
    ) {
      unlockMemory(stage.unlocksMemoryId);
    }
  }, [
    currentStageId,
    completedPuzzleIds,
    goToStage,
    hasHydrated,
    router,
    stage,
    unlockMemory,
    unlockedMemoryIds,
  ]);

  if (!hasHydrated) {
    return <LoadingScreen message="Syncing your progress..." />;
  }

  if (stage.type === "puzzle") {
    const puzzle = stage.puzzleId ? puzzleMap[stage.puzzleId] : undefined;

    if (!puzzle) {
      return <LoadingScreen message="Unable to load this puzzle." />;
    }

    const stageProgress =
      stage.puzzleId !== undefined
        ? completedPuzzleIds.includes(stage.puzzleId)
          ? 1
          : 0
        : 0;

    return (
      <PuzzleStageScreen
        stage={stage}
        puzzle={puzzle}
        progress={stageProgress}
        completed={stageProgress >= 1}
        onNext={() => {
          if (stage.nextStageId) {
            router.push(stageMap[stage.nextStageId].path);
          }
        }}
      />
    );
  }

  if (stage.type === "memory") {
    return (
      <MemoryStageScreen
        memory={{
          id: stage.memoryId ?? "memory-age-1",
          title: stage.label,
          body: "A joyful memory from the birthday journey.",
        }}
        currentStep={Math.max(1, Object.keys(stageMap).indexOf(stage.id) + 1)}
        totalSteps={Object.keys(stageMap).length}
        ctaLabel="Lanjutkan"
        onNext={() => {
          if (stage.nextStageId) {
            router.push(stageMap[stage.nextStageId].path);
          }
        }}
      />
    );
  }

  return <LoadingScreen message="Loading the next story step..." />;
}
