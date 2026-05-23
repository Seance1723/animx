export function scanDomStructure(rootElement) {
  const summary = {
    sections: 0,
    headings: 0,
    buttons: 0,
    cards: 0,
    images: 0,
    svgs: 0,
    forms: 0
  };
  
  const elements = [];
  
  // Count headings
  const headings = rootElement.querySelectorAll('h1, h2, h3, h4, h5, h6');
  summary.headings = headings.length;
  headings.forEach((el, i) => elements.push({ type: 'heading', el, id: `h-${i}` }));
  
  // Count buttons
  const buttons = rootElement.querySelectorAll('button, .btn, .button, a[class*="btn"]');
  summary.buttons = buttons.length;
  buttons.forEach((el, i) => elements.push({ type: 'button', el, id: `b-${i}` }));
  
  // Count cards
  const cards = rootElement.querySelectorAll('.card, [class*="card"]');
  summary.cards = cards.length;
  cards.forEach((el, i) => elements.push({ type: 'card', el, id: `c-${i}` }));
  
  // Count media
  summary.images = rootElement.querySelectorAll('img').length;
  summary.svgs = rootElement.querySelectorAll('svg').length;
  
  // Count forms
  summary.forms = rootElement.querySelectorAll('form').length;
  
  // Look for major section wrappers (simple heuristic)
  const sections = rootElement.querySelectorAll('section, header, footer, main > div');
  summary.sections = sections.length || 1; // At least 1 section if body has content
  
  return {
    version: "3.16.0",
    scannedAt: new Date().toISOString(),
    summary,
    elements,
    warnings: []
  };
}
