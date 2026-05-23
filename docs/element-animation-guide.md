# Element Animation Guide

A quick reference on how to animate common elements.

## Modals
Use the `.ax-modal-pop` class and toggle `.ax-active` via JS. The pop effect will run. It will instantly degrade to a simple opacity toggle if reduced motion is enabled.

## Numbers & KPI
```javascript
AnimX.animate('#kpi-demo', 'kpi-number-roll', { value: 5000 });
```

## Navigation Links
Apply the class `ax-nav-link-underline-slide` directly to your `<a>` tags. No JS required.

## Backgrounds
Apply `.ax-bg-aurora` to your page wrapper. Note: Background animations are completely disabled when users request reduced motion.
