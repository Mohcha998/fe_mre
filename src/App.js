import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';  // pastikan import AuthContext
import LoginAdmin from './admin/auth/LoginAdmin';
import ProtectedRoute from './components/ProtectedRoute';
import AppAdmin from './admin/AppAdmin';

function App() {
  const { isAuthenticated } = useContext(AuthContext); // gunakan useContext dengan AuthContext

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginAdmin />} />
        <Route 
          path="/admin/*"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <AppAdmin />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
