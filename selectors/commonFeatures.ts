import { Locator, Page } from "@playwright/test";

export class CommonFeatures {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  loadingSpinner(): Locator {
    return this.page.getByText("Loading...");
  }
}
