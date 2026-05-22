# Imported HTML Safety

We take security seriously. AnimX uses a `DOMParser` to parse your pasted HTML into a virtual document tree *without* executing it in the browser's active window context.

During this process:
1. All `<script>` tags are removed entirely.
2. All inline `on*` attributes (like `onclick`, `onmouseover`) are stripped out.
3. All `javascript:` pseudo-protocols in URLs are blocked.
