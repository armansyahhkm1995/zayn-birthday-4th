# Design Specification

## Baseline

- Primary viewport: 390×844px
- Platform: mobile portrait
- Minimum touch target: 44×44px
- Font: Outfit
- Background: underwater full-screen artwork
- Bottom decoration: coral reef and small sea creatures

## Color roles

- Navy text: `#0D2B45`
- Primary yellow: `#FFC928`
- Active blue: `#2E9CF4`
- Wrong coral: `#FF5964`
- Correct green: `#2DBE7F`
- Surface white: `#FFFFFF`
- Disabled gray: `#CBD2D8`

Exact colors may be adjusted to match exported Figma assets.

## Typography

- Screen title: Outfit ExtraBold
- Section title: Outfit Bold
- Body: Outfit Regular
- Button label: Outfit Bold
- Helper text: Outfit Medium

Text must remain readable against underwater backgrounds. Use a translucent surface when necessary.

## Layout

- Horizontal screen padding: 24px
- Main vertical gap: 16–24px
- Button height: 56–64px
- Card radius: 20–24px
- Puzzle tile radius: 16px
- State border: 3px
- Main CTA remains above bottom safe area

## Reusable components

### CTA button

States:

- Primary
- Secondary
- Disabled
- Pressed

### Puzzle tile

States:

- Default
- Selected
- Dragging
- Wrong
- Correct
- Disabled

Always reserve a transparent 3px border to prevent layout shift.

### State badge

States:

- Default
- Drag
- Wrong
- Correct
- Completed

## Puzzle behavior

State machine:

`default → selected/dragging → wrong or correct → completed`

### Default

- Neutral or transparent border
- Piece remains at home position

### Selected

- Blue border and focus ring
- Matching target is highlighted
- Supports tap-to-place

### Dragging

- Blue border
- Scale approximately `1.05`
- Elevated shadow
- Render above other pieces

### Wrong

- Coral border
- Short shake animation
- Return to home position
- Piece remains available

### Correct

- Green border
- Snap into matching target
- Lock position
- Disable further dragging

### Completed

- All pieces locked
- Celebration feedback
- Continue CTA becomes available

## Drag and drop

- Preserve pointer-to-piece offset
- Accept when overlap is at least 50%, or center distance is ≤24px
- Correct snap: approximately 180ms
- Wrong shake: approximately 240ms
- Wrong return: approximately 220ms
- Do not use HTML5 Drag and Drop

## Tap-to-place

1. Tap a piece to select it
2. Display a blue focus ring
3. Highlight its matching target
4. Tap a target to validate
5. Tap selected piece again to cancel

Do not communicate state through color alone.

## Responsive behavior

Breakpoints:

- Small: ≤360px
- Base: 361–430px
- Large mobile: 431–600px
- Tablet: >600px

Rules:

- Use normalized `0–1` target coordinates
- Scale puzzle board proportionally
- Keep touch targets at least 44px
- Respect top and bottom safe-area insets
- Use `cover` for screen backgrounds
- Use `contain` for transparent puzzle pieces
- Portrait is the supported game orientation

## Puzzle data contract

Every puzzle definition is stored in typed data and follows this model:

```ts
type NormalizedRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type PuzzlePieceDefinition = {
  id: string;
  tileImage: string;
  pieceImage: string;
  targetMask?: string;
  home: NormalizedRect;
  target: NormalizedRect;
};

type PuzzleDefinition = {
  id: string;
  boardEmpty: string;
  boardCompleted?: string;
  pieces: PuzzlePieceDefinition[];
};
```

Rules:

- Never store raw Figma pixel coordinates in runtime data.
- Convert all board, home, and target positions to normalized fractions of the board width and height.
- `boardEmpty` is the empty board art used for the current puzzle state.
- `boardCompleted` is the optional solved state of the board.
- `tileImage` is the tray or selection asset, not the draggable illustration.
- `pieceImage` is the transparent draggable illustration asset.
- `targetMask` is an optional SVG or mask asset used to visualize a target slot without becoming interactive content.
- `home` describes the resting position of each piece in the tray or home area.
- `target` describes the solved snap location on the board, normalized within 0–1.
- `width` and `height` inside each rect define the object size relative to the board.

## Asset usage

- Backgrounds: WebP
- Photos: WebP
- Puzzle board states: PNG or WebP
- Tray tile assets: PNG
- Draggable puzzle illustrations: transparent PNG
- Optional target masks: SVG or transparent PNG
- Icons: SVG where available
- Audio: MP3

Do not create separate images for visual states. Apply state using CSS.
