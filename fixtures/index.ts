import { mergeTests } from "@playwright/test";
import { pages } from "./pages.fixture";
import { testData } from "./testData.fixture";
import { commonFeatures } from "./common.fixture";
import { cardsFeature } from "./cards.fixture";

export const test = mergeTests(pages, testData, commonFeatures, cardsFeature);

export { expect } from "@playwright/test";
