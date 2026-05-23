# Advanced Card Effects (v3.23.0)

AnimX ships with a dedicated `AnimX.card()` engine optimized for content-heavy card UIs, managing both entrance staggers and complex hover states simultaneously.

## Hover State Syncing
Hover states applied to cards (like `card-lift-soft`) automatically inject `focus` styles bound to the same logic to ensure screen readers and keyboard users receive visual feedback parity.

```javascript
AnimX.card('.product-card', { 
  entrance: 'card-fade-up',
  hover: 'card-lift-soft' 
});
```
