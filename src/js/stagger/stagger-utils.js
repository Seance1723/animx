// Basic grid math helpers
export function calculateGrid(elements) {
  if (elements.length <= 1) return [1, 1];
  
  // Try to guess the grid by comparing element offsets
  const bounds = elements.map(el => {
    const rect = el.getBoundingClientRect();
    return { x: rect.left, y: rect.top };
  });
  
  const firstY = bounds[0].y;
  let cols = 0;
  
  for (let i = 0; i < bounds.length; i++) {
    // If we've dropped down a row, we know the column count
    if (Math.abs(bounds[i].y - firstY) > 5) {
      cols = i;
      break;
    }
  }
  
  if (cols === 0) cols = elements.length; // all in one row
  const rows = Math.ceil(elements.length / cols);
  
  return [cols, rows];
}

export function getGridDistance(i, j, cols, axis) {
  const xi = i % cols;
  const yi = Math.floor(i / cols);
  
  const xj = j % cols;
  const yj = Math.floor(j / cols);
  
  if (axis === 'x') {
    return Math.abs(xi - xj);
  }
  if (axis === 'y') {
    return Math.abs(yi - yj);
  }
  
  // both - manhattan distance or radial distance. Manhattan is simpler for typical web staggers.
  return Math.abs(xi - xj) + Math.abs(yi - yj);
}
