# Spatial Effects (v3.18.0)

Spatial effects bind native DOM event listeners (like `pointermove`) to dynamically update `--ax-pointer-x` and `--ax-pointer-y` CSS custom properties on your target element, allowing for Apple-TV style tilt and glare mechanics.

## Setup via JavaScript

```javascript
AnimX.spatial(".hero-visual", {
  effect: "spatial-depth-hover",
  perspective: 1000,
  depth: "medium"
});
```
