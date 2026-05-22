# Quick Examples

Here are common use-cases to help you learn the AnimX syntax rapidly.

### 1. Basic Stagger
Stagger elements smoothly on load.
```html
<div class="card" data-ax="fade-up" data-ax-delay="0">1</div>
<div class="card" data-ax="fade-up" data-ax-delay="100">2</div>
<div class="card" data-ax="fade-up" data-ax-delay="200">3</div>
```

### 2. Scroll Reveal (JS)
Trigger animation when element enters the viewport.
```js
AnimX.scroll('.section-title', 'slide-left');
```

### 3. Timeline Sequence
Chain multiple items.
```js
AnimX.timeline()
  .add('.hero-title', 'text-rise')
  .add('.hero-subtitle', 'fade-up', { delay: 200 })
  .add('.hero-btn', 'zoom-in', {}, '-=100') // Overlap
  .play();
```

### 4. Interactions
Add physics-based hover states.
```js
AnimX.hover('.pricing-card', 'ax-button-lift');
AnimX.magnetic('.social-icon');
```
