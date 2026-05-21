# Performance

AnimX provides buttery-smooth 60fps animations by offloading processing to native C++ browser bindings wherever possible.

## Native Prioritization
1. **WAAPI (Web Animations API)**: Under the hood, `AnimX.animate()` compiles your parameters directly into WAAPI `element.animate()`. This keeps execution off the main JavaScript thread.
2. **Transform & Opacity**: AnimX presets strictly stick to compositing properties (`transform`, `opacity`, `filter`). It avoids layout-thrashing properties like `width`, `height`, or `margin`.
3. **Intersection Observer**: Scroll reveals use native Intersection Observers rather than expensive global `window.onscroll` loops.

## Cleanup & Memory Leaks
- All generated Timelines, Interactions, and Staggers expose a `.destroy()` method. 
- Calling `.destroy()` cancels pending `requestAnimationFrame` IDs, removes event listeners, and unobserves DOM nodes from the `IntersectionObserver`.

## Zero Dependency
The core engine is built in vanilla JS. There are no heavy string-parsing engines like GSAP TweenLite or bulky layout solvers. This ensures your final JS bundle stays under `15kb`.
