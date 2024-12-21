import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const APP_URL = "http://localhost:8001/api/";

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(sessionStorage.getItem("token")); // Use sessionStorage

  // Save token in sessionStorage whenever it changes
  useEffect(() => {
    if (token) {
      sessionStorage.setItem("token", token); // Use sessionStorage
    } else {
      sessionStorage.removeItem("token"); // Use sessionStorage
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${APP_URL}login`, { email, password });

      setUser(response.data.user);
      setToken(response.data.token); // Token change will be saved by useEffect
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
    setToken(null); // Removing token will clear it from sessionStorage via useEffect
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};