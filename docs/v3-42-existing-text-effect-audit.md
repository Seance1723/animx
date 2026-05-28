# v3.42 Existing Text Effect Audit

Existing text effects found:
- `text-rise`
- `text-slide-up`
- `text-mask-up`
- `text-fade`
- `text-wave`, `text-char-wave`, `text-word-wave`
- `text-swap-up`, `text-swap-fade`
- `text-gradient-shift`, `text-gradient-pulse`, `text-gradient-sweep`
- rolling, ticker, scramble, counter, marquee API families

Working effects before this module:
- Basic split text
- Basic CSS text rise/slide/mask classes
- Revert through `AnimX.revertText()`

Broken or incomplete behavior found:
- `options.effect` was not normalized for `AnimX.text()`.
- `data-ax-text-effect` was parsed but not scanned unless another data attribute was present.
- Split wrappers could lose `ax-text-*` classes when animated through the CSS driver.
- Split data markers requested for v3.42.0 were missing.

Duplicate text effect names:
- Some text names existed in generated expanded presets and basic CSS presets. The registry deduplicates by normalized id.

Metadata-only text effects:
- Generated text preset names that did not map to verified implementation remain `needs-review`.

Ready text effects fixed in this module:
- `text-fade-in`, `text-fade-up`, `text-fade-down`, `text-slide-up`, `text-slide-down`, `text-blur-in`, `text-blur-to-sharp`, `text-mask-up`, `text-mask-down`, `text-mask-left`, `text-mask-right`
- `line-mask-up`, `line-mask-down`, `line-curtain-reveal`, `line-stagger-up`
- `word-fade-up`, `word-slide-up`, `word-mask-up`, `word-blur-reveal`, `word-random-reveal`
- `char-fade-up`, `char-slide-up`, `char-rotate-in`, `char-flip-x`, `char-flip-y`, `char-random-reveal`, `char-wave`, `char-domino`, `char-elastic-pop`, `char-center-out`, `char-edge-in`
- `paragraph-line-build`

Experimental text effects implemented:
- `char-spiral-in`, `char-scatter-in`, `char-gather-in`, `word-wave-reveal`, `line-overlap-reveal`, `text-clip-reveal`, `text-block-reveal`, `text-highlight-reveal`

Text demos/snippets referencing missing effects:
- `demo/text.html` referenced `scramble`, which belongs to later text modules. The demo was updated to compact v3.42 text reveal examples.
