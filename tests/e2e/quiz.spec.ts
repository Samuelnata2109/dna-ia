import { expect, test } from "@playwright/test";

test("joga as 15 perguntas com imagens e revela perfil somente após concluir", async ({
  page,
  isMobile,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("./");
  await page.getByRole("textbox", { name: "Seu nickname" }).fill("Lú 🧩");
  await page.getByRole("button", { name: "START" }).click();
  for (let index = 0; index < 15; index++) {
    await expect(page.getByRole("radio")).toHaveCount(6);
    await expect(page.locator(".quiz-image img")).toHaveJSProperty(
      "complete",
      true,
    );
    expect(
      await page
        .locator(".quiz-image img")
        .evaluate((image: HTMLImageElement) => image.naturalWidth),
    ).toBe(1280);
    const first = page.getByRole("radio").first();
    if (index === 0) {
      await expect(
        page.getByRole("button", { name: /Avançar/ }),
      ).toBeDisabled();
      if (isMobile) await first.tap();
      else await first.check();
      const choice = await first.inputValue();
      await page.getByRole("button", { name: /Avançar/ }).click();
      await page.getByRole("button", { name: /Voltar/ }).click();
      await expect(page.getByRole("radio").first()).toHaveValue(choice);
      await expect(page.getByRole("radio").first()).toBeChecked();
      await page.getByRole("radio").nth(1).check();
      await expect(page.getByRole("progressbar")).toHaveAttribute("value", "6");
    } else {
      await first.check();
    }
    await page
      .getByRole("button", { name: index === 14 ? "Concluir" : /Avançar/ })
      .click();
    if (index === 4 || index === 9) {
      await expect(
        page.getByRole("heading", { name: /LEVEL 0[12] COMPLETO/ }),
      ).toBeFocused();
      await expect(page.getByRole("progressbar")).toHaveAttribute(
        "value",
        index === 4 ? "33" : "66",
      );
      await page.getByRole("button", { name: /Continuar/ }).click();
    }
  }
  await expect(page.getByRole("heading", { name: /THE / })).toBeVisible();
  await expect(page.getByRole("progressbar")).toHaveAttribute("value", "100");
  await expect(page.locator(".result-portrait img")).toBeVisible();
  expect(errors).toEqual([]);
});

test("quiz cabe nas larguras previstas e respeita movimento reduzido", async ({
  page,
  isMobile,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of isMobile ? [412, 375, 320] : [1440, 1280]) {
    await page.setViewportSize({ width, height: 800 });
    await page.goto("./");
    await page.getByRole("textbox", { name: "Seu nickname" }).fill("Fênix");
    await page.getByRole("button", { name: "START" }).click();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator(".quiz-content")).toHaveCSS(
      "animation-name",
      "none",
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      `largura ${width}px`,
    ).toBe(false);
  }
});
