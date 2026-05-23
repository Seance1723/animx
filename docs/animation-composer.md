# Animation Composer (v3.15.0)

The AnimX Animation Composer is a powerful runtime engine that allows you to safely stack multiple animation effects onto a single DOM element. 

Instead of choosing between an Entrance effect OR a Hover effect, the Composer merges them safely and manages their state interactions (e.g. `fade-up` then `card-lift`).

## Usage via JS

```javascript
AnimX.compose('.my-card', [
  { type: 'entrance', effect: 'fade-up' },
  { type: 'hover', effect: 'card-lift' }
]);
```
