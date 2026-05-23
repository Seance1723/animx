/**
 * AnimX Table Motion Engine (v3.23.0)
 */

export function initTable(target, config) {
  const elements = typeof target === 'string' ? document.querySelectorAll(target) : ((typeof NodeList !== 'undefined' && target instanceof NodeList) || Array.isArray(target) ? target : [target]);
  if (!elements || elements.length === 0) return;

  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  elements.forEach(table => {
    if (prefersReducedMotion) return;
    
    // Safely apply fades to rows without breaking display: table-row
    const rows = table.querySelectorAll(config.row || 'tbody tr');
    rows.forEach((row, i) => {
      row.style.opacity = '0';
      row.style.transition = 'opacity 0.4s ease';
      
      // Delay stagger
      setTimeout(() => {
        row.style.opacity = '1';
      }, i * 50);
    });
  });
}
