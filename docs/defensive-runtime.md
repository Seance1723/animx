# Defensive Runtime Details

AnimX implements specific "guard rails" to prevent malformed data from taking down your UI.

## Safe Selector Normalization
If a CMS or script passes an invalid CSS selector (e.g., `data-ax-toggle="[bad-selector"`), standard `document.querySelectorAll` will crash the execution stack.
AnimX wraps selection in `try/catch` using `AnimX.safeSelector()`, gracefully ignoring the bad selector.

## Safe Object Merging
When applying configuration arrays or options objects, AnimX recursively validates the keys. The keys `__proto__`, `prototype`, and `constructor` are hard-blocked, eliminating standard prototype pollution vectors.

## Data Attribute Validation
Numeric `data-ax-*` attributes (like `data-ax-duration="slow"`) are safely run through parsers. Invalid types fall back to defaults rather than causing `NaN` animation exceptions.
