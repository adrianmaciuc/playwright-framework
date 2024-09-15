import { test, expect } from "../fixtures/fixtures";

test("Verify team page", async ({ page, homePage, teamPage }) => {
  await page.goto("/");
  await homePage.viewTaskBtn(page).first().click();
  await expect(teamPage.developerInfo(page)).toContainText("Developer");
  await expect(teamPage.qaInfo(page)).toContainText("QA");
  await expect(teamPage.managerInfo(page)).toContainText("Manager");
});
