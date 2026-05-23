# Image Masking and Clipping (v3.21.0)

For high-performance non-destructive media reveals, `AnimX.imageMask()` applies native `clip-path` polygon shapes to transition elements without triggering document reflows.

## Accessibility Safeguard
If `prefers-reduced-motion` is detected globally, all `imageMask()` calls will instantly skip the transition loop and unlock `clip-path: none`, making the image 100% visible immediately without JS ticking.

```javascript
AnimX.imageMask('.portrait', { effect: 'image-mask-reveal' });
```
