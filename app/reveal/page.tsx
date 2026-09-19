"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { stageMap } from "../../src/data/stages";
import {
  canAccessReveal,
  getLatestUnlockedStageId,
} from "../../src/features/game/route-guards";
import { useGameStore } from "../../src/features/game/store";
import { LoadingScreen } from "../../src/components/screens/loading-screen";
import { RevealScreen } from "../../src/components/screens/reveal-screen";

export default function RevealPage() {
  const router = useRouter();
  const hasHydrated = useGameStore((state) => state.hasHydrated);
  const currentStageId = useGameStore((state) => state.currentStageId);
  const completedPuzzleIds = useGameStore((state) => state.completedPuzzleIds);
  const unlockedMemoryIds = useGameStore((state) => state.unlockedMemoryIds);
  const goToStage = useGameStore((state) => state.goToStage);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    const canAccess = canAccessReveal({
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

    if (
      completedPuzzleIds.includes("final") &&
      currentStageId !== "final-puzzle-completed"
    ) {
      goToStage("final-puzzle-completed");
    }
  }, [
    currentStageId,
    completedPuzzleIds,
    goToStage,
    hasHydrated,
    router,
    unlockedMemoryIds,
  ]);

  if (!hasHydrated) {
    return <LoadingScreen message="Checking the reveal..." />;
  }

  const isFinalCompleted = completedPuzzleIds.includes("final");

  if (isFinalCompleted) {
    return (
      <RevealScreen
        title="PUZZLE LENGKAP!"
        subtitle="Kejutan besar menunggu"
        body="Semua keping sudah terkumpul. Ayo lihat kejutan untuk hari ulang tahun Zayn."
        ctaLabel="LIHAT KEJUTANNYA"
        onNext={() => {
          goToStage("birthday-reveal");
          router.push("/letter");
        }}
      />
    );
  }

  return (
    <RevealScreen
      title="Birthday reveal"
      subtitle="Selamat ulang tahun"
      body="Hari spesial Zayn sudah tiba. Mari buka surat dari Daddy."
      ctaLabel="Buka surat"
      onNext={() => {
        goToStage("daddy-letter");
        router.push("/letter");
      }}
    />
  );
}
