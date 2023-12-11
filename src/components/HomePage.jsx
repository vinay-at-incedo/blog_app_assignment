import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Col, Layout, Row, Divider, notification } from "antd";
import BlogListTable from "./BlogListTable";
import { useEffect, useState } from "react";
import ConfirmDeleteBlogsModal from "./ConfirmDeleteBlogsModal";
import CreateBlogModal from "./CreateBlogModal";
const { Content } = Layout;
import axios from "axios";

const HomePage = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [notificationAPI, contextHolder] = notification.useNotification();

  const loadBlogData = () => {
    setLoading(true);
    axios
      .get("http://localhost:8000/blogs")
      .then((res) => {
        setBlogData(res.data);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  };

  useEffect(() => {
    loadBlogData();
  }, []);

  const createBlog = (data) => {
    // Convert daysjs Date to JS Date
    data.date = data.date.toISOString();
    // Add Other Fields as empty
    data.comments_count = 0;
    data.id = blogData.length + 1;
    // Only use this for publishing then remove
    delete data["publish_now"];
    // Multipart File Upload
    delete data["imageFile"];

    axios
      .post("http://localhost:8000/blogs", data)
      .then((res) => {
        notificationAPI.success({
          message: "Blog created successfully!",
          placement: "topLeft",
          duration: 2,
        });
        setBlogData([...blogData, res.data]);
      })
      .catch((e) => {
        notificationAPI.error({
          message: "Error creating blog!",
          placement: "topLeft",
          duration: 2,
        });
        console.log(e);
      });
  };

  const openCreateBlogForm = () => {
    setIsCreateModalOpen(true);
  };

  const deleteSelectedRows = () => {
    Promise.all(
      selectedRowKeys.map((id) => {
        return axios.delete(`http://localhost:8000/blogs/${id}`);
      })
    )
      .then(() => {
        notificationAPI.success({
          message: "Blogs deleted successfully!",
          placement: "topLeft",
          duration: 2,
        });
        setBlogData(
          blogData.filter((blog) => !selectedRowKeys.includes(blog.id))
        );
        setSelectedRowKeys([]);
      })
      .catch((e) => {
        notificationAPI.error({
          message: "Error deleting blog!",
          placement: "topLeft",
          duration: 2,
        });
        console.log(e);
      });
  };

  const confirmDelteBlogs = () => {
    setIsDeleteModalOpen(true);
  };

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <Content style={{ padding: "20px 50px", background: "#F5F5F5" }}>
      {contextHolder}
      <CreateBlogModal
        isModalOpen={isCreateModalOpen}
        setIsModalOpen={setIsCreateModalOpen}
        createBlog={createBlog}
        loading={loading}
        setLoading={setLoading}
      />
      <ConfirmDeleteBlogsModal
        isModalOpen={isDeleteModalOpen}
        setIsModalOpen={setIsDeleteModalOpen}
        deleteSelectedRows={deleteSelectedRows}
        loading={loading}
        setLoading={setLoading}
      />
      <Row gutter={[16, 12]} style={{ justifyContent: "flex-end" }}>
        <Col span={4}>
          <Button block icon={<EditOutlined />} onClick={openCreateBlogForm}>
            Create
          </Button>
        </Col>
        <Col span={4}>
          <Button
            block
            icon={<DeleteOutlined />}
            onClick={confirmDelteBlogs}
            disabled={!hasSelected}
          >
            Delete
          </Button>
        </Col>
      </Row>
      <Divider orientation="horizontal"></Divider>
      <BlogListTable
        blogData={blogData}
        loading={loading}
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
      />
    </Content>
  );
};

export default HomePage;
