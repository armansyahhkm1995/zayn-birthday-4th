# Architecture

## Source structure

src/
├── app/
│ ├── page.tsx
│ ├── play/[stage]/page.tsx
│ ├── reveal/page.tsx
│ └── letter/page.tsx
├── components/
│ ├── ui/
│ ├── puzzle/
│ └── screens/
├── features/game/
│ ├── game-store.ts
│ ├── game-engine.ts
│ ├── hit-testing.ts
│ └── persistence.ts
├── data/
│ ├── puzzles.ts
│ ├── stages.ts
│ └── memories.ts
├── hooks/
├── types/
│ └── puzzle.ts
└── styles/

## Responsibility boundaries

- `data`: static content and puzzle definitions
- `types`: shared puzzle geometry and definition contracts
- `game-engine`: pure state transitions
- `game-store`: application state and persistence
- `puzzle`: rendering and pointer interactions
- `screens`: composition of complete screens
- `app`: routing only

## Puzzle definition contract

The game consumes typed puzzle metadata instead of inline component coordinates.

- `NormalizedRect` stores normalized `x`, `y`, `width`, and `height` values.
- `PuzzlePieceDefinition` keeps tray art, draggable art, optional target masks, and normalized home/target geometry.
- `PuzzleDefinition` represents the board state and all piece definitions for a given puzzle.
- Each puzzle lives in a data file to keep content editable without changing UI logic.

This keeps puzzle content reusable across beach, space, teddy, and final photo stages.
