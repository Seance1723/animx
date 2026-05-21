# Preset List

AnimX comes with an extensive registry of built-in animation presets categorized by their intended usage.

## 1. Core Animations
Basic CSS hardware-accelerated animations used as building blocks.
- `fade-in`, `fade-up`, `fade-down`, `fade-left`, `fade-right`
- `slide-up`, `slide-down`, `slide-left`, `slide-right`
- `zoom-in`, `zoom-out`
- `blur-in`, `blur-up`
- `bounce`, `glow-pulse`

## 2. Text Animations
Designed specifically for the `split` engine.
- `text-rise` (Words smoothly rise from hidden bottom)
- `text-slide-up`
- `text-fade`

## 3. Interaction Presets
Used by the interaction engine for macro triggers.
- `ax-button-press`
- `ax-card-lift`
- `ax-input-focus-glow`

## 4. Component Presets (v0.9.0)
High level recipes bridging Core and Interactions into UI structures. Applied via `data-ax-component`.

**Buttons**
- `button-lift`, `button-ripple`, `button-magnetic`, `button-loading-fill`

**Cards**
- `card-lift`, `card-tilt`, `card-fade-up`

**Modals & Toasts**
- `modal-pop`, `modal-fade`, `toast-slide`

**Loaders & Skeletons**
- `loader-spinner`, `loader-dots`
- `skeleton-shimmer`, `skeleton-pulse`

**Feedback**
- `input-error-shake`, `input-success-glow`

> Use `console.log(AnimX.getComponentPresets())` to see all available categorized presets dynamically.
