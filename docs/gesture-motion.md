# Gesture Motion System

AnimX v2.4.0 introduces a high-performance Pointer Events physics engine that runs completely free of external dependencies.

It translates pointer movements to GPU-accelerated CSS `transform` operations using `requestAnimationFrame`, ensuring a smooth 60fps interaction on both mobile and desktop devices.

## The Core Concept
The AnimX Gesture System avoids the main thread bottleneck by decoupling pointer coordinates from visual updates. When a user drags an element, the position is updated using `.style.transform` instead of costly `.style.left` and `.style.top` reflows.

## Supported Gestures
- **[Drag](drag-physics.md)**: Moves elements linearly, with optional bounds, spring, and inertia.
- **[Swipe](swipe-pan-pinch.md)**: Detects fast directional flicks.
- **[Pan](swipe-pan-pinch.md)**: Tracks continuous pointer velocity and deltas.
- **[Pinch](swipe-pan-pinch.md)**: Tracks dual-pointer scale ratios.
- **[Long Press](swipe-pan-pinch.md)**: Detects held interactions.
- **[Drag Reorder](drag-physics.md)**: Flips DOM nodes during drag for sorting.

## Generic Gesture Entry
If you want to apply multiple gestures at once, you can use `AnimX.gesture()`:

```javascript
AnimX.gesture('.card', {
  drag: { inertia: true },
  swipe: { direction: 'left', onSwipe: () => console.log('Swiped!') }
});
```

## Data Attributes
Gestures can also be initialized without JS using `data-ax-*` attributes.

```html
<div data-ax-drag data-ax-drag-inertia="true">Drag me</div>
<div data-ax-swipe="left">Swipe me left</div>
```

## Reduced Motion
When a user's OS has `prefers-reduced-motion` enabled:
- Dragging functions normally (it is direct user manipulation).
- Decorative physics like `inertia` and `spring` bounces are minimized or disabled.
