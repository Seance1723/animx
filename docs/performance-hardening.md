# Performance Hardening (v3.13.0)

In v3.13.0, AnimX added DOM-level Performance Auditing to prevent invisible memory leaks.

## Active Metrics Monitored
- **Active Instances**: Tracks how many `AnimationInstance` objects are alive.
- **SplitText Nodes**: Counts `.ax-char` and `.ax-word` spans. Warnings are thrown if > 500 exist, as this can cause heavy layout thrashing.
- **RAF Hooks**: (Studio only) Identifies ambient loops that failed to pause during `prefers-reduced-motion`.

## Running the Audit
In AnimX Studio, click the **Runtime Health** tab and select "Run Performance Audit".
