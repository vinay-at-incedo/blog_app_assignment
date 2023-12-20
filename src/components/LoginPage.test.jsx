import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import LoginPage from "./LoginPage";

describe("LoginPage", () => {
  vi.mock("react-router-dom", async () => {
    const routerDom = await vi.importActual("react-router-dom");
    return { ...routerDom, useNavigate: vi.fn() };
  });
  test("should render LoginPage component correctly", () => {
    render(<LoginPage />);
    const emailInput = screen.getByPlaceholderText(/Email/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const loginButton = screen.getByRole("button", { name: "Login" });
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  test("should validate form input", async () => {
    render(<LoginPage />);
    const loginButton = screen.getByRole("button", { name: "Login" });
    userEvent.click(loginButton);
    const errorMessage = await screen.findByText("Please input your email!");
    expect(errorMessage).toBeInTheDocument();
  });
});
