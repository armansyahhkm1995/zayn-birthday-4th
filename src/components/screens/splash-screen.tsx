"use client";

import { useRouter } from "next/navigation";
import type { StageId } from "../../types/game";
import { stageMap } from "../../data/stages";
import { Button } from "../ui/button";
import { ScreenShell } from "./screen-shell";

export type SplashScreenProps = {
  hasProgress: boolean;
  latestUnlockedStageId: StageId;
};

export function SplashScreen({
  hasProgress,
  latestUnlockedStageId,
}: SplashScreenProps) {
  const router = useRouter();

  return (
    <ScreenShell
      withCoralDecoration
      content={
        <div className="flex flex-1 flex-col justify-between gap-6 py-2">
          <div className="space-y-5 pt-2">
            <div className="rounded-[var(--radius-xl)] border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
              <div className="relative overflow-hidden rounded-[var(--radius-lg)] bg-[radial-gradient(circle_at_50%_20%,_rgba(214,250,255,0.9),_rgba(42,120,170,0.5)_35%,_rgba(18,48,72,0.7))] p-4">
                <div className="mx-auto flex h-28 w-44 items-center justify-center rounded-full bg-[radial-gradient(circle_at_50%_30%,_rgba(255,255,255,0.35),_rgba(30,120,180,0.4)_50%,_rgba(7,44,79,0.4)_100%)]">
                  <div className="relative h-16 w-20 rounded-[50%] bg-[linear-gradient(135deg,_#d8f8ff_0%,_#9ad9ff_45%,_#4da4d6_100%)] shadow-[var(--shadow-soft)]">
                    <div className="absolute -right-3 top-4 h-9 w-8 rounded-full border-4 border-[#d9f3ff] border-l-transparent border-b-transparent" />
                    <div className="absolute -left-1 bottom-1 h-3 w-3 rounded-full bg-[#1d3d5c]" />
                    <div className="absolute -right-1 bottom-1 h-3 w-3 rounded-full bg-[#1d3d5c]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--color-ocean-100)]/85">
                Zayn birthday 4th
              </p>
              <h1 className="text-3xl font-black leading-tight text-[var(--color-navy)]">
                Ayo mulai petualangan bawah laut!
              </h1>
              <p className="text-base leading-7 text-[var(--color-navy)]/80">
                Ikuti keluarga paus, buka kenangan, dan selesaikan puzzle untuk
                menemukan kejutan ulang tahun.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              variant="primary"
              onClick={() => router.push("/play/beach-puzzle")}
            >
              AYO MAIN!
            </Button>
            {hasProgress ? (
              <Button
                variant="secondary"
                onClick={() =>
                  router.push(
                    stageMap[latestUnlockedStageId]?.path ??
                      "/play/beach-puzzle",
                  )
                }
              >
                Resume progress
              </Button>
            ) : null}
          </div>
        </div>
      }
    />
  );
}
