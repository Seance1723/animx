# Scroll Story Accessibility (v3.17.0)

AnimX scroll stories respect the user's motion preferences.

If `prefers-reduced-motion: reduce` is detected by the engine on page load, `scrollStory` scrubbing is bypassed, and the DOM elements instantly shift to their final CSS opacities/transforms.
