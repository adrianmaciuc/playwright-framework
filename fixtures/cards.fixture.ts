import { test as base } from "@playwright/test";
import { CardsFeature } from "../selectors/cardsFeature";

export const cardsFeature = base.extend<{
  cardsFeature: CardsFeature;
}>({
  cardsFeature: async ({ page }, use) => {
    await use(new CardsFeature(page));
  },
});

export { expect } from "@playwright/test";
