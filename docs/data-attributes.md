# Data Attributes

AnimX parses your DOM on initialization to look for specific `data-ax` directives, allowing you to build rich motion interfaces declaratively without writing Javascript.

## Standard Setup
- **`data-ax="preset-name"`**: The preset to animate. (e.g. `fade-up`).
- **`data-ax-duration="500"`**: Animation duration in ms.
- **`data-ax-delay="200"`**: Start delay in ms.
- **`data-ax-ease="smooth"`**: Easing curve (`smooth`, `linear`, `spring`, etc.).
- **`data-ax-repeat="infinite"`**: Number of repetitions.
- **`data-ax-disabled`**: Completely disables AnimX from picking up this element.

## Triggers
- **`data-ax-on="load"`** (Default): Triggers instantly when initialized.
- **`data-ax-on="scroll"`**: Triggers when the element intersects the viewport.
- **`data-ax-on="manual"`**: Prevents auto-playing. You must trigger it via `AnimX.run(element)`.

## Scroll Modifiers
- **`data-ax-threshold="0.5"`**: The element must be 50% visible before triggering.
- **`data-ax-once="false"`**: Set to false to allow the animation to reverse and replay on scroll leave/enter.

## Text Modifiers
- **`data-ax-text="chars"`**: Splits and staggers text. Values: `chars`, `words`, `lines`, `typewriter`, `scramble`, `counter`.

## Interaction & Component Directives
- **`data-ax-hover="preset"`**: Plays preset on hover.
- **`data-ax-press="preset"`**: Plays preset on mousedown/touchstart.
- **`data-ax-magnetic`**: Enables cursor-pulling physics.
- **`data-ax-tilt`**: Enables 3D perspective mouse tilting.
- **`data-ax-ripple`**: Enables material-style click ripples.
- **`data-ax-component="card-lift"`**: Attaches a macro behavior encompassing interactions, styles, and a11y parameters.
