import { mergeTests } from "@playwright/test";
import { pages } from "./pages";
import { testData } from "./testData";

export const test = mergeTests(pages, testData);

export { expect } from "@playwright/test";
