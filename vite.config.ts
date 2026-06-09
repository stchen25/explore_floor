/// <reference types="vitest/config" />
import { fileURLToPath, URL } from 'node:url';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// `__dirname` does not exist in ESM config files; derive the src path from import.meta.url.
export default defineConfig({
  // GitHub Pages serves this project repo from /explore_floor/, not root.
  // Keep this in sync with the repo name; '/' would 404 every built asset.
  base: '/explore_floor/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5174,
  },
  // Vitest config lives here (the `test` key). The include/exclude split keeps Vitest
  // scoped to /src unit specs and out of the Playwright e2e specs under /tests.
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules', 'dist', 'tests/**', 'e2e/**'],
    css: false,
  },
});
