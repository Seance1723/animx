/**
 * Calculates absolute timeline start times for a sequence of steps.
 * Returns an array of groups (steps that start at the exact same timeline millisecond).
 * Note: Since our steps delegate to AnimX.animate(), we don't have perfect sub-millisecond timeline orchestration,
 * so we group them into "batches" that run sequentially.
 */
export function buildTimelineGroups(steps) {
  const groups = [];
  let currentGroup = [];
  
  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    
    // If it's the first step, it naturally forms the first group.
    if (i === 0) {
      currentGroup.push(step);
      continue;
    }
    
    const pos = step.position;
    
    if (pos === '<') {
      // Runs at the exact same time as the previous step (same group)
      currentGroup.push(step);
    } else if (typeof pos === 'string' && pos.startsWith('+=')) {
      // Runs after previous group finishes + delay
      // Since we group them by sequential batches, we add the delay to this step's options
      // and push it to a NEW group.
      const delayOffset = parseInt(pos.replace('+=', ''), 10) || 0;
      step.options.delay = (step.options.delay || 0) + delayOffset;
      
      if (currentGroup.length > 0) groups.push([...currentGroup]);
      currentGroup = [step];
    } else {
      // Default: sequential `>`
      if (currentGroup.length > 0) groups.push([...currentGroup]);
      currentGroup = [step];
    }
  }
  
  if (currentGroup.length > 0) {
    groups.push([...currentGroup]);
  }
  
  return groups;
}
