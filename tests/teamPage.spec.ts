import { test, expect } from "../fixtures/index.ts";

const viewTeamBtn = "view-task-btn";
const developerInfo = "developer-info";

test.describe("Team Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Verify team page - fail", { tag: "@regression" }, async ({ page }) => {
    await page.getByTestId(viewTeamBtn).first().click();
    await expect(page.getByTestId(developerInfo)).toContainText("Developers");
  });

  test("Intentional fail test", async ({ page }) => {
    await expect(page.getByTestId(viewTeamBtn).first()).toBeVisible();
    await page.getByTestId(viewTeamBtn).click();
  });
});
