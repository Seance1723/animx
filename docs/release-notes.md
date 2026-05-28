# Release Notes

## v3.41.0 - Animation Registry Rebuild, Capability Matrix, and Playground-Ready Metadata Foundation
- **Registry:** Added centralized effect registry schema, taxonomy, search helpers, and validation.
- **Capability Matrix:** Added element-first matrix output for playground and future module planning.
- **Playground Metadata:** Added readiness metadata without modifying `animxWebsite`.
- **Reports:** Added capability, playground readiness, effect cross-check, validation, search, and Graphify review JSON reports.
- **Preset Data:** Rebuilt `dist/animx.preset-data.json` around the new registry.
- **Rule:** Effects must not be marked `ready` unless implementation, usage mode, reduced-motion/fallback behavior, and metadata are verified.
- **Next Module:** v3.42.0 Advanced Text Reveal and Split Animation Pack.

## v3.40.0 — Final Stable Release Sign-Off and v4.0.0 Launch Readiness Gate
- **Final Sign-Off:** Passed final stable release sign-off with GO decision.
- **Go/No-Go:** All P0/P1 criteria pass. One P3 waiver granted (Safari 3D sub-pixel cosmetic issue).
- **Artifact Verification:** All required dist files verified present and non-empty.
- **Public API Freeze:** All v3.x public APIs frozen and backward-compatible.
- **Security/Accessibility:** No eval, no prototype pollution, reduced motion respected, content readable.
- **Known Issues Lock:** No P0/P1/P2 issues remain. Three P3 items documented and deferred.
- **v4 Launch Gate:** v4 preparation can begin after v3.41.0 launch buffer.
- **Follow-up:** Completed by v3.41.0 registry foundation work.
- **Sign-Off Reports:** Generated 9 final sign-off JSON reports in `dist/reports/`.

## v2.5.0 — Advanced SVG Morphing
- **Path Interpolation Engine:** Added `AnimX.svgMorph()` utilizing native requestAnimationFrame math.
- **Icon State Morphs:** Added built-in compatible presets for `menu-close`, `plus-minus`, and `play-pause`.
- **Validation Engine:** Added `AnimX.validateMorph()` to ensure path interpolation is safe before running.
- **Normalizer:** Added `AnimX.normalizePath()` for absolute conversion.
- **Zero Dependencies:** Maintained 0 external math libraries. Safe fallbacks (`fade`/`jump`) prevent crashes on incompatible geometry.
## v2.4.0 — Gesture and Drag Physics
- **Pointer Events Engine:** Added a zero-dependency gesture tracking system natively handling Pointer Events.
- **Interactions:** Added `AnimX.drag()`, `AnimX.swipe()`, `AnimX.pan()`, `AnimX.pinch()`, `AnimX.longPress()`.
- **Physics Simulators:** Included `inertia` and `spring` logic directly tied to `requestAnimationFrame` for 60fps tracking.
- **No-Code Data API:** Added `data-ax-drag`, `data-ax-swipe`, `data-ax-pinch`, and more for code-free initialization.
- **Drag Reorder:** Combined FLIP layouts with drag logic via `AnimX.dragReorder()`.
## v2.3.0 — Layout Motion System
- **Layout Engines:** Added `AnimX.flip()`, `AnimX.layout()`, `AnimX.expand()`, `AnimX.collapse()`, `AnimX.sharedElement()`, and `AnimX.swap()`.
- **Zero Dependencies:** All layout motion is achieved with native DOM measurements, WAAPI, and requestAnimationFrame.
- **Data Attributes:** Added `data-ax-layout="reorder|expand|swap"`, `data-ax-toggle`, and `data-ax-shared` for no-code layout integration.

## v2.2.0 — Playground and Live Builder Upgrade
- **Live Playground:** Added `dist/animx.playground.html` offering a zero-dependency interactive visual builder for Presets, Text, Stagger, and SVG animations.
- **Export Snippets:** The playground automatically generates copy-paste HTML, Data Attribute, and JS API snippets.
- **Local Storage:** The playground safely remembers your configurations using local storage.

## v2.1.0 — Documentation Site and Preset Gallery Upgrade
- **Local Docs & Demo:** Added `dist/animx.gallery.html`, `dist/animx.docs.html`, and `dist/animx.examples.html` for comprehensive local browsing of the library.
- **Preset Data Export:** Automated export of `dist/animx.preset-data.json` during build for tooling integration.
- **Improved DX:** Enhanced copy-paste capabilities for all 300+ presets straight from the gallery.

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
