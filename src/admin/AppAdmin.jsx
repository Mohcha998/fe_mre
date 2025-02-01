import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/vendor/fonts/boxicons.css";
import "../assets/vendor/css/core.css";
import "../assets/vendor/css/theme-default.css";
import "../assets/css/demo.css";
import "../assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css";
import "../assets/vendor/libs/apex-charts/apex-charts.css";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AdminDashboard from "./pages/dashboard/AdminDashboard.js";
import SPProgram from "./pages/sesi_perkenalan/SP.jsx";
import PesertaSP from "./pages/peserta_sp/PesertaSP.jsx";
import Hadir from "./pages/hadir_sp/Hadir.jsx";
import Interest from "./pages/interest_program/Interest.jsx";
import Student from "./pages/data_student/DataStudent.jsx";
import Prospect from "./pages/prospect/Prospect.jsx";
import DaftarProspect from "./pages/sesi_perkenalan/DaftarProspect.jsx";
import DaftarPeserta from "./pages/sesi_perkenalan/DaftarPeserta.jsx";
import NonSesiPerkenalan from "./pages/non_sesi_perkenalan/NonSesiPerkenalan.jsx";
import SignUp from "./pages/sign-up/Sign-Up.jsx";

const SCRIPTS = [
  { src: "/assets/vendor/js/helpers.js", id: "helpers-js" },
  { src: "/assets/js/config.js", id: "config-js" },
  { src: "/assets/vendor/libs/jquery/jquery.js", id: "jquery-js" },
  { src: "/assets/vendor/libs/popper/popper.js", id: "popper-js" },
  { src: "/assets/vendor/js/bootstrap.js", id: "bootstrap-js" },
  {
    src: "/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js",
    id: "perfect-scrollbar-js",
  },
  { src: "/assets/vendor/js/menu.js", id: "menu-js" },
  { src: "/assets/vendor/libs/apex-charts/apexcharts.js", id: "apexcharts-js" },
  { src: "/assets/js/main.js", id: "main-js" },
  { src: "/assets/js/dashboards-analytics.js", id: "dashboards-analytics-js" },
  {
    src: "https://buttons.github.io/buttons.js",
    id: "github-buttons-js",
    isExternal: true,
  },
];

function AdminApp() {
  useEffect(() => {
    const loadScript = async ({ src, id, isExternal }) => {
      if (document.getElementById(id)) return;

      const script = document.createElement("script");
      script.id = id;
      script.src = isExternal ? src : process.env.PUBLIC_URL + src;
      script.async = true;

      return new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    const loadAllScripts = async () => {
      try {
        await Promise.all(SCRIPTS.map(loadScript));
      } catch (error) {
        console.error("Error loading scripts:", error);
      }
    };

    loadAllScripts();
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
              <Route path="/hadir" element={<Hadir />} />
              <Route path="/interest" element={<Interest />} />
              <Route path="/data-student" element={<Student />} />
              <Route path="/prospect" element={<Prospect />} />
              <Route path="/daftar-prospect" element={<DaftarProspect />} />
              <Route path="/daftar-peserta" element={<DaftarPeserta />} />
              <Route
                path="/non-sesi-perkenalan"
                element={<NonSesiPerkenalan />}
              />
              <Route path="/sign-up" element={<SignUp />} />
            </Routes>
            <div className="content-backdrop fade"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminApp;
