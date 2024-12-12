import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('');

  const handleItemClick = (item) => {
    setActiveItem(item); // Perbarui item aktif saat diklik
  };

  return (
    <aside id='layout-menu' className='layout-menu menu-vertical menu bg-menu-theme'>
      <div className='app-brand demo'>
        <a href='_blank' className='app-brand-link'>
          <span className='app-brand-logo demo'>
            <svg width={25} viewBox='0 0 25 42' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'>
              <defs>
                <path d='M13.7918663,0.358365126 L3.39788168,7.44174259 C0.566865006,9.69408886 -0.379795268,12.4788597 0.557900856,15.7960551 C0.68998853,16.2305145 1.09562888,17.7872135 3.12357076,19.2293357 C3.8146334,19.7207684 5.32369333,20.3834223 7.65075054,21.2172976 L7.59773219,21.2525164 L2.63468769,24.5493413 C0.445452254,26.3002124 0.0884951797,28.5083815 1.56381646,31.1738486 C2.83770406,32.8170431 5.20850219,33.2640127 7.09180128,32.5391577 C8.347334,32.0559211 11.4559176,30.0011079 16.4175519,26.3747182 C18.0338572,24.4997857 18.6973423,22.4544883 18.4080071,20.2388261 C17.963753,17.5346866 16.1776345,15.5799961 13.0496516,14.3747546 L10.9194936,13.4715819 L18.6192054,7.984237 L13.7918663,0.358365126 Z' id='path-1' />
              </defs>
              <g id='g-app-brand' stroke='none' strokeWidth={1} fill='none' fillRule='evenodd'>
                <g id='Brand-Logo' transform='translate(-27.000000, -15.000000)'>
                  <g id='Icon' transform='translate(27.000000, 15.000000)'>
                    <g id='Mask' transform='translate(0.000000, 8.000000)'>
                      <mask id='mask-2' fill='white'>
                        <use xlinkHref='#path-1' />
                      </mask>
                      <use fill='#696cff' xlinkHref='#path-1' />
                      <g id='Path-3' mask='url(#mask-2)'>
                        <use fill='#696cff' xlinkHref='#path-3' />
                        <use fillOpacity='0.2' fill='#FFFFFF' xlinkHref='#path-3' />
                      </g>
                      <g id='Path-4' mask='url(#mask-2)'>
                        <use fill='#696cff' xlinkHref='#path-4' />
                        <use fillOpacity='0.2' fill='#FFFFFF' xlinkHref='#path-4' />
                      </g>
                    </g>
                    <g id='Triangle' transform='translate(19.000000, 11.000000) rotate(-300.000000) translate(-19.000000, -11.000000) '>
                      <use fill='#696cff' xlinkHref='#path-5' />
                      <use fillOpacity='0.2' fill='#FFFFFF' xlinkHref='#path-5' />
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </span>
          <span className='app-brand-text demo menu-text fw-bolder ms-2'>Sneat</span>
        </a>
        <a href='_blank' className='layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none'>
          <i className='bx bx-chevron-left bx-sm align-middle' />
        </a>
      </div>
      <div className='menu-inner-shadow' />
      <ul className='menu-inner py-1'>
        {/* Dashboard
        <li className='menu-item '>
          <Link to='/admin/dashboard' className='menu-link'>
            <i className='menu-icon tf-icons bx bx-home-circle' />
            <div data-i18n='Analytics'>Dashboard</div>
          </Link>
        </li> */}
        {/* Layouts */}
        <li className={`menu-item ${activeItem === 'mrlc' ? 'active' : ''}`}>
          <a href='javascript:void(0);' className='menu-link menu-toggle' onClick={() => handleItemClick('mrlc')}>
            <i className='menu-icon tf-icons bx bx-home-circle' />
            <div data-i18n='Layouts'>MRLC</div>
          </a>
          <ul className='menu-sub'>
            <li className='menu-item'>
              <a href='/admin/dashboard' className='menu-link' onClick={() => handleItemClick('sp')}>
                <div data-i18n='Analytics'>Summary</div>
              </a>
            </li>
            <li className='menu-item'>
              <a href='/admin/sp' className='menu-link' onClick={() => handleItemClick('daftar-peserta-sp')}>
                <div data-i18n='Without menu'>Sesi Perkenalan</div>
              </a>
            </li>
            <li className='menu-item'>
              <a href='/admin/daftar-peserta-sp' className='menu-link'>
                <div data-i18n='Without navbar'>Daftar Peserta SP</div>
              </a>
            </li>
            <li className='menu-item'>
              <a href='layouts-fluid.html' className='menu-link'>
                <div data-i18n='Fluid'>Interest Program</div>
              </a>
            </li>
            {/* <li className='menu-item'>
              <a href='layouts-blank.html' className='menu-link'>
                <div data-i18n='Blank'>Blank</div>
              </a>
            </li> */}
          </ul>
        </li>
        {/* <li className='menu-header small text-uppercase'>
          <span className='menu-header-text'>Pages</span>
        </li>
        <li className='menu-item'>
          <a href='javascript:void(0);' className='menu-link menu-toggle'>
            <i className='menu-icon tf-icons bx bx-dock-top' />
            <div data-i18n='Account Settings'>Account Settings</div>
          </a>
          <ul className='menu-sub'>
            <li className='menu-item'>
              <a href='pages-account-settings-account.html' className='menu-link'>
                <div data-i18n='Account'>Account</div>
              </a>
            </li>
            <li className='menu-item'>
              <a
                href='pages-account-settings-notifications.html'
                className='menu-link'
              >
                <div data-i18n='Notifications'>Notifications</div>
              </a>
            </li>
            <li className='menu-item'>
              <a
                href='pages-account-settings-connections.html'
                className='menu-link'
              >
                <div data-i18n='Connections'>Connections</div>
              </a>
            </li>
          </ul>
        </li>
        <li className='menu-item'>
          <a href='javascript:void(0);' className='menu-link menu-toggle'>
            <i className='menu-icon tf-icons bx bx-lock-open-alt' />
            <div data-i18n='Authentications'>Authentications</div>
          </a>
          <ul className='menu-sub'>
            <li className='menu-item'>
              <a href='auth-login-basic.html' className='menu-link' target='_blank'>
                <div data-i18n='Basic'>Login</div>
              </a>
            </li>
            <li className='menu-item'>
              <a
                href='auth-register-basic.html'
                className='menu-link'
                target='_blank'
              >
                <div data-i18n='Basic'>Register</div>
              </a>
            </li>
            <li className='menu-item'>
              <a
                href='auth-forgot-password-basic.html'
                className='menu-link'
                target='_blank'
              >
                <div data-i18n='Basic'>Forgot Password</div>
              </a>
            </li>
          </ul>
        </li>
        <li className='menu-item'>
          <a href='javascript:void(0);' className='menu-link menu-toggle'>
            <i className='menu-icon tf-icons bx bx-cube-alt' />
            <div data-i18n='Misc'>Misc</div>
          </a>
          <ul className='menu-sub'>
            <li className='menu-item'>
              <a href='pages-misc-error.html' className='menu-link'>
                <div data-i18n='Error'>Error</div>
              </a>
            </li>
            <li className='menu-item'>
              <a href='pages-misc-under-maintenance.html' className='menu-link'>
                <div data-i18n='Under Maintenance'>Under Maintenance</div>
              </a>
            </li>
          </ul>
        </li>
        <li className='menu-header small text-uppercase'>
          <span className='menu-header-text'>Components</span>
        </li>
        <li className='menu-item'>
          <a href='cards-basic.html' className='menu-link'>
            <i className='menu-icon tf-icons bx bx-collection' />
            <div data-i18n='Basic'>Cards</div>
          </a>
        </li>
        <li className='menu-item'>
          <a href='javascript:void(0)' className='menu-link menu-toggle'>
            <i className='menu-icon tf-icons bx bx-box' />
            <div data-i18n='User interface'>User interface</div>
          </a>
          <ul className='menu-sub'>
            <li className='menu-item'>
              <a href='ui-accordion.html' className='menu-link'>
                <div data-i18n='Accordion'>Accordion</div>
              </a>
            </li>
            <li className='menu-item'>
              <a href='ui-alerts.html' className='menu-link'>
                <div data-i18n='Alerts'>Alerts</div>
              </a>
            </li>
            <li className='menu-item'>
              <a href='ui-badges.html' className='menu-link'>
                <div data-i18n='Badges'>Badges</div>
              </a>
            </li>
            <li className='menu-item'>
              <a href='ui-buttons.html' className='menu-link'>
                <div data-i18n='Buttons'>Buttons</div>
              </a>
            </li>
            <li className='menu-item'>
              <a href='ui-carousel.html' className='menu-link'>
                <div data-i18n='Carousel'>Carousel</div>
              </a>
            </li>
            <li className='menu-item'>
              <a href='ui-collapse.html' className='menu-link'>
                <div data-i18n='Collapse'>Collapse</div>
              </a>
            </li>
            <li className='menu-item'>
              <a href='ui-dropdowns.html' className='menu-link'>
                <div data-i18n='Dropdowns'>Dropdowns</div>
              </a>
            </li>
            <li className='menu-item'>
              <a href='ui-footer.html' className='menu-link'>
                <div data-i18n='Footer'>Footer</div>
              </a>
            </li>
            <li className='menu-item'>
              <a href='ui-list-groups.html' className='menu-link'>
                <div data-i18n='List Groups'>List groups</div>
              </a>
            </li>
            <li className='menu-item'>
              <a href='ui-modals.html' className='menu-link'>
                <div data-i18n='Modals'>Modals</div>
              </a>
            </li>
            <li className='menu-item'>
              <a href='ui-navbar.html' className='menu-link'>
                <div data-i18n='Navbar'>Navbar</div>
              </a>
            </li>
            <li className='menu-item'>
              <a href='ui-offcanvas.html' className='menu-link'>
                <div data-i18n='Offcanvas'>Offcanvas</div>
              </a>
            </li>
            <li className='menu-item'>
              <a href='ui-pagination-breadcrumbs.html' className='menu-link'>
                <div data-i18n='Pagination & Breadcrumbs'>
                  Pagination &amp; Breadcrumbs
                </div>
              </a>
            </li>
            <li className='menu-item'>
              <a href='ui-progress.html' className='menu-link'>
                <div data-i18n='Progress'>Progress</div>
              </a>
            </li>
            <li className='menu-item'>
              <a href='ui-spinners.html' className='menu-link'>
                <div data-i18n='Spinners'>Spinners</div>
              </a>
            </li>
            <li className='menu-item'>
              <a href='ui-tabs-pills.html' className='menu-link'>
                <div data-i18n='Tabs & Pills'>Tabs &amp; Pills</div>
              </a>
            </li>
            <li className='menu-item'>
              <a href='ui-toasts.html' className='menu-link'>
                <div data-i18n='Toasts'>Toasts</div>
              </a>
            </li>
            <li className='menu-item'>
              <a href='ui-tooltips-popovers.html' className='menu-link'>
                <div data-i18n='Tooltips & Popovers'>Tooltips &amp; popovers</div>
              </a>
            </li>
            <li className='menu-item'>
              <a href='ui-typography.html' className='menu-link'>
                <div data-i18n='Typography'>Typography</div>
              </a>
            </li>
          </ul>
        </li>
        <li className='menu-item'>
          <a href='javascript:void(0)' className='menu-link menu-toggle'>
            <i className='menu-icon tf-icons bx bx-copy' />
            <div data-i18n='Extended UI'>Extended UI</div>
          </a>
          <ul className='menu-sub'>
            <li className='menu-item'>
              <a href='extended-ui-perfect-scrollbar.html' className='menu-link'>
                <div data-i18n='Perfect Scrollbar'>Perfect scrollbar</div>
              </a>
            </li>
            <li className='menu-item'>
              <a href='extended-ui-text-divider.html' className='menu-link'>
                <div data-i18n='Text Divider'>Text Divider</div>
              </a>
            </li>
          </ul>
        </li>
        <li className='menu-item'>
          <a href='icons-boxicons.html' className='menu-link'>
            <i className='menu-icon tf-icons bx bx-crown' />
            <div data-i18n='Boxicons'>Boxicons</div>
          </a>
        </li>
        <li className='menu-header small text-uppercase'>
          <span className='menu-header-text'>Forms &amp; Tables</span>
        </li>
        <li className='menu-item'>
          <a href='javascript:void(0);' className='menu-link menu-toggle'>
            <i className='menu-icon tf-icons bx bx-detail' />
            <div data-i18n='Form Elements'>Form Elements</div>
          </a>
          <ul className='menu-sub'>
            <li className='menu-item'>
              <a href='forms-basic-inputs.html' className='menu-link'>
                <div data-i18n='Basic Inputs'>Basic Inputs</div>
              </a>
            </li>
            <li className='menu-item'>
              <a href='forms-input-groups.html' className='menu-link'>
                <div data-i18n='Input groups'>Input groups</div>
              </a>
            </li>
          </ul>
        </li>
        <li className='menu-item'>
          <a href='javascript:void(0);' className='menu-link menu-toggle'>
            <i className='menu-icon tf-icons bx bx-detail' />
            <div data-i18n='Form Layouts'>Form Layouts</div>
          </a>
          <ul className='menu-sub'>
            <li className='menu-item'>
              <a href='form-layouts-vertical.html' className='menu-link'>
                <div data-i18n='Vertical Form'>Vertical Form</div>
              </a>
            </li>
            <li className='menu-item'>
              <a href='form-layouts-horizontal.html' className='menu-link'>
                <div data-i18n='Horizontal Form'>Horizontal Form</div>
              </a>
            </li>
          </ul>
        </li>
        <li className='menu-item'>
          <a href='tables-basic.html' className='menu-link'>
            <i className='menu-icon tf-icons bx bx-table' />
            <div data-i18n='Tables'>Tables</div>
          </a>
        </li>
        <li className='menu-header small text-uppercase'>
          <span className='menu-header-text'>Misc</span>
        </li>
        <li className='menu-item'>
          <a
            href='https://github.com/themeselection/sneat-html-admin-template-free/issues'
            target='_blank'
            className='menu-link'
          >
            <i className='menu-icon tf-icons bx bx-support' />
            <div data-i18n='Support'>Support</div>
          </a>
        </li>
        <li className='menu-item'>
          <a
            href='https://themeselection.com/demo/sneat-bootstrap-html-admin-template/documentation/'
            target='_blank'
            className='menu-link'
          >
            <i className='menu-icon tf-icons bx bx-file' />
            <div data-i18n='Documentation'>Documentation</div>
          </a>
        </li> */}
      </ul>
    </aside>
  );
}

export default Sidebar;
