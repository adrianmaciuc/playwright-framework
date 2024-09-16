import { test as base } from "@playwright/test";
import { homePageSelectors } from "../pages/homePage";
import { teamPageSelectors } from "../pages/teamPage";

export const pages = base.extend<{
  homePage: typeof homePageSelectors;
  teamPage: typeof teamPageSelectors;
}>({
  homePage: async ({}, use) => {
    await use(homePageSelectors);
  },
  teamPage: async ({}, use) => {
    await use(teamPageSelectors);
  },
});

export { expect } from "@playwright/test";
