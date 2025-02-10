import { test, expect } from "../fixtures/index.js";
import { interceptApiCalls } from "../helpers/playwrightHelper.ts";

const viewTeamBtn = "view-task-btn";

let requests: string[];

test.describe("Multiple Requests", () => {
  test("Validate multiple same requests", async ({ page }) => {
    await test.step("Intercept all requests to endpoint /api/id/1", async () => {
      requests = await interceptApiCalls(page, "**/api/**", "id/1");
    });

    await page.goto("/");
    await page.getByTestId(viewTeamBtn).first().click();
    await page.goBack();
    await page.getByTestId(viewTeamBtn).first().click();

    await test.step("Expect length of requests", async () => {
      await expect(async () => {
        expect(requests.length).toBe(2);
      }).toPass({
        intervals: [1_000, 2_000, 5_000],
        timeout: 15_000,
      });
    });
  });

  test.afterEach("Unroute all", async ({ page }) => {
    await page.unrouteAll({ behavior: "wait" });
  });
});
