import { expect, test } from "@playwright/test";

test("inicia pelo teclado no desktop e pelo toque no mobile", async ({
  page,
  isMobile,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto("./");
  const field = page.getByRole("textbox", { name: "Seu nickname" });
  const start = page.getByRole("button", { name: "START" });
  await expect(field).toBeVisible();
  await expect(start).toBeDisabled();

  if (!isMobile) {
    await page.keyboard.press("Tab");
    await expect(field).toBeFocused();
    await expect(field).toHaveCSS("outline-width", "3px");
  }

  await field.fill("  Fênix 🧩  ");
  await expect(start).toBeEnabled();
  if (isMobile) {
    await start.tap();
  } else {
    await field.press("Enter");
  }
  await expect(page.getByRole("heading", { level: 1 })).toBeFocused();
  await expect(page.getByText("Fênix 🧩")).toBeVisible();
  await expect(page.getByRole("radio")).toHaveCount(6);
  expect(errors).toEqual([]);
});

test("mantém controles acessíveis nas resoluções previstas e reduz movimento", async ({
  page,
  isMobile,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const widths = isMobile ? [412, 375, 320] : [1440, 1280];
  const height = isMobile ? 568 : 800;
  for (const width of widths) {
    await page.setViewportSize({ width, height });
    await page.goto("./");
    const field = page.getByRole("textbox", { name: "Seu nickname" });
    const start = page.getByRole("button", { name: "START" });
    await expect(start).toBeInViewport({ ratio: 1 });
    await expect(field).toBeInViewport({ ratio: 1 });
    await expect(page.locator(".welcome-core")).toHaveCSS(
      "animation-name",
      "none",
    );
    await expect(page.locator(".core-node-pulse").first()).toHaveCSS(
      "animation-name",
      "none",
    );
    await field.fill("Lú");
    await expect(start).toHaveCSS("animation-name", "none");
    expect((await field.boundingBox())?.height).toBeGreaterThanOrEqual(44);
    expect((await start.boundingBox())?.height).toBeGreaterThanOrEqual(44);
    const layout = await page.evaluate(async () => {
      await document.fonts.ready;
      const core = document
        .querySelector(".welcome-core")!
        .getBoundingClientRect();
      const content = document
        .querySelector(".welcome-content")!
        .getBoundingClientRect();
      return {
        overflow: document.documentElement.scrollWidth > innerWidth,
        overlap:
          core.left < content.right &&
          core.right > content.left &&
          core.top < content.bottom &&
          core.bottom > content.top,
      };
    });
    expect(layout, `largura ${width}px`).toEqual({
      overflow: false,
      overlap: false,
    });
  }
});

test("mantém contraste nos textos, no START e no foco", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("./");
  const field = page.getByRole("textbox", { name: "Seu nickname" });
  await expect(field).toBeVisible();
  await page.keyboard.press("Tab");
  await expect(field).toBeFocused();
  await field.fill("Fênix");

  const ratios = await page.evaluate(() => {
    function luminance(color: string) {
      const [red, green, blue] = (color.match(/\d+/g) ?? []).map((channel) => {
        const value = Number(channel) / 255;
        return value <= 0.04045
          ? value / 12.92
          : ((value + 0.055) / 1.055) ** 2.4;
      });
      return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
    }

    function contrast(a: string, b: string) {
      const first = luminance(a);
      const second = luminance(b);
      return (
        (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05)
      );
    }

    function style(selector: string) {
      return getComputedStyle(document.querySelector(selector)!);
    }

    const input = style(".welcome-entry input");
    const start = style(".welcome-start");
    return {
      body: contrast(
        style(".welcome-description").color,
        style(".welcome").backgroundColor,
      ),
      input: contrast(input.color, input.backgroundColor),
      start: contrast(start.color, start.backgroundColor),
      focus: contrast(
        input.outlineColor,
        style(".welcome-entry").backgroundColor,
      ),
    };
  });

  for (const key of ["body", "input", "start"] as const) {
    expect(ratios[key], key).toBeGreaterThanOrEqual(4.5);
  }
  expect(ratios.focus).toBeGreaterThanOrEqual(3);
});
