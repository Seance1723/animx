# AnimX Launch Checklist

Before deploying AnimX to production, verify the following:

1. **Build Quality:** Ensure `npm run build` completes with zero errors and generates `animx.min.js` and `animx.min.css`.
2. **Testing:** Run `npm test` and ensure all test suites pass.
3. **Missing Targets:** Confirm that if you initialize animations on dynamic elements that might not exist yet, your code does not crash (e.g. `AnimX.animate('.might-not-exist', 'fade-up')` is perfectly safe).
4. **Reduced Motion:** Test your site with `prefers-reduced-motion` enabled in your OS settings to guarantee elements are instantly revealed and usable.
5. **Console:** Check your browser console to ensure there is no debug spam in production.
6. **Demo Verification:** Ensure `dist/animx.demo.html` correctly references the minified assets.
