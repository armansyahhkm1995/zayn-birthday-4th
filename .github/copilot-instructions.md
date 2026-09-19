# Zayn Birthday 4th — Copilot Instructions

## Required reading

Before modifying code, always read:

1. `docs/PROJECT_CONTEXT.md`
2. `docs/ARCHITECTURE.md`
3. `docs/DESIGN_SPEC.md`
4. `docs/IMPLEMENTATION_PLAN.md`
5. `docs/CURRENT_STATUS.md`
6. `docs/DECISIONS.md`

Never assume the current implementation state from chat history alone.

## Project

Project name: `zayn-birthday-4th`

This is a frontend-only interactive birthday puzzle experience for Zayn's fourth birthday.

The experience combines:

- Underwater whale-family theme
- Three story puzzles
- Three unlocked memories
- One final six-piece photo puzzle
- Birthday reveal
- Personal message from Daddy

No backend, authentication, database, or API is required.

Progress is stored locally in the browser.

## Technology

- Next.js App Router
- TypeScript with strict mode
- Tailwind CSS
- Zustand with persist middleware
- Framer Motion
- Next/Image
- Vitest and React Testing Library
- Playwright only for critical flow testing

Do not use HTML5 Drag and Drop.

Use Pointer Events or Framer Motion drag because the game must work well on touch devices.

## Architecture rules

- Keep route components thin.
- Store puzzle content in typed data files.
- Keep game logic separate from visual components.
- Do not hardcode puzzle coordinates inside React components.
- Store target positions as normalized values between 0 and 1.
- Reuse the same puzzle engine for every puzzle theme.
- Browser APIs and localStorage must only run in client components.
- Avoid unnecessary abstractions and dependencies.

## Main routes

- `/` — splash
- `/play/[stage]` — puzzle or memory stage
- `/reveal` — birthday reveal
- `/letter` — Daddy's message

## Flow

1. Splash
2. Whale family beach puzzle
3. Memory: age one
4. Whale family space puzzle
5. Memory: age two
6. Teddy bear puzzle
7. Memory: age three
8. Final six-piece photo puzzle
9. Final puzzle completed
10. Birthday reveal
11. Daddy's message

## Puzzle state machine

Every puzzle uses:

`default → selected/dragging → wrong or correct → completed`

Rules:

- Correct pieces snap and become locked.
- Wrong pieces animate back to their original position.
- Completing all pieces automatically unlocks the next stage.
- Tap-to-place must exist as an accessible alternative.
- A selected piece receives a blue focus ring.
- Wrong state uses coral red.
- Correct state uses green.
- Completed state uses yellow.

## Drag behavior

- Preserve pointer-to-piece offset.
- Active piece moves above siblings.
- Accept a drop when overlap is at least 50%, or center distance is within 24dp.
- Correct snap duration: approximately 180ms.
- Wrong shake duration: approximately 240ms.
- Wrong return duration: approximately 220ms.
- Minimum touch area: 44×44dp.

## Persistence

Use Zustand persist with key:

`zayn-puzzle-progress-v1`

Persist:

- Current stage
- Completed puzzle IDs
- Placed piece IDs
- Unlocked memory IDs
- Sound preference
- Last update timestamp

Never erase progress because an image or audio asset fails.

## Responsive rules

Design baseline: 390×844.

- Small: ≤360px
- Base: 361–430px
- Large mobile: 431–600px
- Tablet: >600px

Requirements:

- Portrait-first layout
- Respect safe-area insets
- Scale boards proportionally
- Keep text and touch targets readable
- Puzzle target positions use normalized coordinates
- Minimum touch target remains 44px
- CTA remains above bottom safe area

## Design language

- Luminous turquoise underwater background
- Coral reef decorations near the bottom
- Dark navy primary text
- Yellow primary CTA
- Rounded cards and friendly shadows
- Child-friendly, warm, non-scary feedback
- Font: Outfit

Reusable variants:

- CTA: primary, secondary, disabled
- Puzzle tile: default, selected, wrong, correct, disabled
- State badge: default, drag, wrong, correct, completed

Use the Figma component kit as the visual reference.

## Coding standards

- Prefer named exports.
- Avoid `any`.
- Components should have typed props.
- Game logic must be unit-testable without rendering React.
- Add tests for hit testing, snapping, persistence, and stage unlocking.
- Keep components below approximately 200 lines when practical.
- Do not duplicate state-transition logic between puzzles.

## Workflow

Before coding:

1. Summarize the current relevant implementation.
2. List files that will change.
3. Explain the proposed approach.
4. Implement only the requested phase.

After coding:

1. Run typecheck, lint, and relevant tests.
2. Update `docs/CURRENT_STATUS.md`.
3. Record architectural decisions in `docs/DECISIONS.md`.
4. Report completed work, remaining tasks, and known limitations.
