"use client"
import { useState } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa'; // นำเข้าไอคอนซ่อนและแสดงของ Font Awesome

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // เริ่มต้นเปิด Sidebar ในสถานะที่ไม่เปิด

  const toggleSidebar = () => {
    setIsOpen(!isOpen); // สลับสถานะเปิด/ซ่อน Sidebar
  };

  return (
    <>

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>

        <div className='sidebar-toggle-container'>
          <div className='row'>
            <div className='col'></div>
            <div className='col d-flex justify-content-end'> {/* เพิ่มคลาส d-flex เพื่อให้ flexbox ทำงาน */}
              <button className="sidebar-toggle" onClick={toggleSidebar}>
                {isOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </div>
        <div className='sidebar-content'>
          <div className='row justify-content-end'>
            <ul className="list-unstyled">
              <li>
                <Link href="/">
                  <p>Home</p>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <p>About</p>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <p>Contact</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
