import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuth(token);
    }
  }, []);

  const login = (username, password) => {
    // login logic
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem('authToken');
  };

  const isAuthenticated = () => !!auth;  // cek apakah token ada

  return (
    <AuthContext.Provider value={{ auth, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
