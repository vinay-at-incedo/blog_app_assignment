import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { describe, expect, test, vi } from "vitest";
import CreateBlogModal from "./CreateBlogModal";
import userEvent from "@testing-library/user-event";

const setIsModalOpenMock = vi.fn();
const createBlogMock = vi.fn();
const setLoadingMock = vi.fn();
const loadingMock = false;

describe("CreateBlogModal", () => {
  test("Should open the CreatBlogModal when isModalOpen is true", async () => {
    await act(async () => {
      render(
        <CreateBlogModal
          isModalOpen={true}
          setIsModalOpen={setIsModalOpenMock}
          createBlog={createBlogMock}
          loading={loadingMock}
          setLoading={setLoadingMock}
        />
      );
    });
    const modalElement = screen.getByText(/Create Blog/i);
    expect(modalElement).toBeInTheDocument();
  });

  test("Should not open the CreatBlogModal when isModalOpen is false", async () => {
    await act(async () => {
      render(
        <CreateBlogModal
          isModalOpen={false}
          setIsModalOpen={setIsModalOpenMock}
          createBlog={createBlogMock}
          loading={loadingMock}
          setLoading={setLoadingMock}
        />
      );
    });
    const modalElement = screen.queryByText(/Create Blog/i);
    expect(modalElement).not.toBeInTheDocument();
  });

  test("renders form fields", async () => {
    await act(async () => {
      render(
        <CreateBlogModal
          isModalOpen={true}
          setIsModalOpen={setIsModalOpenMock}
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
        <CreateBlogModal
          isModalOpen={true}
          setIsModalOpen={setIsModalOpenMock}
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
