# Advanced Scroll Storytelling (v3.17.0)

AnimX now includes an advanced scroll storytelling orchestrator, allowing you to sequence multi-step animations scrubbed to the user's scroll progress without requiring massive external libraries.

## Setup via JavaScript

```javascript
AnimX.scrollStory(".story-section", {
  pin: true,
  scrub: true,
  scenes: [
    { target: ".story-title", effect: "text-scroll-fill", start: 0, end: 0.35 },
    { target: ".story-visual", effect: "image-scroll-scale", start: 0.2, end: 0.75 }
  ]
});
```
