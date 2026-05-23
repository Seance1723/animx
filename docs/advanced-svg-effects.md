# Advanced SVG Effects (v3.26.0)

AnimX offers a robust suite of SVG APIs, including `AnimX.svgDraw()`, `AnimX.icon()`, and `AnimX.infographic()`. 

## getTotalLength Failsafes
AnimX securely computes `getTotalLength()` by temporarily flagging hidden nodes as visible during calculation, ensuring 100% accurate dash offsets.

```javascript
AnimX.svgDraw('.logo-path', { 
  effect: 'svg-draw-stagger',
  duration: 1200
});
```
