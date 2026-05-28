export function generateHTML(element, options) {
  let tag = 'div';
  let inner = 'AnimX Animated Element';
  if (element === 'text') {
    tag = 'h2';
    inner = 'Unleash Your Creative Power';
  } else if (element === 'button') {
    tag = 'button';
    inner = 'Explore Now';
  } else if (element === 'card') {
    tag = 'div';
    inner = '<h3 class="card-title">Project Delta</h3>\n  <p class="card-desc">Zero-dependency fluid animation layer</p>';
  }

  const durationAttr = options.duration !== 800 ? ` data-ax-duration="${options.duration}"` : '';
  const delayAttr = options.delay > 0 ? ` data-ax-delay="${options.delay}"` : '';
  const easeAttr = options.easing !== 'ease-out' ? ` data-ax-easing="${options.easing}"` : '';
  const triggerAttr = options.trigger && options.trigger !== 'page-load' ? ` data-ax-trigger="${options.trigger}"` : '';

  return `<${tag} data-ax="${options.selectedEffect}"${durationAttr}${delayAttr}${easeAttr}${triggerAttr} class="ax-element">\n  ${inner}\n</${tag}>`;
}

export function generateJS(element, options) {
  const trigger = options.trigger || 'page-load';
  const triggerCode = trigger === 'hover' 
    ? `AnimX.hover('.target', '${options.selectedEffect}', { duration: ${options.duration}, delay: ${options.delay} });`
    : trigger === 'click'
    ? `AnimX.press('.target', '${options.selectedEffect}', { duration: ${options.duration} });`
    : `AnimX.animate('.target', {\n  preset: '${options.selectedEffect}',\n  duration: ${options.duration},\n  delay: ${options.delay},\n  easing: '${options.easing}'\n});`;

  return `import AnimX from 'animx';\n\n// Initialize the ${element} animation\n${triggerCode}`;
}

export function generateCSSClass(element, options) {
  let tag = 'div';
  if (element === 'text') tag = 'h2';
  if (element === 'button') tag = 'button';
  
  const speedClass = options.duration < 400 ? ' ax-fast' : options.duration > 1500 ? ' ax-slow' : '';
  const delayClass = options.delay > 0 ? ` ax-delay-${options.delay}` : '';
  
  return `<${tag} class="ax-element ax-${options.selectedEffect}${speedClass}${delayClass}">\n  Interactive Content\n</${tag}>`;
}

export function generateReact(element, options) {
  const isInteractive = ['hover-scale', 'ripple', 'magnetic', 'tilt'].includes(options.selectedEffect);
  
  if (isInteractive) {
    return `import React, { useEffect, useRef } from 'react';\nimport AnimX from 'animx';\n\nexport default function AnimatedComponent() {\n  const ref = useRef(null);\n\n  useEffect(() => {\n    if (!ref.current) return;\n    // Enable interaction physics\n    const inst = AnimX.component(ref.current, 'button-ripple', {\n      duration: ${options.duration},\n      easing: '${options.easing}'\n    });\n    return () => inst.destroy();\n  }, []);\n\n  return (\n    <button ref={ref} className="interactive-btn">\n      Interactive Button\n    </button>\n  );\n}`;
  }

  return `import React from 'react';\nimport 'animx/css';\n\nexport default function AnimatedComponent() {\n  return (\n    <div\n      data-ax="${options.selectedEffect}"\n      data-ax-duration={${options.duration}}\n      data-ax-delay={${options.delay}}\n      data-ax-easing="${options.easing}"\n    >\n      <h2>AnimX React Integration</h2>\n    </div>\n  );\n}`;
}

export function generateCMS(element, options) {
  return `<!-- No-code & CMS Integration (Webflow, Shopify, Framer) -->\n<div \n  class="animx-cms-element"\n  data-ax-recipe="hero-${options.selectedEffect}"\n  data-ax-trigger="${options.trigger || 'scroll'}"\n  data-ax-duration="${options.duration}"\n>\n  CMS Dynamic Content\n</div>\n\n<!-- Make sure script is included in page header -->\n<script src="https://cdn.jsdelivr.net/npm/animx@3.41.0/dist/animx.min.js"></script>`;
}