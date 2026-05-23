# SVG Draw and Path Motion (v3.26.0)

`AnimX.svgDraw()` leverages native CSS transitions on `stroke-dashoffset`. 

## Reduced Motion
If a user has `prefers-reduced-motion: reduce` enabled, the paths will snap to `stroke-dashoffset: 0` instantly, avoiding any drawing animation to comply with accessibility standards.
