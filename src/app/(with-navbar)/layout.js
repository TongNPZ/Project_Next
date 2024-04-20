import Sidebar from '../componnent/SidebarComponent/sideBar';
import Navbar from '../componnent/NavbarComponent/navBar';

export default function NavbarLayout({ children }) {

    return (
        <div className="container-color">
            <Navbar />
            <div className="row">
                <div className='col-md-2'>
                    <Sidebar />
                </div>

                {children}
            </div>
        </div>
    );
}
