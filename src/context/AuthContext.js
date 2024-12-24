import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL; // Ambil URL dari .env

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(sessionStorage.getItem("token")); // Use sessionStorage

  useEffect(() => {
    if (token) {
      sessionStorage.setItem("token", token); // Use sessionStorage
    } else {
      sessionStorage.removeItem("token"); // Use sessionStorage
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}login`, { email, password });

      setUser(response.data.user);
      setToken(response.data.token);
      return true;
    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data?.message || error.message
      );
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
