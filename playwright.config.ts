import { existsSync } from 'node:fs';
import path from 'node:path';
import { defineConfig, devices } from '@playwright/test';

const envFile = path.resolve(__dirname, '.env');

if (existsSync(envFile)) {
  process.loadEnvFile(envFile);
}

const isCI = !!process.env.CI;
const baseURL =
  process.env.TEST_BASE_URL ?? 'https://practicesoftwaretesting.com';

export default defineConfig({
  testDir: './tests',

  outputDir: '.tmp/test-results',

  timeout: isCI ? 90_000 : 60_000,

  expect: {
    timeout: isCI ? 20_000 : 10_000,
  },

  fullyParallel: false,

  forbidOnly: isCI,

  retries: isCI ? 2 : 0,

  workers: isCI ? 1 : undefined,

  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['json', { outputFile: 'reports/results.json' }],
    ['allure-playwright', { outputFolder: 'allure-results' }],
  ],

  use: {
    baseURL,

    browserName: 'chromium',

    viewport: {
      width: 1920,
      height: 1080,
    },

    actionTimeout: isCI ? 20_000 : 10_000,

    navigationTimeout: isCI ? 45_000 : 30_000,

    screenshot: 'only-on-failure',

    video: 'retain-on-failure',

    trace: 'retain-on-failure',

    ignoreHTTPSErrors: true,

    headless: true,
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});