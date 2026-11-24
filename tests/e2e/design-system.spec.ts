import { expect, test } from "@playwright/test";

test("mantém foco, alvos de toque, fontes locais e layout responsivo", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("./#design-system");
  const button = page.getByRole("button", { name: "Testar ação" });
  await expect(button).toBeVisible();
  await page.keyboard.press("Tab");
  await expect(button).toBeFocused();
  await expect(button).toHaveCSS("outline-style", "solid");
  await expect(button).toHaveCSS("outline-width", "3px");
  await expect(button).toHaveCSS("transition-duration", "0s, 0s");
  expect((await button.boundingBox())?.height).toBeGreaterThanOrEqual(44);
  await page.keyboard.press("Enter");
  await expect(page.getByRole("status")).toHaveText(
    "Ação registrada na demonstração.",
  );
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("button", { name: "Limpar teste" }),
  ).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("textbox", { name: "Código de exemplo" }),
  ).toBeFocused();

  expect(
    await page.evaluate(async () => {
      await document.fonts.ready;
      const families = new Set(
        [...document.fonts]
          .filter((font) => font.status === "loaded")
          .map((font) => font.family),
      );
      return ["Space Grotesk", "Press Start 2P", "JetBrains Mono"].every(
        (name) => families.has(name),
      );
    }),
  ).toBe(true);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
});

test("mantém contraste nos textos, controles e indicadores", async ({
  page,
}) => {
  await page.goto("./#design-system");
  const button = page.getByRole("button", { name: "Testar ação" });
  await expect(button).toBeVisible();
  await page.keyboard.press("Tab");
  await expect(button).toBeFocused();

  const ratios = await page.evaluate(() => {
    function luminance(color: string) {
      const channels = color.startsWith("#")
        ? color
            .slice(1)
            .match(/../g)
            ?.map((hex) => parseInt(hex, 16))
        : color
            .match(/\d+(?:\.\d+)?/g)
            ?.slice(0, 3)
            .map(Number);
      if (channels?.length !== 3) throw new Error(`Cor RGB esperada: ${color}`);
      const [red, green, blue] = channels.map((channel) => {
        const value = channel / 255;
        return value <= 0.04045
          ? value / 12.92
          : ((value + 0.055) / 1.055) ** 2.4;
      });
      return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
    }

    function ratio(first: string, second: string) {
      const a = luminance(first);
      const b = luminance(second);
      return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
    }

    function style(selector: string) {
      const node = document.querySelector(selector);
      if (!node) throw new Error(`Elemento ausente: ${selector}`);
      return getComputedStyle(node);
    }

    const primary = style('.ds-button[data-variant="primary"]');
    const card = style('.ds-card[data-variant="default"]');
    const cyan = style('.ds-badge[data-tone="accent"]');
    const achievement = style('.ds-badge[data-tone="achievement"]');
    const field = style(".ds-input");
    const track = style("progress");
    const flags = [1, 2, 3].map((phase) =>
      style(`[data-phase="${phase}"]`)
        .getPropertyValue("--ds-progress-fill")
        .trim(),
    );

    return {
      primaryText: ratio(primary.color, primary.backgroundColor),
      caption: ratio(style(".showcase__caption").color, card.backgroundColor),
      fieldError: ratio(style(".ds-field__error").color, card.backgroundColor),
      cyan: ratio(cyan.color, cyan.backgroundColor),
      achievement: ratio(achievement.color, achievement.backgroundColor),
      fieldBorder: ratio(field.borderTopColor, field.backgroundColor),
      focus: ratio(primary.outlineColor, card.backgroundColor),
      progress: flags.map((flag) => ratio(flag, track.backgroundColor)),
    };
  });

  for (const key of [
    "primaryText",
    "caption",
    "fieldError",
    "cyan",
    "achievement",
  ] as const) {
    expect(ratios[key], key).toBeGreaterThanOrEqual(4.5);
  }
  expect(ratios.fieldBorder, "input border").toBeGreaterThanOrEqual(3);
  expect(ratios.focus, "keyboard focus").toBeGreaterThanOrEqual(3);
  for (const [index, value] of ratios.progress.entries()) {
    expect(value, `phase ${index + 1}`).toBeGreaterThanOrEqual(3);
  }
});
