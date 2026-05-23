# 3D Motion Accessibility (v3.18.0)

CSS 3D rotations can cause intense visual discomfort. By default, `AnimX.spatial()` checks `matchMedia('(prefers-reduced-motion: reduce)')`. If detected, the JS pointer tracking aborts, and all `preserve-3d` CSS modifiers collapse into flat 2D opacities via Media Queries.
