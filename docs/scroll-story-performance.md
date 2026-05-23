# Scroll Story Performance (v3.17.0)

AnimX ensures 60fps scrolling performance through targeted `IntersectionObserver` usage. 

The `requestAnimationFrame` loop responsible for mapping `window.scrollY` to DOM transformations is entirely dormant unless the story's parent section `isIntersecting` with the viewport.
