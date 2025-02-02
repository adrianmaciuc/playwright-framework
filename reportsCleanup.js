import fs from "fs/promises";
import path from "path";

const cleanAllureResults = async () => {
  const allureResultsPath = path.join(process.cwd(), "allure-results");

  try {
    // Check if folder exists
    await fs.access(allureResultsPath);
    console.log("Older allure results found. Deleting files");

    // Remove folder and all its contents recursively
    await fs.rm(allureResultsPath, { recursive: true, force: true });
    console.log("Successfully cleaned allure-results folder");
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log(
        "allure-results folder does not exist, skipping initial cleanup"
      );
      process.exit(0);
    } else {
      console.error("Error while cleaning allure-results:", error.message);
      process.exit(1);
    }
  }
};

cleanAllureResults();
