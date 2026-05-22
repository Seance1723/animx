# Release Notes

## v1.2.0 - Advanced Scroll System
- Added `AnimX.scrollProgress()`, `AnimX.parallax()`, `AnimX.pin()`, `AnimX.scrollScene()`, `AnimX.readingProgress()`.
- Uses a shared RAF scroll ticker to ensure maximum performance and avoid layout thrashing.
- Fully respects `prefers-reduced-motion` natively.

## v1.1.0 - Performance and Cleanup Upgrade
- Memory safety via WeakMaps and bucketed cleanup managers.
- Safe Null Object responses on missing DOM targets.

## v1.0.0 - Stable Public Release
- First stable public release. One CSS file, one JS file. Zero dependencies.
