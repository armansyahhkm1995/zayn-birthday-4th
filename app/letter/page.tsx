"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { stageMap } from "../../src/data/stages";
import {
  canAccessLetter,
  getLatestUnlockedStageId,
} from "../../src/features/game/route-guards";
import { useGameStore } from "../../src/features/game/store";
import { LetterScreen } from "../../src/components/screens/letter-screen";
import { LoadingScreen } from "../../src/components/screens/loading-screen";

export default function LetterPage() {
  const router = useRouter();
  const hasHydrated = useGameStore((state) => state.hasHydrated);
  const completedPuzzleIds = useGameStore((state) => state.completedPuzzleIds);
  const unlockedMemoryIds = useGameStore((state) => state.unlockedMemoryIds);
  const goToStage = useGameStore((state) => state.goToStage);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    const canAccess = canAccessLetter({
      completedPuzzleIds,
      unlockedMemoryIds,
    });

    if (!canAccess) {
      const fallbackStageId = getLatestUnlockedStageId({
        completedPuzzleIds,
        unlockedMemoryIds,
      });
      const fallbackStage = stageMap[fallbackStageId];
      if (fallbackStage) {
        router.replace(fallbackStage.path);
      }
      return;
    }

    goToStage("daddy-letter");
  }, [completedPuzzleIds, goToStage, hasHydrated, router, unlockedMemoryIds]);

  if (!hasHydrated) {
    return <LoadingScreen message="Opening Daddy's letter..." />;
  }

  return <LetterScreen onBackHome={() => router.push("/")} />;
}
