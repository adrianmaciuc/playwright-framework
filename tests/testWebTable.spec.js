import { test, expect } from "@playwright/test";

class WebTableHelper {
  constructor(page) {
    this.page = page;
  }

  async validateCellValueReferenceToHeader(
    headerText,
    rowToValidate,
    expectedValue
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
        const cellValue = await elementsOfNRow[i].innerText();
        expect(cellValue).toBe(expectedValue);
        return;
      }
    }
    throw new Error(`Header with text "${headerText}" not found`);
  }
}

test("test tables", async ({ page }) => {
  await page.goto("https://cosmocode.io/automation-practice-webtable");
  const helper = new WebTableHelper(page);
  await expect(page.getByRole("table").getByRole("row")).toHaveCount(197);
  await helper.validateCellValueReferenceToHeader("Currency", 4, "Euro");
});
