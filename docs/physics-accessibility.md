# Physics Accessibility (v3.19.0)

Spring and Bounce UIs can trigger vestibular discomfort. The `AnimX.spring()` API reads `prefers-reduced-motion` at initialization. If true, the `requestAnimationFrame` loop never boots, and elements are immediately hard-jumped to their resting target coordinates.
