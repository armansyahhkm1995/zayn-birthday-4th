"use client";

import { useGameStore } from "../src/features/game/store";
import { getLatestUnlockedStageId } from "../src/features/game/route-guards";
import { SplashScreen } from "../src/components/screens/splash-screen";
import { LoadingScreen } from "../src/components/screens/loading-screen";

export default function HomePage() {
  const hasHydrated = useGameStore((state) => state.hasHydrated);
  const currentStageId = useGameStore((state) => state.currentStageId);
  const completedPuzzleIds = useGameStore((state) => state.completedPuzzleIds);
  const unlockedMemoryIds = useGameStore((state) => state.unlockedMemoryIds);

  if (!hasHydrated) {
    return <LoadingScreen message="Checking your saved progress..." />;
  }

  const hasProgress =
    currentStageId !== "start" ||
    completedPuzzleIds.length > 0 ||
    unlockedMemoryIds.length > 0;

  return (
    <SplashScreen
      hasProgress={hasProgress}
      latestUnlockedStageId={getLatestUnlockedStageId({
        completedPuzzleIds,
        unlockedMemoryIds,
      })}
    />
  );
}
