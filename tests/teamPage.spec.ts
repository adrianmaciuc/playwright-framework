import { test, expect } from "../fixtures";

test("Verify team page", async ({ page, homePage, teamPage }) => {
  await page.goto("/");
  await homePage.viewTeamBtn().first().click();
  await expect(teamPage.developerInfo()).toContainText("Developer");
});
