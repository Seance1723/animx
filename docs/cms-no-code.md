# AnimX CMS & No-Code Guide (v1.7.0)

AnimX includes a dedicated No-Code layer designed specifically for website builders like Webflow, WordPress (Elementor, Gutenberg), Framer, and pure static HTML sites. You can build advanced sequences without writing a single line of JavaScript.

## 1. The Core Aliases

AnimX has simplified data attributes for no-code environments:

- `data-ax-preset="fade-up"` (Alias for `data-ax`)
- `data-ax-scroll="zoom-in"` (Automatically applies `data-ax-trigger="scroll"`)
- `data-ax-trigger="hover"` (Alias for `data-ax-on`)

## 2. Dynamic Content (MutationObserver)

By default, if you inject new elements into the DOM (e.g., infinite scroll, AJAX pagination), AnimX will not see them. To fix this:

```html
<div class="product-grid" data-ax-observe="true">
  <!-- Items injected here will auto-animate -->
</div>
```

Or enable it globally via JS (if you are writing JS):
```javascript
AnimX.config({ cms: { observe: true } });
```

## 3. Stagger Lists Safely (`data-ax-items`)

Instead of applying a stagger delay to 50 individual children manually, apply it to the parent:

```html
<ul data-ax-items="fade-right" data-ax-delay-step="100" data-ax-trigger="scroll">
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>
```

## 4. CMS Recipes (`data-ax-recipe`)

Recipes are pre-coded animation sequences for complex components. AnimX ships with 13 standard recipes:
- `hero-saas-intro`
- `pricing-stagger-cards`
- `stats-counter-reveal`
- `section-soft-reveal`
...and more.

**Usage:**
```html
<div data-ax-recipe="stats-counter-reveal">
  <div data-ax-counter data-ax-to="100" data-ax-suffix="%">0</div>
  <div class="stat-label">Uptime</div>
</div>
```

## 5. Editor-Safe Mode

Animations can disrupt visual builders (like WordPress Elementor or Webflow Designer).
AnimX automatically detects builder environments (`wp-admin`, `elementor-editor-active`) and disables heavy animations on elements marked with `data-ax-editor-safe="true"`.

```html
<div data-ax-scroll="fade-up" data-ax-editor-safe="true">
  This will stay fully visible and interactive while inside the WP editor.
</div>
```
