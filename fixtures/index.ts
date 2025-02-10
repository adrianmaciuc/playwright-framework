import { mergeTests } from "@playwright/test";
import { testData } from "./testData.fixture.ts";
import { aiFix } from "./ai.fixture.ts";

export const test = mergeTests(testData, aiFix);

export { expect } from "@playwright/test";
