# Variant Builder (v3.15.0)

A "Variant" is a saved, named combination of effects that you can reuse across your project. It prevents you from writing verbose effect chains repeatedly.

## Registering a Variant

```javascript
AnimX.registerVariant("premium-card-hover", {
  element: "card",
  effects: [
    { type: "entrance", effect: "fade-up" },
    { type: "hover", effect: "card-lift" },
    { type: "hover", effect: "card-spotlight-hover" }
  ],
  reducedMotion: "minimal-fade"
});
```

## Using a Variant in HTML

```html
<div data-ax-variant="premium-card-hover">
  I will fade up, lift on hover, and show a spotlight!
</div>
```
