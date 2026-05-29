import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  expect: { timeout: 5000 },
  fullyParallel: false,
  retries: 0,
  reporter: [['html', { open: 'never' }]],
  use: {
    baseURL: 'https://ummi-wallet-demo.vercel.app',
    browserName: 'chromium',
    headless: false,
    viewport: { width: 1280, height: 720 },
    screenshot: 'on',
    trace: 'on-first-retry',
  },
});
