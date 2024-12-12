import React, { useState } from 'react'; // Added useState import
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('');
  const [isMrlcOpen, setIsMrlcOpen] = useState(false);

  const handleItemClick = (item) => {
    setActiveItem(item);
    setIsMrlcOpen(item === 'mrlc' ? !isMrlcOpen : false);
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
        <li className={`menu-item ${activeItem === 'mrlc' ? 'active' : ''}`}>
          <a href='javascript:void(0);' className='menu-link menu-toggle' onClick={() => handleItemClick('mrlc')}>
            <i className='menu-icon tf-icons bx bx-home-circle' />
            <div data-i18n='Layouts'>MRLC</div>
          </a>
          <ul className={`menu-sub ${isMrlcOpen ? 'open' : ''}`}>
            <li className='menu-item'>
              <Link to='/admin/dashboard' className='menu-link'>
                <div data-i18n='Analytics'>Summary</div>
              </Link>
            </li>
            <li className={`menu-item ${activeItem === 'sp' ? 'active' : ''}`}>
              <Link to='/admin/sp' className='menu-link'>
                <div data-i18n='Without menu'>Sesi Perkenalan</div>
              </Link>
            </li>
            <li className='menu-item'>
              <Link to='/admin/daftar-peserta-sp' className='menu-link'>
                <div data-i18n='Without navbar'>Daftar Peserta SP</div>
              </Link>
            </li>
            <li className='menu-item'>
              <Link to='/admin/interest' className='menu-link'>
                <div data-i18n='Fluid'>Interest Program</div>
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
