# Transform Composition

When stacking multiple effects (e.g. an Entrance that `translatesY` and a Hover that `translatesY`), you run the risk of CSS transform overwriting.

The Composer's `validateChain()` function statically analyzes your composed arrays and issues `console.warn()` alerts if you stack overlapping effects that might cause jank or overwrites, allowing you to catch layout bugs before production.
