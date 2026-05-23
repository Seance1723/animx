/**
 * AnimX Scroll Story API Export Bundle (v3.19.0)
 */

export { scrollStory } from './scroll-story-runner.js';
export { responsiveMotion, viewportMotion } from './responsive-motion-parser.js';

export function validateScrollStory(storyConfig) {
  if (!storyConfig.scenes || storyConfig.scenes.length === 0) return { ok: false, errors: ['No scenes defined'] };
  return { ok: true, errors: [] };
}
