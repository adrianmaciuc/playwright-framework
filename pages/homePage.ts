import { Locator, Page } from "@playwright/test";

export const homePageSelectors = {
  developerInputField(page: Page): Locator {
    return page.getByTestId("developer-input");
  },
  qaInputField(page: Page): Locator {
    return page.getByTestId("qa-input");
  },
  managerInputField(page: Page): Locator {
    return page.getByTestId("manager-input");
  },
  teamNameInputField(page: Page): Locator {
    return page.getByTestId("teamname-input");
  },
  taskInputField(page: Page): Locator {
    return page.getByTestId("message-input");
  },
  secretKeyInputField(page: Page): Locator {
    return page.getByTestId("token-input");
  },
  newEntryBtn(page: Page): Locator {
    return page.getByTestId("new-entry-submit-btn");
  },
  successfulEntryAddedMsg(page: Page): Locator {
    return page.getByTestId("info-msg-entry-added");
  },
  viewTeamBtn(page: Page): Locator {
    return page.getByTestId("view-task-btn");
  },
};
