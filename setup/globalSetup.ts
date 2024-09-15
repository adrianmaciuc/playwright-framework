import { FullConfig } from "@playwright/test";

export function getBaseUrl() {
  if (process.env.baseUrl == "dev") {
    return "http://localhost:5173/";
  } else {
    return "https://z.martioli.com/";
  }
}

export function getSecretKey() {
  return process.env.token!;
}

export default async function globalSetup(config: FullConfig) {}
