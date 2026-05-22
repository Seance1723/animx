# Size Guide & Optimization

AnimX is obsessive about performance and payload size.

## Checking Sizes
You can check the size of the compiled library at any time by running:
```bash
npm run size
```

This will print a summary based on the latest build report.

## General Size Targets

While sizes fluctuate as features are added, our general targets are:

*   **animx.min.js (Full)**: ~50-70kb
*   **animx.min.css (Full)**: ~20-30kb
*   **animx.core.min.js (Core)**: ~15-25kb
*   **animx.core.min.css (Core)**: ~5-10kb

## Payload Best Practices
1.  **Use `.min.js` and `.min.css` in production**. Never ship the unminified source code.
2.  **Enable gzip / Brotli compression** on your server. Because AnimX uses a highly uniform internal API, compression algorithms can drastically reduce the final transit size by up to 70%.
3.  **Evaluate if you need the full build.** If you're building a landing page that only needs simple fade-in scroll animations, load `animx.core.min.js` instead.
