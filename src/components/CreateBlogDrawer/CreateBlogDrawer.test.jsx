import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { describe, expect, test, vi } from "vitest";
import CreateBlogDrawer from "./CreateBlogDrawer";

const setIsDrawerOpenMock = vi.fn();
const createBlogMock = vi.fn();
const setLoadingMock = vi.fn();
const loadingMock = false;

describe("CreateBlogDrawer", () => {
  test("Should open the CreatBlogDrawer when isDrawerOpen is true", async () => {
    await act(async () => {
      render(
        <CreateBlogDrawer
          isDrawerOpen={true}
          setIsDrawerOpen={setIsDrawerOpenMock}
          createBlog={createBlogMock}
          loading={loadingMock}
          setLoading={setLoadingMock}
        />
      );
    });
    const drawerElement = screen.getByText(/Create Blog/i);
    expect(drawerElement).toBeInTheDocument();
  });

  test("Should not open the CreatBlogDrawer when isDrawerOpen is false", async () => {
    await act(async () => {
      render(
        <CreateBlogDrawer
          isDrawerOpen={false}
          setIsDrawerOpen={setIsDrawerOpenMock}
          createBlog={createBlogMock}
          loading={loadingMock}
          setLoading={setLoadingMock}
        />
      );
    });
    const drawerElement = screen.queryByText(/Create Blog/i);
    expect(drawerElement).not.toBeInTheDocument();
  });

  test("renders form fields", async () => {
    await act(async () => {
      render(
        <CreateBlogDrawer
          isDrawerOpen={true}
          setIsDrawerOpen={setIsDrawerOpenMock}
          createBlog={createBlogMock}
          loading={loadingMock}
          setLoading={setLoadingMock}
        />
      );
    });
    const dateField = screen.getByLabelText(/Date/i);
    const titleField = screen.getByLabelText(/Title/i);
    const authorField = screen.getByLabelText(/Author/i);
    const categoryField = screen.getByLabelText(/Category/i);
    const tagsField = screen.getByLabelText(/Tags/i);
    const imageField = screen.getByLabelText(/Upload Image/i);
    const publishNowField = screen.getByLabelText(/Publish Now/i);
    expect(dateField).toBeInTheDocument();
    expect(titleField).toBeInTheDocument();
    expect(authorField).toBeInTheDocument();
    expect(categoryField).toBeInTheDocument();
    expect(tagsField).toBeInTheDocument();
    expect(imageField).toBeInTheDocument();
    expect(publishNowField).toBeInTheDocument();
  });

  test("should validate create blog form input", async () => {
    await act(async () => {
      render(
        <CreateBlogDrawer
          isDrawerOpen={true}
          setIsDrawerOpen={setIsDrawerOpenMock}
          createBlog={createBlogMock}
          loading={loadingMock}
          setLoading={setLoadingMock}
        />
      );
    });
    const createButton = screen.getByRole("button", { name: /Create/i });
    userEvent.click(createButton);
    const errorMessage = await screen.findByText(/Please select a date/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
