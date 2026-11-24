import { expect, test } from "@playwright/test";
import { SESSION_KEY } from "../../src/storage/sessionStorage";
import { journeyFixture } from "../helpers/journey";
import { questions } from "../../src/data/questions";

test("salva, reabre a aba e retoma a ordem e a posição sem repetir fases", async ({
  page,
  isMobile,
}) => {
  await page.goto("./");
  await page.getByRole("textbox", { name: "Seu nickname" }).fill("Fênix");
  await page.getByRole("button", { name: "START" }).click();
  await expect(page.getByRole("radio")).toHaveCount(6);
  const order = await page
    .getByRole("radio")
    .evaluateAll((els) => els.map((el) => (el as HTMLInputElement).value));
  await page.getByRole("radio").first().check();
  await page.getByRole("button", { name: /Avançar/ }).click();
  await page.reload();
  await expect(
    page.getByRole("button", { name: "CONTINUAR MINHA JORNADA" }),
  ).toBeVisible();
  await expect(page.getByText(/Você já respondeu 1 de 15/)).toBeVisible();
  if (isMobile)
    await page.getByRole("button", { name: "CONTINUAR MINHA JORNADA" }).tap();
  else
    await page
      .getByRole("button", { name: "CONTINUAR MINHA JORNADA" })
      .press("Enter");
  await expect(
    page.getByRole("heading", { name: questions[1].prompt }),
  ).toBeFocused();
  await page.getByRole("button", { name: /Voltar/ }).click();
  expect(
    await page
      .getByRole("radio")
      .evaluateAll((els) => els.map((el) => (el as HTMLInputElement).value)),
  ).toEqual(order);
  await expect(page.getByRole("radio").first()).toBeChecked();
  await page.getByRole("radio").nth(1).check();
  const saved = await page.evaluate(
    (key) => JSON.parse(localStorage.getItem(key)!),
    SESSION_KEY,
  );
  expect(Object.keys(saved.session.answers)).toHaveLength(1);
  const context = page.context();
  await page.close();
  const reopened = await context.newPage();
  await reopened.goto("./");
  await reopened
    .getByRole("button", { name: "CONTINUAR MINHA JORNADA" })
    .click();
  await expect(reopened.getByRole("radio").nth(1)).toBeChecked();
  for (let n = 1; n <= 5; n++) {
    await reopened.getByRole("radio").first().check();
    await reopened.getByRole("button", { name: /Avançar/ }).click();
  }
  await reopened.getByRole("button", { name: /Continuar/ }).click();
  await reopened.reload();
  await reopened
    .getByRole("button", { name: "CONTINUAR MINHA JORNADA" })
    .click();
  await expect(
    reopened.getByRole("heading", { name: questions[5].prompt }),
  ).toBeVisible();
  await reopened.getByRole("button", { name: /Voltar/ }).click();
  await reopened.getByRole("button", { name: /Avançar/ }).click();
  await expect(
    reopened.getByRole("heading", { name: questions[5].prompt }),
  ).toBeVisible();
});

test("retoma resultado, compartilha, confirma reinício e cria sessão nova", async ({
  page,
  isMobile,
}) => {
  await page.addInitScript(
    ({ key, data }) => {
      localStorage.setItem(key, JSON.stringify(data));
      Object.defineProperty(navigator, "share", {
        configurable: true,
        value: async (data: ShareData) => {
          (window as unknown as { shared: ShareData }).shared = data;
        },
      });
    },
    { key: SESSION_KEY, data: journeyFixture(15, true) },
  );
  await page.goto("./");
  await page.getByRole("button", { name: "CONTINUAR MINHA JORNADA" }).click();
  await expect(
    page.getByRole("heading", { name: "THE BUILDER" }),
  ).toBeFocused();
  await expect(
    page.getByRole("button", { name: "Pular animação" }),
  ).toHaveCount(0);
  await page.getByRole("button", { name: "COMPARTILHAR RESULTADO" }).click();
  const shared = await page.evaluate(
    () => (window as unknown as { shared: ShareData }).shared,
  );
  expect(JSON.stringify(shared)).toContain("THE BUILDER");
  expect(JSON.stringify(shared)).not.toContain("Fênix");
  const restart = page.getByRole("button", { name: "REFAZER QUIZ" });
  await restart.click();
  await expect(page.getByRole("button", { name: "Cancelar" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(restart).toBeFocused();
  await restart.click();
  await page.getByRole("button", { name: "APAGAR E RECOMEÇAR" }).click();
  await expect(
    page.getByRole("textbox", { name: "Seu nickname" }),
  ).toBeFocused();
  expect(
    await page.evaluate((key) => localStorage.getItem(key), SESSION_KEY),
  ).toBeNull();
  await page
    .getByRole("textbox", { name: "Seu nickname" })
    .fill("Nova jornada");
  if (isMobile) await page.getByRole("button", { name: "START" }).tap();
  else await page.getByRole("textbox", { name: "Seu nickname" }).press("Enter");
  await expect(page.getByRole("progressbar")).toHaveAttribute("value", "0");
  const current = await page.evaluate(
    (key) => JSON.parse(localStorage.getItem(key)!),
    SESSION_KEY,
  );
  expect(current.session.answers).toEqual({});
  expect(current.session.nickname).toBe("Nova jornada");
});

test("fallback de cópia e escolha de retomada acessíveis nas cinco larguras", async ({
  page,
  isMobile,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addInitScript(
    ({ key, data }) => {
      localStorage.setItem(key, JSON.stringify(data));
      Object.defineProperty(navigator, "share", {
        configurable: true,
        value: undefined,
      });
      Object.defineProperty(navigator, "clipboard", {
        configurable: true,
        value: {
          writeText: async (text: string) => {
            (window as unknown as { copied: string }).copied = text;
          },
        },
      });
    },
    { key: SESSION_KEY, data: journeyFixture(15, true) },
  );
  await page.goto("./");
  for (const width of isMobile ? [412, 375, 320] : [1440, 1280]) {
    await page.setViewportSize({ width, height: 800 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
    ).toBe(false);
    expect(
      (await page
        .getByRole("button", { name: "CONTINUAR MINHA JORNADA" })
        .boundingBox())!.height,
    ).toBeGreaterThanOrEqual(44);
  }
  await page.getByRole("button", { name: "CONTINUAR MINHA JORNADA" }).click();
  await page.getByRole("button", { name: "COMPARTILHAR RESULTADO" }).click();
  await expect(page.getByText(/Mensagem copiada/)).toBeVisible();
  expect(
    await page.evaluate(() => (window as unknown as { copied: string }).copied),
  ).toContain("https://samuelnata2109.github.io/dna-ia/");
});

test("dados inválidos e falha de exclusão não são descartados silenciosamente", async ({
  page,
}) => {
  await page.addInitScript((key) => {
    localStorage.setItem(key, "{");
    Storage.prototype.removeItem = () => {
      throw new Error("blocked");
    };
  }, SESSION_KEY);
  await page.goto("./");
  await expect(
    page.getByRole("heading", { name: /Não foi possível recuperar/ }),
  ).toBeVisible();
  await page.getByRole("button", { name: "COMEÇAR NOVAMENTE" }).click();
  await page.getByRole("button", { name: "APAGAR E RECOMEÇAR" }).click();
  await expect(page.getByRole("alert")).toBeVisible();
  await expect(page.getByRole("dialog")).toBeVisible();
  expect(
    await page.evaluate((key) => localStorage.getItem(key), SESSION_KEY),
  ).toBe("{");
});
