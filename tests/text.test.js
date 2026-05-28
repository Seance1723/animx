import assert from 'assert';
import './setup.js';
import AnimX from '../src/js/animx.js';

class ClassList {
  constructor() { this.set = new Set(); }
  add(...classes) { classes.join(' ').split(/\s+/).filter(Boolean).forEach(cls => this.set.add(cls)); }
  remove(...classes) { classes.forEach(cls => this.set.delete(cls)); }
  contains(cls) { return this.set.has(cls); }
  replace(oldCls, newCls) { this.remove(oldCls); this.add(newCls); }
  [Symbol.iterator]() { return this.set.values(); }
}

class TextNode {
  constructor(text) {
    this.nodeType = 3;
    this.nodeValue = text;
    this.parentNode = null;
  }
  get textContent() { return this.nodeValue; }
  set textContent(value) { this.nodeValue = value; }
}

class Fragment {
  constructor() {
    this.nodeType = 11;
    this.childNodes = [];
    this.parentNode = null;
  }
  appendChild(child) {
    if (child.nodeType === 11) {
      [...child.childNodes].forEach(node => this.appendChild(node));
      child.childNodes = [];
      return child;
    }
    if (child.parentNode) child.parentNode.removeChild(child);
    child.parentNode = this;
    this.childNodes.push(child);
    return child;
  }
  removeChild(child) {
    this.childNodes = this.childNodes.filter(node => node !== child);
    child.parentNode = null;
    return child;
  }
}

class ElementNode {
  constructor(tag = 'div') {
    this.nodeType = 1;
    this.nodeName = tag.toUpperCase();
    this.tagName = this.nodeName;
    this.parentNode = null;
    this.childNodes = [];
    this.dataset = {};
    this.style = {};
    this.classList = new ClassList();
    this.attributes = {};
    this.offsetTop = 0;
    this.offsetWidth = 1;
  }
  appendChild(child) {
    if (child.nodeType === 11) {
      [...child.childNodes].forEach(node => this.appendChild(node));
      child.childNodes = [];
      return child;
    }
    if (child.parentNode) child.parentNode.removeChild(child);
    child.parentNode = this;
    this.childNodes.push(child);
    return child;
  }
  removeChild(child) {
    this.childNodes = this.childNodes.filter(node => node !== child);
    child.parentNode = null;
    return child;
  }
  insertBefore(child, before) {
    if (child.parentNode) child.parentNode.removeChild(child);
    child.parentNode = this;
    const index = this.childNodes.indexOf(before);
    if (index === -1) this.childNodes.push(child);
    else this.childNodes.splice(index, 0, child);
    return child;
  }
  replaceChild(newChild, oldChild) {
    const index = this.childNodes.indexOf(oldChild);
    if (index === -1) return oldChild;
    oldChild.parentNode = null;
    if (newChild.nodeType === 11) {
      const children = [...newChild.childNodes];
      children.forEach(child => { child.parentNode = this; });
      this.childNodes.splice(index, 1, ...children);
      newChild.childNodes = [];
    } else {
      if (newChild.parentNode) newChild.parentNode.removeChild(newChild);
      newChild.parentNode = this;
      this.childNodes[index] = newChild;
    }
    return oldChild;
  }
  setAttribute(name, value) {
    this.attributes[name] = String(value);
    if (name === 'class') this.classList.add(String(value));
    if (name.startsWith('data-')) {
      const key = name.slice(5).replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      this.dataset[key] = String(value);
    }
  }
  getAttribute(name) { return this.attributes[name] ?? null; }
  hasAttribute(name) { return Object.prototype.hasOwnProperty.call(this.attributes, name); }
  removeAttribute(name) { delete this.attributes[name]; }
  set className(value) {
    this.attributes.class = String(value);
    this.classList = new ClassList();
    this.classList.add(String(value));
  }
  get className() {
    return Array.from(this.classList).join(' ');
  }
  addEventListener() {}
  removeEventListener() {}
  dispatchEvent() {}
  querySelectorAll(selector) {
    if (selector.includes('[data-ax-text-effect]') && this.dataset.axTextEffect) return [this];
    if (selector.includes('[data-ax-split]') && this.dataset.axSplit) return [this];
    return [];
  }
  getBoundingClientRect() { return { left: 0, top: 0, width: 1, height: 1 }; }
  get textContent() {
    return this.childNodes.map(child => child.textContent || '').join('');
  }
  set textContent(value) {
    this.childNodes = [new TextNode(String(value))];
    this.childNodes[0].parentNode = this;
  }
  get innerHTML() { return this.textContent; }
  set innerHTML(value) { this.textContent = value; }
}

function collectByClass(node, className, out = []) {
  if (node.nodeType === 1 && node.classList.contains(className)) out.push(node);
  (node.childNodes || []).forEach(child => collectByClass(child, className, out));
  return out;
}

function installTextDom(root) {
  global.Element = ElementNode;
  global.document = {
    readyState: 'complete',
    querySelectorAll: selector => {
      if (selector === '.headline') return [root];
      if (selector === '.missing') return [];
      if (selector === '[bad-selector') throw new Error('SyntaxError');
      if (selector.includes('[data-ax-text-effect]')) return root.dataset.axTextEffect ? [root] : [];
      return [];
    },
    querySelector: selector => global.document.querySelectorAll(selector)[0] || null,
    createElement: tag => new ElementNode(tag),
    createDocumentFragment: () => new Fragment(),
    createTextNode: text => new TextNode(text),
    dispatchEvent() {},
    body: new ElementNode('body'),
    documentElement: new ElementNode('html')
  };
}

const readyEffects = [
  'text-fade-in', 'text-fade-up', 'text-mask-up', 'text-mask-down',
  'line-mask-up', 'line-curtain-reveal', 'word-fade-up', 'word-slide-up',
  'word-mask-up', 'char-fade-up', 'char-slide-up', 'char-rotate-in',
  'char-flip-x', 'char-flip-y', 'char-wave', 'char-domino',
  'char-elastic-pop', 'char-center-out', 'char-edge-in', 'paragraph-line-build'
];

assert.strictEqual(AnimX.version, '3.42.0');
assert.deepStrictEqual(AnimX.versionInfo(), {
  name: 'AnimX',
  version: '3.42.0',
  release: 'Advanced Text Reveal and Split Animation Pack',
  dependency: 'zero-runtime-dependency'
});

readyEffects.forEach(id => {
  const effect = AnimX.getEffects().find(item => item.id === id);
  assert.ok(effect, `${id} exists in registry`);
  assert.strictEqual(effect.status, 'ready', `${id} is ready`);
  assert.ok(effect.implementation.verified, `${id} has implementation`);
  assert.ok(effect.reducedMotion.behavior, `${id} has reduced motion`);
  assert.ok(effect.playground.previewType, `${id} has playground preview`);
});

let root = new ElementNode('h1');
root.textContent = 'Animate text safely';
installTextDom(root);

let split = AnimX.splitText('.headline', { split: 'chars' });
assert.ok(split.chars.length > 0, 'split by chars creates char wrappers');
assert.strictEqual(root.dataset.axSplitActive, 'true');
const firstCharCount = collectByClass(root, 'ax-text-char').length;
split = AnimX.splitText('.headline', { split: 'chars' });
assert.strictEqual(collectByClass(root, 'ax-text-char').length, firstCharCount, 'repeated split does not double-wrap');
AnimX.revertText('.headline');
assert.strictEqual(root.textContent, 'Animate text safely', 'revert restores original text');
assert.strictEqual(root.dataset.axSplitActive, undefined);

root.textContent = 'Animate words safely';
split = AnimX.splitText('.headline', { split: 'words' });
assert.ok(split.words.length >= 3, 'split by words works');
AnimX.revertText('.headline');

root.textContent = 'Animate lines safely';
split = AnimX.splitText('.headline', { split: 'lines' });
assert.ok(split.lines.length >= 1, 'split by lines works');
AnimX.revertText('.headline');

assert.doesNotThrow(() => AnimX.splitText('[bad-selector', { split: 'chars' }));
assert.doesNotThrow(() => AnimX.text('.missing', { effect: 'text-mask-up' }).destroy());

root.textContent = 'Reveal with masks';
const instance = AnimX.text('.headline', { effect: 'text-mask-up', split: 'words', duration: 800, stagger: 60 });
assert.ok(instance, 'AnimX.text returns an instance');
assert.ok(collectByClass(root, 'ax-text-word').length > 0, 'text reveal split words');
AnimX.revertText('.headline');
assert.strictEqual(root.textContent, 'Reveal with masks');

root.textContent = 'Unknown stays readable';
assert.doesNotThrow(() => AnimX.text('.headline', { effect: 'unknown-text-effect', split: 'chars' }));
assert.ok(root.textContent.includes('Unknown stays readable'), 'unknown effect does not hide text');
AnimX.revertText('.headline');

root.textContent = 'Data attributes work';
root.setAttribute('data-ax-text-effect', 'text-mask-up');
root.setAttribute('data-ax-split', 'chars');
assert.doesNotThrow(() => AnimX.refresh(root));
assert.ok(collectByClass(root, 'ax-text-char').length > 0, 'data text effect splits chars');
const countAfterRefresh = collectByClass(root, 'ax-text-char').length;
assert.doesNotThrow(() => AnimX.refresh(root));
assert.strictEqual(collectByClass(root, 'ax-text-char').length, countAfterRefresh, 'refresh does not double split');

root.textContent = 'Unknown data remains visible';
root.setAttribute('data-ax-text-effect', 'not-real-text-effect');
assert.doesNotThrow(() => AnimX.refresh(root));
assert.ok(root.textContent.includes('Unknown data remains visible'));
