import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/user-event";
import { afterEach, beforeEach, vi } from "vitest";

import "../config/i18n";

beforeEach(async () => {
  vi.resetModules();
  vi.resetAllMocks();
});
// runs a cleanup after each test case (e.g. clearing jsdom) & reset all mocks
afterEach(() => {
  cleanup();
});
