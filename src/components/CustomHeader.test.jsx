import { render, screen } from "@testing-library/react";
import CustomHeader from "./CustomHeader";
import { vi, test, expect, describe } from "vitest";

describe("CustomHeader", () => {
  vi.mock("../hooks/useAuth", () => ({
    default: vi.fn(() => ({
      isAuth: false,
      loggedInUser: "test@email.com",
      logout: vi.fn(),
    })),
  }));
  
  vi.mock("react-router-dom", async () => {
    const routerDom = await vi.importActual("react-router-dom");
    return { ...routerDom, useNavigate: vi.fn() };
  });

  test("renders the component", () => {
    render(<CustomHeader />);
    expect(screen.getByAltText(/logo/i)).toBeInTheDocument();
  });

  test("does not render the logout button when the user is not logged in", () => {
    render(<CustomHeader />);
    expect(
      screen.queryByRole("button", { name: /logout/i })
    ).not.toBeInTheDocument();
  });
});
