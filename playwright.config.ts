import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  expect: { timeout: 5000 },
  fullyParallel: false,
  retries: 0,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:3002/ummi-wallet-demo/',
    browserName: 'chromium',
    headless: false,
    viewport: { width: 1280, height: 720 },
    screenshot: 'on',
    trace: 'on-first-retry',
  },
});
