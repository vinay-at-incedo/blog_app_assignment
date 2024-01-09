import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Divider,
  Layout,
  Row,
  Typography,
  notification,
} from "antd";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../AppContext";
import {
  createBlogService,
  deleteBlogService,
  getAllBlogsService,
} from "../../services/BlogService";
import BlogListTable from "../BlogListTable/BlogListTable";
import ConfirmDeleteBlogsModal from "../ConfirmDeleteBlogsModal/ConfirmDeleteBlogsModal";
import CreateBlogDrawer from "../CreateBlogDrawer/CreateBlogDrawer";
const { Content } = Layout;

const HomePage = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [blogData, setBlogData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateDrawerOpen, setIsCreateDrawerOpen] = useState(false);
  const [notificationAPI, contextHolder] = notification.useNotification();
  const { searchQuery } = useContext(AppContext);
  const [searchedBlogData, setSearchedBlogData] = useState([]);

  const loadBlogData = () => {
    setLoading(true);
    getAllBlogsService()
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

  useEffect(() => {
    const searchedData = blogData.filter(
      (blog) =>
        blog?.title?.match(new RegExp(searchQuery, "i")) ||
        blog?.author?.match(new RegExp(searchQuery, "i")) ||
        blog?.tags.reduce(
          (result, tag) => result || tag?.match(new RegExp(searchQuery, "i")),
          false
        )
    );
    setSearchedBlogData(searchedData);
  }, [searchQuery, blogData]);

  const createBlog = (data) => {
    // Convert daysjs Date to JS Date
    data.date = data.date.toISOString();
    // Add Other Fields as empty
    data.comments_count = 0;
    // Only use this for publishing then remove
    delete data["publish_now"];
    // Multipart File Upload
    delete data["imageFile"];

    createBlogService(data)
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
    setIsCreateDrawerOpen(true);
  };

  const deleteSelectedRows = () => {
    Promise.all(selectedRowKeys.map((id) => deleteBlogService(id)))
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
      <CreateBlogDrawer
        isDrawerOpen={isCreateDrawerOpen}
        setIsDrawerOpen={setIsCreateDrawerOpen}
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
      <Row gutter={[16, 12]} align="middle">
        <Col xs={24} md={6}>
          <Typography.Title level={4} style={{ margin: 0 }}>
            Total Blogs: {searchedBlogData?.length}
          </Typography.Title>
        </Col>
        <Col xs={24} md={{ span: 4, offset: 10 }}>
          <Button block icon={<EditOutlined />} onClick={openCreateBlogForm}>
            Create
          </Button>
        </Col>
        <Col xs={24} md={4}>
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
        dataSource={searchedBlogData}
        loading={loading}
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
      />
    </Content>
  );
};

export default HomePage;
