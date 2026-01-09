import {defineConfig, devices} from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

/**
 * Playwright Test Configuration
 * Interview-ready for DWP e2e tests
 */
export default defineConfig({
    testDir: 'src/tests',            // folder containing your tests
    fullyParallel: true,             // run tests in parallel
    forbidOnly: !!process.env.CI,    // fail build if `test.only` is left
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    // Write artifacts into a consistent folder
    outputDir: 'test-results',
    // Use HTML reporter and open the report automatically when there are failures
    reporter: [['html', {open: 'on-failure'}]],

    use: {
        headless: true,                   // set to `false` for headed runs
        trace: 'on-first-retry',          // traces for failed retries
        screenshot: 'only-on-failure',    // screenshot for failures
        video: 'retain-on-failure',       // video capture for failures
        baseURL: process.env.BASE_URL ?? 'http://localhost:3000',    // use .env base URL with fallback
    },

    projects: [
        {name: 'chromium', use: {...devices['Desktop Chrome']}},
        // { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
        // { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    ],
});