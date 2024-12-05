// context/AuthContext.js
import React, { createContext, useState, useContext } from "react";
import axios from "axios";

// Create the context
const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const login = async (email, password) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/login", {
        email,
        password,
      });

      // On successful login, store the token and user data
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
