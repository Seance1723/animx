import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/js/studio/studio-core.js'),
      name: 'AnimXStudio',
      formats: ['iife'],
      fileName: () => 'animx-studio.js',
    },
    outDir: 'dist/studio',
    emptyOutDir: true,
    minify: false,
    rollupOptions: {
      output: {
        assetFileNames: 'animx-studio.[ext]'
      }
    }
  }
});
