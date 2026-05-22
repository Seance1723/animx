# Limitations of SVG Morphing

To maintain AnimX's strict **Zero-Runtime-Dependency** guarantee and tiny file footprint, we opted out of shipping a complex polygon subdivision algorithm.

## What This Means

**You must prepare your vectors in Illustrator / Figma before morphing.**
For the smoothest effect, ensure both shapes have the same number of anchor points.

**Unsupported Commands**
Extremely complex commands like Elliptical Arcs (`A`) or smooth quadratics (`T`) are currently treated as pass-throughs. If their structural counts match, they will interpolate. If they differ, the morph will fallback.

**No Crashing**
AnimX will **never** crash your app if you feed it garbage SVG data. It will simply validate as `ok: false` and instantly swap the `d` attribute (or cross-fade) instead of attempting an impossible interpolation.
