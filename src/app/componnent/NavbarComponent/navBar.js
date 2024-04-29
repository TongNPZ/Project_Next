// components/Navbar.js
"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UseAuth } from '@/app/componnent/AuthContext/AuthContext';
import Image from 'react-bootstrap/Image';
import React, { useState, useEffect } from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Sidebar from '@/app/componnent/SidebarComponent/sideBar';
import {
  GET_API_DATA_USER,
} from '../../../../api'
import GetRequest from '../../ConfigAPI'

const Navbar = () => {
  const router = useRouter();
  const { authData, setAuthData } = UseAuth();
  const [userData, setUserData] = useState('');
  const id = authData.id;
  // console.log(id)
  console.log(userData)

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await GetRequest(GET_API_DATA_USER + '/' + id, 'GET', null);
        setUserData(response);
      } catch (error) {
        console.log('error', error);
      }
    }
    fetchUserData();
  }, [id]);

  // Logout!!!!!!
  const handleLogout = () => {
    // ลบข้อมูลที่เกี่ยวข้องใน localStorage
    localStorage.removeItem('id');
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    setAuthData({});
    router.push('/');

  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-color">
      <div className="Nav-container">
        <div className="row align-items-center">
          <div className="col d-flex justify-content-center">
            <Link href="/">
              <Image
                src="\images\Logo.png"
                alt="Logo"
                width={130}
                height={60}
              />
            </Link>
          </div>
          <div className="col d-flex justify-content-center">

            {authData.token ? (
              <a style={{ cursor: 'pointer' }}>
                <Sidebar />
              </a>
            ) : null}

          </div>
        </div>
      </div>

      <div className="container">
        <div className="navbar-collapse justify-content-center" id="navbarTogglerDemo03">
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link mx-4" aria-current="page" onClick={() => router.push('/')}>หน้าหลัก</a>
            </li>
            <li className="nav-item">
              <a className="nav-link mx-4" aria-current="page" onClick={() => router.push('/house_estate')}>โครงการ</a>
            </li>

            <li className="nav-item">
              <a className="nav-link mx-4" aria-current="page" onClick={() => router.push('/about')}>ติดต่อเรา</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="Nav-container">
        {/* เช็คว่ามี token หรือไม่ */}

        {authData.token ? (
          <NavDropdown
            id="nav-dropdown-dark-example"
            menuVariant="dark"
            title={'คุณ ' + userData.user_name + ' ' + userData.user_lastname}
            style={{ color: 'white' }}
          >
            <NavDropdown.Item onClick={() => router.push('/profile')}>ข้อมูลผู้ใช้</NavDropdown.Item>
            <NavDropdown.Item onClick={() => router.push('/house_estate')}>โครงการ</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleLogout}>ออกจากระบบ</NavDropdown.Item>
          </NavDropdown>

        ) : (
          <button className='button' onClick={() => router.push('/login')}> เข้าสู่ระบบ </button>
        )}

      </div>
    </nav>
  );
};

export default Navbar;
