# Build Health Report

In `dist/reports/`, AnimX emits multiple `.json` reports verifying its health for CI/CD pipelines:
1. `animx-build-health.json`: Asserts required files exist.
2. `animx-size-report.json`: Ensures files don't breach budgets.
3. `animx-tree-shaking-report.json`: Validates `sideEffects` configurations.
4. `animx-dist-audit.json`: Enforces minification strategies.
