export function scanHtmlForSuggestions(htmlString) {
  // Use DOMParser to safely parse HTML without executing scripts
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  
  const suggestions = [];
  
  const h1s = doc.querySelectorAll('h1');
  if (h1s.length > 0) {
    suggestions.push({
      selector: 'h1',
      suggestedAnimation: 'text-mask-up',
      reason: 'Large headings benefit from dramatic text reveals.'
    });
  }
  
  const cards = doc.querySelectorAll('.card, [class*="card"]');
  if (cards.length > 1) {
    suggestions.push({
      selector: '.card',
      suggestedAnimation: 'fade-up',
      reason: 'Multiple cards should use a staggered fade-up reveal.'
    });
  }
  
  return {
    sectionCount: doc.body.children.length,
    suggestions
  };
}
