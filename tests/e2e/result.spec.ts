import { expect, test } from "@playwright/test";
import { questions } from "../../src/data/questions";
import { profiles } from "../../src/data/profiles";

for (const profile of profiles) {
  test(`desbloqueia ${profile.codename} com imagem exclusiva e layout acessível`, async ({
    page,
    isMobile,
  }, testInfo) => {
    const errors: string[] = [];
    const requested: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    page.on("request", (request) => {
      if (request.url().includes("/images/profiles/"))
        requested.push(request.url());
    });
    if (profile.id !== "builder")
      await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("./");
    await page.getByRole("textbox", { name: "Seu nickname" }).fill("Fênix");
    await page.getByRole("button", { name: "START" }).click();
    for (const question of questions) {
      await expect(page.locator(".result-profile")).toHaveCount(0);
      await page
        .getByRole("radio", {
          name: question.options.find(
            (option) => option.profileId === profile.id,
          )!.text,
          exact: true,
        })
        .check();
      await page
        .getByRole("button", {
          name: question.number === 15 ? "Concluir" : /Avançar/,
        })
        .click();
      if (question.number === 5 || question.number === 10)
        await page.getByRole("button", { name: /Continuar/ }).click();
    }
    if (profile.id === "builder") {
      const skip = page.getByRole("button", { name: "Pular animação" });
      await expect(skip).toBeVisible();
      await skip.focus();
      await page.keyboard.press("Enter");
    }
    const heading = page.getByRole("heading", { name: profile.codename });
    await expect(heading).toBeFocused();
    await expect(page.getByRole("progressbar")).toHaveAttribute("value", "100");
    await expect(
      page.getByText(profile.description, { exact: true }),
    ).toBeVisible();
    await expect(page.locator(".result-congratulations")).toContainText(
      "Parabéns, Fênix",
    );
    const image = page.locator(".result-portrait img");
    await image.evaluate((image: HTMLImageElement) => image.decode());
    expect(
      await image.evaluate((image: HTMLImageElement) => image.naturalWidth),
    ).toBe(960);
    expect(requested).toHaveLength(1);
    expect(requested[0]).toContain(`the-${profile.id}.webp`);
    for (const width of isMobile ? [412, 375, 320] : [1440, 1280]) {
      await page.setViewportSize({ width, height: 800 });
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
      ).toBe(false);
      if (profile.id === "builder")
        await page.screenshot({
          path: testInfo.outputPath(`result-${width}.png`),
          fullPage: true,
          animations: "disabled",
        });
    }
    if (profile.id !== "builder")
      await expect(image).toHaveCSS("animation-name", "none");
    expect(errors).toEqual([]);
  });
}
