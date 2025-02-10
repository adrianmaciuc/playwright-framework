import { test, expect } from "../fixtures/index.ts";

const viewTeamBtn = "view-task-btn";
const developerInfo = "developer-info";

test.describe("Team Page", () => {
  test("Verify team page", async ({ page }) => {
    await page.goto("/");
    await page.getByTestId(viewTeamBtn).first().click();
    await expect(page.getByTestId(developerInfo)).toContainText("Developer");
  });

  test("Intentional fail test", async ({ page }) => {
    await page.goto("/");
    await page.getByTestId(viewTeamBtn).click();
    await expect(page.getByTestId(viewTeamBtn).first()).toBeVisible();
  });
});
