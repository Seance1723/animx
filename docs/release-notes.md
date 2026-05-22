# Release Notes

## v1.5.0 - Preset Expansion
- **Expanded Presets**: Added 300+ SCSS generated utility presets (entrance, exit, attention, transform, background, skeleton).
- **Preset API**: New JavaScript APIs (`AnimX.searchPresets()`, `AnimX.getPresetsByCategory()`) for querying metadata programmatically.
- **Utility Modifiers**: Introduced robust modifier classes like `.ax-infinite`, `.ax-fast`, `.ax-delay-300`, and `.ax-origin-center`.
- **Search Demo**: Added interactive preset search to the documentation.

## v1.4.0 - SVG Animation Pack
- **SVG Path Draw**: Draw and undraw SVG paths natively using `.ax-svg-draw`.
- **Dash Loops & Fill**: Infinite stroke dash animations and fill reveals.
- **Component Presets**: Logo build and icon draw macro sequences.
- **Accessibility**: Gracefully handles `prefers-reduced-motion` by instantly resolving SVG target states.

## v1.3.0 - Advanced Text Pack
- **Responsive Text Re-Splitting**: SplitText automatically responds to window resizes and font-load events.
- **Line Wrappers**: Advanced nested `ax-text-line-inner` wrappers enabling overflow-hidden line reveals.
- **Wave & Scramble**: Character-level physics, bounce waves, and numeric/hacker scramble effects.
- **Counters**: Animated numeric counters syncing natively with `Intl.NumberFormat`.

## v1.2.0 - Advanced Scroll System
- Added `AnimX.scrollProgress()`, `AnimX.parallax()`, `AnimX.pin()`, `AnimX.scrollScene()`, `AnimX.readingProgress()`.
- Uses a shared RAF scroll ticker to ensure maximum performance and avoid layout thrashing.
- Fully respects `prefers-reduced-motion` natively.

## v1.1.0 - Performance and Cleanup Upgrade
- Memory safety via WeakMaps and bucketed cleanup managers.
- Safe Null Object responses on missing DOM targets.

## v1.0.0 - Stable Public Release
- First stable public release. One CSS file, one JS file. Zero dependencies.
