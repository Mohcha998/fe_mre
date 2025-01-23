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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ProspectProvider } from "./context/ProspectContext";
import { ProgramProvider } from "./context/ProgramContext";
import { DaftarHadirProvider } from "./context/DaftarHadirContext";
import { InterestProvider } from "./context/InterestContext";
import { StudentProvider } from "./context/StudentContext";
import { DashboardProvider } from "./context/DashboardContext";
import ProspectDashboardProvider from "./context/ProspectDashboardContext";

const queryClient = new QueryClient();

function App() {
  const { token } = useAuth();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route
            path="/admin"
            element={
              token ? <Navigate to="/admin/dashboard" /> : <LoginAdmin />
            }
          />

          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <ProspectDashboardProvider>
                  <DashboardProvider>
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
                  </DashboardProvider>
                </ProspectDashboardProvider>
                <ReactQueryDevtools />
              </ProtectedRoute>
            }
          />

          <Route
            path="*"
            element={<Navigate to={token ? "/admin/dashboard" : "/admin"} />}
          />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
