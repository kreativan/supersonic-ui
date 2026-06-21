import { defineConfig } from 'vite';

export default defineConfig({
  publicDir: false,
  build: {
    outDir: './public/js/',
    target: 'es2015',  // Target ES2015 (ES6) for compatibility
    lib: {
      entry: './src/js/index.js',
      name: 'Supersonic',
      fileName: (format) => `supersonic.${format}.js`,
    },
    rollupOptions: {
      // Ensure external dependencies are not bundled into the library
      external: [],
      output: {
        globals: {},
      },
    },
  }
});