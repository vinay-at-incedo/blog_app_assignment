import { render, screen } from "@testing-library/react";
import CustomFooter from "./CustomFooter";
import { expect, test, describe } from "vitest";

describe("CustomFooter component", () => {
  test("should render CustomFooter component correctly", () => {
    render(<CustomFooter />);
    const element = screen.getByText("Blog App ©2023 Created Using Vite");
    expect(element).toBeInTheDocument();
  });
});
