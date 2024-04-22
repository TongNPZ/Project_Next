// components/Navbar.js
"use client"
// components/Navbar.js
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UseAuth } from '@/app/componnent/AuthContext/AuthContext';
import Image from 'react-bootstrap/Image';
import React, { useState, useEffect } from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';

// import {
//   GET_API_DATA_USER,
// } from '../../../../api'
import GetRequest from '../../ConfigAPI'

const Navbar = () => {
  const router = useRouter();
  const { authData } = UseAuth();
  const [userData, setUserData] = useState('');

  useEffect(() => {
    async function fetchUserData() {
      try {
        const url = `http://26.90.237.200:3000/user/${authData.id}`;
        const response = await GetRequest(url);
        // const response = await GetRequest(GET_API_DATA_USER, 'GET', id);
        // ตรวจสอบว่าส่งคำขอไปยังเซิร์ฟเวอร์สำเร็จหรือไม่
        if (response) {
          setUserData(response[0])
          console.log(response);
        } else {
          console.error('เชื่อมต่อข้อมูลไม่สำเร็จ');
        }
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
      }
    }

    fetchUserData();
  }, []);

  // console.log(userData.user_name)
  // Logout!!!!!!
  const handleLogout = () => {
    // ลบข้อมูลที่เกี่ยวข้องใน localStorage
    localStorage.removeItem('id');
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    window.location.reload();
    // กำหนดค่า authData เป็น null เพื่อบอกให้ระบบรีเฟรช
    // setAuthData({
    //   id: null,
    //   role: null,
    //   token: null,
    // });
    // นำผู้ใช้กลับไปยังหน้าหลักหลังจากออกจากระบบ
    router.push('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-color">
      <div className="Nav-container">
        <Link href="/">
          <Image
            src="\images\Logo.png"
            alt="Logo"
            width={130}
            height={60}
            priority={true} // เพิ่ม property นี้เพื่อระบุว่ารูปภาพเป็นส่วนสำคัญของเนื้อหาหลัก
          />
        </Link>
      </div>
      <div className="container">
        <div className="navbar-collapse justify-content-center" id="navbarTogglerDemo03">
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link mx-4" aria-current="page" onClick={() => router.push('/')}>หน้าหลัก</a>
            </li>
            <li className="nav-item">
              <a className="nav-link mx-4" aria-current="page" onClick={() => router.push('/housing-estate')}>โครงการ</a>
            </li>
            <li className="nav-item">
              <a className="nav-link mx-4" aria-current="page" onClick={() => router.push('/house/zone')}>โซนบ้าน</a>
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
          // <button className='button' onClick={() => router.push('/profile')}> Profile </button>
          // <Image src="\images\profile.png" width={60} height={60} roundedCircle />
          <NavDropdown
            id="nav-dropdown-dark-example"
            menuVariant="dark"
            title={'คุณ ' + userData.user_name + ' ' + userData.user_lastname}
            style={{ color: 'white' }}
          >
            {/* <NavDropdown.Item>ชื่อผู้ใช้: {userData.user_name} {userData.user_lastname}</NavDropdown.Item> */}
            <NavDropdown.Item href="#action/3.1">ข้อมูลผู้ใช้</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">โครงการ</NavDropdown.Item>
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
