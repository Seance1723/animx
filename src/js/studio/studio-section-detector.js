export function detectSectionType(element) {
  const html = element.innerHTML.toLowerCase();
  
  // Hero: Has h1 and button/link, usually large
  if (element.querySelector('h1') && (html.includes('button') || html.includes('btn') || element.querySelector('a'))) {
    return 'hero';
  }
  
  // Pricing: Has $ or "price", multiple cards
  if ((html.includes('$') || html.includes('price') || html.includes('/mo')) && element.querySelectorAll('.card, [class*="card"]').length > 0) {
    return 'pricing';
  }
  
  // Features: Multiple cards/grids without pricing
  if (element.querySelectorAll('.card, [class*="card"], .grid-item, .col').length >= 3) {
    return 'features';
  }
  
  // FAQ: Question marks, accordion
  if (html.includes('?') && (html.includes('faq') || element.querySelectorAll('details, .accordion').length > 0)) {
    return 'faq';
  }
  
  // Navigation
  if (element.tagName.toLowerCase() === 'nav' || element.tagName.toLowerCase() === 'header') {
    return 'navigation';
  }
  
  return 'generic';
}
