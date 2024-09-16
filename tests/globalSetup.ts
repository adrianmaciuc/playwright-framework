import { test as setup, defineConfig } from "@playwright/test";

// Both local and CI environment variables setup check. If they error out during development it means you did not setup your .env file properly
if (!process.env.baseUrl) {
  throw new Error(
    `Could not fetch baseUrl from environment variables. Please set locally in .env file and in CI as github secret.`
  );
}

if (!process.env.token) {
  throw new Error(
    `Could not fetch token from environment variables. Please set locally in .env file and in CI as github secret. 
     Received token as: ${process.env.token}`
  );
}

setup("global setup", async ({}) => {});
