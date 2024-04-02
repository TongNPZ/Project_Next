import 'bootstrap/dist/css/bootstrap.min.css';
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