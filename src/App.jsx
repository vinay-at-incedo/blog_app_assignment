import { Divider, Layout } from "antd";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import AuthRoute from "./components/CustomRoute/AuthRoute";
import AutoRedirectRoute from "./components/CustomRoute/AutoRedirectRoute";
import HomePage from "./components/HomePage/HomePage";
import LoginPage from "./components/LoginPage/LoginPage";
import CustomHeader from "./components/CustomHeader/CustomHeader";
import CustomFooter from "./components/CustomFooter/CustomFooter";
import AppContext from "./AppContext";
import { useState } from "react";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <AppContext.Provider value={{ searchQuery, setSearchQuery }}>
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
    </AppContext.Provider>
  );
}

export default App;
