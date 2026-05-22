# Live Builder Engines

The Playground in AnimX v2.2.0 uses "Modes" to demonstrate our various specialized engines.

## 1. Presets Mode
The most common mode. It allows you to select from the 300+ built in CSS/WAAPI presets, tweak the timing, and copy the class or data-attributes.

## 2. Stagger Mode
Staggering allows you to animate a group of elements with a sequential delay.
**Controls:**
- **Base Animation:** Select `zoom-in`, `fade-up`, etc.
- **Stagger Delay:** The time between each element's animation start.
- **Origin (From):** Define the starting point of the stagger wave (e.g., `start`, `center`, `edges`, `random`).

## 3. Text Mode
The text engine safely manipulates DOM text for animation without breaking screen readers.
**Controls:**
- **Text Engine:** Choose between `split` (for chars/words), `typewriter`, or `scramble`.
- **Split By:** If using Split, choose whether to animate by Characters, Words, or Lines.
- **Animation:** Select the reveal animation for each part.

## 4. SVG Mode
The SVG engine demonstrates our native SVG path drawing capabilities.
**Controls:**
- **SVG Engine:** Choose between `draw` and `undraw`.
