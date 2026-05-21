import { calculateGrid, getGridDistance } from './stagger-utils.js';

export function calculateStaggerDelays(elements, staggerOpts) {
  const total = elements.length;
  if (total === 0) return [];
  if (total === 1) return [staggerOpts.startDelay];
  
  const { each, from, startDelay, reverse, axis } = staggerOpts;
  
  let gridCols = null;
  if (staggerOpts.grid === 'auto') {
    const grid = calculateGrid(elements);
    gridCols = grid[0];
  } else if (Array.isArray(staggerOpts.grid) && staggerOpts.grid.length >= 1) {
    gridCols = staggerOpts.grid[0];
  }
  
  let distances = [];
  
  // Calculate relative distance of each element from the origin point
  for (let i = 0; i < total; i++) {
    let distance = 0;
    
    if (from === 'start') {
      distance = i;
    } else if (from === 'end') {
      distance = total - 1 - i;
    } else if (from === 'center') {
      if (gridCols) {
        // Grid center
        const rows = Math.ceil(total / gridCols);
        const centerCol = (gridCols - 1) / 2;
        const centerRow = (rows - 1) / 2;
        
        const col = i % gridCols;
        const row = Math.floor(i / gridCols);
        
        if (axis === 'x') distance = Math.abs(col - centerCol);
        else if (axis === 'y') distance = Math.abs(row - centerRow);
        else distance = Math.abs(col - centerCol) + Math.abs(row - centerRow);
      } else {
        // Linear center
        const center = (total - 1) / 2;
        distance = Math.abs(i - center);
      }
    } else if (from === 'edges') {
      if (gridCols) {
        // Grid edges
        const rows = Math.ceil(total / gridCols);
        const centerCol = (gridCols - 1) / 2;
        const centerRow = (rows - 1) / 2;
        
        const col = i % gridCols;
        const row = Math.floor(i / gridCols);
        
        const maxDistX = centerCol;
        const maxDistY = centerRow;
        
        let dx = Math.abs(col - centerCol);
        let dy = Math.abs(row - centerRow);
        
        if (axis === 'x') distance = maxDistX - dx;
        else if (axis === 'y') distance = maxDistY - dy;
        else distance = (maxDistX - dx) + (maxDistY - dy);
      } else {
        // Linear edges
        const center = (total - 1) / 2;
        distance = center - Math.abs(i - center);
      }
    } else if (from === 'random') {
      // Safe random using Math.random. In a real engine, we'd use a seeded random if requested.
      distance = Math.random() * total;
    } else if (from === 'index') {
      const idx = staggerOpts.index || 0;
      if (gridCols) {
        distance = getGridDistance(i, idx, gridCols, axis);
      } else {
        distance = Math.abs(i - idx);
      }
    } else {
      // Default to start
      distance = i;
    }
    
    distances.push(distance);
  }
  
  // Normalize to integer bounds if we don't want floating delays (except random)
  if (from !== 'random') {
    // Round just to be safe if center caused .5
    distances = distances.map(d => Math.round(d));
  }
  
  // Calculate max distance for reverse inversion
  const maxDistance = Math.max(...distances);
  
  return distances.map(dist => {
    let finalDist = dist;
    if (reverse) {
      finalDist = maxDistance - dist;
    }
    return startDelay + (finalDist * each);
  });
}
