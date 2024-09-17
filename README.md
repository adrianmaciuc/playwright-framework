**README**

**Project Overview**

This project is a Playwright framework example that attempts to partially follow the POM pattern, with focus on using Playwright builtin methods instead of creating custom methods for each test step. Classes are here just to keep selectors and handle the driver. Selectors are not grouped just per page but per various logic such as features, common and others

**Directory Structure**

- `.github/workflows`: Contains workflow configuration files for CI/CD
- `fixtures`: Contains reference towards test data, pages and others to be easy accesibile inside tests
- `selectors`: Contains all the selectors used in test and are not limited to pages only. It can be from features, pages or others
- `tests`: Where all the tests can be found. It also includes `globalSetup.ts`

**Environment Variables**

The project uses the following environment variables:

- `ENVIRONMENT`:`dev` The environment for local run of tests (required)
- `TOKEN`:`magictoken` The secret key for authentication (required) (not public)

Please create a `.env` file at root level and add the above variables

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

**Contributing**

To contribute to this project, fork the repository and create a new branch for your changes. Submit a pull request to the main branch, and include a detailed description of your changes.
