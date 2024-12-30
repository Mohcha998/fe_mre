import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const SUMMARY_ITEM = { path: "/admin/dashboard", label: "Summary", dataI18n: "Analytics" };

const SP_ITEMS = [
  { path: "/admin/sp", label: "Sesi Perkenalan", dataI18n: "Without menu" },
  { path: "/admin/daftar-peserta-sp", label: "Daftar Peserta SP", dataI18n: "Without navbar" },
  { path: "/admin/hadir", label: "Daftar Hadir SP", dataI18n: "Fluid" },
];

const OTHER_ITEMS = [
  { path: "/admin/interest", label: "Interest Program", dataI18n: "Fluid" },
  { path: "/admin/data-student", label: "Data Student", dataI18n: "Fluid" },
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

const MenuItem = ({ path, label, dataI18n, isActive }) => (
  <li className={`menu-item ${isActive ? "active" : ""}`}>
    <Link to={path} className="menu-link">
      <div data-i18n={dataI18n}>{label}</div>
    </Link>
  </li>
);

const Sidebar = () => {
  const [isMrlcOpen, setIsMrlcOpen] = useState(false);
  const [isSpOpen, setIsSpOpen] = useState(false);
  const location = useLocation();

  const toggleMrlc = (e) => {
    e.preventDefault();
    setIsMrlcOpen((prev) => !prev);
  };

  const toggleSp = (e) => {
    e.preventDefault();
    setIsSpOpen((prev) => !prev);
  };

  const isPathActive = (path) => location.pathname === path;
  const isMrlcActive = isMrlcOpen || location.pathname.includes("/admin/");
  const isSpActive = isSpOpen || SP_ITEMS.some((item) => location.pathname === item.path);

  return (
    <aside
      id="layout-menu"
      className="layout-menu menu-vertical menu bg-menu-theme"
    >
      <div className="app-brand demo">
        <a
          href="/"
          className="app-brand-link"
          onClick={(e) => e.preventDefault()}
        >
          <span className="app-brand-logo demo">
            <Logo />
          </span>
          <span className="app-brand-text demo menu-text fw-bolder ms-2">
            Sneat
          </span>
        </a>
        <a
          href="/"
          className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none"
          onClick={(e) => e.preventDefault()}
        >
          <i className="bx bx-chevron-left bx-sm align-middle" />
        </a>
      </div>

      <div className="menu-inner-shadow" />

      <ul className="menu-inner py-1">
        {/* MRLC Toggle */}
        <li className={`menu-item ${isMrlcActive ? "active" : ""}`}>
          <a href="/" className="menu-link menu-toggle" onClick={toggleMrlc}>
            <i className="menu-icon tf-icons bx bx-home-circle" />
            <div data-i18n="Layouts">MRLC</div>
          </a>
          <ul className={`menu-sub ${isMrlcOpen ? "open" : ""}`}>
            {/* Summary (Above SP) */}
            <MenuItem
              {...SUMMARY_ITEM}
              isActive={isPathActive(SUMMARY_ITEM.path)}
            />

            {/* SP Toggle */}
            <li className={`menu-item ${isSpActive ? "active" : ""}`}>
              <a href="/" className="menu-link menu-toggle" onClick={toggleSp}>
                <i className="menu-icon tf-icons bx bx-folder" />
                <div data-i18n="Layouts">SP</div>
              </a>
              <ul className={`menu-sub ${isSpOpen ? "open" : ""}`}>
                {SP_ITEMS.map((item) => (
                  <MenuItem
                    key={item.path}
                    {...item}
                    isActive={isPathActive(item.path)}
                  />
                ))}
              </ul>
            </li>

            {/* Other MRLC Items */}
            {OTHER_ITEMS.map((item) => (
              <MenuItem
                key={item.path}
                {...item}
                isActive={isPathActive(item.path)}
              />
            ))}
          </ul>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
