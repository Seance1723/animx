import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, '../dist');

const requiredFiles = [
  'animx.css',
  'animx.min.css',
  'animx.js',
  'animx.min.js',
  'animx.demo.html',
  'animx.core.css',
  'animx.core.min.css',
  'animx.core.js',
  'animx.core.min.js',
  'animx.version.json',
  'animx.bundle-report.json',
  'adapters/animx.jquery.min.js',
  'adapters/animx.alpine.min.js',
  'adapters/animx.wordpress.min.js',
  'adapters/animx.webflow.min.js'
];

let failed = false;

if (!fs.existsSync(distPath)) {
  console.error('❌ dist/ directory not found');
  process.exit(1);
}

for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(distPath, file))) {
    console.error(`❌ Missing file: ${file}`);
    failed = true;
  }
}

// Check version in JS
const jsContent = fs.readFileSync(path.join(distPath, 'animx.min.js'), 'utf-8');
if (!jsContent.includes('2.7.0')) {
  console.error('❌ animx.min.js does not contain version 2.7.0');
  failed = true;
}

// Check CSS rules
const cssContent = fs.readFileSync(path.join(distPath, 'animx.min.css'), 'utf-8');
if (!cssContent.includes('prefers-reduced-motion')) {
  console.error('❌ animx.min.css is missing prefers-reduced-motion rule');
  failed = true;
}

if (failed) {
  process.exit(1);
} else {
  console.log('✅ AnimX dist verification passed.');
}
