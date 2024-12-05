import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext"; // Use useAuth instead of AuthContext
import LoginAdmin from "./admin/auth/LoginAdmin";
import ProtectedRoute from "./components/ProtectedRoute";
import AppAdmin from "./admin/AppAdmin";

function App() {
  const { token } = useAuth(); // Use the useAuth hook to get the token

  return (
    <Router>
      <Routes>
        {/* Login route */}
        <Route path="/login" element={<LoginAdmin />} />

        {/* Protected route */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AppAdmin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
