// components/Navbar.js
"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/componnent/AuthContext/AuthContext';
import Image from 'react-bootstrap/Image';
import React, { useState, useEffect } from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Sidebar from '@/app/componnent/SidebarComponent/sideBar';
import { API_URL } from '../../../../app';
import {
  GET_API_DATA_USER,
  API_HOUSE_ESTATE
} from '../../../../api'
import GetRequest from '../../ConfigAPI'
import { Link as ScrollLink } from 'react-scroll';
const Navbar = () => {
  const router = useRouter();
  const { authData, setAuthData } = useAuth();
  const [userData, setUserData] = useState('');
  const id = authData.id;
  const role = authData.role;
  // console.log(id)
  console.log(userData)
  const scrollToSection = (sectionId) => {
    scroller.scrollTo(sectionId, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  };

  // - fetch - //

  // user data
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

  // housing estate
  const [housingEstate, setHousingEstate] = useState([]);

  useEffect(() => {
    const fecthHousingEstate = async () => {
      try {
        const result = await GetRequest(API_HOUSE_ESTATE, 'GET', null);
        setHousingEstate(result.data);
      } catch (error) {
        console.log('error', error);
      }
    }

    fecthHousingEstate();
  }, []);

  // --- //

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

    <nav className="navbar navbar-expand-lg navbar-dark navbar-color" style={{ position: 'sticky', top: 0, width: '100%', zIndex: 1000 }}>
      <div className="Nav-container">
        <div className="row align-items-center">
          <div className="col d-flex justify-content-center">

            {housingEstate.map((data) => (
              <Link key={data.he_id} href="/">
                <Image
                  src={`${API_URL}${data.image}`}
                  alt="Logo"
                  width={130}
                  height={60}
                />
              </Link>
            ))}

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
              <ScrollLink
                activeClass="active"
                to="section1"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="nav-link mx-4"
              >
                โครงการ
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                activeClass="active"
                to="section2"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="nav-link mx-4"
              >
                ติดต่อเรา
              </ScrollLink>
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
            title={userData.user_name + ' ' + userData.user_lastname}
            style={{ color: 'white' }}
          >
            <NavDropdown.Item onClick={() => router.push('/profile')}>ข้อมูลผู้ใช้</NavDropdown.Item>

            {role === 1 && (
              <NavDropdown.Item onClick={() => router.push('/housing_estate')}>โครงการ</NavDropdown.Item>
            )}

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
