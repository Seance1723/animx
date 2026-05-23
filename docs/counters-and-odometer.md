# Counters and Odometers (v3.20.0)

Interpolate numbers visually using native math constraints.

```javascript
AnimX.counterText(".kpi", {
  from: 0,
  to: 12500,
  format: "compact", // Converts 12500 into "12.5K"
  duration: 2000
});
```

Counters automatically strip `NaN` outputs and gracefully default to displaying the `to` value immediately if reduced motion is enabled on the operating system.
