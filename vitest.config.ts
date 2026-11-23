import { defineConfig } from 'vitest/config';
import angular from '@analogjs/vite-plugin-angular';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  plugins: [angular()],
  test: {
    globals: false,
    environment: 'jsdom',
    setupFiles: [fileURLToPath(new URL('./projects/test-setup.ts', import.meta.url))],
    include: ['projects/**/*.spec.ts'],
    pool: 'threads',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
  define: {
    ngDevMode: true,
  },
  resolve: {
    alias: {
      '@conduit/shared': fileURLToPath(new URL('./projects/shared/src/public-api.ts', import.meta.url)),
    },
  },
});
