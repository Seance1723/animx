import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const files = [
  'package.json',
  'scripts/size-check.js',
  'build-post.js',
  'src/js/animx.js',
  'src/js/core/devtools.js',
  'src/js/creative/creative-catalog.js',
  'src/js/studio/studio-delivery.js',
  'src/js/studio/studio-dom-scanner.js',
  'src/js/studio/studio-handoff.js',
  'src/js/studio/studio-package-builder.js',
  'src/js/studio/studio-project-state.js',
  'src/js/studio/studio-projects.js',
  'src/js/studio/studio-qa-runner.js',
  'src/js/studio/studio-preset-pack-manager.js',
  'src/js/studio/studio-recipe-library.js',
  'src/js/studio/studio-custom-preset-builder.js',
  'src/js/studio/studio-scene-schema.js',
  'src/js/studio/studio-home.js',
  'src/js/studio/studio-release-readiness.js',
  'src/js/studio/studio-ux-polish.js',
  'src/js/studio/studio-navigation.js',
  'src/js/studio/studio-core.js',
  'src/js/migration/compatibility-checker.js',
  'src/js/migration/deprecation-checker.js',
  'src/js/migration/preset-alias-mapper.js',
  'src/js/migration/data-attribute-migrator.js',
  'src/js/migration/studio-project-migrator.js',
  'src/js/lts/lts-api-audit.js',
  'src/js/coverage/coverage-matrix.js',
  'src/js/runtime/runtime-validator.js',
  'src/js/runtime/runtime-performance-audit.js',
  'src/js/runtime/runtime-cleanup-audit.js',
  'demo/studio.html',
  'demo/index.html',
  'demo/playground.html',
  'tests/core.test.js',
  'tests/dx.test.js',
  'tests/smoke.test.js',
  'tests/studio.test.js',
  'tests/registry.test.js'
];

files.forEach(f => {
  const p = path.resolve(__dirname, '../', f);
  if (fs.existsSync(p)) {
    let content = fs.readFileSync(p, 'utf8');
    content = content.replace(/3\.13\.0/g, '3.14.0');
    content = content.replace(/Animation Runtime Validation, Performance Hardening, and Demo Verification/g, 'Real-World Animation Pattern Library and Industry Demo Packs');
    fs.writeFileSync(p, content);
    console.log('Bumped', f);
  } else {
    console.warn('Not found', p);
  }
});
