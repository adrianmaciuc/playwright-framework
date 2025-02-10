import { test, expect } from "../fixtures/index.ts";

const viewTeamBtn = "view-task-btn";
const developerInfo = "developer-info";

test.describe("Team Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Verify team page", { tag: "@regression" }, async ({ page }) => {
    await page.getByTestId(viewTeamBtn).first().click();
    await expect(page.getByTestId(developerInfo)).toContainText("Developer");
  });

  test("Intentional fail test", async ({ page }) => {
    await page.getByTestId(viewTeamBtn).click();
    await expect(page.getByTestId(viewTeamBtn).first()).toBeVisible();
  });
});
