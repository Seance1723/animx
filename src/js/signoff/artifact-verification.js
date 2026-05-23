import { VERSION } from './signoff-utils.js';
import { generateArtifactReport } from './signoff-report-generator.js';

export function verifyArtifacts(fileChecker) {
  const required = [
    'package.json', 'README.md',
    'dist/animx.css', 'dist/animx.min.css',
    'dist/animx.js', 'dist/animx.min.js',
    'dist/animx.demo.html'
  ];
  const optional = [
    'CHANGELOG.md', 'LICENSE',
    'docs/release-notes.md', 'docs/known-issues.md',
    'dist/reports/animx-final-stable-signoff-report.json',
    'dist/reports/animx-final-go-no-go-report.json'
  ];

  const missingRequired = fileChecker ? required.filter(f => !fileChecker(f)) : [];
  const missingOptional = fileChecker ? optional.filter(f => !fileChecker(f)) : [];

  return generateArtifactReport({
    requiredArtifacts: required,
    optionalArtifacts: optional,
    missingRequired,
    missingOptional,
    invalidArtifacts: [],
    oversizedArtifacts: []
  });
}
