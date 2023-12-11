import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
    const navigate = useNavigate();
    const [isAuth, setIsAuth] = useState(null);
    const [loggedInUser, setLoggedInUser] = useState("");
    const refreshPage = () => navigate(0);

    const login = (data) => {
        sessionStorage.setItem("token", JSON.stringify(data));
        setIsAuth(true);
        setLoggedInUser(data.email);
        navigate("/blogs");
    };

    const logout = () => {
        sessionStorage.removeItem("token");
        setIsAuth(null);
        setLoggedInUser("");
        navigate("/login");
    };

    useEffect(() => {
        const fetchData = async () => {
            var token = JSON.parse(sessionStorage.getItem("token"));
            if (!token) setIsAuth(false);
            else {
                setIsAuth(true);
                setLoggedInUser(token.email);
            }
        };
        fetchData();
    }, []);

    return { isAuth, loggedInUser, login, logout, refreshPage };
};

export default useAuth;
