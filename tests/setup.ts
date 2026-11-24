import "@testing-library/jest-dom/vitest";
import { beforeEach, vi } from "vitest";

if (typeof window !== "undefined") {
  beforeEach(() => window.localStorage.clear());
  HTMLDialogElement.prototype.showModal = function () {
    this.setAttribute("open", "");
  };
  HTMLDialogElement.prototype.close = function () {
    this.removeAttribute("open");
  };
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn(() => ({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  });
}
