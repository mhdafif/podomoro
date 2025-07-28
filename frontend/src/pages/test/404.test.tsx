import { render, screen } from "@/__test__/test.utils";
import { beforeEach, describe, expect, it } from "vitest";

import NotFound from "../NotFound";

describe("Not Found Component", () => {
  beforeEach(() => {
    render(<NotFound />);
  });
  it("match the text for english version", () => {
    expect(screen.getByText("This page was not found")).toBeInTheDocument();
  });
});
