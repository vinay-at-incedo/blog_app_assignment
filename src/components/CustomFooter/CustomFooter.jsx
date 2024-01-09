import { Layout, Typography } from "antd";
const { Footer } = Layout;
const { Text } = Typography;

const CustomFooter = () => {
  return (
    <Footer style={{ textAlign: "center" }}>
      <Text type="secondary">Blog App ©2023 Created Using Vite</Text>
    </Footer>
  );
};

export default CustomFooter;
