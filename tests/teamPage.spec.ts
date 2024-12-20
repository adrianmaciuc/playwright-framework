import { test, expect } from "../fixtures/index.ts";

test.describe("Team Page", () => {
  test("Verify team page", async ({ page, homePage, teamPage }) => {
    await page.goto("/");
    await homePage.viewTeamBtn().first().click();
    await expect(teamPage.developerInfo()).toContainText("Developer");
  });

  test("Intentional fail test", async ({ page, homePage }) => {
    await page.goto("/");
    await homePage.viewTeamBtn().click();
    await expect(homePage.viewTeamBtn().first()).toBeVisible();
  });
});
