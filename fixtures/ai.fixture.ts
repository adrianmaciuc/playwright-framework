import { test as base } from "@playwright/test";
import { attachFixWithAI } from "../tests/fixWithAi.ts";

export const aiFix = base.extend<{ fixWithAI: void }>({
  fixWithAI: [
    async ({ page }, use, testInfo) => {
      await use();
      await attachFixWithAI(page, testInfo);
    },
    { scope: "test", auto: true },
  ],
});

export { expect } from "@playwright/test";
