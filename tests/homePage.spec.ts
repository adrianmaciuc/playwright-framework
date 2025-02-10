import { test, expect } from "../fixtures/index.ts";
import { faker } from "@faker-js/faker";
import { generateRandomString } from "../utils/utilities.ts";

// Home Page Verifications
const cardId = "card-id";

// Add new entry on home page
const developerInput = "developer-input";
const qaInputField = "qa-input";
const managerInputField = "manager-input";
const teamNameInputField = "teamname-input";
const taskInputField = "message-input";
const secretKeyInputField = "token-input";
const addNewEntryBtn = "new-entry-submit-btn";
const successfulEntryAddedMsg = "info-msg-entry-added";

test.describe("Home Page Verifications", () => {
  test(
    "Verify cards are loaded on home page",
    { tag: "@regression" },
    async ({ page }) => {
      await page.goto("/");
      await expect(page.getByText("Loading...")).not.toBeVisible();
      await expect(page.getByTestId(cardId).first()).toBeVisible();
    }
  );

  test("Add new entry on home page", async ({ page, testData }) => {
    await page.goto("/");

    await test.step("Fill the form", async () => {
      await page.getByTestId(developerInput).fill(generateRandomString(6));
      await page.getByTestId(qaInputField).fill(faker.person.firstName());
      await page.getByTestId(managerInputField).fill(faker.person.firstName());
      await page.getByTestId(teamNameInputField).fill(faker.company.name());
      await page.getByTestId(taskInputField).fill(faker.company.catchPhrase());
      await page.getByTestId(secretKeyInputField).fill(testData.secretKey);
    });

    await page.getByTestId(addNewEntryBtn).click();
    await expect(page.getByTestId(successfulEntryAddedMsg)).toHaveText(
      "Entry added successfully!"
    );
  });
});
