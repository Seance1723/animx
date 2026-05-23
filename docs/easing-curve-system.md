# Easing Curve System (v3.19.0)

AnimX allows you to register and retrieve custom `cubic-bezier` curves programmatically. The engine runs strict Regex validation on bezier values to prevent code injection via data attributes.

## Registering Curves

```javascript
AnimX.registerEase("premium-smooth", "cubic-bezier(0.22, 1, 0.36, 1)");
```
