import React, { createContext, useState, useContext } from "react";
import axios from "axios";

const APP_URL = "http://localhost:8080/api/";

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${APP_URL}login`, {
        email,
        password,
      });

      setUser(response.data.user);
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token); // Store the token in localStorage

      return true;
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token"); // Remove token from localStorage
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
