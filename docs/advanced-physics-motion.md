# Advanced Physics Motion (v3.19.0)

AnimX ships with a `requestAnimationFrame` physics runner that supports Spring, Inertia, Bounce, Snap, and Elastic UIs. It operates identically to heavy physics engines like Popmotion but mathematically maps the curves to avoid pulling down massive bundles.

## Setup via JavaScript

```javascript
AnimX.spring(".box", {
  stiffness: 180,
  damping: 18,
  mass: 1
});
```
