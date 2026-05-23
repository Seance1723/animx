# Route Motion Packs (v3.27.0)

`AnimX.routeMotion()` safely intercepts specific navigational links.

## Link Filtering Fail-safes
AnimX automatically ignores:
1. `target="_blank"`
2. Cross-domain external links.
3. Links containing `javascript:` URIs.
4. Clicks modified by Ctrl, Meta, Shift, or Alt keys.
