import { expect, test } from "@playwright/test";

test("carrega o build no caminho do Pages e aceita recarga", async ({
  page,
}) => {
  const response = await page.goto("./");
  expect(response?.ok()).toBe(true);
  await expect(page).toHaveURL(/\/dna-ia\/$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  const title = page.getByRole("heading", { name: "DNA:IA", level: 1 });
  await expect(title).toBeVisible();
  await page.reload();
  await expect(title).toBeVisible();
});
