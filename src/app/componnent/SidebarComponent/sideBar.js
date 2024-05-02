"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GiHamburgerMenu } from "react-icons/gi";
import {
  BsFillHouseFill,
  BsCaretRightFill,
  BsCaretDownFill,
  BsCoin,
  BsFillPersonFill
} from "react-icons/bs";
import {
  Collapse,
  Offcanvas,
  ListGroup
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
          <ListGroup variant="flush">
            <ListGroup.Item>
              <div className='my-3'>
                <a className="nav-link" aria-current="page" onClick={() => router.push('/')} style={{ cursor: 'pointer' }}><strong>หน้าหลัก</strong></a>
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className='my-3'>
                <div className='mb-4'>
                  <p><strong>การจัดการ</strong></p>
                </div>
                <div className='mb-4'>
                  <a
                    className="nav-link" aria-current="page"
                    aria-controls="collapse-house"
                    aria-expanded={openHouse}
                    onClick={() => setOpenHouse(!openHouse)}
                    style={{ cursor: 'pointer' }}>
                    <div className='row'>
                      <div className='col-md-6'>
                        <BsFillHouseFill className='me-2' />ข้อมูลบ้าน
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
                      <a className="nav-link mx-4 mt-3" aria-current="page" onClick={() => router.push('/house')} style={{ cursor: 'pointer' }}>บ้าน</a>
                      <a className="nav-link mx-4 mt-3" aria-current="page" onClick={() => router.push('/house/styled')} style={{ cursor: 'pointer' }}>แบบบ้าน</a>
                      <a className="nav-link mx-4 mt-3" aria-current="page" onClick={() => router.push('/house/zone')} style={{ cursor: 'pointer' }}>โซนบ้าน</a>
                    </div>
                  </Collapse>
                  {/* --- */}

                </div>
                <div className='mb-4'>
                  <a
                    className="nav-link" aria-current="page"
                    aria-controls="collapse-buy"
                    aria-expanded={openBuy}
                    onClick={() => setOpenBuy(!openBuy)}
                    style={{ cursor: 'pointer' }}>
                    <div className='row'>
                      <div className='col-md-6'>
                        <BsCoin className='me-2' />ข้อมูลการขาย
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
                      <a className="nav-link mx-4 mt-3" aria-current="page" onClick={() => router.push('/buy/book')} style={{ cursor: 'pointer' }}>จอง</a>
                    </div>
                  </Collapse>
                  {/* --- */}
                </div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className='my-3'>
                <a className="nav-link" aria-current="page" onClick={() => router.push('/user')} style={{ cursor: 'pointer' }}>
                  <BsFillPersonFill className='me-2' /><strong>ข้อมูลผู้ใช้</strong>
                </a>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default SideBar;