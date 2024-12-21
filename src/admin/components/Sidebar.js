import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const MENU_ITEMS = [
  { path: '/admin/dashboard', label: 'Summary', dataI18n: 'Analytics' },
  { path: '/admin/sp', label: 'Sesi Perkenalan', dataI18n: 'Without menu' },
  { path: '/admin/daftar-peserta-sp', label: 'Daftar Peserta SP', dataI18n: 'Without navbar' },
  { path: '/admin/interest', label: 'Interest Program', dataI18n: 'Fluid' },
];

const Logo = () => (
  <svg
    width={25}
    viewBox="0 0 25 42"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <defs>
      <path
        d="M13.7918663,0.358365126 L3.39788168,7.44174259 C0.566865006,9.69408886 -0.379795268,12.4788597 0.557900856,15.7960551 C0.68998853,16.2305145 1.09562888,17.7872135 3.12357076,19.2293357 C3.8146334,19.7207684 5.32369333,20.3834223 7.65075054,21.2172976 L7.59773219,21.2525164 L2.63468769,24.5493413 C0.445452254,26.3002124 0.0884951797,28.5083815 1.56381646,31.1738486 C2.83770406,32.8170431 5.20850219,33.2640127 7.09180128,32.5391577 C8.347334,32.0559211 11.4559176,30.0011079 16.4175519,26.3747182 C18.0338572,24.4997857 18.6973423,22.4544883 18.4080071,20.2388261 C17.963753,17.5346866 16.1776345,15.5799961 13.0496516,14.3747546 L10.9194936,13.4715819 L18.6192054,7.984237 L13.7918663,0.358365126 Z"
        id="path-1"
      />
    </defs>
    <g id="g-app-brand" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
      <g id="Brand-Logo" transform="translate(-27.000000, -15.000000)">
        <g id="Icon" transform="translate(27.000000, 15.000000)">
          <g id="Mask" transform="translate(0.000000, 8.000000)">
            <mask id="mask-2" fill="white">
              <use xlinkHref="#path-1" />
            </mask>
            <use fill="#696cff" xlinkHref="#path-1" />
            <g id="Path-3" mask="url(#mask-2)">
              <use fill="#696cff" xlinkHref="#path-3" />
              <use fillOpacity="0.2" fill="#FFFFFF" xlinkHref="#path-3" />
            </g>
            <g id="Path-4" mask="url(#mask-2)">
              <use fill="#696cff" xlinkHref="#path-4" />
              <use fillOpacity="0.2" fill="#FFFFFF" xlinkHref="#path-4" />
            </g>
          </g>
          <g
            id="Triangle"
            transform="translate(19.000000, 11.000000) rotate(-300.000000) translate(-19.000000, -11.000000) "
          >
            <use fill="#696cff" xlinkHref="#path-5" />
            <use fillOpacity="0.2" fill="#FFFFFF" xlinkHref="#path-5" />
          </g>
        </g>
      </g>
    </g>
  </svg>
);

const MenuItem = ({ path, label, dataI18n, isActive }) => (
  <li className={`menu-item ${isActive ? 'active' : ''}`}>
    <Link to={path} className="menu-link">
      <div data-i18n={dataI18n}>{label}</div>
    </Link>
  </li>
);

const Sidebar = () => {
  const [isMrlcOpen, setIsMrlcOpen] = useState(false);
  const location = useLocation();

  const toggleMrlc = (e) => {
    e.preventDefault();
    setIsMrlcOpen((prev) => !prev);
  };

  const isPathActive = (path) => location.pathname === path;
  const isMrlcActive = isMrlcOpen || location.pathname.includes('/admin/');

  return (
    <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme">
      <div className="app-brand demo">
        <a href="/" className="app-brand-link" onClick={(e) => e.preventDefault()}>
          <span className="app-brand-logo demo">
            <Logo />
          </span>
          <span className="app-brand-text demo menu-text fw-bolder ms-2">Sneat</span>
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
        <li className={`menu-item ${isMrlcActive ? 'active' : ''}`}>
          <a href="/" className="menu-link menu-toggle" onClick={toggleMrlc}>
            <i className="menu-icon tf-icons bx bx-home-circle" />
            <div data-i18n="Layouts">MRLC</div>
          </a>
          <ul className={`menu-sub ${isMrlcOpen ? 'open' : ''}`}>
            {MENU_ITEMS.map((item) => (
              <MenuItem key={item.path} {...item} isActive={isPathActive(item.path)} />
            ))}
          </ul>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
