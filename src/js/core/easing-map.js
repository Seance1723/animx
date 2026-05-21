export const EasingMap = {
  linear: 'linear',
  smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
  snappy: 'cubic-bezier(0.16, 1, 0.3, 1)',
  soft: 'cubic-bezier(0.33, 1, 0.68, 1)',
  bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  dramatic: 'cubic-bezier(0.77, 0, 0.175, 1)'
};

export function getEasing(easeName) {
  if (typeof easeName !== 'string') return EasingMap.smooth;
  return EasingMap[easeName] || easeName; // Fallback to provided string if custom cubic-bezier
}
