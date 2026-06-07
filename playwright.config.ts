import { defineConfig, devices } from '@playwright/test';

// E2E config. testDir + testMatch keep Playwright scoped to /tests/e2e *.spec.ts, away from
// Vitest's /src *.test.ts (the hard split that stops the two runners colliding). The webServer
// boots the Vite dev server and reuses a running one locally.
export default defineConfig({
  testDir: './tests/e2e',
  testMatch: '**/*.spec.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: 'list',
  use: {
    // Must match `server.port` in vite.config.ts (5174 — 5173 is taken by a sibling prototype).
    baseURL: 'http://localhost:5174',
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:5174',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
