# Copy-Paste Recipes

Need to implement common animation patterns quickly? Use these recipes. You can also view these live in `dist/animx.examples.html`.

### 1. Fade Up On Scroll (HTML Only)
Wait for the element to enter the viewport, then fade it up. No JS required.
```html
<div data-ax-scroll="fade-up" data-ax-duration="800">
  I will reveal on scroll!
</div>
```

### 2. Stagger Cards
Animate a grid of cards radiating from the center.
```js
AnimX.stagger('.card', 'zoom-in', { 
  stagger: 50, 
  direction: 'center', 
  duration: 400 
});
```

### 3. Hero Sequence
Chain animations logically so they fire one after the other.
```js
AnimX.timeline()
  .add('.hero-title', 'text-rise')
  .add('.hero-subtitle', 'fade-up', { delay: 200 })
  .add('.hero-button', 'zoom-in', {}, '-=100') // Overlap
  .play();
```

### 4. Text Reveal
Split a paragraph into words and reveal them accessibly.
```js
AnimX.text('.quote', { 
  type: 'split', 
  splitType: 'words', 
  animation: 'fade-up' 
});
```

### 5. SVG Draw
Draw an SVG path organically.
```js
AnimX.svgDraw('.icon-path', { duration: 1500 });
```

### 6. CMS Dynamic Observation
Automatically animate elements injected via AJAX, WordPress, or Webflow.
```html
<!-- HTML Node -->
<div data-ax-observe data-ax="fade-up">Dynamic Node</div>

<!-- JS -->
<script>
  AnimX.observeCMS();
</script>
```
