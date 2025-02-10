import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  // Maximum time the whole test run can take. Applies to all tests in your suite collectively.
  globalTimeout: 60 * 60 * 1000,
  // How long each individual test is allowed to run for.
  timeout: 60 * 1000,
  // Timeout for assertions
  expect: {
    timeout: 5 * 1000,
  },

  testDir: "./tests",
  fullyParallel: true,
  // Fail the build on CI if you accidentally left `test.only` in the source code.
  forbidOnly: !!process.env.CI,
  // Retry on CI only
  retries: process.env.CI ? 1 : 0,
  // Uses 70% of available workers per machine. Workers available depends on CPU Cores of the machine
  // If your machine can do maximum of 3 workers then 70% means it will use 2.
  workers: "70%",

  // Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions.
  use: {
    // Maximum amount of time each action such as `click()` can take.
    // If no actionTimeout/navigationTimeout is specified, Playwright defaults to the `timeout` value set above.
    actionTimeout: 5 * 1000,
    navigationTimeout: 15 * 1000,

    testIdAttribute: "data-testid",
    baseURL: getBaseUrl(),
    // Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "global-setup",
      testMatch: /globalSetup.ts/,
    },
    {
      name: "Chrome Web",
      use: { ...devices["Desktop Chrome"] },
      dependencies: ["global-setup"],
    },
  ],

  // Output directory for test artifacts.
  outputDir: "test-results",

  reporter: [
    ["list"],
    [
      "allure-playwright",
      {
        detail: true,
        suiteTtitle: false,
        environmentInfo: {
          environmnet: getBaseUrl(),
        },
        categories: [
          // Add categories to group tests in the report. If the error contains the message regex it will be grouped under the category
          { name: "Environment issues", messageRegex: /.*environment issue.*/ },
        ],
      },
    ],
    ["html", { open: "never" }],
  ],
});

function getBaseUrl(): string {
  switch (process.env.ENVIRONMENT) {
    case "dev":
      return "http://localhost:5173/";
    case "stg":
      return "https://staging.martioli.com/";
    case "prd":
      return "https://z.martioli.com/";
    default:
      throw new Error(`Unknown environment: ${process.env.ENVIRONMENT}`);
  }
}
