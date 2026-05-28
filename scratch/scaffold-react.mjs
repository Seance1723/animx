import fs from 'fs';
import path from 'path';

const rootDir = path.resolve(process.cwd(), 'animxWebsite');
const srcDir = path.join(rootDir, 'src');

const directories = [
  'routes',
  'components/layout',
  'components/landing',
  'components/playground',
  'components/docs',
  'components/common',
  'data',
  'hooks',
  'styles',
  'utils'
];

directories.forEach(dir => {
  fs.mkdirSync(path.join(srcDir, dir), { recursive: true });
});

const files = [
  'routes/LandingPage.jsx',
  'routes/PlaygroundPage.jsx',
  'routes/DocumentationPage.jsx',
  'components/layout/AppHeader.jsx',
  'components/layout/AppFooter.jsx',
  'components/layout/PageShell.jsx',
  'components/landing/HeroJourney.jsx',
  'components/landing/PowerPreview.jsx',
  'components/landing/CapabilityJourney.jsx',
  'components/landing/WhyAnimX.jsx',
  'components/landing/UseCases.jsx',
  'components/landing/FinalCTA.jsx',
  'components/playground/PlaygroundLayout.jsx',
  'components/playground/ElementSelector.jsx',
  'components/playground/DynamicOptionsPanel.jsx',
  'components/playground/LivePreviewStage.jsx',
  'components/playground/ExportSnippetsPanel.jsx',
  'components/playground/PresetSelector.jsx',
  'components/playground/PlaybackControls.jsx',
  'components/playground/PreviewExamples.jsx',
  'components/docs/DocsSidebar.jsx',
  'components/docs/DocsContent.jsx',
  'components/docs/ApiUseCaseCard.jsx',
  'components/docs/ComponentUseCase.jsx',
  'components/docs/CodeBlock.jsx',
  'components/common/Button.jsx',
  'components/common/Badge.jsx',
  'components/common/Card.jsx',
  'components/common/CopyButton.jsx',
  'components/common/EmptyState.jsx',
  'data/animationElements.js',
  'data/playgroundOptions.js',
  'data/docsData.js',
  'data/useCases.js',
  'hooks/useAnimX.js',
  'hooks/usePlaygroundState.js',
  'hooks/useCopySnippet.js',
  'styles/main.scss',
  'styles/_tokens.scss',
  'styles/_layout.scss',
  'styles/_landing.scss',
  'styles/_playground.scss',
  'styles/_docs.scss',
  'styles/_responsive.scss',
  'utils/snippetGenerator.js',
  'utils/animxLoader.js',
  'utils/safePreview.js',
  'utils/playgroundValidation.js'
];

files.forEach(file => {
  fs.writeFileSync(path.join(srcDir, file), '', 'utf8');
});

console.log('Scaffolding complete.');
