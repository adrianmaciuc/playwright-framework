---
# Playwright COMPLETE Framework Example
---

## Project Overview

This project provides a **modular and scalable Playwright framework** example. It brings together various features, logic, and best practices to serve as a comprehensive learning resource that replicate a real framework used in production. Instead of dividing the README into functionalities, folders, or business logic sections, this document follows a **build-up path** to help you understand each line of code and guide you to implement it yourself.

---

## The Build-up Path

### 1. Initial Setup

Before getting started, ensure you have the following installed:

- **Git**
- **Node.js**

#### 1.1 Install Playwright

Run the following command to set up Playwright:

```bash
npm init playwright@latest
```

During setup, select the following options:

- TypeScript
- Folder: tests
- Add GitHub Actions Workflow
- Install Playwright browsers
- Optionally, install Playwright OS dependencies

#### 1.2 Install dotenv

To handle tokens and secrets for local environments, install `dotenv`. This library will also be used in CI for the same purpose:

```bash
npm install dotenv
```

Then, create a `.env` file at the root level and add the following variables:

- `ENVIRONMENT`: `dev`  
  The environment to run tests in.
- `TOKEN`: `magictoken`  
  An example token or secret key you may store locally or fetch from GitHub Secrets for CI runs.

To integrate dotenv, import it in your `playwright.config.ts` file and add `dotenv.config()` at the top:

```typescript
import dotenv from "dotenv";
dotenv.config();
```

---

### 2. Additional Helpers for Your Setup

#### 2.1 Install Linters and Plugins

To enforce best practices, add linters and plugins for TypeScript and Playwright. Follow this guide for details: [Setting up ESLint for Playwright Projects with TypeScript](https://ceroshjacob.medium.com/setting-up-eslint-for-playwright-projects-with-typescript-12fab098bd94).

```bash
npm install @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-playwright --save-dev
```

Next, create an `eslint.config.js` file and configure the linters. You may use the rule settings from this project as a reference.
For info it uses the [recommended typescript rules](https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended.ts) and this [eslint plugin for typescript](https://github.com/playwright-community/eslint-plugin-playwright)

#### 2.2 Configure `tsconfig.json`

At the root of the project, create a `tsconfig.json` file. Use this project’s `tsconfig.json` as a guide, focusing on configuring it as a **module-based project** that allows both `import/export` and `require()` syntax. Remember to update `package.json` with `"type": "module"`:

---

### 3. Framework configs

#### 3.1 Playwright main config file

A few key points to highlight some of the reasons behind the values set in `playwright.config.ts`:

- `Timeouts` are important to avoid failing tests that take too long to throw an error in CI. If needed , read [this article about timeouts](https://www.bondaracademy.com/blog/playwright-timeout-30000ms-exceeded)
- It focuses on full paralelisation. If needed, [read this article](https://blog.martioli.com/playwright-with-allure-reporter-published-on-aws-s3-bucket-full-parallelization/)
- `baseURL` is configured based on what value you set as `ENVIRONMENT` in your secrets (`.env` file or github secrets)
- Projects have a `globalSetup` as dependency to fail quickly in case of setup failures
- Reporters are multiple. Some are for quick access in CI while others for detailed debugging

#### 3.2 Playwright globalSetup file

Create a global setup file (`globalSetup.ts`) in your `/tests` folder. This checks if environment variables used for config are setup properly both for local and CI. It can perform other test runs related configurations that you can easily add inside the `setup()` function. You can do here test-data, environment related setup or others. This file is also a dependency for all tests. It runs first before all tests and if it fails, then no tests are run.

#### 3.3 Playwright fixture files

For flexibility and easy access [Fixtures feature from Playwright](https://playwright.dev/docs/test-fixtures) is used here to "mix" pages, selectors, test data and other details. For example `pages.fixture.ts` will reference the pages in the project that store maybe page methods or page specific locators, while `testData.fixture.ts` has data fetched from env vars or third party apps. They all have their own separate files with instantiation of objects. All are merged together in `fixtures/index.ts`. And can easily be accessed inside any test. Here is an example:

```typescript
test("Add new entry on home page", async ({ page, homePage, testData }) => {
  await page.goto("/");
  await homePage.developerInputField().fill("dev");
  await homePage.secretKeyInputField().fill(testData.secretKey);
});
```

#### 3.4 **CI** Github Actions Setup

The project includes workflows for Github Actions. Do not forget to setup environment variables needed at CI level.
Go to settings and add them into repository secret, then add reference for the machine in workflow file like this:

```yaml
env:
  TOKEN: ${{ secrets.TOKEN }}
  ENVIRONMENT: ${{ secrets.ENVIRONMENT }}
```

Remember you first use github.com to add secrets into the repo, but in order for your workflows to see those secrets you must add them to workflow env first.
`process.env.TOKEN` in your code will not work if you don't do this first.

---

### 4. Running tests

Standard way of running tests [can be found here](https://playwright.dev/docs/running-tests#running-tests)
But you can also make some scripts. And we want scripts to be able to implement best practices

In your package.json at scripts , add the followings:

```json
  "scripts": {
    "static-check": "npx eslint .",
    "regression": "npm run static-check && npx playwright test --grep @regression",
    "runAll": "npm run static-check && npx playwright test"
  },
```

#### 4.1 Running tests locally

Locally it is recommended that you run your tests using VS Code extension, because it is very conveniant and easy to use, but if you have multiple tests to run
then you can just use the terminal and do standard `npx playwright test path/to/your/test` . Remember to setup in `.env` file your environment variables required.

#### 4.2 Running tests on CI

When using Github Actions you must first [set your environment variables](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-a-repository), then inside your workflows reference them like so:

```yaml
env:
  ENVIRONMENT: ${{ secrets.ENVIRONMENT }}
```

In your workflow, have your jobs make use of the scripts from package.json by calling them just as you would on your local machine `npm run runAll`

---

### 5. Reporters

-

#### 5.1 Playwright built-in reporters

-

#### 5.2 Allure Playwright plugin

**Contributing**

To contribute to this project, fork the repository and create a new branch for your changes. Submit a pull request to the main branch, and include a detailed description of your changes.
