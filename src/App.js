import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./context/AuthContext"; // Use useAuth instead of AuthContext
import LoginAdmin from "./admin/auth/LoginAdmin";
import ProtectedRoute from "./components/ProtectedRoute";
import AppAdmin from "./admin/AppAdmin";
import { ProspectProvider } from "./context/ProspectContext";
import { ProgramProvider } from "./context/ProgramContext";
import { DaftarHadirProvider } from "./context/DaftarHadirContext";
import { InterestProvider } from "./context/InterestContext";
import { StudentProvider } from "./context/StudentContext";

function App() {
  const { token } = useAuth();

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={token ? <Navigate to="/admin/dashboard" /> : <LoginAdmin />}
        />

        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <ProspectProvider>
                <ProgramProvider>
                  <DaftarHadirProvider>
                    <InterestProvider>
                      <StudentProvider>
                        <AppAdmin />
                      </StudentProvider>
                    </InterestProvider>
                  </DaftarHadirProvider>
                </ProgramProvider>
              </ProspectProvider>
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={<Navigate to={token ? "/admin/dashboard" : "/login"} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
