import { Navigate, Outlet } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const AuthRoute = () => {
  const { isAuth } = useAuth();

  if (isAuth != null) {
    if (isAuth) return <Outlet />;
    else return <Navigate to="/login" replace />;
  }
};

export default AuthRoute;
