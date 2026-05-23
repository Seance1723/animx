/**
 * AnimX Video Motion Engine (v3.21.0)
 */

export function initVideoMotion(target, config) {
  const elements = typeof target === 'string' ? document.querySelectorAll(target) : ((typeof NodeList !== 'undefined' && target instanceof NodeList) || Array.isArray(target) ? target : [target]);
  if (!elements || elements.length === 0) return;

  elements.forEach(video => {
    if (video.tagName !== 'VIDEO') return;

    // Strict Security & A11y policy: AnimX will never modify the video node directly to strip controls
    // It will only fade the wrapper
    
    const wrapper = document.createElement('div');
    wrapper.style.display = 'inline-block';
    wrapper.style.transition = 'opacity 0.6s ease';
    
    if (config.state === 'ready') {
      wrapper.style.opacity = '1';
    } else {
      wrapper.style.opacity = '0';
    }
    
    video.parentNode.insertBefore(wrapper, video);
    wrapper.appendChild(video);
  });
}
