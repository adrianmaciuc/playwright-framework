import fs from "fs/promises";
import path from "path";

const cleanAllureResults = async () => {
  const allureResultsPath = path.join(process.cwd(), "allure-results");

  try {
    // Check if directory exists
    await fs.access(allureResultsPath);

    // Read all files in the directory
    const files = await fs.readdir(allureResultsPath);

    // Delete each file
    await Promise.all(
      files.map((file) =>
        fs
          .unlink(path.join(allureResultsPath, file))
          .catch((err) =>
            console.error(`Failed to delete ${file}: ${err.message}`)
          )
      )
    );

    console.log("Successfully cleaned allure-results directory");
  } catch (error) {
    if (error.code === "ENOENT") {
      // Directory doesn't exist, create it
      try {
        await fs.mkdir(allureResultsPath);
        console.log("Created allure-results directory");
      } catch (mkdirError) {
        console.error(
          "Failed to create allure-results directory:",
          mkdirError.message
        );
      }
    } else {
      console.error("Error while cleaning allure-results:", error.message);
    }
  }
};

cleanAllureResults();
