# Layout Motion System

AnimX v2.3.0 introduces a zero-dependency **Layout Motion System** designed to animate elements when their physical dimensions or positions in the DOM change. 

Unlike GSAP's Flip plugin or Framer Motion, AnimX achieves this entirely with the native Web Animations API and CSS transforms, ensuring a tiny bundle size and exceptional performance.

## Core Layout Engines

AnimX provides specialized layout functions for common tasks:

### 1. FLIP (Reorder & Filter)
Animate elements when they move in the DOM (e.g., shuffling a grid or filtering a list). See [FLIP Layouts](flip-layout.md).

### 2. Expand & Collapse
Animate to/from `height: auto` smoothly without forced layout thrashing or CSS `max-height` hacks.

```javascript
// Expand a panel to its natural scrollHeight
AnimX.expand('.faq-content', { duration: 400 });

// Collapse a panel to 0 height
AnimX.collapse('.faq-content', { duration: 400 });

// Toggle between states
AnimX.toggleExpand('.faq-content', { ease: 'snappy' });
```

### 3. Shared Elements
Visually transition an element from one container to another by cloning it and morphing its position. See [Shared Elements](shared-element.md).

### 4. Content Swap
Safely swap the `innerHTML` or DOM nodes of a container while crossfading or sliding.

```javascript
AnimX.swap('.content-area', '<p>New Data</p>', {
  animation: 'fade-slide', // or 'fade', 'scale', 'blur'
  duration: 500
});
```

## Data Attributes

Layout animations can also be triggered directly from HTML without writing Javascript:

```html
<!-- Automatically reorder cards when they change -->
<div class="grid" data-ax-layout="reorder" data-ax-layout-items=".card">...</div>

<!-- Auto-bind a toggle button to expand/collapse -->
<button data-ax-toggle="#faq-1">Toggle Panel</button>
<div id="faq-1" data-ax-layout="expand">Panel Content</div>
```

## Performance & Accessibility

- **Batched Reads/Writes:** AnimX uses `requestAnimationFrame` to batch DOM measurements separately from mutations.
- **Transforms Only:** Layout motion runs entirely on GPU-accelerated `transform` and `opacity` where possible.
- **Reduced Motion:** If a user's OS has `prefers-reduced-motion` enabled, FLIP animations jump instantly to their final positions to prevent motion sickness.
