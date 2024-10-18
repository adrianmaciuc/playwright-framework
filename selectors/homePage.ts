import { Locator, Page } from "@playwright/test";

export class HomePage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  developerInputField(): Locator {
    return this.page.getByTestId("developer-input");
  }
  qaInputField(): Locator {
    return this.page.getByTestId("qa-input");
  }
  managerInputField(): Locator {
    return this.page.getByTestId("manager-input");
  }
  teamNameInputField(): Locator {
    return this.page.getByTestId("teamname-input");
  }
  taskInputField(): Locator {
    return this.page.getByTestId("message-input");
  }
  secretKeyInputField(): Locator {
    return this.page.getByTestId("token-input");
  }
  newEntryBtn(): Locator {
    return this.page.getByTestId("new-entry-submit-btn");
  }
  successfulEntryAddedMsg(): Locator {
    return this.page.getByTestId("info-msg-entry-added");
  }
  viewTeamBtn(): Locator {
    return this.page.getByTestId("view-task-btn");
  }
  teamName(): Locator {
    return this.page.getByTestId("card-teamname");
  }
}
