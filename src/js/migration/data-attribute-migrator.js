/**
 * AnimX Data Attribute Migrator (v3.21.0)
 * Scans a DOM tree and converts legacy `data-ax-trigger` into `data-ax-on`.
 */

export function migrateDataAttributes(rootNode = document.body, options = { dryRun: true }) {
  if (!rootNode || !rootNode.querySelectorAll) return null;
  
  const nodes = rootNode.querySelectorAll('[data-ax-trigger], [data-ax-preset]');
  const report = {
    dryRun: options.dryRun,
    scanned: nodes.length,
    changes: [],
    warnings: [],
    errors: []
  };

  nodes.forEach(el => {
    // 1. data-ax-trigger -> data-ax-on
    if (el.hasAttribute('data-ax-trigger')) {
      const val = el.getAttribute('data-ax-trigger');
      report.changes.push({ element: el.tagName, from: "data-ax-trigger", to: "data-ax-on", value: val });
      if (!options.dryRun) {
        if (!el.hasAttribute('data-ax-on')) {
          el.setAttribute('data-ax-on', val);
        }
        el.removeAttribute('data-ax-trigger');
      }
    }
    // 2. data-ax-preset -> data-ax
    if (el.hasAttribute('data-ax-preset')) {
      const val = el.getAttribute('data-ax-preset');
      report.changes.push({ element: el.tagName, from: "data-ax-preset", to: "data-ax", value: val });
      if (!options.dryRun) {
        if (!el.hasAttribute('data-ax')) {
          el.setAttribute('data-ax', val);
        }
        el.removeAttribute('data-ax-preset');
      }
    }
  });

  return report;
}
