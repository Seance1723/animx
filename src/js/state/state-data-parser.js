/**
 * AnimX State Data Parser (v3.16.0)
 * Discovers data-ax-state and custom conditional attributes on load.
 */

import { registerState, setState } from './motion-state-manager.js';
import { when } from './conditional-rules.js';

let stateObserver = null;

export function initStateDOM() {
  // Parse Initial States
  const stateNodes = document.querySelectorAll('[data-ax-state]');
  stateNodes.forEach(node => {
    const currentState = node.getAttribute('data-ax-state');
    
    // Extract declared states on this element (e.g. data-ax-state-idle="fade")
    const states = {};
    Array.from(node.attributes).forEach(attr => {
      if (attr.name.startsWith('data-ax-state-') && attr.name !== 'data-ax-state') {
        const stateName = attr.name.replace('data-ax-state-', '');
        states[stateName] = attr.value;
      }
    });

    if (Object.keys(states).length > 0) {
      registerState(node, { initial: currentState, states });
    }
  });

  // Parse Conditionals
  const conditionalNodes = document.querySelectorAll('[data-ax-when]');
  conditionalNodes.forEach(node => {
    const condition = node.getAttribute('data-ax-when');
    const thenEffect = node.getAttribute('data-ax-then');
    const elseEffect = node.getAttribute('data-ax-else');

    if (condition && thenEffect) {
      when(node, { if: condition, then: thenEffect, else: elseEffect });
    }
  });

  // Setup DOM MutationObserver for dynamically changing states
  if (!stateObserver) {
    stateObserver = new MutationObserver(mutations => {
      mutations.forEach(mut => {
        if (mut.type === 'attributes' && mut.attributeName === 'data-ax-state') {
          const newState = mut.target.getAttribute('data-ax-state');
          if (newState) {
            setState(mut.target, newState);
          }
        }
      });
    });
    
    stateObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ['data-ax-state'],
      subtree: true
    });
  }
}

export function destroyStateDOM() {
  if (stateObserver) {
    stateObserver.disconnect();
    stateObserver = null;
  }
}
