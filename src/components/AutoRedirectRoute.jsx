import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AutoRedirectRoute = () => {
  const { isAuth } = useAuth();

  if (isAuth != null) {
    if (isAuth) return <Navigate to="/" replace />;
    else return <Outlet />;
  }
};

export default AutoRedirectRoute;
