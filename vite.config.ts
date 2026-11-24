import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  base: "/dna-ia/",
  plugins: [react()],
  test: {
    include: ["tests/{unit,integration}/**/*.test.{ts,tsx}"],
    setupFiles: ["./tests/setup.ts"],
  },
});
