# Menu and Dropdown Motion (v3.22.0)

AnimX exposes `AnimX.dropdown()` and `AnimX.mobileMenu()` to safely animate collapsible layout areas while automatically maintaining `aria-expanded` attributes on the triggers.

```javascript
AnimX.dropdown('.dropdown', {
  trigger: '.dropdown-toggle',
  panel: '.dropdown-panel'
});
```
