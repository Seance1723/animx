# AnimX Project Memory

**Project**: AnimX
**Current Version**: 1.6.0
**Core Goal**: Zero-dependency browser animation library. Output only one CSS file and one JS file.

## Version History
- **v0.0.1** - Foundation
- **v0.1.0** - Core CSS animation preset system
- **v0.2.0** - JavaScript Animation API
- **v0.3.0** - Data Attribute Engine
- **v0.4.0** - Scroll Reveal Engine
- **v0.5.0** - Timeline Engine
- **v0.6.0** - Stagger Engine
- **v0.7.0** - Text Animation Engine
- **v0.8.0** - Interaction Animation System
- **v0.9.0** - Component Preset Pack
- **v1.0.0** - Stable Public Release
- **v1.1.0** - Performance and Cleanup Upgrade
- **v1.2.0** - Advanced Scroll System
- **v1.3.0** - Advanced Text Pack
- **v1.4.0** - SVG Animation Pack
- **v1.5.0** - Preset Expansion
- **v1.6.0** - Developer Experience Upgrade
  - Added debug helpers (`AnimX.debug()`) and structured error codes.
  - Added inspect, validate, diagnose, features, versionInfo.
  - Added preset suggestions and example generators.
  - Added Demo UI Diagnostics panel.
  - Runtime dependency remains zero, output remains 1 CSS + 1 JS.
- **v1.7.0** - No-Code / CMS Friendly Layer (Recipes, Observers, Aliases)
- **v1.8.0** - Testing and Stability Release (100% Core coverage, strict target safety, zero-dependency test runner, QA demo section)

## Completed Milestones

- **v1.0.0**: Stable Public Release (Core Engine)
- **v1.1.0**: Performance & Cleanup (WAAPI standardization)
- **v1.2.0**: Advanced Scroll System (Parallax, Progress, Scenes)
- **v1.3.0**: Advanced Text Pack (Re-splitting, Scramble, Typing)
- **v1.4.0**: SVG Animation Pack (Strokes, Undraw, Progress)
- **v1.5.0**: Preset Expansion (>300 Utility & UI combinations)
- **v1.6.0**: Developer Experience Upgrade (Debug, Inspect, DX tools)
- **v1.7.0**: No-Code / CMS Friendly Layer (Recipes, Observers, Aliases)
- **v1.8.0**: Testing and Stability Release (100% Core coverage, strict target safety, zero-dependency test runner, QA demo section)

## Current Objective

**AnimX v1.9.0**
*(Pending Requirements)*

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

## v0.9.0 - Component Preset Pack (Completed)
- Added `AnimX.component(target, presetName, options)`.
- Added `AnimX.getComponentPresets()` and `AnimX.getPresetCategories()`.
- Added 100+ logical component presets (Buttons, Cards, Modals, Loaders, Toasts, Skeletons, etc).
- Integrated `data-ax-component` attribute into `data-api.js` and `scroll-parser.js`.
- Component Presets: 100+ native `data-ax-component` recipes automatically compiled into the single CSS output.
- Documentation & Demo: Comprehensive gallery and docs generated for `v1.0.0`.
- Local Dev: Local dev uses root index.html (`npm run dev` at port 5173). Preview uses port 4173. `dist/animx.demo.html` is generated during build.
- Component preset engine dynamically routes to physics drivers (Ripple, Hover, Magnetic, Tilt, Feedback) securely without duplicating core logic.
- Implemented lightweight SCSS mixin assignments instead of heavy `@extend` paths to keep bundle small.
- AnimX is NOT a UI framework; presets only provide animations, not state logic.

## v1.0.0 - Stable Public Release (Completed)
- Finalized public API stability using `requestAnimationFrame`, `Element.animate`, and `IntersectionObserver`.
- Final output maintained as one `dist/animx.css` and one `dist/animx.js`.
- Verified cross-browser performance and accessibility (reduced motion).

## v1.1.0 - Performance and Cleanup Upgrade (Completed)
- Implemented `scheduler.js` for lightweight `requestAnimationFrame` batching.
- Implemented `instance-registry.js` (`WeakMap`) to safely track element initialization and prevent duplicate runs.
- Implemented `cleanup-manager.js` to manage temporary event listeners and DOM lifecycle via buckets.
- Implemented `safe-instance.js` returning Null Object patterns for missing DOM targets without crashing.
- Implemented `debug.js` with `warnOnce` functionality to prevent console spam.
- Integrated `AnimX.destroy()` cascading to clear timelines, staggers, interactions, and data trackers cleanly.

## v1.2.0 - Advanced Scroll System (Completed)
- Added `AnimX.scrollProgress()`, `AnimX.parallax()`, `AnimX.pin()`, `AnimX.scrollScene()`, `AnimX.readingProgress()`.
- Added advanced scroll data attributes (`data-ax-scroll-progress`, `data-ax-parallax`, etc.).
- Uses shared scroll ticker and RAF batching to prevent layout thrashing.
- Runtime dependency remains zero. Final output remains one CSS and one JS file.
- Advanced layout/FLIP is still not implemented.
- Drag/gesture physics is still not implemented.
- Next planned version: v1.3.0 Advanced Text Pack.

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

## Current Public API
AnimX.version
AnimX.config()
AnimX.init()
AnimX.ready()
AnimX.registerPreset()
AnimX.getPreset()
AnimX.getPresets()
AnimX.getComponentPresets()
AnimX.getPresetCategories()
AnimX.animate()
AnimX.replay()
AnimX.reset()
AnimX.stop()
AnimX.destroy()
AnimX.refresh()
AnimX.run()
AnimX.scroll()
AnimX.refreshScroll()
AnimX.unobserve()
AnimX.timeline()
AnimX.stagger()
AnimX.text()
AnimX.splitText()
AnimX.revertText()
AnimX.interact()
AnimX.hover()
AnimX.press()
AnimX.focus()
AnimX.magnetic()
AnimX.ripple()
AnimX.tilt()
AnimX.feedback()
AnimX.component()
AnimX.scrollProgress()
AnimX.parallax()
AnimX.pin()
AnimX.scrollScene()
AnimX.readingProgress()

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
