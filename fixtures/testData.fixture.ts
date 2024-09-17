import { test as base } from "@playwright/test";

const data = {
  secretKey: process.env.TOKEN!,
  // any other data you want to pass to your tests. Can be retrieved with `testData` fixture
};

export const testData = base.extend<{
  testData: typeof data;
}>({
  testData: async ({}, use) => {
    await use(data);
  },
});

export { expect } from "@playwright/test";
