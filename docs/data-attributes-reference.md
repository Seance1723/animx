# Data Attributes Reference

AnimX v3.42.0 Documentation.

This document covers data attributes reference.

> **Zero Dependency:** AnimX requires no external libraries.

## Text Reveal Attributes

```html
<h1
  data-ax-text-effect="text-mask-up"
  data-ax-split="lines"
  data-ax-duration="800"
  data-ax-stagger="60"
  data-ax-ease="ease-out"
>
  Animate anything with AnimX
</h1>
```

Supported split values: `chars`, `words`, `lines`, `words-and-chars`, `lines-and-words`.

Unknown text effects fail safely and keep text readable.
