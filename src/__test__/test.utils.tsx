import {
  type RenderOptions,
  render as rtlRender,
} from "@testing-library/react";
import React from "react";
import type { ReactElement, ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";

// setup reusable router
type CustomRenderOptions = {
  route?: string;
} & RenderOptions;
interface WrapperProps {
  children?: ReactNode;
}
function render(
  ui: ReactElement,
  { route = "/", ...renderOptions }: CustomRenderOptions = {}
): ReturnType<typeof rtlRender> {
  window.history.pushState({}, "", route);

  const Wrapper: React.FC<WrapperProps> = ({ children }) => (
    <MemoryRouter>{children}</MemoryRouter>
  );
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
// eslint-disable-next-line react-refresh/only-export-components
export * from "@testing-library/react";
// override render method
export { render };

// mock navigate react-router-dom
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const originalModule = await vi.importActual("react-router-dom");
  return {
    ...originalModule,
    useNavigate: () => mockNavigate,
  };
});

export { mockNavigate };

// mock axios
vi.mock("@/helper/axios");

// mock matchMedia polyfill
interface CustomWindow extends Window {
  matchMedia: any;
}

declare let window: CustomWindow;

if (typeof window !== "undefined") {
  window.matchMedia =
    window.matchMedia ||
    function () {
      return {
        matches: false,
        addListener: function () {},
        removeListener: function () {},
      };
    };
}
