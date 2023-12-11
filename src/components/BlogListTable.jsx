import { Table, Tag } from "antd";
import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";

const BlogListTable = ({
  blogData,
  loading,
  selectedRowKeys,
  setSelectedRowKeys,
}) => {
  const [tagsList, setTagsList] = useState([]);

  const getTagList = useCallback(() => {
    let tagsData = blogData.map((blog) => blog.tags);
    let newTagList = Array.from(new Set(tagsData.flat(1))).map((tag) => ({
      text: tag,
      value: tag,
    }));
    setTagsList(newTagList);
  }, [blogData]);

  useEffect(() => {
    getTagList();
  }, [blogData, getTagList]);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.title > b.title,
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.author > b.author,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.category - b.category,
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (_, { tags }) =>
        tags.map((tag) => {
          return (
            <Tag color="geekblue" key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        }),
      filters: tagsList,
      onFilter: (value, record) => record.tags.includes(value),
      filterSearch: true,
    },
    {
      title: "Comments Count",
      dataIndex: "comments_count",
      key: "comments_count",
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.comments_count - b.comments_count,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) =>
        new Intl.DateTimeFormat("en-US", {
          dateStyle: "long",
        }).format(Date.parse(date)),
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.date - b.date,
    },
  ];

  return (
    <Table
      title={() => (
        <div style={{ textAlign: "center", fontWeight: "600" }}>Blog List</div>
      )}
      rowKey="id"
      loading={loading}
      columns={columns}
      dataSource={blogData}
      pagination={{
        simple: true,
        size: "small",
        position: ["topRight"],
        showSizeChanger: true,
        showQuickJumper: true,
      }}
      rowSelection={{
        selectedRowKeys,
        type: "checkbox",
        onChange: (selection) => setSelectedRowKeys(selection),
      }}
      showSorterTooltip={false}
      bordered
    />
  );
};

BlogListTable.propTypes = {
  blogData: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  selectedRowKeys: PropTypes.arrayOf(PropTypes.string),
  setSelectedRowKeys: PropTypes.func,
};

export default BlogListTable;
