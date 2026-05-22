# AnimX Framework Integrations

AnimX v2.6.0 introduces a zero-dependency **Framework Adapters / Integration Layer**. The core library remains untouched, but we now provide tiny, optional wrappers for common environments, along with best practices for component-based frameworks.

## Available Adapters

*   [jQuery Adapter](jquery-adapter.md) - Chainable `$.fn.animx()`
*   [WordPress Helper](wordpress-usage.md) - Safe block-editor initialization
*   [Webflow Helper](webflow-usage.md) - Native `window.Webflow.push` integration
*   [Alpine.js Adapter](alpine-usage.md) - Custom `x-animx` directive

## Component Frameworks

For modern reactive frameworks, AnimX needs no adapter! Just use standard refs and lifecycle hooks:

*   [React Usage](react-usage.md)
*   [Vue Usage](vue-usage.md)
*   [ES Module Usage](module-usage.md)
