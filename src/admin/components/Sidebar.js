import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaGraduationCap, FaHome, FaFileInvoiceDollar  } from "react-icons/fa";
import { RiUser3Line } from "react-icons/ri";
import { BsMegaphone } from "react-icons/bs";
import { FaPersonChalkboard } from "react-icons/fa6";

const MENU_ITEMS = [
  { path: "/admin/dashboard", label: "Dashboard", icon: <FaHome /> },
  {
    path: "/admin/prospect",
    label: "Prospect",
    icon: <FaGraduationCap />,
    subItems: [
      { path: "/admin/prospect", label: "Prospect" },
      {
        path: "#",
        label: "Sesi Perkenalan",
        subItems: [
          { path: "/admin/daftar-prospect", label: "Daftar Prospect" },
          { path: "/admin/daftar-peserta", label: "Daftar Peserta" },
          // { path: "/admin/hadir", label: "Daftar Hadir SP" },
          // { path: "/admin/interest", label: "Interest Program" },
          // { path: "/admin/data-student", label: "Data Student" }
        ],
      },
      { path: "/admin/non-sesi-perkenalan", label: "Non Sesi Perkenalan" },
      { path: "/admin/sign-up", label: "Sign-Up" },
    ],
  },
  { path: "/admin/trainer", label: "Trainer", icon: <FaPersonChalkboard  /> },
  { path: "/admin/student", label: "Student", icon: <RiUser3Line /> },
  { path: "/admin/payment", label: "Payment", icon: <FaFileInvoiceDollar  /> },
  { path: "/admin/announcement", label: "Announcement", icon: <BsMegaphone /> },
];

// const Logo = () => (
//   <svg
//     width={25}
//     viewBox="0 0 25 42"
//     version="1.1"
//     xmlns="http://www.w3.org/2000/svg"
//     xmlnsXlink="http://www.w3.org/1999/xlink"
//   >
//     {/* SVG content */}
//   </svg>
// );


const Sidebar = () => {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState({});

  // Toggle Submenu
  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  // Check if the current path is active
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
      <ul className="menu-inner py-1">
        {MENU_ITEMS.map((item) => (
          <li
            key={item.path}
            className={`menu-item ${
              isPathActive(item.path) || openMenus[item.label] ? "active open" : ""
            }`}
          >
            {item.subItems ? (
              <>
                <a
                  href="#"
                  className="menu-link menu-toggle"
                  onClick={() => toggleMenu(item.label)}
                >
                  <span className="menu-icon">{item.icon}</span>
                  <span>{item.label}</span>
                </a>
                <ul
                  className={`menu-sub ${
                    openMenus[item.label] ? "open" : ""
                  }`}
                >
                  {item.subItems.map((subItem) =>
                    subItem.subItems ? (
                      <li
                        key={subItem.path}
                        className={`menu-item ${
                          isPathActive(subItem.path) || openMenus[subItem.label]
                            ? "active open"
                            : ""
                        }`}
                      >
                        <a
                          href="#"
                          className="menu-link menu-toggle"
                          onClick={() => toggleMenu(subItem.label)}
                        >
                          <span>{subItem.label}</span>
                        </a>
                        <ul
                          className={`menu-sub ${
                            openMenus[subItem.label] ? "open" : ""
                          }`}
                        >
                          {subItem.subItems.map((innerItem) => (
                            <li
                              key={innerItem.path}
                              className={`menu-item ${
                                isPathActive(innerItem.path) ? "active" : ""
                              }`}
                            >
                              <Link to={innerItem.path} className="menu-link">
                                {innerItem.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ) : (
                      <li
                        key={subItem.path}
                        className={`menu-item ${
                          isPathActive(subItem.path) ? "active" : ""
                        }`}
                      >
                        <Link to={subItem.path} className="menu-link">
                          {subItem.label}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </>
            ) : (
              <Link to={item.path} className="menu-link">
                <span className="menu-icon">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
