/**
 * AnimX Studio Scene Preview (v3.9.0)
 * Hooks into AnimX.timeline() to preview scenes safely.
 */

let activePreviewTimeline = null;

export function playScenePreview(scene, onComplete) {
  if (!window.AnimX) {
    console.warn('[AnimX Studio] Core not found.');
    return;
  }
  
  stopScenePreview(); // Ensure cleanup

  const tl = window.AnimX.timeline({
    defaults: { ease: scene.settings?.ease || 'smooth' }
  });
  
  activePreviewTimeline = tl;

  scene.steps.forEach(step => {
    if (step.type === 'wait') {
       tl.add("wait", step.duration || 500, step.position || null);
    } else if (step.type === 'text') {
       tl.add(step.target, { type: 'text', animation: step.preset, ...(step.options || {}) }, step.position || null);
    } else {
       tl.add(step.target, step.preset, step.options || {}, step.position || null);
    }
  });
  
  if (onComplete) {
    // Basic completion hook if supported by core, else timeout fallback
    const totalDuration = scene.steps.reduce((acc, step) => acc + (step.duration || 500), 0);
    setTimeout(onComplete, totalDuration + 100);
  }

  tl.play();
}

export function stopScenePreview() {
  if (activePreviewTimeline) {
    activePreviewTimeline.stop();
    if (typeof activePreviewTimeline.destroy === 'function') {
      activePreviewTimeline.destroy();
    }
    activePreviewTimeline = null;
  }
  
  // Revert preview DOM if necessary by removing inline styles applied by animations
  // AnimX natively cleans up on destroy() if implemented, otherwise we manually wipe state
  document.querySelectorAll('.preview-target').forEach(el => {
     el.style = ''; // wipe inline styles
     el.removeAttribute('data-ax-state');
  });
}

export function scrubScenePreview(scene, progress) {
  if (!activePreviewTimeline) {
    // Init but pause
    playScenePreview(scene, null);
    if (activePreviewTimeline) activePreviewTimeline.pause();
  }
  
  // Fake scrubber or route to native timeline scrub if core supports it
  if (activePreviewTimeline && typeof activePreviewTimeline.seek === 'function') {
    activePreviewTimeline.seek(progress);
  } else {
    console.warn('[AnimX Studio] Core timeline does not support arbitrary seek scrubbing yet.');
  }
}
