# Gallery and Carousel Effects (v3.21.0)

`AnimX.gallery()` is a lightweight proxy to the `AnimX.stagger()` engine explicitly mapped for triggering grid cascades, masonry reveals, and stack staggering.

It avoids enforcing rigid slider styles or wrapper transformations, making it compatible natively with CSS Grid and Flexbox layouts.

```javascript
AnimX.gallery('.portfolio', { effect: 'gallery-grid-stagger', item: '.card' });
```
