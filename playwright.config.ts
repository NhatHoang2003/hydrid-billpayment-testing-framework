
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(__dirname, process.env.ENV_FILE || '.env'),
});

export default defineConfig({
  testDir: './automation-testing/tests',
  testMatch: '**/*.spec.ts',
  outputDir: './automation-testing/test-results',

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : Number(process.env.API_RETRIES ?? 0),
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['list'],
    [
      'html',
      {
        outputFolder: './automation-testing/playwright-report',
        open: 'on-failure',
      },
    ],
    [
      'allure-playwright',
      {
        resultsDir: './automation-testing/allure-results',
      },
    ],
  ],

  projects: [
    {
      name: 'api',
      testMatch: '**/api/**/*.spec.ts',
      // Keep the shared API key's rolling-window limiter effective across all
      // API specs (Playwright workers are separate processes).
      workers: 1,
    },
    {
      name: 'chromium',
      testMatch: '**/ui/**/*.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
});
