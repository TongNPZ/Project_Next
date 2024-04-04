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
      <div className='sidebar-toggle-container'>
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
          <div className='sidebar-content'>
            <div className='row justify-content-end'>
              <button className="sidebar-toggle" onClick={toggleSidebar}>
                {isOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
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