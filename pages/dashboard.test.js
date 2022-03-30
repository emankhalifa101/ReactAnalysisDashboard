import React from "react";
import { render, screen } from "@testing-library/react";
import Dashboard from "./dashboard";

describe("Dashboard", () => {
  it("renders a loading shimmer on first", () => {
    render(<Dashboard />);
    const heading = screen.getByRole("heading", {
      name: /Loading ..../i,
    });
    expect(heading).toBeInTheDocument();
  });
});
