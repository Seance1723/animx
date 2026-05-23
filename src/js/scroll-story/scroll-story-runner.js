/**
 * AnimX Scroll Story Runner (v3.17.0)
 * Uses IntersectionObserver to detect when a story section enters the viewport,
 * and mounts a requestAnimationFrame loop to scrub children safely.
 */

const storyRegistry = new Set();
let isScrubbing = false;

function loop() {
  if (!isScrubbing) return;
  
  const scrollY = window.scrollY;
  const vh = window.innerHeight;

  storyRegistry.forEach(story => {
    if (!story.active) return;

    const rect = story.el.getBoundingClientRect();
    const top = rect.top + scrollY;
    const height = rect.height;
    
    // Calculate progress 0 to 1
    let progress = (scrollY + vh - top) / (height + vh);
    progress = Math.max(0, Math.min(1, progress));

    // Update scenes
    story.scenes.forEach(scene => {
      if (progress >= scene.start && progress <= scene.end) {
        const localProgress = (progress - scene.start) / (scene.end - scene.start);
        scene.elements.forEach(el => {
          // Simplistic scrub: map localProgress to opacity/transform as proof of concept.
          // In a real scenario, this delegates to AnimX core tweens.
          el.style.opacity = localProgress;
        });
      }
    });
  });

  requestAnimationFrame(loop);
}

const observer = typeof window !== 'undefined' && window.IntersectionObserver ? new IntersectionObserver((entries) => {
  let anyActive = false;
  entries.forEach(entry => {
    const story = entry.target.__axStory;
    if (story) {
      story.active = entry.isIntersecting;
    }
    if (entry.isIntersecting) anyActive = true;
  });

  if (anyActive && !isScrubbing) {
    isScrubbing = true;
    requestAnimationFrame(loop);
  } else if (!anyActive && isScrubbing) {
    isScrubbing = false;
  }
}, { rootMargin: '100% 0px 100% 0px' }) : null;

export function scrollStory(target, config) {
  const elements = typeof target === 'string' ? document.querySelectorAll(target) : ((typeof NodeList !== 'undefined' && target instanceof NodeList) || Array.isArray(target) ? target : [target]);
  if (!elements || elements.length === 0) return;

  elements.forEach(el => {
    const scenes = (config.scenes || []).map(s => ({
      ...s,
      elements: Array.from(el.querySelectorAll(s.target))
    }));

    const story = { el, config, scenes, active: false };
    el.__axStory = story;
    storyRegistry.add(story);

    if (observer) {
      observer.observe(el);
    }
  });
}
