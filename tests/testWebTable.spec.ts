import { test, expect } from "@playwright/test";
import { WebTableHelper } from "../helpers/webTableHelper.ts";

test.describe("Web Tables", () => {
  test("Web tables assert value based on header", async ({ page }) => {
    await page.goto("https://cosmocode.io/automation-practice-webtable");
    const helper = new WebTableHelper(page);
    await expect(page.getByRole("table").getByRole("row")).toHaveCount(197);
    await helper.validateCellValueReferenceToHeader("Currency", 4, "Euro");
  });
});
