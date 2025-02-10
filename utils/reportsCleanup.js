import fs from "fs/promises";
import path from "path";

const cleanFolder = async (folderPath) => {
  try {
    // Check if folder exists
    await fs.access(folderPath);
    console.log(`Older ${path.basename(folderPath)} found. Deleting files`);

    // Remove folder and all its contents recursively
    await fs.rm(folderPath, { recursive: true, force: true });
    console.log(`Successfully cleaned ${path.basename(folderPath)} folder`);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log(
        `${path.basename(
          folderPath
        )} folder does not exist, skipping initial cleanup`
      );
    } else {
      console.error(
        `Error while cleaning ${path.basename(folderPath)}:`,
        error.message
      );
      process.exit(1);
    }
  }
};

const cleanAllureResults = async () => {
  const allureResultsPath = path.join(process.cwd(), "allure-results");
  await cleanFolder(allureResultsPath);
};

const cleanAllureReport = async () => {
  const allureResultsPath = path.join(process.cwd(), "allure-report");
  await cleanFolder(allureResultsPath);
};

const cleanTestResults = async () => {
  const testResultsPath = path.join(process.cwd(), "test-results");
  await cleanFolder(testResultsPath);
};

const cleanPlaywrightReport = async () => {
  const playwrightReportPath = path.join(process.cwd(), "playwright-report");
  await cleanFolder(playwrightReportPath);
};

const cleanAllReports = async () => {
  await cleanAllureResults();
  await cleanAllureReport();
  await cleanTestResults();
  await cleanPlaywrightReport();
};

cleanAllReports();
