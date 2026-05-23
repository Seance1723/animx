# Advanced Background Effects (v3.25.0)

AnimX offers a robust `AnimX.background()` API that orchestrates atmospheric motion without requiring WebGL or Heavy Canvas renders.

## Performance Guarantees
All backgrounds are bound to `(prefers-reduced-motion: reduce)`. If triggered, infinite background gradients and auroras will snap to static states.

```javascript
AnimX.background('.hero-bg', { 
  effect: 'bg-mesh-gradient',
  speed: 'slow'
});
```
