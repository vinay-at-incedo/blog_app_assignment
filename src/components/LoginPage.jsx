import { Button, Col, Form, Input, Row } from "antd";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { login } = useAuth();

  const formItemLayout = {
    labelAlign: "left",
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4, offset: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
    },
  };

  const handleLogin = () => {
    setLoading(true);
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        setLoading(false);
        login(values);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
        setLoading(false);
      });
  };

  return (
    <Row gutter={[16, 16]} align="middle" justify="center">
      <Col xs={24} sm={16} style={{ padding: "40px" }}>
        <Form
          form={form}
          layout="horizontal"
          name="login_form"
          {...formItemLayout}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
                type: "email",
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Row>
            <Col xs={24} sm={{ offset: 16, span: 6 }}>
              <Button
                type="primary"
                htmlType="submit"
                onClick={handleLogin}
                loading={loading}
                block
              >
                Login
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default LoginPage;
