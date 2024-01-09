import { Table, Tag, Typography } from "antd";
import PropTypes from "prop-types";

const columns = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    sortDirections: ["ascend", "descend"],
    sorter: (a, b) => (a.title > b.title ? 1 : a.title < b.title ? -1 : 0),
  },
  {
    title: "Author",
    dataIndex: "author",
    key: "author",
    sortDirections: ["ascend", "descend"],
    sorter: (a, b) => (a.author > b.author ? 1 : a.author < b.author ? -1 : 0),
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    sortDirections: ["ascend", "descend"],
    sorter: (a, b) =>
      a.category > b.category ? 1 : a.category < b.category ? -1 : 0,
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
    sorter: (a, b) =>
      new Date(a.date) > new Date(b.date)
        ? 1
        : new Date(a.date) < new Date(b.date)
        ? -1
        : 0,

    defaultSortOrder: "descend",
  },
];

const BlogListTable = ({
  dataSource,
  loading,
  selectedRowKeys,
  setSelectedRowKeys,
}) => {
  return (
    <Table
      title={() => (
        <Typography.Title level={4} style={{ margin: 0 }}>
          Blog List
        </Typography.Title>
      )}
      rowKey="id"
      loading={loading}
      columns={columns}
      dataSource={dataSource}
      pagination={{
        simple: true,
        size: "small",
        position: ["bottomRight"],
        showSizeChanger: true,
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
  dataSource: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  selectedRowKeys: PropTypes.arrayOf(PropTypes.number),
  setSelectedRowKeys: PropTypes.func,
};

export default BlogListTable;
