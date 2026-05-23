# Spotlight and Cursor Tracking (v3.25.0)

`AnimX.spotlight()` binds to `mousemove` natively.

## Containment Strategy
To preserve main-thread performance, AnimX binds the mouse tracker **exclusively** to the target container, rather than the global `document.body`. This ensures calculations only run when the user is hovering over the exact spotlight component.

```javascript
AnimX.spotlight('.feature-card', { effect: 'bg-spotlight-cursor' });
```
