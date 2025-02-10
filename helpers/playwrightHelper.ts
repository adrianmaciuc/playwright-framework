import { Page, Route } from "playwright";

/**
 * Intercepts API calls matching a specific endpoint and path, capturing the JSON responses.
 *
 * @param {Page} page - The Playwright Page object.
 * @param {string} path - The route path to intercept (e.g. ** /api/ **). Use glob patterns if needed.
 * @param {string} filterEndpoint - The endpoint to filter by (e.g., "/users").  The URL must *include* this.
 * @returns {Promise<string[]>} A promise that resolves to an array of JSON response bodies (as strings).  Returns an empty array if no matching requests are intercepted.
 */
export async function interceptApiCalls(
  page: Page,
  path: string,
  filterEndpoint: string
): Promise<string[]> {
  const requests: string[] = [];
  await page.route(path, async (route: Route) => {
    if (route.request().url().includes(filterEndpoint)) {
      await route.continue();
      const response = await (await route.request().response())?.json();
      requests.push(response);
    } else {
      await route.continue();
    }
  });
  return requests;
}
