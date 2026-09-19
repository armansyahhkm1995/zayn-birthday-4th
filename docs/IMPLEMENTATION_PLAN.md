# Implementation Plan

## Phase 1 — Foundation

- Scaffold Next.js App Router project
- Configure TypeScript strict mode
- Configure Tailwind CSS
- Load Outfit using `next/font`
- Define CSS design tokens
- Create responsive application shell
- Configure lint, format, and tests

Acceptance:

- App runs locally
- Typecheck and lint pass
- Mobile shell matches 390×844 baseline

## Phase 2 — Reusable UI

Implement:

- CTA button
- Puzzle tile
- State badge
- Progress stepper
- Photo card
- Loading screen
- Error screen
- Resume progress screen

Acceptance:

- All visual states are represented
- Components use typed props
- No duplicated variant styles

## Phase 3 — Game data

Create typed data for:

- Stages
- Puzzles
- Pieces
- Memories
- Reveal content

Every puzzle piece includes:

- ID
- Asset path
- Home position
- Target position
- Size
- Correct target ID

Acceptance:

- Puzzle content can be changed without editing components
- Coordinates use normalized values

## Phase 4 — Game state

Implement Zustand store containing:

- Current stage
- Selected piece
- Dragging piece
- Placed piece IDs
- Completed puzzles
- Unlocked memories
- Sound preference
- Loading/error state

Acceptance:

- State changes are predictable
- Game logic can be tested separately from React

## Phase 5 — Puzzle engine

Implement:

- Pointer-based dragging
- Hit testing
- Snap validation
- Wrong return
- Piece locking
- Completion detection
- Tap-to-place fallback

Acceptance:

- Works with mouse and touch
- Incorrect pieces return home
- Correct pieces lock
- Completing all pieces unlocks the next stage

## Phase 6 — Puzzle themes

Implement puzzle data for:

1. Whale family beach
2. Whale family space
3. Teddy bear bedtime
4. Final six-piece photo puzzle

All puzzles must reuse the same engine.

## Phase 7 — Story flow

Implement:

- Splash
- Memory age one
- Memory age two
- Memory age three
- Final puzzle intro
- Birthday reveal
- Daddy's message

Acceptance:

- User can complete the experience from beginning to end
- Refreshing does not lose progress

## Phase 8 — Persistence

Use Zustand persist with:

`zayn-puzzle-progress-v1`

Handle:

- Resume progress
- Restart confirmation
- Storage migration
- Invalid saved state
- Reset game

## Phase 9 — Loading and errors

Implement:

- Asset preloading
- Delayed loading state after 300ms
- Retry behavior
- Friendly error screen
- Progress preservation after failure

## Phase 10 — Animation and audio

Framer Motion:

- Drag
- Snap
- Wrong shake
- Screen transitions
- Completion celebration

CSS:

- Bubbles
- Light rays
- Ambient decoration

Audio:

- Background loop
- Piece pickup
- Correct
- Wrong
- Completed
- Button tap

## Phase 11 — Testing

Unit tests:

- Hit testing
- Snap tolerance
- Puzzle completion
- Stage unlocking
- Persistence migration

Integration tests:

- Complete one puzzle
- Resume saved progress
- Retry failed asset
- Complete full story flow

## Definition of done

- Typecheck passes
- Lint passes
- Tests pass
- Mobile touch interaction works
- Safe areas are respected
- All screens match design
- No duplicated puzzle logic
- Progress survives refresh
