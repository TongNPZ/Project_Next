"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GiHamburgerMenu } from "react-icons/gi";
import {
  BsFillHouseFill,
  BsCaretRightFill,
  BsCaretDownFill,
  BsCoin
} from "react-icons/bs";
import {
  Collapse,
  Offcanvas
} from 'react-bootstrap';


function SideBar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const router = useRouter();

  // collapse //
  const [openHouse, setOpenHouse] = useState(false);
  const [openBuy, setOpenBuy] = useState(false);
  // --- //

  return (
    <>
      <GiHamburgerMenu
        className='text-light'
        onClick={handleShow}
        style={{ fontSize: '30px' }}
      />
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>พวงเพชร 4</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <a className="nav-link mx-4 mb-4" aria-current="page" onClick={() => router.push('/')} style={{ cursor: 'pointer' }}>หน้าหลัก</a>
          <a
            className="nav-link mx-4  mb-4" aria-current="page"
            aria-controls="collapse-house"
            aria-expanded={openHouse}
            onClick={() => setOpenHouse(!openHouse)}
            style={{ cursor: 'pointer' }}>
            <div className='row'>
              <div className='col-md-6'>
                <BsFillHouseFill />&nbsp;&nbsp;จัดการข้อมูลบ้าน
              </div>

              {openHouse !== true ? (
                <div className='col-md-6 text-end'>
                  <BsCaretRightFill />
                </div>
              ) : (
                <div className='col-md-6 text-end'>
                  <BsCaretDownFill />
                </div>
              )}

            </div>

          </a>

          {/* collapse house */}
          <Collapse in={openHouse}>
            <div className='mb-3' id="collapse-house">
              <a className="nav-link mx-4 mt-3 ps-4" aria-current="page" onClick={() => router.push('/house')} style={{ cursor: 'pointer' }}>บ้าน</a>
              <a className="nav-link mx-4 mt-3 ps-4" aria-current="page" onClick={() => router.push('/house/styled')} style={{ cursor: 'pointer' }}>แบบบ้าน</a>
              <a className="nav-link mx-4 mt-3 ps-4" aria-current="page" onClick={() => router.push('/house/zone')} style={{ cursor: 'pointer' }}>โซนบ้าน</a>
            </div>
          </Collapse>
          {/* --- */}

          <a
            className="nav-link mx-4 mb-4" aria-current="page"
            aria-controls="collapse-buy"
            aria-expanded={openBuy}
            onClick={() => setOpenBuy(!openBuy)}
            style={{ cursor: 'pointer' }}>
            <div className='row'>
              <div className='col-md-6'>
                <BsCoin  />&nbsp;&nbsp;จัดการข้อมูลขาย
              </div>

              {openBuy !== true ? (
                <div className='col-md-6 text-end'>
                  <BsCaretRightFill />
                </div>
              ) : (
                <div className='col-md-6 text-end'>
                  <BsCaretDownFill />
                </div>
              )}

            </div>

          </a>

          {/* collapse buy */}
          <Collapse in={openBuy}>
            <div className='mb-3' id="collapse-buy">
              <a className="nav-link mx-4 mt-3 ps-4" aria-current="page" onClick={() => router.push('/buy/book')} style={{ cursor: 'pointer' }}>จอง</a>
            </div>
          </Collapse>
          {/* --- */}

        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default SideBar;