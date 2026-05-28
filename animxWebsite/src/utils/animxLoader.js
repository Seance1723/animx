export function loadAnimX() {
  if (window.AnimX) return;
  const script = document.createElement('script');
  script.src = '../dist/animx.min.js'; // Assumes running from animxWebsite root pointing to upper dist
  document.body.appendChild(script);
  
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '../dist/animx.min.css';
  document.head.appendChild(link);
}