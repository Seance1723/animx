# Release Notes

## v2.0.0 — Hero Release
*The production-ready zero-dependency animation library.*
- **Major Milestone:** Achieved 100% Core API stability and missing-target safety.
- **Demo & Docs:** Complete redesign of the Demo gallery and full rewrite of the Documentation.
- **Testing:** New headless, zero-dependency Node test runner asserting 17 distinct suites with zero failures.
- **Backward Compatibility:** All v1.x public APIs are completely preserved.

## v1.8.0 — Testing and Stability Release
- Implemented comprehensive 100% Core API safety. Missing DOM targets safely return dummy instances instead of crashing.
- Introduced `run.js` zero-dependency test runner, with 17 full test suites passed.

## v1.7.0 — No-Code / CMS Friendly Layer
- **HTML Sequence**: Added `data-ax-sequence` and `data-ax-step` for defining complex timelines directly in HTML.
- **Dynamic Observation**: Added `data-ax-observe` and `AnimX.observeCMS()` to auto-animate injected content.

## v1.6.0 - Developer Experience Upgrade
- **DX APIs**: Added `AnimX.diagnose()`, `AnimX.validate()`, `AnimX.inspect()`.
- **Smart Suggestions**: Added `AnimX.suggestPreset()` and integrated typo suggestions.

## v1.5.0 - Preset Expansion
- **Expanded Presets**: Added 300+ SCSS generated utility presets.
- **Search API**: Added `AnimX.searchPresets()`.

## v1.4.0 - SVG Animation Pack
- **Native SVG WAAPI**: Added `svgDraw`, `svgUndraw`, and `svgPathFollow`.

## v1.3.0 - Advanced Text Pack
- **Text Splitter**: Added accessible text splitting, ticker, and counters.

## v1.2.0 - Advanced Scroll System
- **Scroll Ticker**: Added `scrollProgress`, `parallax`, and `readingProgress`.

## v1.1.0 - Performance & Cleanup
- **WeakMap Registry**: Prevented memory leaks by mapping animations directly to DOM instances.

## v1.0.0 - Initial Stable Release
- **Core Engine**: Initial release of the WAAPI core and CSS registry.
