# AnimX Alpine.js Adapter

Seamlessly trigger AnimX animations directly from your Alpine components using the `x-animx` directive.

## Installation

```html
<script src="dist/animx.min.js"></script>
<script src="dist/adapters/animx.alpine.min.js"></script>
<!-- Make sure Alpine is loaded after AnimX! -->
<script src="//unpkg.com/alpinejs" defer></script>
```

## Usage

```html
<!-- Simple string -->
<div x-data x-animx="'fade-up'">Hello</div>

<!-- Options object -->
<div x-data x-animx="{ animation: 'card-lift', duration: 800, delay: 200 }">
  Complex Animation
</div>
```

The directive automatically cleans up the animation using `instance.destroy()` when the Alpine component unmounts.
