# Advanced Text Reveal Pack

AnimX v3.42.0 adds real line, word, character, mask, blur, stagger, and paragraph text reveal effects.

JavaScript:

```js
AnimX.text(".headline", {
  effect: "text-mask-up",
  split: "lines",
  duration: 800,
  stagger: 60,
  easing: "ease-out"
});
```

Data attributes:

```html
<h1 data-ax-text-effect="char-wave" data-ax-split="chars">
  Animate anything with AnimX
</h1>
```

Class usage:

```html
<span class="ax-word-fade-up">Readable text</span>
```

Ready effects include text, line, word, character, and paragraph reveal groups. Experimental effects are implemented but kept out of ready/playground promotion until broader browser QA.
