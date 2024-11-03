import { test as base } from "@playwright/test";
import { CommonFeatures } from "../selectors/commonFeatures.ts";

export const commonFeatures = base.extend<{
  commonFeatures: CommonFeatures;
}>({
  commonFeatures: async ({ page }, use) => {
    await use(new CommonFeatures(page));
  },
});

export { expect } from "@playwright/test";
