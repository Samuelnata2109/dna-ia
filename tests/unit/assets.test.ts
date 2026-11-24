import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { expect, it } from "vitest";
const approved: Record<string, string> = JSON.parse(
  readFileSync(
    new URL("../fixtures/approved-assets.json", import.meta.url),
    "utf8",
  ),
);

it("preserva byte a byte as 21 imagens aprovadas das Etapas 05 e 06", () => {
  expect(Object.keys(approved)).toHaveLength(21);
  for (const [path, hash] of Object.entries(approved))
    expect(
      createHash("sha256").update(readFileSync(path)).digest("hex"),
      path,
    ).toBe(hash);
});
