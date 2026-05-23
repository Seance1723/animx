# Conditional Animation Rules (v3.16.0)

Conditional rules allow you to query the browser's native `matchMedia` properties (like viewport size or `prefers-reduced-motion`) before dispatching an animation.

## Usage via Data Attributes

```html
<div 
  data-ax-when-viewport="mobile" 
  data-ax-then="fade-up" 
  data-ax-else="section-curtain-reveal">
</div>
```
