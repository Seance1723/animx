import { preserveAccessibility, applyAriaHidden } from './text-accessibility.js';
import { createWrapper, getRawTextContent } from './text-utils.js';
import { saveTextState, textStateMap } from './text-state.js';

function segmentChars(text) {
  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' });
    return Array.from(segmenter.segment(text)).map(s => s.segment);
  }
  return Array.from(text);
}

function processTextNode(node, options, arrays) {
  const text = node.nodeValue;
  const words = text.split(/(\s+)/); // Preserve whitespace as separate tokens
  const fragment = document.createDocumentFragment();

  const doChars = options.split.includes('chars');
  const doWords = options.split.includes('words') || options.split.includes('lines'); // lines needs words for measuring

  words.forEach(wordText => {
    if (!wordText) return;
    const isWhitespace = /^\s+$/.test(wordText);

    if (isWhitespace) {
      fragment.appendChild(document.createTextNode(wordText));
      return;
    }

    // Build Word
    const wordWrapper = doWords ? createWrapper('span', 'ax-text-word') : document.createDocumentFragment();
    if (doWords && options.preserveAccessibility) applyAriaHidden(wordWrapper);

    if (doChars) {
      const chars = segmentChars(wordText);
      chars.forEach(char => {
        const charWrapper = createWrapper('span', 'ax-text-char', char);
        if (options.preserveAccessibility) applyAriaHidden(charWrapper);
        if (options.mask && options.mask !== 'lines') {
          const mask = createWrapper('span', 'ax-text-mask');
          if (options.preserveAccessibility) applyAriaHidden(mask);
          mask.appendChild(charWrapper);
          wordWrapper.appendChild(mask);
        } else {
          wordWrapper.appendChild(charWrapper);
        }
        arrays.chars.push(charWrapper);
      });
    } else {
      wordWrapper.textContent = wordText;
    }

    if (doWords) {
      if (options.mask && options.mask !== 'lines' && !doChars) {
        const mask = createWrapper('span', 'ax-text-mask');
        if (options.preserveAccessibility) applyAriaHidden(mask);
        mask.appendChild(wordWrapper);
        fragment.appendChild(mask);
      } else {
        fragment.appendChild(wordWrapper);
      }
      arrays.words.push(wordWrapper);
    } else {
      fragment.appendChild(wordWrapper);
    }
  });

  node.parentNode.replaceChild(fragment, node);
}

function recursiveSplit(element, options, arrays) {
  const childNodes = Array.from(element.childNodes);
  childNodes.forEach(child => {
    if (child.nodeType === 3) {
      // Text node
      processTextNode(child, options, arrays);
    } else if (child.nodeType === 1) {
      // Element node
      if (child.nodeName !== 'SCRIPT' && child.nodeName !== 'STYLE') {
        recursiveSplit(child, options, arrays);
      }
    }
  });
}

function detectLines(element, wordElements, options, arrays) {
  if (wordElements.length === 0) return;
  
  let currentLine = [];
  let currentTop = null;
  const lines = [];

  // Group by offsetTop
  wordElements.forEach(wordEl => {
    const top = wordEl.offsetTop;
    if (currentTop === null || Math.abs(currentTop - top) > 2) {
      if (currentLine.length > 0) lines.push(currentLine);
      currentLine = [wordEl];
      currentTop = top;
    } else {
      currentLine.push(wordEl);
    }
  });
  if (currentLine.length > 0) lines.push(currentLine);

  // Wrap lines
  lines.forEach(lineNodes => {
    if (lineNodes.length === 0) return;
    const lineWrapper = createWrapper('span', 'ax-text-line');
    const innerWrapper = createWrapper('span', 'ax-text-line-inner');
    if (options.preserveAccessibility) applyAriaHidden(lineWrapper);
    
    // Insert line wrapper before first word
    const firstWord = lineNodes[0];
    firstWord.parentNode.insertBefore(lineWrapper, firstWord);
    lineWrapper.appendChild(innerWrapper);

    // Move nodes into line wrapper
    // We need to grab siblings including whitespaces between words if they exist
    const lastWord = lineNodes[lineNodes.length - 1];
    let current = firstWord;
    while (current) {
      const next = current.nextSibling;
      innerWrapper.appendChild(current);
      if (current === lastWord) break;
      current = next;
    }

    if (options.mask && (options.mask === true || options.mask === 'lines')) {
      const mask = createWrapper('span', 'ax-text-mask');
      if (options.preserveAccessibility) applyAriaHidden(mask);
      lineWrapper.parentNode.insertBefore(mask, lineWrapper);
      mask.appendChild(lineWrapper);
    }

    arrays.lines.push(lineWrapper);
  });
}

export function performSplitText(element, options) {
  const originalHTML = element.innerHTML;
  const originalText = getRawTextContent(element);

  let accessibilityPreserved = false;
  if (options.preserveAccessibility) {
    if (!element.hasAttribute('aria-label')) {
      preserveAccessibility(element, originalText);
      accessibilityPreserved = true;
    }
  }

  // Ensure element has split class
  element.classList.add('ax-text-split');

  const arrays = { chars: [], words: [], lines: [] };
  
  // Convert split string into array for easier checking
  let splits = Array.isArray(options.split) ? options.split : [options.split];
  if (splits.length === 0) splits = ['chars']; // default
  
  const internalOptions = { ...options, split: splits };

  // Phase 1: Split Text Nodes into Chars / Words
  recursiveSplit(element, internalOptions, arrays);

  // Phase 2: Detect Lines if requested
  if (splits.includes('lines')) {
    detectLines(element, arrays.words, internalOptions, arrays);
  }

  // If the user requested lines but NOT words, we can optionally unwrap words.
  // But for safety and performance, leaving them wrapped as inline-blocks is fine.

  const state = {
    originalHTML,
    originalText,
    chars: arrays.chars,
    words: arrays.words,
    lines: arrays.lines,
    type: 'split',
    accessibilityPreserved
  };

  saveTextState(element, state);
  
  return {
    element,
    originalHTML,
    originalText,
    chars: arrays.chars,
    words: arrays.words,
    lines: arrays.lines
  };
}

export function revertSplitText(element) {
  const state = textStateMap.get(element);
  if (!state) return;
  
  element.innerHTML = state.originalHTML;
  element.classList.remove('ax-text-split');
  if (state.accessibilityPreserved) {
    element.removeAttribute('aria-label');
  }
  textStateMap.delete(element);
}
