import { test, expect } from "../fixtures";
import { faker } from "@faker-js/faker";

test("Verify cards are loaded on home page", async ({
  page,
  commonFeatures,
  cardsFeature,
}) => {
  await page.goto("/");
  await expect(commonFeatures.loadingSpinner()).not.toBeVisible();
  await expect(cardsFeature.cardID().first()).toBeVisible();
});

test("Add new entry on home page", async ({ page, homePage, testData }) => {
  await page.goto("/");
  await homePage.developerInputField().fill(faker.person.firstName());
  await homePage.qaInputField().fill(faker.person.firstName());
  await homePage.managerInputField().fill(faker.person.firstName());
  await homePage.teamNameInputField().fill(faker.company.name());
  await homePage.taskInputField().fill(faker.company.catchPhrase());
  await homePage.secretKeyInputField().fill(testData.secretKey);

  await homePage.newEntryBtn().click();
  await expect(homePage.successfulEntryAddedMsg()).toHaveText(
    "Entry added successfully!"
  );
});
