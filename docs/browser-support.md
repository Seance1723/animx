# Browser Support

AnimX relies on the **Web Animations API (WAAPI)**, `IntersectionObserver`, and standard CSS3 variables.

### Modern Browser Support
AnimX is fully supported in:
- Chrome 75+
- Firefox 71+
- Safari 13.1+
- Edge 79+

### Graceful Fallbacks
For older browsers (e.g. IE11) lacking `Element.animate()` or `IntersectionObserver`:
- **CSS Engine:** Presets applied via class name (e.g. `class="ax-fade-up"`) will still animate via CSS transitions if the browser supports them.
- **JS Engine:** The JavaScript methods fail safely by instantly setting the elements to their final target states (opacity 1, transform none).
- No polyfills are strictly required, protecting performance, provided your design can gracefully fallback to non-animated states.
