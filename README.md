# Playwright COMPLETE Framework Example

## Project Overview

This project provides a **modular and scalable Playwright framework** example. It brings together various features, logic, and best practices to serve as a comprehensive learning resource that replicates a real framework used in production. This document follows a **build-up path** to help you understand each line of code and guide you to implement it yourself.

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

Select the following options during setup:

- TypeScript
- Folder: tests
- Add GitHub Actions Workflow
- Install Playwright browsers
- Optionally, install Playwright OS dependencies

#### 1.2 Install dotenv

To handle tokens and secrets for local environments, install `dotenv`:

```bash
npm install dotenv
```

Create a `.env` file at the root level and add the following variables:

- `ENVIRONMENT`: `dev`
- `TOKEN`: `magictoken`

Integrate dotenv in your `playwright.config.ts` file:

```typescript
import dotenv from "dotenv";
dotenv.config();
```

### 2. Additional Helpers for Your Setup

#### 2.1 Install Linters and Plugins

To enforce best practices, add linters and plugins for TypeScript and Playwright. If you need more details about this: [Setting up ESLint for Playwright Projects with TypeScript](https://ceroshjacob.medium.com/setting-up-eslint-for-playwright-projects-with-typescript-12fab098bd94).

```bash
npm install @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-playwright --save-dev
```

Create an `eslint.config.js` file and configure the linters. Use the example of `eslint.config.js` here if you need help.

#### 2.2 Configure `tsconfig.json`

Create a `tsconfig.json` file at the root of the project. Use this project’s `tsconfig.json` as a guide. Update `package.json` with `"type": "module"`.

#### 2.3 Create a Script for Static Checks

Add the following script to `package.json`:

```json
"static-checks": "npx eslint . && npx tsc --noEmit"
```

### 3. Framework Configs

#### 3.1 Playwright Main Config File

Key points for `playwright.config.ts`:

- Set appropriate `timeouts`. For more details read [this article about timeouts](https://www.bondaracademy.com/blog/playwright-timeout-30000ms-exceeded)
- Focus on full parallelization. For more details read [this article](https://blog.martioli.com/playwright-with-allure-reporter-published-on-aws-s3-bucket-full-parallelization/)
- Configure `baseURL` based on `ENVIRONMENT`.
- Use `globalSetup` for environment and setup dependencies.
- Use multiple reporters for CI and debugging.

#### 3.2 Playwright globalSetup file

Create a `globalSetup.ts` file in the `/tests` folder to be used for any configurations you need prior to running tests.

#### 3.3 Playwright Fixture Files

Use Playwright's [Fixtures feature](https://playwright.dev/docs/test-fixtures) for flexibility. Merge multiple fixtures in `fixtures/index.ts` for easy access in tests.

Example:

```typescript
test("Add new entry on home page", async ({ page, testData }) => {
  await page.goto("/");
  await page.getByTestId(secretKeyInputField).fill(testData.secretKey);
});
```

#### 3.4 CI GitHub Actions Setup

Include workflows for GitHub Actions. Set environment variables in repository secrets and reference them in the workflow file.

```yaml
env:
  TOKEN: ${{ secrets.TOKEN }}
  ENVIRONMENT: ${{ secrets.ENVIRONMENT }}
```

### 4. Running Tests

#### 4.1 Running Tests Locally

Use the VS Code extension or run tests via terminal:

```bash
npx playwright test tests/specFileName.spec.ts
```

or use the package.json scripts

```bash
    "runAll": "npm run clean-reports && npm run static-check && npx playwright test",
```

#### 4.2 Running Tests on CI

Set environment variables in GitHub Actions repo settings and reference them in the workflow file. You can also use scripts from `package.json`:

```yaml
env:
  ENVIRONMENT: ${{ secrets.ENVIRONMENT }}
```

### 5. Reporters

Playwright has its own built-in reporter and its pretty awesome, however I have found that Allure brings the most value for engineers to evaluate and debug, but also for management to have a clear view.
I mix and use all of the below for practicability purposes

#### 5.1 Install Reporters

Html - the basic, good for debuggins
json - good for advanced stuff , such as publish results in slack for example
list - looks good in CI for quick debugging
allure-playwright - to make your managers happy

```typescript
reporter: [["html"], ["list"], ["json"], ["allure-playwright"]];
```

#### 5.2 Allure Playwright Configurations

Most comprehensive reporter with tons of configurations - [Allure](https://allurereport.org/docs/playwright/)

```typescript
reporter: ["allure-playwright"];
```

To install allure reporter you must do

```bash
npm install allure-playwright allure-commandline
```

Add reporter in playwright config file and if needed add extra configurations. I highly suggest handling actions such as API calls or evironment related with a custom error handler. By doing this you can combine with allure reporters categorize options, to always have a clear view on which tests fail, based on the type of failure (eg: environment issue, test data issue, etc)

Important dependency detail:
Allure reporter requires you to have `Java` installed on your machine to show you the results in browser. However if you generate results using `--single-file` param it will just give you a html file with everything you need, without the need to install Java. You can use the script below

```bash
npm run allure-report-single
```

**Contributing**

To contribute, fork the repository, create a new branch, and submit a pull request to the main branch with a detailed description of your changes.
