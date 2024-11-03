---
# Playwright Framework Example
---

## Project Overview

This project provides a **modular and scalable Playwright framework** example. It brings together various features, logic, and best practices to serve as a comprehensive learning resource. Instead of dividing the README into functionalities, folders, or business logic sections, this guide follows a **build-up path** to help you understand each line of code and empower you to implement it yourself.

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

### 3. Framework configs

#### 3.1 Playwright main config file

A few key points to highlight some of the reasons behind the values set:

- `Timeouts` are important to avoid failing tests that take too long to throw an error in CI. If needed , read [this article about timeouts](https://www.bondaracademy.com/blog/playwright-timeout-30000ms-exceeded)
- It focuses on full paralelisation. If needed, [read this article](https://blog.martioli.com/playwright-with-allure-reporter-published-on-aws-s3-bucket-full-parallelization/)
- `baseURL` is configured based on what value you set as `ENVIRONMENT` in your secrets (`.env` file or github secrets)
- Projects have a `globalSetup` as dependency to fail quickly in case of setup failures
- Reporters are multiple. Some are for quick access in CI while others for detailed debugging

For flexibility and easy access Fixtures feature from Playwright is used here to "mix" pages with test data and other details. For example `pages.fixture.ts` reference to selectors grouped by page, and `testData.fixture.ts` has data fetched from env vars or third party apps. They all have their own separate files with instantiation of objects based on classes from `selectors` folder or just values fetched and handled within the same fixture file. All are merged together in `fixtures/index.ts`

**Global Setup**

The global setup file (`globalSetup.ts`) checks if environment variables used for config are setup properly and performs other framework related setup. This file is also a dependency for all tests. It runs first before all tests and if it fails, then no tests are run.

**CI/CD**

The project includes workflows for Github Actions. Do not forget to setup environment variables needed at CI level.
Go to settings and add them into repository secret, then add reference for the machine in workflow file like this:

```yaml
env:
  TOKEN: ${{ secrets.TOKEN }}
  ENVIRONMENT: ${{ secrets.ENVIRONMENT }}
```

**Linters**

I followed this article https://ceroshjacob.medium.com/setting-up-eslint-for-playwright-projects-with-typescript-12fab098bd94
Which uses this plugin https://github.com/playwright-community/eslint-plugin-playwright
CI Has a static-check job that has to pass in order to run the test, so be careful in not introducing any errors
After you have written your code you can do `npm run pre-check` in root folder to check for errors.

**Contributing**

To contribute to this project, fork the repository and create a new branch for your changes. Submit a pull request to the main branch, and include a detailed description of your changes.
