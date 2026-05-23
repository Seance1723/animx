# Advanced Form Effects (v3.24.0)

AnimX offers a robust `AnimX.input()` API that orchestrates Focus, Blur, and Validation states natively without needing React state or Vue watchers.

## Validation Choreography
Validation animations map exactly to CSS variables and predefined keyframes like `input-error-shake`, ensuring that layout-thrashing doesn't occur during form submittals.

```javascript
AnimX.input('.user-input', { 
  focus: 'input-focus-glow',
  valid: 'input-success-pop',
  invalid: 'input-error-shake'
});
```
