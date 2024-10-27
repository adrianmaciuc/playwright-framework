import { test, expect } from "../fixtures";

test.describe("Multiple Requests", () => {
  test.afterEach("Unroute all", async ({ page }) => {
    await page.unrouteAll({ behavior: "wait" });
  });

  test("Validate multiple same requests", async ({ page, homePage }) => {
    const requests: string[] = [];
    await page.route("**/api/**", async (route) => {
      if (route.request().url().includes("id/1")) {
        await route.continue();
        const response = await (await route.request().response())?.json();
        requests.push(response);
      } else await route.continue();
    });

    await page.goto("/");
    await homePage.viewTeamBtn().first().click();
    await page.goBack();
    await homePage.viewTeamBtn().first().click();

    await expect(async () => {
      expect(requests.length).toBe(2);
    }).toPass({
      intervals: [1_000, 2_000, 5_000],
      timeout: 15_000,
    });
  });
});
