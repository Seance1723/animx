# Scene Builder Guide

This guide covers the basic workflow of using the AnimX Studio Scene Builder.

## 1. Creating a Scene
Launch `demo/studio.html`, navigate to **Timeline Scene Builder**, and click **Create New Scene**. This generates an empty scene with a default main track.

## 2. Managing Tracks
Tracks are visual lanes to help you separate your UI layers (e.g., "Backgrounds", "Typography", "Cards"). Tracks do not affect runtime execution, they only organize the builder.

## 3. Adding Steps
A Step represents a single animation command. When adding a step, you define:
- **Target**: The CSS selector (e.g., `.hero-title`).
- **Preset**: The AnimX primitive (e.g., `fade-up`).
- **Position**: Offset timing (e.g., `+=200` or `<` for overlap).
- **Duration / Delay**: Overrides for the core preset physics.

## 4. Exporting
Click the **Export Panel** to generate production-ready code.
- **JS Export**: Use this for complex overlapping scenes. Copy the `AnimX.timeline().add(...).play()` block into your application.
- **HTML Export**: Use this for simple sequential scenes where `data-ax-sequence` is sufficient. Note: Complex offsets (`<`) might require JS instead.
