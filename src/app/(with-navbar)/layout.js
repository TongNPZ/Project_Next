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
        </ProtectRoute>
    );
}
