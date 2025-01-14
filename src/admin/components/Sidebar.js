import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const SP_ITEMS = [
  { path: "/admin/sp", label: "Sesi Perkenalan" },
  { path: "/admin/daftar-peserta-sp", label: "Daftar Peserta SP" },
  { path: "/admin/hadir", label: "Daftar Hadir SP" },
];

const OTHER_ITEMS = [
  { path: "/admin/interest", label: "Interest Program" },
  { path: "/admin/data-student", label: "Data Student" },
];

const Logo = () => (
  <svg
    width={25}
    viewBox="0 0 25 42"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    {/* SVG content */}
  </svg>
);

const MenuItem = ({ path, label, isActive }) => (
  <li className={`menu-item ${isActive ? "active" : ""}`}>
    <Link to={path} className="menu-link">
      <span>{label}</span>
    </Link>
  </li>
);

const Sidebar = () => {
  const location = useLocation();
  const [isSpOpen, setIsSpOpen] = useState(false);

  // Periksa apakah salah satu submenu "SP" aktif berdasarkan URL
  const isSpActive = SP_ITEMS.some((item) =>
    location.pathname.startsWith(item.path)
  );

  useEffect(() => {
    if (isSpActive) {
      setIsSpOpen(true); // Tetap aktif jika navigasi dalam menu "SP"
    }
  }, [isSpActive]);

  const toggleSp = (e) => {
    e.preventDefault();
    setIsSpOpen((prev) => !prev); // Ubah state SP secara manual
  };

  const isPathActive = (path) => location.pathname.startsWith(path);

  return (
    <aside className="layout-menu menu-vertical menu bg-menu-theme">
      <div className="app-brand demo">
        {/* <a href="/" className="app-brand-link" onClick={(e) => e.preventDefault()}>
          <span className="app-brand-logo demo">
            <Logo />
          </span>
          <span className="app-brand-text demo menu-text fw-bolder ms-2">Sneat</span>
        </a>
        <a href="/" className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
          <i className="bx bx-chevron-left bx-sm align-middle"></i>
        </a> */}
      </div>

      <div className="menu-inner-shadow"></div>

      <ul className="menu-inner py-1">
        {/* Dashboard */}
        <MenuItem
          path="/admin/dashboard"
          label="Dashboard"
          isActive={isPathActive("/admin/dashboard")}
        />

        {/* SP Section */}
        <li className={`menu-item ${isSpOpen ? "active open" : ""}`}>
          <a href="#" className="menu-link menu-toggle" onClick={toggleSp}>
            <i className="menu-icon bx bx-folder"></i>
            <span>SP</span>
          </a>
          <ul className={`menu-sub ${isSpOpen ? "open" : ""}`}>
            {SP_ITEMS.map((item) => (
              <MenuItem
                key={item.path}
                path={item.path}
                label={item.label}
                isActive={isPathActive(item.path)}
              />
            ))}
          </ul>
        </li>

        {/* Other Items */}
        {OTHER_ITEMS.map((item) => (
          <MenuItem
            key={item.path}
            path={item.path}
            label={item.label}
            isActive={isPathActive(item.path)}
          />
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
