export function sanitizeImportedHtml(htmlString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  
  const warnings = [];
  
  // 1. Remove all <script> tags
  const scripts = doc.querySelectorAll('script');
  if (scripts.length > 0) {
    warnings.push(`Removed ${scripts.length} <script> tag(s).`);
    scripts.forEach(s => s.remove());
  }
  
  // 2. Remove inline event handlers (onclick, etc.)
  const allElements = doc.querySelectorAll('*');
  let inlineHandlersRemoved = 0;
  
  allElements.forEach(el => {
    Array.from(el.attributes).forEach(attr => {
      if (attr.name.toLowerCase().startsWith('on')) {
        el.removeAttribute(attr.name);
        inlineHandlersRemoved++;
      }
      
      // 3. Block javascript: URLs
      if ((attr.name.toLowerCase() === 'href' || attr.name.toLowerCase() === 'src') && 
          attr.value.toLowerCase().startsWith('javascript:')) {
        el.removeAttribute(attr.name);
        warnings.push(`Removed malicious javascript: URL.`);
      }
    });
  });
  
  if (inlineHandlersRemoved > 0) {
    warnings.push(`Removed ${inlineHandlersRemoved} inline event handler(s).`);
  }
  
  return {
    ok: true,
    cleanHtml: doc.body.innerHTML,
    rootElement: doc.body,
    warnings,
    nodesImported: allElements.length
  };
}
