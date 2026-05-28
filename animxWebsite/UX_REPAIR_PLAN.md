# AnimX UX Repair Plan (v3.41.0)

This plan outlines the exact visual and layout repairs to bring `animxWebsite` to 100% aesthetic and functional compliance with the original `animx/demo` design guidelines.

## 1. Visual Token Alignment (The Slate Dark Theme)
We will align `styles/_tokens.scss` and `index.css` to use the exact colors from the legacy demo suite:
- **`--bg`**: `#0f172a` (deep slate blue)
- **`--panel`**: `#1e293b` (slate gray panel)
- **`--border`**: `#334155` (muted blue border)
- **`--text`**: `#f8fafc` (high contrast white/slate)
- **`--muted`**: `#94a3b8` (low contrast slate gray)
- **`--primary`**: `#6366f1` (indigo accent)
- **`--accent`**: `#818cf8` (light indigo header highlight)
- **`--canvas-bg`**: `radial-gradient(circle at center, #1e1b4b 0%, #0f172a 100%)`

## 2. Header and Page Shell Alignment
- **Navigation Buttons**: Remove gradient buttons. Style header navigation items exactly like `nav a` in `demo/index.html`:
  - Background `#334155`, active color is `var(--primary)` (`#6366f1`).
  - Border radius `4px`.
- **Top Header**: Simple, clean slate header with an active status bar.

## 3. Landing Page Restoration
- Restructure `LandingPage.jsx` sections (`HeroJourney`, `ProblemSection`, `CapabilityJourney`, `WhyAnimX`, `UseCases`, `FinalCTA`) to be styled in pure slate-dark blocks.
- Map the card items to the exact `card` styles in the demo hub: `#1e293b` background, `#334155` border, and smooth scale/border hover animations using AnimX logic.

## 4. Playground Rebuild
- **3-Column Desktop Grid**:
  - Left panel: `width: 320px`, containing preset search selector and sliders.
  - Center canvas: `flex: 1`, containing Replay/Reset/Reduced-Motion controls with the dark-indigo radial gradient canvas.
  - Right panel: `width: 350px` containing export snippets.
- **Controls & Logic**:
  - Preset select list searching and sizing options.
  - Shared control sliders for Duration (`100ms - 3000ms`, default `800ms`) and Delay (`0ms - 2000ms`, default `0ms`).
  - Easing selections matching `smooth`, `snappy`, `bounce`, `linear`.
- **Snippet Exporter**: Output dark code blocks with `#020617` background and `#a5b4fc` monospace text.

## 5. Documentation Page Alignment
- Set the docs wrapper container to `max-width: 900px`.
- Style code blocks and `doc-grid` columns exactly like `demo/docs.html`.

## 6. Testing & Dry Run
- Verify build compiling inside `animxWebsite` via `npm run build`.
- Verify total system stability via root `npm test`.
