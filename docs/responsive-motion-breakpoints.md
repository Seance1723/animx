# Responsive Motion Breakpoints (v3.17.0)

Responsive Motion uses `matchMedia` logic to automatically swap out the animation variant mapped to an element based on the user's current device viewport width.

## Setup via JavaScript

```javascript
AnimX.responsiveMotion(".hero-title", {
  mobile: "fade-up",
  tablet: "text-mask-up",
  desktop: "text-kinetic-wave"
});
```
