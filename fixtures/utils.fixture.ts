import { test as base } from "@playwright/test";

class Utils {
  generateRandomString(length: number): string {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  }
}

export const utils = base.extend<{
  utils: Utils;
}>({
  utils: async ({}, use) => {
    await use(new Utils());
  },
});

export { expect } from "@playwright/test";
