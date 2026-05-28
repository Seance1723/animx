# Text Split Engine

The v3.42 text split engine supports:
- `chars`
- `words`
- `lines`
- `words-and-chars`
- `lines-and-words`

Generated classes:
- `ax-split`
- `ax-split-line`
- `ax-split-word`
- `ax-split-char`
- `ax-text-mask`
- `ax-text-line`
- `ax-text-word`
- `ax-text-char`

Generated data markers:
- `data-ax-split-origin`
- `data-ax-split`
- `data-ax-split-id`
- `data-ax-split-active`

`AnimX.revertText(target)` restores the captured original content and removes generated split markers.
