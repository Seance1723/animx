# Custom Preset Packs

Custom Presets in AnimX v3.8.0 allow you to safely extend AnimX's primitives without writing imperative code strings or evaluating unsafe JS.

## The Builder
Inside Studio's **Custom Preset Builder**, you can mix primitives (e.g., `fade-up`), configuration properties (`stagger`, `duration`, `ease`), and accessible fallback states (`reducedMotion: "final-state"`).

## Example JSON Structure
```json
{
  "name": "my-client-fade",
  "type": "element",
  "category": "entrance",
  "base": "fade-up",
  "options": {
    "duration": 600,
    "delay": 200,
    "ease": "smooth"
  },
  "dataAttributes": {
    "data-ax": "fade-up",
    "data-ax-duration": "600",
    "data-ax-delay": "200",
    "data-ax-ease": "smooth"
  },
  "reducedMotion": "final-state"
}
```

Studio blocks any imported pack containing `function()`, `eval()`, or `<script>` injections.
