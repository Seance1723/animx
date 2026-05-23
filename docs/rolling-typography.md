# Rolling Typography & Slot Machines (v3.20.0)

You can build carousels and slot-machine style text loops using `AnimX.rollText()` or `AnimX.slotText()`.

## Usage

```javascript
AnimX.rollText(".role", {
  values: ["Design", "Build", "Animate"],
  interval: 1600
});
```

These functions use internal `setInterval` loops. If `prefers-reduced-motion` is detected, the loop will instantly cancel and default to rendering the final value in the array.
