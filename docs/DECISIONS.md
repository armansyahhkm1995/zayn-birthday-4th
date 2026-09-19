# Architecture Decisions

## ADR-001 — Frontend-only application

Status: Accepted

The project does not require a backend. Static content and assets are bundled with the frontend. Progress is stored locally.

A backend is only required later if cross-device synchronization is needed.

## ADR-002 — Next.js App Router

Status: Accepted

Next.js App Router provides routing, optimized images, fonts, and deployment support while keeping the experience frontend-only.

## ADR-003 — Zustand for game state

Status: Accepted

Zustand is used because puzzle state is shared across screens and must persist locally.

Store UI state and progress, but do not store DOM nodes or animation objects.

## ADR-004 — Versioned local persistence

Status: Accepted

Persistence key:

`zayn-puzzle-progress-v1`

Saved data must have a schema version. Invalid or obsolete data falls back safely to Start.

## ADR-005 — Pointer Events instead of HTML5 Drag and Drop

Status: Accepted

HTML5 Drag and Drop has inconsistent touch behavior.

Use Framer Motion drag or Pointer Events for mobile-friendly interactions.

## ADR-006 — One generic puzzle engine

Status: Accepted

Beach, space, teddy, and final puzzles share one engine. Differences are represented through typed puzzle data.

No puzzle-specific interaction logic should exist inside screen components.

## ADR-007 — Normalized target coordinates

Status: Accepted

Puzzle targets use coordinates from `0–1`, relative to board dimensions.

This allows the board to scale responsively without hardcoded pixel coordinates.

## ADR-008 — One image per piece

Status: Accepted

Default, selected, dragging, wrong, and correct states reuse the same image.

State differences are handled using:

- Border color
- Focus ring
- Transform
- Shadow
- Opacity
- Feedback icons

This reduces asset size, requests, and maintenance.

## ADR-009 — Framer Motion and CSS animations

Status: Accepted

Framer Motion handles interactive animation:

- Drag
- Snap
- Return
- Screen transitions

CSS handles ambient animation:

- Bubbles
- Light rays
- Floating decoration

## ADR-010 — Portrait-first layout

Status: Accepted

The application is designed for portrait mobile use. Tablet layouts may increase margins but preserve the mobile board proportions.

Landscape gameplay is not supported initially.

## ADR-011 — Accessibility fallback

Status: Accepted

Every drag interaction also supports tap-to-place.

State feedback must not rely only on color. Use motion, icons, text, or outlines.

## ADR-012 — Local asset organization

Status: Accepted

Assets live under:

`public/assets/`

Folders:

- backgrounds
- puzzles/beach
- puzzles/space
- puzzles/teddy
- puzzles/final
- memories
- reveal
- decorations
- audio

Asset filenames use lowercase kebab-case.

## ADR-013 — Foundation shell and design tokens

Status: Accepted

Phase 1 establishes the responsive mobile application shell and the shared visual system used across all later screens.

The foundation includes:

- Outfit font via `next/font/google`
- CSS variables for ocean, navy, yellow, coral, green, spacing, radii, shadows, and safe-area insets
- A portrait-first mobile shell using a 390×844-inspired layout baseline
- A reusable underwater background layer that does not require external assets
- Layout primitives for container and screen composition

This keeps color, spacing, and posture decisions centralized before puzzle logic is introduced.

## ADR-014 — Figma-accurate puzzle definitions with normalized geometry

Status: Accepted

Puzzle content is defined as typed data rather than a mix of raw coordinates and component logic.

Each puzzle now supports:

- `boardEmpty`
- optional `boardCompleted`
- `tileImage`
- `pieceImage`
- optional `targetMask`
- normalized `home` and `target` rectangles

This ensures the runtime never relies on raw Figma pixel coordinates. Geometry is converted into normalized values relative to board width and height, which preserves responsive scaling across device sizes and keeps the puzzle content reusable across themes.

The separation between tray tile art and draggable art also keeps UI assets aligned with the product requirement: card-like tray tiles are never used as the moveable puzzle pieces.

## ADR-015 — Presentational component library for the puzzle UI

Status: Accepted

Phase 2 focuses on reusable, stateless presentation components rather than game behavior.

The library includes:

- `Button`
- `PuzzleBoard`
- `PuzzleTrayTile`
- `PuzzlePiece`
- `PuzzleTarget`
- `StateBadge`
- `ProgressStepper`
- `PhotoCard`
- `FeedbackMessage`
- `ScreenShell`

These components use typed props, design tokens, safe-area support, and real asset references while keeping validation, drag logic, and state persistence out of the UI layer.

## ADR-016 — Typed stage flow and local progress store

Status: Accepted

Phase 3 introduces a structured game model separated from the presentational layer.

The game state is defined as:

- `StageDefinition` for each route in the birthday flow
- `MemoryDefinition` for unlockable memory content
- `PuzzleDefinition` for each board, piece roster, and normalized geometry
- `GameProgress` for current stage, placed pieces, completion, memory unlocks, sound setting, and update time
- `PersistedGameState` for the versioned browser storage payload

This keeps transitions and unlock rules explicit, while allowing the UI to read from a single typed source of truth. Store logic now includes:

- stage navigation helpers
- stage ordering and next/previous navigation
- puzzle completion checks
- localStorage hydration and migration
- safe fallback to a clean default state

State is intentionally limited to data and local browser progress; actual drag, hit testing, and puzzle validation remain separate from the store and are deferred to the interaction layer.
