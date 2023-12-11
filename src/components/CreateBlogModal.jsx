import {
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  Upload,
  Switch,
  Button,
  Row,
  Col,
} from "antd";
import PropTypes from "prop-types";
import { BookOutlined, UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import axios from "axios";
const { Option } = Select;

const CreateBlogModal = ({
  isModalOpen,
  setIsModalOpen,
  createBlog,
  loading,
  setLoading,
}) => {
  const [form] = Form.useForm();
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const fetchRequiredFormData = () => {
    axios
      .get("http://localhost:8000/authors")
      .then((res) => {
        setAuthors(res.data);
      })
      .catch((e) => console.log(e));
    axios
      .get("http://localhost:8000/categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((e) => console.log(e));
    axios
      .get("http://localhost:8000/tags")
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
    setTimeout(() => {
      form
        .validateFields()
        .then((values) => {
          form.resetFields();
          createBlog(values);
          setLoading(false);
          setIsModalOpen(false);
        })
        .catch((info) => {
          console.log("Validate Failed:", info);
          setLoading(false);
        });
    }, 1000);
  };

  const handleCancel = () => setIsModalOpen(false);

  const formItemLayout = {
    labelAlign: "left",
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6, offset: 3 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
    },
  };

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const renderFooter = () => (
    <Row gutter={16} style={{ justifyContent: "flex-end" }}>
      <Col span={5}>
        <Button key="cancel" block onClick={handleCancel}>
          Cancel
        </Button>
      </Col>
      <Col span={5}>
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
  );

  return (
    <Modal
      title={
        <div style={{ display: "flex", gap: "10px", paddingBottom: "10px" }}>
          <BookOutlined style={{ fontSize: "1.2rem" }} />
          Create Blog
        </div>
      }
      open={isModalOpen}
      onOk={handleOk}
      footer={renderFooter}
      confirmLoading={loading}
      okText={"Create"}
      okType="primary"
      onCancel={handleCancel}
      width={800}
      centered
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
              message: "Please select the author of blog!",
            },
          ]}
        >
          <Select placeholder="Select an author" showSearch allowClear>
            {authors.map((author) => (
              <Option key={author.id} value={author.name}>
                {author.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="category"
          label="Category"
          rules={[
            {
              required: true,
              message: "Please select the category of blog!",
            },
          ]}
        >
          <Select placeholder="Select a category" showSearch allowClear>
            {categories.map((category) => (
              <Option key={category.id} value={category.name}>
                {category.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="tags"
          label="Tags"
          rules={[
            {
              required: true,
              message: "Please select the tags of blog!",
            },
          ]}
        >
          <Select
            placeholder="Select related tags"
            mode="multiple"
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
        <Form.Item
          name="publish_now"
          label="Publish Now"
          labelCol={{ xs: { span: 24 }, sm: { span: 3, offset: 9 } }}
          wrapperCol={{ xs: { span: 24 }, sm: { span: 2 } }}
        >
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
};

CreateBlogModal.propTypes = {
  isModalOpen: PropTypes.bool,
  setIsModalOpen: PropTypes.func,
  createBlog: PropTypes.func,
  loading: PropTypes.bool,
  setLoading: PropTypes.func,
};

export default CreateBlogModal;
