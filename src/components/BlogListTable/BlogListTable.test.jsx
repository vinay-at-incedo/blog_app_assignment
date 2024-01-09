import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import BlogListTable from "./BlogListTable";
import userEvent from "@testing-library/user-event";

describe("BlogListTable", () => {
  const setSelectedRowKeys = vi.fn();

  const dataSource = [
    {
      id: "1",
      title: "Blog 1",
      author: "Author 1",
      category: "Category 1",
      tags: ["tag1", "tag2"],
      comments_count: 10,
      date: "2023-12-20",
    },
    {
      id: "2",
      title: "Blog 2",
      author: "Author 2",
      category: "Category 2",
      tags: ["tag3", "tag4"],
      comments_count: 20,
      date: "2023-12-21",
    },
  ];

  test("renders without crashing", () => {
    render(
      <BlogListTable
        dataSource={dataSource}
        loading={false}
        selectedRowKeys={[]}
        setSelectedRowKeys={setSelectedRowKeys}
      />
    );
    expect(screen.getByText("Blog List")).toBeInTheDocument();
  });

  test("displays the correct number of rows", () => {
    render(
      <BlogListTable
        dataSource={dataSource}
        loading={false}
        selectedRowKeys={[]}
        setSelectedRowKeys={setSelectedRowKeys}
      />
    );
    const rows = screen.getAllByRole("row");
    expect(rows.length).toBe(3);
  });

  test("displays the correct data in each row", () => {
    render(
      <BlogListTable
        dataSource={dataSource}
        loading={false}
        selectedRowKeys={[]}
        setSelectedRowKeys={setSelectedRowKeys}
      />
    );
    expect(screen.getByText("Blog 1")).toBeInTheDocument();
    expect(screen.getByText("Author 1")).toBeInTheDocument();
    expect(screen.getByText("Category 1")).toBeInTheDocument();
    expect(screen.getByText(/tag1/i)).toBeInTheDocument();
    expect(screen.getByText(/tag2/i)).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("December 20, 2023")).toBeInTheDocument();
  });

  test("selects rows correctly", async () => {
    render(
      <BlogListTable
        dataSource={dataSource}
        loading={false}
        selectedRowKeys={[]}
        setSelectedRowKeys={setSelectedRowKeys}
      />
    );
    const checkboxes = screen.getAllByRole("checkbox");
    await userEvent.click(checkboxes[0]).then(() => {
      expect(setSelectedRowKeys).toHaveBeenCalled();
    });
  });
});
