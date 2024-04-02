// import Image from "next/image";
// import styles from "./page.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"></link>
import Sidebar from './componnent/Sidebar/sideBar';
import Navbar from './componnent/Navbar/navBar';
import Link from 'next/link';

export default function Home() {
  return (
    // <div className='container-fluid'>
    <div className='container-color'> {/* Use container-fluid to make the container full width */}
      <Navbar />
      <div className='row'> {/* Main row for layout */}
        <div className='col-md-2'> {/* Sidebar */}
          <Sidebar />
        </div>
        <div className='col-md-9'> {/* Main content area */}
        
          <div className='container'>
            <div className='row'>
              <div className='col-md-4'> {/* Column 1 */}
                Column 1
              </div>
              <div className='col-md-4'> {/* Column 2 */}
                Column 2
              </div>
              <div className='col-md-4'> {/* Column 3 */}
                Column 3
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}