import { render, screen, waitFor } from "@testing-library/react";
import ConfirmDeleteBlogsModal from "./ConfirmDeleteBlogsModal";
import { expect, test, describe, vi } from "vitest";
import userEvent from "@testing-library/user-event";

const setIsModalOpenMock = vi.fn();
const deleteSelectedRowsMock = vi.fn();
const setLoadingMock = vi.fn();
const loadingMock = false;

describe("ConfirmDeleteBlogsModal test", () => {
  test("Should open the ConfirmDeleteBlogsModal when isModalOpen is true", () => {
    render(
      <ConfirmDeleteBlogsModal
        isModalOpen={true}
        setIsModalOpen={setIsModalOpenMock}
        deleteSelectedRows={deleteSelectedRowsMock}
        loading={loadingMock}
        setLoading={setLoadingMock}
      />
    );
    expect(screen.getByText(/Delete Blogs/i)).toBeInTheDocument();
  });

  test("Should not open the ConfirmDeleteBlogsModal when isModalOpen is false", () => {
    const { queryByText } = render(
      <ConfirmDeleteBlogsModal
        isModalOpen={false}
        setIsModalOpen={setIsModalOpenMock}
        deleteSelectedRows={deleteSelectedRowsMock}
        loading={loadingMock}
        setLoading={setLoadingMock}
      />
    );
    expect(queryByText(/Delete Blogs/i)).not.toBeInTheDocument();
  });

  test("Should call deleteSelectedRows and setIsModalOpen when the OK button is clicked", async () => {
    render(
      <ConfirmDeleteBlogsModal
        isModalOpen={true}
        setIsModalOpen={setIsModalOpenMock}
        deleteSelectedRows={deleteSelectedRowsMock}
        loading={loadingMock}
        setLoading={setLoadingMock}
      />
    );
    userEvent.click(screen.getByText("Delete"));
    await waitFor(() => {
      expect(deleteSelectedRowsMock).toHaveBeenCalled();
      expect(setIsModalOpenMock).toHaveBeenCalledWith(false);
    });
  });
});
