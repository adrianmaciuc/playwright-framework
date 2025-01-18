import typescript from "@typescript-eslint/eslint-plugin";
import playwright from "eslint-plugin-playwright";
import typescriptParser from "@typescript-eslint/parser";
const { configs: typescriptConfigs } = typescript;

export default [
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js"],
    plugins: {
      "@typescript-eslint": typescript,
      playwright: playwright,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    rules: {
      // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended.ts
      ...typescriptConfigs.recommended.rules,
      // https://github.com/playwright-community/eslint-plugin-playwright
      ...playwright.configs["flat/recommended"].rules,

      "playwright/no-commented-out-tests": "error",
      "playwright/prefer-to-have-count": "error",
      "playwright/prefer-to-contain": "error",
      "playwright/no-raw-locators": "warn",
      "playwright/prefer-comparison-matcher": "warn",
      "playwright/prefer-hooks-in-order": "warn",
      "playwright/prefer-hooks-on-top": "warn",
      "playwright/prefer-native-locators": "warn",
      "playwright/prefer-locator": "warn",
      "playwright/require-top-level-describe": "warn",
      "playwright/no-wait-for-timeout": "off",
      "playwright/no-skipped-test": "off",
      "playwright/no-useless-not": "off",
    },
  },
];
