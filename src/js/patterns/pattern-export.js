/**
 * AnimX Pattern Export (v3.22.0)
 * Generates copyable snippets for patterns.
 */

export function exportPatternHTML(pattern) {
  if (!pattern || !pattern.html) return '';
  return pattern.html.trim();
}

export function exportPatternJS(pattern) {
  if (!pattern) return '';
  // Basic translation of data attributes to JS timeline
  return `
// AnimX JS Timeline Export for: ${pattern.name}
AnimX.timeline()
  .add(".ax-pattern-${pattern.industry} h1", "text-mask-up", { split: "lines", stagger: 80 })
  .add(".ax-pattern-${pattern.industry} p", "fade-up", { delay: 150 }, "<+=100")
  .add(".ax-pattern-${pattern.industry} .ax-btn", "button-glow-soft", {}, "+=50")
  .play();
  `.trim();
}

export function exportPatternCMS(pattern) {
  if (!pattern) return '';
  return `
<!-- AnimX CMS / Webflow Safe Export for: ${pattern.name} -->
<!-- Add these custom attributes to your builder elements -->
${pattern.html.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
  `.trim();
}
