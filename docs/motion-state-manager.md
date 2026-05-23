# Motion State Manager (v3.16.0)

The AnimX Motion State Manager allows you to bind named animation variants to dynamic element states (e.g., `idle`, `loading`, `success`, `error`) without wiring up heavy custom DOM listeners.

## Usage via JS

```javascript
AnimX.state(".pricing-card", {
  initial: "idle",
  states: {
    idle: "premium-card-hover",
    selected: "card-selected-state-pop",
    disabled: "fade-muted"
  }
});

// Later, inside your app logic:
AnimX.setState(".pricing-card", "selected");
```
