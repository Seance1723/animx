# Advanced Page Transitions (v3.27.0)

AnimX offers an opt-in page transition architecture, avoiding automatic hijacking of all browser links.

## Safe Usage
```javascript
AnimX.pageTransition({
  enter: 'page-fade-in',
  exit: 'page-fade-out',
  reducedMotion: 'instant'
});
```

By default, users must trigger exits manually or through the explicit `AnimX.routeMotion()` interceptor.
