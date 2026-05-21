# AnimX Project Memory

**Project**: AnimX
**Current Version**: 0.6.0
**Core Goal**: Zero-dependency browser animation library. Output only one CSS file and one JS file.

## v0.0.1 - Foundation (Completed)
- Set up project structure, SCSS variables, Vite build, and basic tests.
- Output strictly mapped to `dist/animx.css` and `dist/animx.js`.

## v0.1.0 - Core CSS Animation System (Completed)
- Completed exhaustive CSS families (Fade, Slide, Zoom, Rotate, Pulse, Skeleton, etc.).
- Integrated `AnimX.getPresets()` for tracking classes via JS.

## v0.2.0 - JavaScript Animation API (Completed)
- Added `AnimX.animate()`.
- Implemented **WAAPI Driver**, **CSS Driver**, and **RAF Driver**.

## v0.3.0 - Data Attribute Engine (Completed)
- Added HTML declarative system (`data-ax="fade-up"`).
- Added `data-ax-duration`, `data-ax-delay`, `data-ax-ease`, `data-ax-repeat`, `data-ax-disabled`.
- Added state tracking (`ax-ready`, `ax-running`) to prevent double-initialization.
- Added `AnimX.refresh()` and `AnimX.run()`.
- Triggers support `load` and `manual`.
- Dispatches CustomEvents (`animx:start`, `animx:complete`).

## v0.4.0 - Scroll Reveal Engine (Completed)
- Added `IntersectionObserver` support.
- Activated `data-ax-on="scroll"`.
- Added scroll config (`threshold`, `once`, `rootMargin`, `stagger`).
- Added group stagger logic (`data-ax-group`).
- Added `AnimX.scroll()`, `AnimX.refreshScroll()`, and `AnimX.unobserve()`.

## v0.5.0 - Timeline Engine (Completed)
- Added `AnimX.timeline()`.
- Implemented `tl.add()`, `tl.play()`, `tl.pause()`, `tl.resume()`, `tl.stop()`, `tl.restart()`, `tl.destroy()`.
- Supports sequential steps and same-time `<` groupings.
- Timeline uses existing `AnimX.animate()` logic directly.

## v0.6.0 - Stagger Engine (Completed)
- Added `AnimX.stagger()`.
- Added advanced stagger options (`each`, `from`, `grid`, `axis`).
- Upgraded `AnimX.animate()` and data-attribute scroll/load groups to use real stagger physics.
- Added stagger group controls (`group.play()`, `group.pause()`, etc).

## v0.7.0 - Text Animation Engine (Completed)
- Added `AnimX.text()`, `AnimX.splitText()`, and `AnimX.revertText()`.
- Implemented `chars`, `words`, and `lines` splitting.
- Added `typewriter`, `scramble`, and `counter` engines.
- Ensured strict accessibility protections via `aria-label` and `aria-hidden`.
- Seamlessly integrated text triggering into Timelines, Scroll API, and HTML `data-ax` APIs.

## v0.8.0 - Interaction Animation System (Completed)
- Added `AnimX.interact()`, `AnimX.hover()`, `AnimX.press()`, `AnimX.focus()`, `AnimX.magnetic()`, `AnimX.ripple()`, `AnimX.tilt()`, `AnimX.feedback()`.
- Added interaction data attributes (e.g. `data-ax-hover`, `data-ax-magnetic`).
- Added accessible focus/keyboard/touch-safe behaviors natively across interactions.
- Drag/gesture physics and advanced layout/FLIP are deferred to future updates.
- Parallax/pinned scenes are deferred.

## v0.9.0 - Component Preset Pack (Planned Next)
- Planned extension to add rich pre-built component animations.

## Technical Constraints (CRITICAL)
- No GSAP, Anime.js, Motion, or jQuery.
- Use only native browser APIs (`requestAnimationFrame`, `Element.animate`, `IntersectionObserver`, CSS).
- Final public output must remain one `dist/animx.css` and one `dist/animx.js`.

## Final User Usage Goal
Users should be able to use AnimX with:

<link rel="stylesheet" href="dist/animx.min.css">
<script src="dist/animx.min.js"></script>

## Build Output
dist/
├── animx.css
├── animx.min.css
├── animx.js
├── animx.min.js
└── animx.demo.html

## Current Version Scope
v0.1.0 implemented the core CSS animation preset system.
- Main animation families added (Fade, Slide, Zoom, Rotate, Flip, Blur, Reveal, Wipe, Skew, Bounce, Elastic, Pulse, Shake, Glow, Float, Loader, Skeleton, Background, SVG).
- Component preset classes added.
- Utility classes for duration, delay, easing, and state added.
JS animation engine is still not implemented.

## Current Public API Placeholders
AnimX.version
AnimX.config()
AnimX.init()
AnimX.ready()
AnimX.registerPreset()
AnimX.getPreset()
AnimX.getPresets()

## Development Rules
- Keep code clean and modular internally.
- Final public output must remain one CSS file and one JS file.
- Avoid unnecessary dependencies.
- Avoid unnecessary files.
- Avoid verbose comments.
- Avoid repeating already documented project context in every file.
- Use ANIMX_MEMORY.md as the project reference before making future changes.
- Update ANIMX_MEMORY.md whenever a new version adds important architecture, API, file structure, or rule changes.

## Token-Saving Rule for Future Prompts
When generating future implementation prompts, do not repeat the entire project history.
Instead, tell the coding agent:

"Before starting, read ANIMX_MEMORY.md and follow the existing project direction."
