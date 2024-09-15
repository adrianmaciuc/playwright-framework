import { Locator, Page } from "@playwright/test";

export const teamPageSelectors = {
  developerInfo(page: Page): Locator {
    return page.getByTestId("developer-info");
  },
  qaInfo(page: Page): Locator {
    return page.getByTestId("QA-info");
  },
  managerInfo(page: Page): Locator {
    return page.getByTestId("manager-info");
  },
};
