import { test, expect } from "../fixtures";

test.describe("Multiple Elements", () => {
  test("Validate attributes of multiple elements", async ({
    page,
    homePage,
  }) => {
    const expectedValue = "view task";
    await page.goto("/");

    // always assert count before .all() because if selector returns 0 elements, then test is false positive
    await expect(homePage.viewTeamBtn()).toHaveCount(8);
    const allCardsBtns = await homePage.viewTeamBtn().all();

    for (const btn of allCardsBtns) {
      await expect(btn).toHaveAttribute("aria-label", expectedValue);
    }
  });
});
