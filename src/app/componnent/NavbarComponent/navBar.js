// components/Navbar.js
"use client"
import Link from 'next/link';
// import Image from 'next/image'; // เพิ่มการ import NextImage
import { useRouter } from 'next/navigation'

const Navbar = () => {
  const router = useRouter()
  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-color">
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
        <button className='button' onClick={() => router.push('/login')}> เข้าสู่ระบบ </button>
      </div>
    </nav>
  );
};

export default Navbar;