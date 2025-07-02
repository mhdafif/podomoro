import "@testing-library/jest-dom";
import "vitest/globals";

declare module "*.pdf";
declare module "*.jpg";
declare module "*.png";
declare module "*.svg";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}
