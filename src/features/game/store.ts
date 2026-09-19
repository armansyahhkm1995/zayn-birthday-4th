import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { puzzleDefinitions } from "../../data/puzzles";
import { stageDefinitions, stageOrder } from "../../data/stages";
import type {
  GameProgress,
  MemoryId,
  PersistedGameState,
  PieceId,
  PuzzleId,
  StageId,
} from "../../types/game";
import {
  getActivePuzzleIdForStage,
  getDefaultPersistedState,
  getNextStage,
  isPuzzleComplete,
  migratePersistedState,
  normalizeProgress,
  PERSISTENCE_VERSION,
  placePiece,
} from "./helpers";

export type GameStoreState = GameProgress & {
  selectedPieceId: PieceId | null;
  hasHydrated: boolean;
};

export type GameStoreActions = {
  selectPiece: (pieceId: PieceId | null) => void;
  clearSelectedPiece: () => void;
  markPiecePlaced: (puzzleId: PuzzleId, pieceId: PieceId) => void;
  resetPiece: (puzzleId: PuzzleId, pieceId: PieceId) => void;
  completePuzzle: (puzzleId: PuzzleId) => void;
  unlockMemory: (memoryId: MemoryId) => void;
  goToStage: (stageId: StageId) => void;
  goToNextStage: () => void;
  goToPreviousStage: () => void;
  setSoundEnabled: (enabled: boolean) => void;
  resetGame: () => void;
  hydrateComplete: () => void;
};

export type GameStore = GameStoreState & GameStoreActions;

const createStorage = () => ({
  getItem: (name: string) => {
    if (typeof window === "undefined") {
      return null;
    }

    return window.localStorage.getItem(name);
  },
  setItem: (name: string, value: string) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(name, value);
    }
  },
  removeItem: (name: string) => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(name);
    }
  },
});

const defaultState: GameStoreState = {
  currentStageId: "start",
  activePuzzleId: undefined,
  selectedPieceId: null,
  placedPieceIds: {},
  completedPuzzleIds: [],
  unlockedMemoryIds: [],
  soundEnabled: true,
  hasHydrated: false,
  lastUpdatedAt: Date.now(),
};

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      ...defaultState,
      selectPiece: (pieceId) => {
        set({ selectedPieceId: pieceId, lastUpdatedAt: Date.now() });
      },
      clearSelectedPiece: () => {
        set({ selectedPieceId: null, lastUpdatedAt: Date.now() });
      },
      markPiecePlaced: (puzzleId, pieceId) => {
        const current = get().placedPieceIds[puzzleId] ?? [];
        const nextPlaced = placePiece(current, pieceId);
        set({
          placedPieceIds: { ...get().placedPieceIds, [puzzleId]: nextPlaced },
          selectedPieceId: null,
          lastUpdatedAt: Date.now(),
        });
      },
      resetPiece: (puzzleId, pieceId) => {
        const current = get().placedPieceIds[puzzleId] ?? [];
        const nextPlaced = current.filter((id) => id !== pieceId);
        set({
          placedPieceIds: { ...get().placedPieceIds, [puzzleId]: nextPlaced },
          lastUpdatedAt: Date.now(),
        });
      },
      completePuzzle: (puzzleId) => {
        const current = get();
        const puzzle = puzzleDefinitions.find((entry) => entry.id === puzzleId);

        if (!puzzle) {
          return;
        }

        const placed = current.placedPieceIds[puzzleId] ?? [];
        if (!isPuzzleComplete(puzzle, placed)) {
          return;
        }

        const completed = current.completedPuzzleIds.includes(puzzleId)
          ? current.completedPuzzleIds
          : [...current.completedPuzzleIds, puzzleId];

        set({
          completedPuzzleIds: completed,
          lastUpdatedAt: Date.now(),
        });
      },
      unlockMemory: (memoryId) => {
        const current = get();
        const nextUnlocked = current.unlockedMemoryIds.includes(memoryId)
          ? current.unlockedMemoryIds
          : [...current.unlockedMemoryIds, memoryId];

        set({
          unlockedMemoryIds: nextUnlocked,
          lastUpdatedAt: Date.now(),
        });
      },
      goToStage: (stageId) => {
        const stage = stageDefinitions.find((entry) => entry.id === stageId);
        if (!stage) {
          return;
        }

        set({
          currentStageId: stageId,
          activePuzzleId: stage.puzzleId ?? getActivePuzzleIdForStage(stageId),
          selectedPieceId: null,
          lastUpdatedAt: Date.now(),
        });
      },
      goToNextStage: () => {
        const currentStageId = get().currentStageId;
        const nextStageId = getNextStage(currentStageId);
        if (!nextStageId) {
          return;
        }
        get().goToStage(nextStageId);
      },
      goToPreviousStage: () => {
        const stageIndex = stageOrder.indexOf(get().currentStageId);
        if (stageIndex <= 0) {
          return;
        }

        const previousStageId = stageOrder[stageIndex - 1] as StageId;
        get().goToStage(previousStageId);
      },
      setSoundEnabled: (enabled) => {
        set({ soundEnabled: enabled, lastUpdatedAt: Date.now() });
      },
      resetGame: () => {
        set({
          ...defaultState,
          currentStageId: "start",
          lastUpdatedAt: Date.now(),
        });
      },
      hydrateComplete: () => {
        set({ hasHydrated: true });
      },
    }),
    {
      name: "zayn-puzzle-progress-v1",
      version: PERSISTENCE_VERSION,
      storage: createJSONStorage(createStorage),
      partialize: (state) => ({
        version: PERSISTENCE_VERSION,
        currentStageId: state.currentStageId,
        placedPieceIds: state.placedPieceIds,
        completedPuzzleIds: state.completedPuzzleIds,
        unlockedMemoryIds: state.unlockedMemoryIds,
        soundEnabled: state.soundEnabled,
        lastUpdatedAt: state.lastUpdatedAt,
      }),
      migrate: (persistedState) => {
        const normalized = migratePersistedState(persistedState);
        return normalized;
      },
      merge: (persistedState, currentState) => {
        const normalized = migratePersistedState(persistedState);
        const nextState = normalizeProgress(
          currentState as Partial<GameProgress>,
        );

        return {
          ...currentState,
          ...nextState,
          ...normalized,
          selectedPieceId: null,
          hasHydrated: false,
        } as GameStore;
      },
      onRehydrateStorage: () => () => {
        const state = useGameStore.getState();
        state.hydrateComplete();
      },
    },
  ),
);

export const initialGameState: GameProgress = normalizeProgress({
  currentStageId: "start",
  placedPieceIds: {},
  completedPuzzleIds: [],
  unlockedMemoryIds: [],
  soundEnabled: true,
  lastUpdatedAt: Date.now(),
});

export const persistedGameStateSelector = (
  state: GameStoreState,
): PersistedGameState => ({
  version: PERSISTENCE_VERSION,
  currentStageId: state.currentStageId,
  placedPieceIds: state.placedPieceIds,
  completedPuzzleIds: state.completedPuzzleIds,
  unlockedMemoryIds: state.unlockedMemoryIds,
  soundEnabled: state.soundEnabled,
  lastUpdatedAt: state.lastUpdatedAt,
});

export const resetPersistedProgress = () => {
  const defaultStateValue = getDefaultPersistedState();
  useGameStore.setState({
    ...defaultState,
    currentStageId: defaultStateValue.currentStageId,
    placedPieceIds: defaultStateValue.placedPieceIds,
    completedPuzzleIds: defaultStateValue.completedPuzzleIds,
    unlockedMemoryIds: defaultStateValue.unlockedMemoryIds,
    soundEnabled: defaultStateValue.soundEnabled,
    lastUpdatedAt: defaultStateValue.lastUpdatedAt,
    hasHydrated: true,
  });
};
