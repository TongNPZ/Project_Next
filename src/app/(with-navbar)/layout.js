import Navbar from '../componnent/NavbarComponent/navBar';

export default function NavbarLayout({ children }) {

    return (
        <>
            <Navbar />
            <div className='container-fluid px-5 mt-5'>
                {children}
            </div>
        </>
    );
}
