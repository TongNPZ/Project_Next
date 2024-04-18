import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './componnent/Sidebar/sideBar';
import Navbar from './componnent/Navbar/navBar';
import Link from 'next/link';
import { Carousel } from 'react-bootstrap';

export default function Home() {
    return (
        <div className='container-color'>
            <Navbar />
            <div className='row'>
                <div className='col-md-2'>
                    <Sidebar />
                </div>
                <div className='col-md-9'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-12'>
                                <Carousel>
                                    <img src="/images/Life.jpg" alt="รูปภาพ" className="d-block" />

                                </Carousel>
                            </div>
                            <div className='col-md-4'>
                                Column 1
                            </div>
                            <div className='col-md-4'>
                                Column 2
                            </div>
                            <div className='col-md-4'>
                                Column 3
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
