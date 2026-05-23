# Depth Interactions (v3.18.0)

For multi-layered parallax, AnimX exports a `depthScene` API. You can define inner `data-ax-depth` attributes, and the engine will calculate varying degrees of translation across the Z-axis based on pointer interactions.

## Setup via JavaScript

```javascript
AnimX.depthScene(".hero-depth-scene", {
  layers: [
    { target: ".layer-back", depth: -40 },
    { target: ".layer-mid", depth: 0 },
    { target: ".layer-front", depth: 40 }
  ],
  trigger: "pointer",
  intensity: "soft"
});
```
