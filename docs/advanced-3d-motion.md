# Advanced 3D Motion (v3.18.0)

AnimX introduces native CSS 3D capabilities mapping hardware-accelerated transforms (like `rotateX`, `rotateY`, and `translateZ`) to reusable preset utilities like Cubes, Carousels, and Flips.

## Setup via JavaScript

```javascript
AnimX.threeD(".product-card", {
  effect: "product-3d-hover",
  perspective: 900,
  glare: true,
  reducedMotion: "minimal"
});
```
