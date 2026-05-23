# Advanced Button Effects (v3.22.0)

AnimX ships with a zero-dependency suite for executing complex button interaction choreographies natively.

## Hover & Focus Choreography
Using `AnimX.button()`, you can bind multiple interaction phases simultaneously. AnimX ensures that visual states bound to `hover` are automatically synced with `focus` bounds to ensure accessibility compliance.

```javascript
AnimX.button('.btn-primary', { 
  hover: 'button-glow',
  focus: 'button-focus-ring-pop' 
});
```

## Button State Machine
`AnimX.buttonState()` provides an API to transition a button visually between `idle`, `loading`, `success`, and `error` states.

```javascript
AnimX.buttonState('.btn-submit', { state: 'loading' });
```
