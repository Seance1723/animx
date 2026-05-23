export function generateScanReport(scanData, safetyData, appliedSuggestions) {
  const data = {
    version: "3.4.0",
    source: "paste",
    summary: scanData.summary,
    suggestions: appliedSuggestions.length,
    warnings: safetyData.warnings,
    accessibility: {},
    security: {}
  };
  
  let md = `# AnimX Scan Report\n\n`;
  md += `- **Version**: ${data.version}\n`;
  md += `- **Sections detected**: ${data.summary.sections}\n`;
  md += `- **Elements detected**: ${scanData.elements.length}\n`;
  md += `- **Suggestions applied**: ${data.suggestions}\n\n`;
  
  md += `## Security Warnings\n`;
  if (safetyData.warnings.length === 0) {
    md += `- ✅ No security threats detected in HTML.\n`;
  } else {
    safetyData.warnings.forEach(w => {
      md += `- ⚠️ ${w}\n`;
    });
  }
  
  return { json: data, markdown: md };
}
