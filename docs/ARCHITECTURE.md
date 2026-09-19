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
└── styles/

## Responsibility boundaries

- `data`: static content and puzzle definitions
- `game-engine`: pure state transitions
- `game-store`: application state and persistence
- `puzzle`: rendering and pointer interactions
- `screens`: composition of complete screens
- `app`: routing only
