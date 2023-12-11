import { Divider, Layout } from "antd";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import AuthRoute from "./components/AuthRoute";
import AutoRedirectRoute from "./components/AutoRedirectRoute";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import CustomHeader from "./components/CustomHeader";
import CustomFooter from "./components/CustomFooter";

function App() {
  return (
    <BrowserRouter>
      <Layout style={{ minHeight: "100vh" }}>
        <CustomHeader />
        <Routes>
          <Route element={<AutoRedirectRoute />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>
          <Route element={<AuthRoute />}>
            <Route path="/" element={<Navigate to="/blogs" replace />} />
            <Route path="/blogs" element={<HomePage />} />
          </Route>
        </Routes>
        <Divider orientation="horizontal"></Divider>
        <CustomFooter />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
