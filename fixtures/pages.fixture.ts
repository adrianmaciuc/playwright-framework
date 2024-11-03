import { test as base } from "@playwright/test";
import { HomePage } from "../selectors/homePage.ts";
import { TeamPage } from "../selectors/teamPage.ts";

export const pages = base.extend<{
  homePage: HomePage;
  teamPage: TeamPage;
}>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  teamPage: async ({ page }, use) => {
    await use(new TeamPage(page));
  },
});

export { expect } from "@playwright/test";
