# Mesh Gradients & Auroras (v3.25.0)

`AnimX.aurora()` provides zero-dependency CSS-driven blurring techniques to create atmospheric layered glows typical of premium SaaS hero sections.

## Accessibility Caveat
Auroras often hurt contrast. AnimX does not automatically shift text colors. Always ensure your text layered over an Aurora uses proper contrast, or enable `.ax-backdrop-blur` on the text containers.

```javascript
AnimX.aurora('.aurora-container', { effect: 'bg-aurora-soft' });
```
