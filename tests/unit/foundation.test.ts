import { expect, it } from "vitest";
import config from "../../vite.config";

it("usa o subdiretório reservado ao projeto no GitHub Pages", () => {
  expect(config.base).toBe("/dna-ia/");
});
