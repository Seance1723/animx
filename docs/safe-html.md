# Safe HTML Swapping

AnimX provides layout transition tools like `AnimX.swap()` to animate content changes. As of v2.9.0, inserting raw HTML strings is strictly controlled.

## Limitations and Defaults
By default, **HTML string insertion is disabled**.

If you attempt:
```javascript
AnimX.swap('.container', '<img src="x" onerror="alert(1)">');
```
AnimX will log a warning and ignore the string. 

## Best Practice: Use Node Elements
Instead of passing strings, build your DOM safely and pass a `DocumentFragment` or `HTMLElement`:

```javascript
const newEl = document.createElement('div');
newEl.textContent = 'Safe string';
AnimX.swap('.container', newEl);
```

## Enabling HTML Strings
If you are confident the string is safe (e.g. static templates), you can enable it via config:

```javascript
AnimX.security({ allowHTMLStringSwap: true });
```
When enabled, AnimX will pass the string through `AnimX.safeHTML()`, which uses a lightweight `DOMParser` to strip `<script>` tags, inline event attributes (`onclick`), and `javascript:` links.

> **Warning:** `AnimX.safeHTML` is a defensive helper, not a replacement for a robust sanitizer like DOMPurify. Do not pass untrusted user input directly.
