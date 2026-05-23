import fs from 'fs';
import path from 'path';

const reportsDir = path.resolve(process.cwd(), 'dist/reports');
if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });

const distDir = path.resolve(process.cwd(), 'dist');
const rootDir = process.cwd();

const required = [
  { name: 'package.json', path: path.join(rootDir, 'package.json') },
  { name: 'README.md', path: path.join(rootDir, 'README.md') },
  { name: 'dist/animx.css', path: path.join(distDir, 'animx.css') },
  { name: 'dist/animx.min.css', path: path.join(distDir, 'animx.min.css') },
  { name: 'dist/animx.js', path: path.join(distDir, 'animx.js') },
  { name: 'dist/animx.min.js', path: path.join(distDir, 'animx.min.js') },
  { name: 'dist/animx.demo.html', path: path.join(distDir, 'animx.demo.html') }
];

const optional = [
  { name: 'LICENSE', path: path.join(rootDir, 'LICENSE') },
  { name: 'docs/release-notes.md', path: path.join(rootDir, 'docs/release-notes.md') },
  { name: 'docs/known-issues.md', path: path.join(rootDir, 'docs/known-issues.md') }
];

const missingRequired = [];
const missingOptional = [];
const invalidArtifacts = [];
const oversizedArtifacts = [];

for (const item of required) {
  if (!fs.existsSync(item.path)) {
    missingRequired.push(item.name);
  } else if (fs.statSync(item.path).size === 0) {
    invalidArtifacts.push(item.name + ' (empty)');
  }
}

for (const item of optional) {
  if (!fs.existsSync(item.path)) {
    missingOptional.push(item.name);
  }
}

const report = {
  version: '3.40.0',
  requiredArtifacts: required.map(r => r.name),
  optionalArtifacts: optional.map(o => o.name),
  missingRequired,
  missingOptional,
  invalidArtifacts,
  oversizedArtifacts,
  status: missingRequired.length > 0 ? 'blocked' : 'ready'
};

fs.writeFileSync(path.join(reportsDir, 'animx-final-artifact-verification.json'), JSON.stringify(report, null, 2));
console.log('Generated animx-final-artifact-verification.json. Status: ' + report.status);
