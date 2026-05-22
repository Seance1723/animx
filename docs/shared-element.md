# Shared Element Transitions

Shared Element transitions create the illusion of an element moving seamlessly from one screen/container to another. In AnimX, we achieve this without requiring a full SPA router.

## Using `AnimX.sharedElement()`

```javascript
// Click a thumbnail to open a modal
document.querySelector('.thumbnail').addEventListener('click', () => {
  // 1. Open the modal (standard DOM manipulation)
  document.querySelector('.modal').style.display = 'block';
  
  // 2. Run the shared element transition
  AnimX.sharedElement('.thumbnail', '.modal-hero-image', {
    duration: 600,
    ease: 'snappy'
  });
});
```

## How It Works under the Hood
1. AnimX measures the dimensions and position of the **Source Element** (`.thumbnail`) and the **Target Element** (`.modal-hero-image`).
2. It clones the Source Element.
3. It fixes the clone's position absolutely to the viewport on top of everything (`z-index: 9999`).
4. It hides the original Source and Target elements visually.
5. It uses GPU transforms to animate the clone's translation and scale until it perfectly covers the Target Element's footprint.
6. Upon completion, it destroys the clone and makes the Target Element visible.

## Options
- `duration`: Transition time in ms.
- `ease`: Easing preset (`smooth`, `snappy`, `bounce`, `linear`).
- `fade`: If true (default), crossfades the original elements. If false, relies entirely on the clone overlay.

## Limitations
- Shared elements work best with atomic UI pieces like images, colored boxes, or buttons.
- Because AnimX scales the clone, text within the shared element may stretch or squish. For complex multi-child component morphing, consider swapping the contents inside the destination container after the shared transition completes.
