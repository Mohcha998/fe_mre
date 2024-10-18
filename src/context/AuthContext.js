import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [user, setUser] = useState(null); // State untuk menyimpan data pengguna

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuth(token);
      fetchUser(token); // Ambil data pengguna jika token ada
    }
  }, []);

  const login = async (username, password) => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setAuth(data.token); // Simpan token JWT
        localStorage.setItem('authToken', data.token); // Simpan token ke localStorage
        await fetchUser(data.token); // Ambil data pengguna
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error.message);
      throw error; // Melempar kembali error untuk ditangani di komponen lain (misal, di form login)
    }
  };

  const fetchUser = async (token) => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        console.error('Failed to fetch user data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching user:', error.message);
    }
  };
  

  const logout = () => {
    setAuth(null);
    setUser(null); // Reset data pengguna saat logout
    localStorage.removeItem('authToken');
  };

  const isAuthenticated = () => {
    return !!auth; // Return true jika token ada
  };

  return (
    <AuthContext.Provider value={{ auth, user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
