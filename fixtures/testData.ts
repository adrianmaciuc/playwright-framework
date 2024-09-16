import { test as base } from "@playwright/test";

export function getSecretKey() {
  let token: string | undefined = process.env.token;
  if (!token) {
    throw new Error(
      `Could not fetch token from environment variables. Received token as: ${token}`
    );
  }
  return token;
}

const data = {
  secretKey: getSecretKey(),
};

export const testData = base.extend<{
  testData: typeof data;
}>({
  testData: async ({}, use) => {
    await use(data);
  },
});

export { expect } from "@playwright/test";
