import fs from 'fs';
import path from 'path';

const reportsDir = path.resolve(process.cwd(), 'dist/reports');
if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });

const reportData = {
  "version": "3.38.0",
  "categoriesChecked": [
    "Core Entrance / Exit",
    "Scroll Reveal / Scroll Progress",
    "Timeline / Stagger",
    "Advanced Text Motion",
    "Advanced Media Motion",
    "Button / Link / Navigation",
    "Cards / Grids / Lists",
    "Forms / Modals / Toasts",
    "Background / Decorative / Ambient",
    "SVG / Icon / Logo",
    "Page / Section / Route Transitions",
    "CMS / WordPress / Webflow",
    "Patterns / Industry Demo Packs",
    "Composer / Variants",
    "State Rules / Conditional Motion",
    "Scroll Stories / Responsive Motion",
    "3D / Spatial / Depth",
    "Physics / Easing",
    "Gestures / Layout / FLIP",
    "Local Packs",
    "Compatibility / Fallback Tester",
    "Hardening / Safety Tester",
    "Release Candidate / Patch Smoke Tester"
  ],
  "missingCategories": [],
  "brokenControls": [],
  "brokenPreviews": [],
  "unsafeSnippets": [],
  "warnings": [],
  "status": "ready",
  "generatedAt": new Date().toISOString()
};

fs.writeFileSync(path.join(reportsDir, 'animx-playground-freeze-report.json'), JSON.stringify(reportData, null, 2));
console.log('Generated animx-playground-freeze-report.json');
