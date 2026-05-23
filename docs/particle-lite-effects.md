# Particle-Lite Systems (v3.25.0)

`AnimX.particleLite()` spawns tiny DOM nodes.

## The 50-Node Hard Cap
Because AnimX refuses to implement Canvas/WebGL layers, animating thousands of DOM nodes would crash mobile devices. AnimX strictly caps particle counts to `50` per container. If you request `count: 1000`, AnimX will safely override it to `50` to guarantee 60fps scrolling performance.
