import { set } from "date-fns";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyData } from "../utils/api";

export const AuthContext = createContext(null);

export const AuthContextProviderComponent = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        if (refresh) {
          setIsLoadingUser(true);
          const data = await getMyData(token);
          setUser(data);
        }
      } catch (error) {
        logout();
      } finally {
        setIsLoadingUser(false);
        setRefresh(false);
      }
    };

    if (token) getUserData();
  }, [token, refresh]);

  const login = (token) => {
    setToken(token);
    setRefresh(true);
  };

  const logout = () => {
    setToken("");
    setUser(null);
    navigate("/");
  };

  //This will fetch user again and update it
  const refreshUser = () => {
    setRefresh(true);
  };

  return (
    <AuthContext.Provider
      value={{ token, user, login, logout, isLoadingUser, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
