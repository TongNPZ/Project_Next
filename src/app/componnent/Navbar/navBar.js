// components/Navbar.js
import Link from 'next/link';
import Image from 'next/image'; // เพิ่มการ import NextImage

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-color">
      <div className="logo-container">
        <Link href="/">
          <Image
            src="/images/logo.png"
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
              <a className="nav-link mx-4" aria-current="page" href="#">หน้าหลัก</a>
            </li>
            <li className="nav-item">
              <a className="nav-link mx-4" aria-current="page" href="#">โครงการ</a>
            </li>
            <li className="nav-item">
              <a className="nav-link mx-4" aria-current="page" href="#">ติดต่อเรา</a>
            </li>
          </ul>
        </div>
      </div>

    </nav>
  );
};

export default Navbar;