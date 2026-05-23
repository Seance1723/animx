# Link and Anchor Effects (v3.22.0)

`AnimX.link()` manages native anchor hover and active interactions safely without stripping `href` or removing tab outlines globally.

## Underline Slides
For effects like `link-underline-slide`, AnimX constructs `span` elements dynamically and transitions their width rather than relying on heavy layout-thrashing background-size animations.

```javascript
AnimX.link('.nav-link', { effect: 'link-underline-slide' });
```
