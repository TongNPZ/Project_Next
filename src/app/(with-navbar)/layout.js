'use client'
import "../globals.css";
import ProtectRoute from "../componnent/ProtectRoute/ProtectRoute";
import Navbar from '../componnent/NavbarComponent/navBar';

export default function NavbarLayout({ children }) {

    return (
        <ProtectRoute>
            <Navbar />
            <div className='container-color container-fluid px-5 pt-5 pb-5'>
                {children}
            </div>
            <footer className="my-5 pt-5 text-muted text-center text-small" style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
                <p className="mb-1">&copy; 2024 บริษัท ศิวิลัยแลนด์ ขอนแก่น จำกัด </p>
                <ul className="list-inline">
                    <li className="list-inline-item"><a href="#">Privacy</a></li>
                    <li className="list-inline-item"><a href="#">Terms</a></li>
                    <li className="list-inline-item"><a href="#">Support</a></li>
                </ul>
            </footer>
        </ProtectRoute>
    );
}
