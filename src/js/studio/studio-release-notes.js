export function draftReleaseNotes(projectState, qaReport) {
  const errorsText = qaReport.errors.map(e => `- [ERROR] ${e}`).join("\n");
  const warningsText = qaReport.warnings.map(w => `- [WARN] ${w}`).join("\n");
  
  let limitations = "None known.";
  if (qaReport.warnings.length > 0 || qaReport.errors.length > 0) {
    limitations = `${errorsText}\n${warningsText}`;
  }
  
  return `# AnimX v3.5.0 Release Notes

## Release
Studio QA Automation and Release Assistant

## Added
- Local QA Assistant for project and export validation.
- Release Assistant with automated Markdown note generation.

## Improved
- Export safety guards catching <script> tags and javascript: URLs.

## Fixed / Hardened
- QA validations catch preset inconsistencies before they are exported.

## Known limitations
${limitations}

## QA summary
- Score: ${qaReport.score}
- Status: ${qaReport.status}
- Generated locally by AnimX Studio.
`;
}
