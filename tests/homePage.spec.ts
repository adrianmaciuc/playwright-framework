import { test, expect } from "../fixtures/fixtures";
import { faker } from "@faker-js/faker";
import { getSecretKey } from "../setup/globalSetup";

test("Verify cards are loaded on home page", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Loading...")).not.toBeVisible();
  await expect(page.getByTestId("card-id").first()).toBeVisible();
});

test("Add new entry on home page", async ({ page, homePage }) => {
  await page.goto("/");
  await homePage.developerInputField(page).fill(faker.person.firstName());
  await homePage.qaInputField(page).fill(faker.person.firstName());
  await homePage.managerInputField(page).fill(faker.person.firstName());
  await homePage.teamNameInputField(page).fill(faker.company.name());
  await homePage.taskInputField(page).fill(faker.company.catchPhrase());
  await homePage.secretKeyInputField(page).fill(getSecretKey());

  await homePage.newEntryBtn(page).click();
  await expect(homePage.successfulEntryAddedMsg(page)).toHaveText(
    "Entry added successfully!"
  );
});
