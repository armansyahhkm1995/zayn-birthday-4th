import { stageDefinitions, stageMap, stageOrder } from "../../data/stages";
import type { GameProgress, StageId } from "../../types/game";

export type StageResolutionResult = {
  stageId: StageId;
  redirect: boolean;
};

export function getLatestUnlockedStageId(
  progress: Pick<GameProgress, "completedPuzzleIds" | "unlockedMemoryIds">,
): StageId {
  const completed = new Set(progress.completedPuzzleIds ?? []);
  const unlocked = new Set(progress.unlockedMemoryIds ?? []);

  let latest: StageId = "start";

  for (const stageId of stageOrder) {
    if (stageId === "start") {
      continue;
    }

    const stage = stageMap[stageId];
    if (!stage) {
      continue;
    }

    if (stage.type === "puzzle") {
      const puzzleId = stage.puzzleId;
      const isUnlockedByProgress =
        stageId === "beach-puzzle" ||
        (puzzleId !== undefined && completed.has(puzzleId));

      if (isUnlockedByProgress) {
        latest = stageId;
      }
      continue;
    }

    if (stage.type === "memory") {
      const memoryId = stage.memoryId;
      const previousStage = stage.previousStageId
        ? stageMap[stage.previousStageId]
        : undefined;
      const previousPuzzle = previousStage?.puzzleId;
      const previousPuzzleComplete =
        previousPuzzle !== undefined && completed.has(previousPuzzle);

      if (
        memoryId !== undefined &&
        (unlocked.has(memoryId) || previousPuzzleComplete)
      ) {
        latest = stageId;
      }
      continue;
    }

    if (stageId === "final-puzzle-completed") {
      if (completed.has("final")) {
        latest = stageId;
      }
      continue;
    }

    if (stageId === "birthday-reveal") {
      if (completed.has("final") || unlocked.has("birthday-reveal")) {
        latest = stageId;
      }
      continue;
    }

    if (stageId === "daddy-letter") {
      if (unlocked.has("daddy-letter")) {
        latest = stageId;
      }
    }
  }

  return latest;
}

export function resolveStageRequest(
  requestedStageId: string | undefined,
  progress: Pick<
    GameProgress,
    "completedPuzzleIds" | "unlockedMemoryIds" | "currentStageId"
  >,
): StageResolutionResult {
  const candidate = requestedStageId as StageId | undefined;

  if (!candidate || !stageMap[candidate]) {
    return {
      stageId: getLatestUnlockedStageId(progress),
      redirect: true,
    };
  }

  const latestUnlockedStageId = getLatestUnlockedStageId(progress);
  const requestedIndex = stageOrder.indexOf(candidate);
  const latestUnlockedIndex = stageOrder.indexOf(latestUnlockedStageId);

  if (requestedIndex > latestUnlockedIndex) {
    return {
      stageId: latestUnlockedStageId,
      redirect: true,
    };
  }

  return {
    stageId: candidate,
    redirect: false,
  };
}

export function canAccessReveal(
  progress: Pick<GameProgress, "completedPuzzleIds" | "unlockedMemoryIds">,
): boolean {
  return (
    progress.completedPuzzleIds.includes("final") ||
    progress.unlockedMemoryIds.includes("birthday-reveal")
  );
}

export function canAccessLetter(
  progress: Pick<GameProgress, "completedPuzzleIds" | "unlockedMemoryIds">,
): boolean {
  return (
    canAccessReveal(progress) ||
    progress.unlockedMemoryIds.includes("daddy-letter")
  );
}

export function getStagePath(stageId: StageId): string {
  return stageDefinitions.find((stage) => stage.id === stageId)?.path ?? "/";
}
