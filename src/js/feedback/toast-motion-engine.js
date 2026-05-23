/**
 * AnimX Toast Motion Engine (v3.24.0)
 */

export function initToast(target, config) {
  let stack = typeof target === 'string' ? document.querySelector(target) : target;
  
  if (!stack) {
    console.warn(`[AnimX UI Feedback] Toast stack not found. Auto-generating .ax-toast-stack...`);
    stack = document.createElement('div');
    stack.className = 'ax-toast-stack';
    stack.style.position = 'fixed';
    stack.style.bottom = '1rem';
    stack.style.right = '1rem';
    stack.style.display = 'flex';
    stack.style.flexDirection = 'column';
    stack.style.gap = '0.5rem';
    stack.style.zIndex = '9999';
    document.body.appendChild(stack);
  }

  console.log(`[AnimX UI Feedback] Toast system ready on`, stack);
}
