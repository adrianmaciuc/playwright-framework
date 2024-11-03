**README**

**Project Overview**

This project is a Playwright framework example where all the features, logics, ideas have been put together to showcase a modular and scalable framework.

Instead of grouping this readme per functionalities, folders or business logic you will find a `build up path` that will help you understand each line of code and learn how do it your yourself.

**_The Build-up Path_**

**Initial Setup**

- Have `git` and `Node` installed

1. Install Playwright:

```cmd
npm init playwright@latest
```

Use the followings:
Typescript -> Folder tests -> add github actions workflow -> Install playwright browsers -> optional for playwright OS dependencies

2. Install dotenv for handling tokens and secrets both local and for CI

```cmd
npm install dotenv
```

Create a `.env` file at root level and add the above variables

- `ENVIRONMENT`:`dev` The environment for running tests.
- `TOKEN`:`magictoken` Example of any secret key you may need to be stored locally or fetched from Github secrets for CI runs

To add dotenv to your project, import dotenv in `playwright.config.ts` and add `dotenv.config()` at the top of the file

**Additional helpers for your setup**

1. Install linters and plugins to force rules of best practice
   https://ceroshjacob.medium.com/setting-up-eslint-for-playwright-projects-with-typescript-12fab098bd94

```cmd
npm install @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-playwright
```

Create a file called `eslint.config.js` and config linters. Each one with their own rules, but I recommend using the ones found here in my project.

2. Configure your tsconfig.json file
   Create a file at the root folder named `tsconfig.json`. Use this projects file `tsconfig.json` contents. It mainly focuses on a `module` kind of project that can do import export and also have the possibility to use `require()`. Remember to update your `package.json` file with the value `"type": "module"`

**Environment Variables**

The project uses the following environment variables:

- `ENVIRONMENT`:`dev` The environment for local run of tests (required)
- `TOKEN`:`magictoken` The secret key for authentication (required) (not public)

**Fixtures**

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
