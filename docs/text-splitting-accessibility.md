# Text Splitting & Accessibility (v3.20.0)

GSAP SplitText and other text animation libraries often destroy accessibility by fracturing sentences into hundreds of isolated DOM nodes. 

To solve this, AnimX v3.20.0 implements an automatic accessibility guard:

1. **Caching:** The original string is extracted via `textContent`.
2. **Labeling:** The parent node receives an `aria-label` populated with the cached string.
3. **Hiding:** The fractured span fragments are assigned `aria-hidden="true"`.

```html
<!-- Original -->
<h1 class="target">Hello World</h1>

<!-- Rendered Output -->
<h1 class="target" aria-label="Hello World">
  <span aria-hidden="true">H</span>
  <span aria-hidden="true">e</span>
  <span aria-hidden="true">l</span>
  <span aria-hidden="true">l</span>
  <span aria-hidden="true">o</span>
</h1>
```
