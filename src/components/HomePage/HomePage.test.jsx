import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "./HomePage";
import { act } from "react-dom/test-utils";

describe("HomePage", () => {
  test("renders correctly", async () => {
    await act(async () => {
      render(<HomePage />);
    });
    const createButton = screen.getByText(/Create/i);
    expect(createButton).toBeInTheDocument();
  });

  test('disables "Delete" button when no rows are selected', async () => {
    await act(async () => {
      render(<HomePage />);
    });
    const deleteButton = screen.getByRole("button", { name: /Delete/i });
    expect(deleteButton).toBeDisabled();
  });

  test("table is rendered properly", async () => {
    await act(async () => {
      render(<HomePage />);
    });
    const title = screen.getByText(/Title/i);
    const author = screen.getByText(/Author/i);
    const category = screen.getByText(/Category/i);
    const tags = screen.getByText(/Tags/i);
    const comments_Count = screen.getByText(/Comments Count/i);
    const date = screen.getByText(/Date/i);
    expect(title).toBeInTheDocument();
    expect(author).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(tags).toBeInTheDocument();
    expect(comments_Count).toBeInTheDocument();
    expect(date).toBeInTheDocument();
  });
});
