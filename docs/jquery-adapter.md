# AnimX jQuery Adapter

A lightweight wrapper that allows you to use AnimX natively inside jQuery chains without bloating the core.

## Installation

Include the adapter *after* the core library:

```html
<script src="dist/animx.min.js"></script>
<script src="dist/adapters/animx.jquery.min.js"></script>
```

## Usage

You can use `animx()` on any jQuery collection:

```javascript
// Basic animation
$(".box").animx("fade-up").addClass("active");

// With options
$(".card").animx("animate", "card-lift", { duration: 800 });

// Advanced modules
$(".title").animx("text", { animation: "text-rise", split: "chars" });
$(".grid").animx("stagger", "fade-up", { stagger: 100 });
```

## Supported Methods

The first argument acts as the command (matching core API modules):

*   `"animate"` (Default)
*   `"component"`
*   `"scroll"`
*   `"text"`
*   `"stagger"`
*   `"svg"`
*   `"layout"`
*   `"drag"`
*   `"gesture"`
*   `"destroy"`
*   `"refresh"`
