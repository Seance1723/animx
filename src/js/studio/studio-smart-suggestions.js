import { detectSectionType } from './studio-section-detector.js';

export function generateSmartSuggestions(scanData) {
  const suggestions = [];
  
  scanData.elements.forEach((item, index) => {
    const parentSection = item.el.closest('section, header, footer, main > div') || document.body;
    const sectionType = detectSectionType(parentSection);
    
    // Suggest text-mask-up for Hero h1
    if (item.type === 'heading' && sectionType === 'hero' && item.el.tagName.toLowerCase() === 'h1') {
      suggestions.push({
        id: `sug-${index}`,
        targetElement: item.el,
        targetType: 'heading',
        sectionType: 'hero',
        preset: 'text-mask-up',
        confidence: 0.95,
        reason: 'Primary hero heading should reveal prominently.'
      });
    }
    
    // Suggest stagger for features
    if (item.type === 'card' && sectionType === 'features') {
      suggestions.push({
        id: `sug-${index}`,
        targetElement: item.el,
        targetType: 'card',
        sectionType: 'features',
        preset: 'fade-up',
        options: { stagger: 100 },
        confidence: 0.85,
        reason: 'Feature cards should stagger in sequentially.'
      });
    }
    
    // Suggest button glow for Hero CTA
    if (item.type === 'button' && sectionType === 'hero') {
      suggestions.push({
        id: `sug-${index}`,
        targetElement: item.el,
        targetType: 'button',
        sectionType: 'hero',
        preset: 'button-glow',
        confidence: 0.8,
        reason: 'Hero CTA should attract attention.'
      });
    }
  });
  
  return suggestions;
}
