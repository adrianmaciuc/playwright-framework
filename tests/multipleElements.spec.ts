import { test, expect } from "../fixtures/index.ts";

const expectedValue = "view task";
const viewTeamBtn = "view-task-btn";

test.describe("Multiple Elements", () => {
  test("Validate attributes of multiple elements", async ({ page }) => {
    await page.goto("/");

    // always assert count before .all() because if selector returns 0 elements, then test is false positive
    await expect(page.getByTestId(viewTeamBtn)).toHaveCount(41);
    const allCardsBtns = await page.getByTestId(viewTeamBtn).all();

    for (const btn of allCardsBtns) {
      await expect(btn).toHaveAttribute("aria-label", expectedValue);
    }
  });
});
