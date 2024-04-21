import Sidebar from '../componnent/SidebarComponent/sideBar';
import Navbar from '../componnent/NavbarComponent/navBar';

export default function NavbarLayout({ children }) {

    return (
        <>
            <Navbar />
            <div className="row">
                {/* <div className='col-md-2'>
                    <Sidebar />
                </div> */}

                {children}
            </div>
        </>
    );
}
