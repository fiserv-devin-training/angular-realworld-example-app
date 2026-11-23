import { defineConfig } from '@playwright/test';
import { baseConfig } from './realworld/specs/e2e/playwright.base';

/**
 * Angular-specific Playwright configuration.
 * Extends the shared RealWorld base config with the three microfrontend dev
 * servers: shell (4200), articles (4201), profile (4202).
 */
export default defineConfig({
  ...baseConfig,
  testDir: './realworld/specs/e2e',
  globalSetup: './e2e-support/wait-for-remotes.ts',

  use: {
    ...baseConfig.use,
    baseURL: 'http://localhost:4200',
  },

  webServer: {
    command: 'bun run start:all',
    url: 'http://localhost:4200',
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
