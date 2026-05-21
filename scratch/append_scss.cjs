const fs = require('fs');
const path = require('path');

const basePath = 'c:\\xampp\\htdocs\\animx\\src\\scss';

const appends = [
  {
    file: 'keyframes/_blur.scss',
    content: `\n\n@keyframes ax-blur-up {
  0% { opacity: 0; filter: blur(10px); transform: translateY(20px); }
  100% { opacity: 1; filter: blur(0); transform: translateY(0); }
}
.ax-blur-up { @include ax-transform-animation(ax-blur-up); }\n`
  },
  {
    file: 'keyframes/_glow.scss',
    content: `\n\n@keyframes ax-glow-pulse {
  0% { box-shadow: 0 0 0 0 rgba(var(--ax-primary-rgb, 79, 70, 229), 0.4); }
  50% { box-shadow: 0 0 20px 0 rgba(var(--ax-primary-rgb, 79, 70, 229), 0.8); }
  100% { box-shadow: 0 0 0 0 rgba(var(--ax-primary-rgb, 79, 70, 229), 0.4); }
}
.ax-glow-pulse { animation: ax-glow-pulse var(--ax-duration-slow) infinite ease-in-out; }\n`
  },
  {
    file: 'keyframes/_text.scss',
    create: true,
    content: `@import '../utils/mixins';\n\n@keyframes ax-text-rise {
  0% { opacity: 0; transform: translateY(100%); }
  100% { opacity: 1; transform: translateY(0); }
}
.ax-text-rise { @include ax-transform-animation(ax-text-rise); }

@keyframes ax-text-slide-up {
  0% { opacity: 0; transform: translateY(50%); }
  100% { opacity: 1; transform: translateY(0); }
}
.ax-text-slide-up { @include ax-transform-animation(ax-text-slide-up); }\n`
  },
  {
    file: 'components/_button.scss',
    content: `\n\n.ax-button-press {
  transition: transform var(--ax-duration-fast) var(--ax-ease-smooth);
}
.ax-button-press.ax-interaction-active {
  transform: scale(0.95);
}

.ax-button-lift {
  transition: transform var(--ax-duration-fast) var(--ax-ease-smooth), box-shadow var(--ax-duration-fast) var(--ax-ease-smooth);
}
.ax-button-lift.ax-interaction-active {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.ax-button-magnetic {
  transition: transform var(--ax-duration-fast) var(--ax-ease-out);
}

@keyframes ax-button-loading-fill {
  0% { background-position: 100% 0; }
  100% { background-position: 0 0; }
}
.ax-button-loading-fill {
  background-size: 200% 100%;
  animation: ax-button-loading-fill var(--ax-duration-slow) infinite linear;
}\n`
  },
  {
    file: 'components/_card.scss',
    content: `\n\n.ax-card-lift {
  transition: transform var(--ax-duration-normal) var(--ax-ease-smooth), box-shadow var(--ax-duration-normal) var(--ax-ease-smooth);
}
.ax-card-lift.ax-interaction-active {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

.ax-card-tilt {
  transition: transform var(--ax-duration-fast) var(--ax-ease-out);
}\n`
  },
  {
    file: 'components/_form.scss',
    content: `\n\n.ax-input-focus-glow {
  transition: box-shadow var(--ax-duration-fast) var(--ax-ease-smooth), border-color var(--ax-duration-fast) var(--ax-ease-smooth);
}
.ax-input-focus-glow.ax-interaction-active {
  box-shadow: 0 0 0 3px rgba(var(--ax-primary-rgb, 79, 70, 229), 0.3);
  border-color: var(--ax-primary, #4f46e5);
}\n`
  },
  {
    file: 'components/_skeleton.scss',
    content: `\n\n@keyframes ax-skeleton-shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
.ax-skeleton-shimmer {
  background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%);
  background-size: 400% 100%;
  animation: ax-skeleton-shimmer 1.5s infinite linear;
}\n`
  },
  {
    file: 'components/_loader.scss',
    content: `\n\n@keyframes ax-loader-spinner {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.ax-loader-spinner {
  animation: ax-loader-spinner 1s infinite linear;
}\n`
  },
  {
    file: 'components/_hero.scss',
    content: `\n\n.ax-hero-fade-sequence {
  animation: ax-fade-up var(--ax-duration-slow) forwards;
}
.ax-hero-split-text {
  animation: ax-fade-up var(--ax-duration-normal) forwards;
}\n`
  }
];

appends.forEach(item => {
  const fullPath = path.join(basePath, item.file);
  if (item.create || !fs.existsSync(fullPath)) {
    fs.writeFileSync(fullPath, item.content, 'utf8');
    console.log('Created', item.file);
  } else {
    fs.appendFileSync(fullPath, item.content, 'utf8');
    console.log('Appended to', item.file);
  }
});
