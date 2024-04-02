// components/Navbar.js
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-color">
      <div className="container">
        <Link href="/">
          <p className="navbar-brand">หน้าหลัก</p>
        </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link href="/">
                <p className="nav-link">โครงการ</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/about">
                <p className="nav-link">ติดต่อเรา</p>
              </Link>
            </li>
            {/* เพิ่มเมนูเพิ่มเติมตามต้องการ */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
