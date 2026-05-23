# Advanced Text Effects

AnimX provides advanced, zero-dependency text effects.

## 1. Rolling Text
Swaps through an array of strings natively.
```html
<h1 
  class="ax-rolling-base" 
  data-ax-text-type="roll" 
  data-ax-values="Design|Build|Animate" 
  data-ax-animation="text-roll-up" 
  data-ax-interval="1600">
</h1>
```

## 2. Kinetic Typography
Uses character splitting and CSS custom properties for wave and bounce staggers.
```javascript
AnimX.creative('.kinetic-title', {
  type: 'kinetic',
  split: 'chars',
  animation: 'text-kinetic-wave',
  stagger: 24
});
```

## 3. Scroll Typography
Uses IntersectionObserver to map scroll progress directly into `--ax-scroll-progress`.
```html
<h2 class="text-scroll-fill" data-ax-text-type="scroll-fill">
  Scroll me to fill
</h2>
```

All effects automatically adhere to `prefers-reduced-motion: reduce`.
