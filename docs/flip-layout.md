# FLIP Layouts

The FLIP (First, Last, Invert, Play) technique allows you to animate elements smoothly even when their layout changes due to adding, removing, sorting, or filtering DOM nodes.

## Using `AnimX.flip()`

The easiest way to reorder elements is using the wrapper callback method. AnimX will measure the elements, run your DOM mutation, measure them again, and animate the delta using WAAPI.

```javascript
const btn = document.querySelector('#shuffleBtn');
const grid = document.querySelector('#grid');

btn.addEventListener('click', () => {
  // Pass the elements to animate, and a callback that changes their DOM order
  AnimX.flip('.card', () => {
    // Standard JS array shuffling
    for (let i = grid.children.length; i >= 0; i--) {
      grid.appendChild(grid.children[Math.random() * i | 0]);
    }
  }, {
    duration: 500,
    ease: 'smooth'
  });
});
```

## Advanced Manual FLIP

If you have async data fetching or need to separate your reads from your writes, you can measure layout states manually.

```javascript
// 1. Snapshot initial state
const firstState = AnimX.measureLayout('.card');

// 2. Perform async or complex DOM operations
await fetchNewGridData();
renderNewCards();

// 3. Snapshot new state
const lastState = AnimX.measureLayout('.card');

// 4. Animate the difference
AnimX.animateLayout(firstState, lastState, { duration: 600 });
```

## Options

- `duration` (Number): Transition time in ms.
- `ease` (String): Easing preset (`smooth`, `snappy`, `bounce`, `linear`).
- `scale` (Boolean): If true (default), AnimX will animate width/height changes using `transform: scale()`. If false, only position (`x`/`y`) is animated.
- `cleanup` (Boolean): If true (default), inline transforms are stripped upon completion.
