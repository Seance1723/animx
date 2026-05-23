# AnimX v3.32.0: Cross-Browser Compatibility & Fallback System

AnimX strictly adheres to a **Zero-Dependency** philosophy. We do not use external polyfills, heavy UA sniffers, or bloat our library to force unsupported APIs to work on legacy browsers.

Instead, we employ **Graceful Degradation** and **Native Feature Detection**.

## 1. Feature Support Matrix

| Feature | Support Tier | AnimX Strategy |
| --- | --- | --- |
| Web Animations API (WAAPI) | Tier 1 | Used for complex staggered and timeline sequences. |
| `IntersectionObserver` | Tier 1 | Used for all scroll reveals. If missing, effects immediately trigger ("No-Stuck-Hidden" rule). |
| CSS `clip-path` | Tier 2 | Used for image/text masking. If missing, falls back to `opacity` + `transform`. |
| CSS `mask-image` | Tier 2 | Same as `clip-path`. Maps to a simpler fade effect. |
| View Transitions API | Tier 3 (Enhancement) | Used for shared-element page transitions. Falls back to cross-fade. |
| `prefers-reduced-motion` | Critical | Hard override. Transforms collapse to 0.01ms duration. |

## 2. Fallback Registry

AnimX maintains an internal mapping of effects. If you trigger `AnimX.animate('.box', 'text-mask-up')` on an older browser that lacks `clip-path`, the engine automatically intercepts the request and swaps the effect with `text-fade-up`.

You can register custom fallbacks:

```javascript
AnimX.registerFallback('my-custom-mask', {
  requires: ['clipPath', 'cssVariables'],
  fallback: 'fade-up',
  reducedMotion: 'final-state'
});
```

## 3. "No-Stuck-Hidden" Safety

The most common failure in modern animation libraries is leaving content trapped at `opacity: 0` when an observer fails or JavaScript throws.

AnimX guarantees that if an effect fails to initialize due to a missing API, the engine immediately strips the `aria-hidden` attributes and resets the element to its final, visible state. 

## 4. Mobile & Touch Handling

AnimX disables heavy pointer-tracking (`cursorGlow`, `3D Tilt`) automatically if the device uses a coarse pointer or lacks hover capability, preventing unnecessary battery drain and layout thrashing.
