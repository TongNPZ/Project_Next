// components/Navbar.js
"use client"
// components/Navbar.js
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UseAuth } from '@/app/componnent/AuthContext/AuthContext';
import Image from 'react-bootstrap/Image';

const Navbar = () => {
  const router = useRouter();
  const { authData } = UseAuth();

  // Logout!!!!!!
  const handleLogout = () => {
    // ลบข้อมูลที่เกี่ยวข้องใน localStorage
    localStorage.removeItem('id');
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    // กำหนดค่า authData เป็น null เพื่อบอกให้ระบบรีเฟรช
    setAuthData({
      id: null,
      role: null,
      token: null,
    });
    // นำผู้ใช้กลับไปยังหน้าหลักหลังจากออกจากระบบ
    router.push('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-color mb-5">
      <div className="Nav-container">
        <Link href="/">
          {/* <Image
            src="\images\Logo.png"
            alt="Logo"
            width={130}
            height={60}
            priority={true} // เพิ่ม property นี้เพื่อระบุว่ารูปภาพเป็นส่วนสำคัญของเนื้อหาหลัก
          /> */}
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
              <a className="nav-link mx-4" aria-current="page" onClick={() => router.push('/about')}>ติดต่อเรา</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="Nav-container">
        {/* เช็คว่ามี token หรือไม่ */}
        {authData.token ? (
          // <button className='button' onClick={() => router.push('/profile')}> Profile </button>
          // <Image src="holder.js/171x180" roundedCircle />
          <i class="bi bi-person-circle"></i>

        ) : (
          <button className='button' onClick={() => router.push('/login')}> เข้าสู่ระบบ </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
