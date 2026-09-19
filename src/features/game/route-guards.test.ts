import { describe, expect, it } from "vitest";
import {
  canAccessLetter,
  canAccessReveal,
  getLatestUnlockedStageId,
  resolveStageRequest,
} from "./route-guards";

describe("route guards", () => {
  it("keeps the requested stage when it is still unlocked", () => {
    const result = resolveStageRequest("beach-puzzle", {
      currentStageId: "start",
      completedPuzzleIds: [],
      unlockedMemoryIds: [],
    });

    expect(result).toEqual({
      stageId: "beach-puzzle",
      redirect: false,
    });
  });

  it("redirects locked stages to the latest unlocked stage", () => {
    const result = resolveStageRequest("space-puzzle", {
      currentStageId: "beach-puzzle",
      completedPuzzleIds: ["beach"],
      unlockedMemoryIds: ["memory-age-1"],
    });

    expect(result).toEqual({
      stageId: "memory-age-1",
      redirect: true,
    });
  });

  it("returns the latest unlocked stage after a completed puzzle", () => {
    expect(
      getLatestUnlockedStageId({
        completedPuzzleIds: ["beach"],
        unlockedMemoryIds: ["memory-age-1"],
      }),
    ).toBe("memory-age-1");
  });

  it("allows reveal only after the final puzzle is complete", () => {
    expect(
      canAccessReveal({
        completedPuzzleIds: ["final"],
        unlockedMemoryIds: [],
      }),
    ).toBe(true);

    expect(
      canAccessReveal({
        completedPuzzleIds: [],
        unlockedMemoryIds: [],
      }),
    ).toBe(false);
  });

  it("allows the letter route only after reveal access is granted", () => {
    expect(
      canAccessLetter({
        completedPuzzleIds: ["final"],
        unlockedMemoryIds: ["birthday-reveal"],
      }),
    ).toBe(true);

    expect(
      canAccessLetter({
        completedPuzzleIds: [],
        unlockedMemoryIds: [],
      }),
    ).toBe(false);
  });
});
