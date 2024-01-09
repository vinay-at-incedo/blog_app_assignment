import { BookOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Switch,
  Typography,
  AutoComplete,
  Upload,
} from "antd";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import {
  getAuthorsService,
  getCategoriesService,
  getTagsService,
} from "../../services/BlogService";
const { Option } = Select;

const formItemLayout = {
  labelAlign: "left",
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6, offset: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

const CreateBlogDrawer = ({
  isDrawerOpen,
  setIsDrawerOpen,
  createBlog,
  loading,
  setLoading,
}) => {
  const [form] = Form.useForm();
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const fetchRequiredFormData = () => {
    getAuthorsService()
      .then((res) => {
        setAuthors(res.data);
      })
      .catch((e) => console.log(e));
    getCategoriesService()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((e) => console.log(e));
    getTagsService()
      .then((res) => {
        setTags(res.data);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    fetchRequiredFormData();
  }, []);

  const handleOk = () => {
    setLoading(true);
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        createBlog(values);
        setLoading(false);
        handleClose(false);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
        setLoading(false);
      });
  };

  const handleClose = () => setIsDrawerOpen(false);

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <Drawer
      title={
        <Typography.Title level={4} style={{ margin: 0 }}>
          <BookOutlined style={{ fontSize: "1.2rem" }} /> Create Blog
        </Typography.Title>
      }
      open={isDrawerOpen}
      closable={false}
      placement="right"
      size="large"
      onClose={handleClose}
    >
      <Form
        form={form}
        layout="horizontal"
        name="create_blog_form"
        initialValues={{ publish_now: false }}
        {...formItemLayout}
      >
        <Form.Item
          name="date"
          label="Date"
          rules={[
            {
              required: true,
              message: "Please select a date!",
            },
          ]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: "Please input the title of blog!",
            },
          ]}
        >
          <Input placeholder="Blog title" />
        </Form.Item>
        <Form.Item
          name="author"
          label="Author"
          rules={[
            {
              required: true,
              message: "Please select or create the author of blog!",
            },
          ]}
        >
          <AutoComplete
            placeholder="Select an author"
            showSearch
            allowClear
            filterOption={true}
          >
            {authors.map((author) => (
              <Option key={author.id} value={author.name}>
                {author.name}
              </Option>
            ))}
          </AutoComplete>
        </Form.Item>
        <Form.Item
          name="category"
          label="Category"
          rules={[
            {
              required: true,
              message: "Please select or create the category of blog!",
            },
          ]}
        >
          <AutoComplete
            placeholder="Select or create a category"
            filterOption={true}
            allowClear
          >
            {categories.map((category) => (
              <Option key={category.id} value={category.name}>
                {category.name}
              </Option>
            ))}
          </AutoComplete>
        </Form.Item>
        <Form.Item
          name="tags"
          label="Tags"
          rules={[
            {
              required: true,
              message: "Please select or create the tags for blog!",
            },
          ]}
        >
          <Select
            placeholder="Select or create related tags"
            mode="tags"
            showSearch
            allowClear
          >
            {tags.map((tag) => (
              <Option key={tag.id} value={tag.name}>
                {tag.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="imageFile"
          label="Upload Image"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[
            {
              required: true,
              message: "Please upload an image!",
            },
          ]}
        >
          <Upload
            name="image"
            multiple={false}
            listType="picture"
            beforeUpload={() => false}
          >
            <Button icon={<UploadOutlined />}>Click to upload image</Button>
          </Upload>
        </Form.Item>
        <Form.Item name="publish_now" label="Publish Now">
          <Switch />
        </Form.Item>
      </Form>
      <Row gutter={12}>
        <Col xs={24} md={{ offset: 10, span: 6 }}>
          <Button key="cancel" block onClick={handleClose}>
            Cancel
          </Button>
        </Col>
        <Col xs={24} md={6}>
          <Button
            key="create"
            block
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            Create
          </Button>
        </Col>
      </Row>
    </Drawer>
  );
};

CreateBlogDrawer.propTypes = {
  isDrawerOpen: PropTypes.bool,
  setIsDrawerOpen: PropTypes.func,
  createBlog: PropTypes.func,
  loading: PropTypes.bool,
  setLoading: PropTypes.func,
};

export default CreateBlogDrawer;
