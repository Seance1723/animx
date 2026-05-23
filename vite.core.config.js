import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/js/builds/animx-core.js'),
      name: 'AnimX',
      formats: ['es', 'iife'],
      fileName: (format) => format === 'es' ? 'animx.core.esm.js' : 'animx.core.js',
    },
    outDir: 'dist',
    emptyOutDir: false, // Don't empty because build:full runs first
    minify: false,
    rollupOptions: {
      output: {
        assetFileNames: 'animx.core.[ext]'
      }
    }
  }
});
