import { mergeTests } from "@playwright/test";
import { pages } from "./pages.fixture.ts";
import { testData } from "./testData.fixture.ts";
import { commonFeatures } from "./common.fixture.ts";
import { cardsFeature } from "./cards.fixture.ts";
import { utils } from "./utils.fixture.ts";
import { aiFix } from "./ai.fixture.ts";

export const test = mergeTests(
  pages,
  testData,
  commonFeatures,
  cardsFeature,
  utils,
  aiFix
);

export { expect } from "@playwright/test";
