import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyData } from "../utils/api";

export const AuthContext = createContext(null);

export const AuthContextProviderComponent = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(false);

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        setIsLoadingUser(true);
        const data = await getMyData(token);
        setUser(data);
      } catch (error) {
        logout();
      } finally {
        setIsLoadingUser(false);
      }
    };

    if (token) getUserData();
  }, [token]);

  const login = (token) => {
    setToken(token);
  };

  const logout = () => {
    setToken("");
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isLoadingUser }}>
      {children}
    </AuthContext.Provider>
  );
};
