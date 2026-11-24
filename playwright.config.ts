import { defineConfig, devices } from "@playwright/test";

const origin = "http://127.0.0.1:4173";
const appUrl = `${origin}/dna-ia/`;

export default defineConfig({
  testDir: "./tests/e2e",
  forbidOnly: Boolean(process.env.CI),
  use: { baseURL: appUrl },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    command: "npm run preview -- --host 127.0.0.1 --port 4173",
    url: appUrl,
  },
});
