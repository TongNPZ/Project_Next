"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GiHamburgerMenu } from "react-icons/gi";
import {
  BsFillHouseFill,
  BsCaretRightFill,
  BsCaretDownFill
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
  const [open, setOpen] = useState(false);
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
          <a className="nav-link mx-4" aria-current="page" onClick={() => router.push('/')} style={{ cursor: 'pointer' }}>หน้าหลัก</a>
          <br />
          <a
            className="nav-link mx-4" aria-current="page"
            aria-controls="example-collapse-text"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            style={{ cursor: 'pointer' }}>
            <div className='row'>
              <div className='col-md-6'>
                <BsFillHouseFill />&nbsp;&nbsp;จัดการข้อมูลบ้าน
              </div>

              {open !== true ? (
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

          {/* collapse */}
          <Collapse in={open}>
            <div id="example-collapse-text">
              <a className="nav-link mx-4 mt-3 ps-4" aria-current="page" onClick={() => router.push('/house')} style={{ cursor: 'pointer' }}>บ้าน</a>
              <a className="nav-link mx-4 mt-3 ps-4" aria-current="page" onClick={() => router.push('/house/styled')} style={{ cursor: 'pointer' }}>แบบบ้าน</a>
              <a className="nav-link mx-4 mt-3 ps-4" aria-current="page" onClick={() => router.push('/house/zone')} style={{ cursor: 'pointer' }}>โซนบ้าน</a>
            </div>
          </Collapse>
          {/* --- */}

        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default SideBar;