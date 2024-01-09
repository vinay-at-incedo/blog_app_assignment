import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Input, Layout, Space, Tooltip } from "antd";
import { useContext } from "react";
import AppContext from "../../AppContext";
import logo from "../../assets/blogsite.svg";
import useAuth from "../../hooks/useAuth";
const { Header } = Layout;

const CustomHeader = () => {
  const { logout, isAuth, loggedInUser } = useAuth();
  const { setSearchQuery } = useContext(AppContext);

  const onSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        gap: "20px",
        padding: "0px",
        margin: "0px",
      }}
    >
      <div className="logo" style={{ display: "flex", alignItems: "center" }}>
        <img
          src={logo}
          alt="logo"
          style={{
            paddingBottom: "10px",
            width: "150px",
            heigth: "100px",
          }}
        />
      </div>

      {isAuth != null && isAuth && (
        <>
          <Input.Search
            placeholder="Search Blog"
            allowClear
            onSearch={onSearch}
            style={{ width: 400 }}
          />
          <Space style={{ marginLeft: "auto", paddingRight: "20px" }}>
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
        </>
      )}
    </Header>
  );
};

export default CustomHeader;
