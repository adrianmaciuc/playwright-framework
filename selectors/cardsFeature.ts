import { Locator, Page } from "@playwright/test";

export class CardsFeature {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  cardID(): Locator {
    return this.page.getByTestId("card-id");
  }
}
