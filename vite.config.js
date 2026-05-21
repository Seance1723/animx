import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'AnimX',
      formats: ['iife'],
      fileName: () => 'animx.js',
    },
    outDir: 'dist',
    emptyOutDir: true,
    minify: false,
    rollupOptions: {
      output: {
        assetFileNames: 'animx.[ext]'
      }
    }
  }
});
