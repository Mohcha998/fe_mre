import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom"; // Hapus Router
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/vendor/fonts/boxicons.css";
import "../assets/vendor/css/core.css";
import "../assets/vendor/css/theme-default.css";
import "../assets/css/demo.css";
import "../assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css";
import "../assets/vendor/libs/apex-charts/apex-charts.css";
// import "../assets/vendor/libs/perfect-scrollbar/perfect-scrollbar";
// import "../assets/vendor/js/bootstrap.js";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AdminDashboard from "./pages/dashboard/AdminDashboard.js";
import SPProgram from "../MRLC/SP.jsx";
import PesertaSP from "../MRLC/PesertaSP.jsx";

function AdminApp() {
  useEffect(() => {
    const loadScript = (src, id) => {
      return new Promise((resolve, reject) => {
        if (document.getElementById(id)) {
          resolve();
          return;
        }
        const script = document.createElement("script");
        script.src = process.env.PUBLIC_URL + src;
        script.id = id;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    const loadScripts = async () => {
      try {
        await loadScript(
          process.env.PUBLIC_URL + "/assets/vendor/js/helpers.js",
          "helpers-js"
        );
        await loadScript(
          process.env.PUBLIC_URL + "/assets/js/config.js",
          "config-js"
        );
        await loadScript(
          process.env.PUBLIC_URL + "/assets/vendor/libs/jquery/jquery.js",
          "jquery-js"
        );
        await loadScript(
          process.env.PUBLIC_URL + "/assets/vendor/libs/popper/popper.js",
          "popper-js"
        );
        await loadScript(
          process.env.PUBLIC_URL + "/assets/vendor/js/bootstrap.js",
          "bootstrap-js"
        );
        await loadScript(
          process.env.PUBLIC_URL +
            "/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js",
          "perfect-scrollbar-js"
        );
        await loadScript(
          process.env.PUBLIC_URL + "/assets/vendor/js/menu.js",
          "menu-js"
        );
        await loadScript(
          process.env.PUBLIC_URL +
            "/assets/vendor/libs/apex-charts/apexcharts.js",
          "apexcharts-js"
        );
        await loadScript(
          process.env.PUBLIC_URL + "/assets/js/main.js",
          "main-js"
        );
        await loadScript(
          process.env.PUBLIC_URL + "/assets/js/dashboards-analytics.js",
          "dashboards-analytics-js"
        );
        await loadScript(
          "https://buttons.github.io/buttons.js",
          "github-buttons-js"
        );
      } catch (error) {
        console.error("Error loading scripts:", error);
      }
    };

    loadScripts();
  }, []);

  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <Sidebar />
        <div className="layout-page">
          <Navbar />
          <div className="content-wrapper">
            <Routes>
              <Route path="/dashboard" element={<AdminDashboard />} />
              <Route path="/sp" element={<SPProgram />} />
              <Route path="/daftar-peserta-sp" element={<PesertaSP />} />
            </Routes>
            <div className="content-backdrop fade"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminApp;
