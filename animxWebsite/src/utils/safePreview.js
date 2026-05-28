export function safePreview(container, element, options, onComplete) {
  if (!window.AnimX || !container) return;

  try {
    // 1. Reset inner element to prevent state leaking
    container.innerHTML = '';
    
    // 2. Setup placeholder structure depending on type
    const wrapper = document.createElement('div');
    wrapper.style.width = '100%';
    wrapper.style.display = 'flex';
    wrapper.style.justifyContent = 'center';
    wrapper.style.alignItems = 'center';
    wrapper.className = 'preview-wrapper-inner';

    let el;
    if (element === 'text') {
      el = document.createElement('h2');
      el.innerText = 'Unleash Your Creative Power';
      el.className = 'preview-text';
    } else if (element === 'button') {
      el = document.createElement('button');
      el.innerText = 'Explore Now';
      el.className = 'preview-button';
    } else if (element === 'card') {
      el = document.createElement('div');
      el.className = 'preview-card';
      el.innerHTML = `
        <div class="card-glow"></div>
        <div class="card-image-placeholder"></div>
        <h3>Project Delta</h3>
        <p>Zero-dependency fluid animation layer</p>
      `;
    } else if (element === 'image') {
      el = document.createElement('div');
      el.className = 'preview-image-container';
      el.innerHTML = `
        <img src="https://picsum.photos/400/250?blur=1" alt="Preview Image" class="preview-img" />
        <div class="image-overlay"></div>
      `;
    } else if (element === 'background') {
      el = document.createElement('div');
      el.className = 'preview-background-stage';
      el.innerHTML = `
        <div class="ambient-glow"></div>
        <p class="ambient-label">Ambient Atmosphere Engine</p>
      `;
    }

    if (!el) return;

    // Apply reduced motion visual class simulation if requested
    if (options.reducedMotionPreview) {
      el.classList.add('reduced-motion-simulated');
      wrapper.appendChild(el);
      container.appendChild(wrapper);
      return;
    }

    // Apply custom properties for duration/delay/stagger
    el.style.setProperty('--ax-duration', `${options.duration}ms`);
    el.style.setProperty('--ax-delay', `${options.delay}ms`);
    el.style.setProperty('--ax-stagger', `${options.stagger}ms`);

    // Add required attributes for declarative scanning
    el.setAttribute('data-ax', options.selectedEffect);
    el.setAttribute('data-ax-duration', options.duration);
    el.setAttribute('data-ax-delay', options.delay);
    el.setAttribute('data-ax-easing', options.easing);
    if (options.trigger && options.trigger !== 'page-load') {
      el.setAttribute('data-ax-trigger', options.trigger);
    }

    wrapper.appendChild(el);
    container.appendChild(wrapper);

    // Call corresponding JavaScript engine for premium setups
    setTimeout(() => {
      try {
        if (options.selectedEffect === 'reveal' || options.selectedEffect === 'scramble' || options.selectedEffect === 'typewriter') {
          if (window.AnimX.text) {
            window.AnimX.text(el, {
              type: options.selectedEffect === 'reveal' ? 'reveal' : options.selectedEffect === 'scramble' ? 'scramble' : 'typewriter',
              duration: options.duration,
              delay: options.delay,
              stagger: options.stagger,
              easing: options.easing
            });
          }
        } else if (options.selectedEffect === 'hover-scale' || options.selectedEffect === 'ripple' || options.selectedEffect === 'magnetic') {
          if (window.AnimX.component) {
            const inst = window.AnimX.component(el, options.selectedEffect === 'hover-scale' ? 'button-hover' : options.selectedEffect === 'ripple' ? 'button-ripple' : 'button-magnetic', {
              duration: options.duration,
              easing: options.easing
            });
            el._animx_inst = inst;
          }
        } else if (options.selectedEffect === 'tilt') {
          if (window.AnimX.tilt) {
            window.AnimX.tilt(el, { max: 15, perspective: 1000 });
          }
        } else if (options.selectedEffect === 'aurora' || options.selectedEffect === 'particles') {
          if (window.AnimX.background) {
            const ambient = el.querySelector('.ambient-glow');
            window.AnimX.background(ambient || el, {
              type: options.selectedEffect,
              intensity: options.intensity / 100,
              duration: options.duration
            });
          }
        } else {
          // Standard declarative preset sweep
          window.AnimX.animate(el, options.selectedEffect, {
            duration: options.duration,
            delay: options.delay,
            easing: options.easing
          });
        }
      } catch (e) {
        console.warn('AnimX API trigger failed, falling back to CSS presets', e);
      }
    }, 50);

  } catch (err) {
    console.error('AnimX safe preview error', err);
  }
}