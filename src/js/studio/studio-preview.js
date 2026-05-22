export function runPreview(state) {
  if (!state.selectedElementId) return;
  const el = document.getElementById(state.selectedElementId);
  if (!el) return;
  
  const options = {};
  if (state.duration) options.duration = state.duration;
  if (state.delay) options.delay = state.delay;
  if (state.ease) options.ease = state.ease;
  
  // Cleanup any old state logic first if needed, but AnimX handles standard overlaps gracefully
  window.AnimX.animate(el, state.animation, options);
}
