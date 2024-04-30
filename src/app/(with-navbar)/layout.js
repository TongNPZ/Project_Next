import "../globals.css";
import Navbar from '../componnent/NavbarComponent/navBar';

export default function NavbarLayout({ children }) {

    return (
        <>
            <Navbar />
            <div className='container-color container-fluid px-5 pt-5 pb-5'>
                {children}
            </div>
        </>
    );
}
