import { Locator, Page } from "@playwright/test";

export class TeamPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  developerInfo(): Locator {
    return this.page.getByTestId("developer-info");
  }
  qaInfo(): Locator {
    return this.page.getByTestId("QA-info");
  }
  managerInfo(): Locator {
    return this.page.getByTestId("manager-info");
  }
}
