import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaGraduationCap, FaHome, FaFileInvoiceDollar } from "react-icons/fa";
import { RiUser3Line } from "react-icons/ri";
import { BsMegaphone } from "react-icons/bs";
import { FaPersonChalkboard } from "react-icons/fa6";
import logo_sidebar from "../../assets/img/logo_dashboard.png";

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
        <img src={logo_sidebar} alt="logo-sidebar" width={150} />
      </div>
      <ul className="menu-inner py-3">
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
