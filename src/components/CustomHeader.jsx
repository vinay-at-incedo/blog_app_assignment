import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Layout, Avatar, Space, Tooltip } from "antd";
import logo from "../assets/blogsite.svg";
import useAuth from "../hooks/useAuth";
const { Header } = Layout;

const CustomHeader = () => {
  const { logout, isAuth, loggedInUser } = useAuth();

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0px 20px 0px 0px",
      }}
    >
      <div className="logo" style={{ display: "flex", alignItems: "center" }}>
        <img
          src={logo}
          alt="logo"
          style={{ width: "300px", heigth: "200px" }}
        />
      </div>
      {isAuth != null && isAuth && (
        <Space>
          <Tooltip placement="bottom" title={loggedInUser} color="volcano">
            <Avatar
              style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
              icon={<UserOutlined />}
            />
          </Tooltip>
          <Button
            name="logout"
            type="link"
            icon={<LogoutOutlined />}
            onClick={logout}
          ></Button>
        </Space>
      )}
    </Header>
  );
};

export default CustomHeader;
