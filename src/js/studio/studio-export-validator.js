export function validateExport(htmlStr, jsStr = '') {
  const warnings = [];
  
  const fullStr = (htmlStr + ' ' + jsStr).toLowerCase();
  
  // Script tags
  if (htmlStr.toLowerCase().includes('<script')) {
    warnings.push('Exported HTML contains a <script> tag. Ensure this is safe for your environment.');
  }
  
  // Inline handlers
  if (/on[a-z]+\s*=/.test(htmlStr)) {
    warnings.push('Exported HTML contains inline event handlers (e.g., onclick). This violates strict CSP.');
  }
  
  // javascript: URLs
  if (fullStr.includes('javascript:')) {
    warnings.push('Exported code contains a javascript: URL. This is extremely unsafe.');
  }
  
  return {
    ok: warnings.length === 0,
    warnings
  };
}
