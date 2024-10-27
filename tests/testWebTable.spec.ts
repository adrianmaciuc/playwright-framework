import { test, expect, Page } from "@playwright/test";

class WebTableHelper {
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async validateCellValueReferenceToHeader(
    headerText: string,
    rowToValidate: number,
    expectedValue: string
  ) {
    const elementsOfHeader = await this.page
      .getByRole("table")
      .getByRole("row")
      .first()
      .getByRole("cell")
      .all();

    const elementsOfNRow = await this.page
      .getByRole("table")
      .getByRole("row")
      .nth(rowToValidate)
      .getByRole("cell")
      .all();

    for (let i = 0; i < elementsOfHeader.length; i++) {
      const headerValueFound = await elementsOfHeader[i].innerText();
      if (headerValueFound.toLowerCase() === headerText.trim().toLowerCase()) {
        const cellValue = elementsOfNRow[i];
        await expect(cellValue).toHaveText(expectedValue);
        return;
      }
    }
    throw new Error(`Header with text "${headerText}" not found`);
  }
}

test.describe("Web Tables", () => {
  test("Web tables assert value based on header", async ({ page }) => {
    await page.goto("https://cosmocode.io/automation-practice-webtable");
    const helper = new WebTableHelper(page);
    await expect(page.getByRole("table").getByRole("row")).toHaveCount(197);
    await helper.validateCellValueReferenceToHeader("Currency", 4, "Euro");
  });
});
