# Custom Event Triggers (v3.16.0)

AnimX can now tap directly into your global application events using `CustomEvent`.

## Fire a Custom Trigger

```javascript
// Triggers the "cart:added" event globally
AnimX.trigger("cart:added");
```

## Listen via Data Attributes

```html
<div data-ax-trigger-event="cart:added" data-ax-then="toast-slide-up">
  Item added to cart!
</div>
```
