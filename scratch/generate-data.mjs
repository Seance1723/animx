import fs from 'fs';
import path from 'path';

const srcDir = path.resolve(process.cwd(), 'animxWebsite/src');

const files = {
  'data/animationElements.js': `
export const animationElements = [
  { id: 'text', label: 'Text', previewType: 'text', effects: ['reveal', 'scramble', 'typewriter'], options: ['duration', 'delay', 'easing', 'stagger'] },
  { id: 'button', label: 'Button', previewType: 'button', effects: ['hover-scale', 'ripple', 'magnetic'], options: ['duration', 'easing'] },
  { id: 'card', label: 'Card', previewType: 'card', effects: ['fade-up', 'zoom-in', 'tilt'], options: ['duration', 'delay'] },
  { id: 'image', label: 'Image', previewType: 'image', effects: ['mask-reveal', 'zoom-in'], options: ['duration', 'easing'] },
  { id: 'background', label: 'Background', previewType: 'bg', effects: ['aurora', 'particles'], options: ['intensity'] }
];
`,
  'data/playgroundOptions.js': `
export const optionDefinitions = {
  duration: { type: 'number', default: 800, min: 100, max: 3000 },
  delay: { type: 'number', default: 0, min: 0, max: 2000 },
  stagger: { type: 'number', default: 50, min: 10, max: 500 },
  easing: { type: 'select', default: 'ease-out', options: ['ease-out', 'ease-in-out', 'spring'] },
  intensity: { type: 'range', default: 50, min: 0, max: 100 }
};
`,
  'data/docsData.js': `
export const docsCategories = [
  { id: 'getting-started', label: 'Getting Started' },
  { id: 'class-usage', label: 'Class Usage' },
  { id: 'data-attributes', label: 'Data Attributes' },
  { id: 'js-api', label: 'JavaScript API' }
];
`,
  'hooks/usePlaygroundState.js': `
import { useState } from 'react';
export function usePlaygroundState() {
  const [state, setState] = useState({
    selectedElement: 'text',
    selectedEffect: 'reveal',
    duration: 800,
    delay: 0,
    stagger: 50,
    easing: 'ease-out',
    intensity: 50,
    reducedMotionPreview: false
  });
  return [state, setState];
}
`,
  'utils/snippetGenerator.js': `
export function generateHTML(element, options) {
  let tag = 'div';
  if (element === 'text') tag = 'h2';
  if (element === 'button') tag = 'button';
  return \`<\${tag} data-ax="\${options.selectedEffect}" data-ax-duration="\${options.duration}">\\n  AnimX Effect\\n</\${tag}>\`;
}
export function generateJS(element, options) {
  return \`AnimX.animate('.target', {\\n  preset: '\${options.selectedEffect}',\\n  duration: \${options.duration}\\n});\`;
}
export function generateCSSClass(element, options) {
  return \`<div class="ax-\${options.selectedEffect}"></div>\`;
}
export function generateReact(element, options) {
  return \`<div data-ax="\${options.selectedEffect}" data-ax-duration={\${options.duration}}>\\n  AnimX\\n</div>\`;
}
`,
  'components/common/Button.jsx': `
export default function Button({ children, onClick, className = '' }) {
  return <button className={\`btn \${className}\`} onClick={onClick}>{children}</button>;
}
`,
  'components/common/Card.jsx': `
export default function Card({ children }) {
  return <div className="card">{children}</div>;
}
`
};

for (const [filepath, content] of Object.entries(files)) {
  const fullPath = path.join(srcDir, filepath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim(), 'utf8');
}
console.log('Data and Utils generated.');
