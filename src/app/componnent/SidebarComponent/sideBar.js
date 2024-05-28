"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/componnent/AuthContext/AuthContext';
import { GiHamburgerMenu } from "react-icons/gi";
import {
  BsFillHouseFill,
  BsCaretRightFill,
  BsCaretDownFill,
  BsCoin,
  BsFillPersonFill,
  BsReceiptCutoff,
  BsChatRightDotsFill,
  BsFileEarmarkBarGraphFill
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

  const { authData } = useAuth();
  const role = authData.role;

  // collapse //
  const [openHouse, setOpenHouse] = useState(false);
  const [openBuy, setOpenBuy] = useState(false);
  const [openCommonFee, setOpenCommonFee] = useState(false);
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

            {role === 2 || role === 3 || role === null && (
              <ListGroup.Item>
                <div className='my-3'>
                  <a className="nav-link" aria-current="page" onClick={() => router.push('/house_view')} style={{ cursor: 'pointer' }}>
                    <BsFillHouseFill className='me-2' /><strong>บ้านในโครงการ</strong>
                  </a>
                </div>
              </ListGroup.Item>
            )}

            {role === 1 && (
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
                        <a className="nav-link mx-4 mt-3" aria-current="page" onClick={() => router.push('/house/zone')} style={{ cursor: 'pointer' }}>โซนบ้าน (Zone)</a>
                        <a className="nav-link mx-4 mt-3" aria-current="page" onClick={() => router.push('/house/styled')} style={{ cursor: 'pointer' }}>แบบบ้าน (Type)</a>
                        <a className="nav-link mx-4 mt-3" aria-current="page" onClick={() => router.push('/house')} style={{ cursor: 'pointer' }}>บ้าน</a>
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
                        <a className="nav-link mx-4 mt-3" aria-current="page" onClick={() => router.push('/buy/contracted')} style={{ cursor: 'pointer' }}>สัญญา</a>
                        <a className="nav-link mx-4 mt-3" aria-current="page" onClick={() => router.push('/buy/transfer')} style={{ cursor: 'pointer' }}>โอนกรรมสิทธิ์</a>
                      </div>
                    </Collapse>
                    {/* --- */}
                  </div>
                </div>
              </ListGroup.Item>
            )}

            {role === 1 && (
              <ListGroup.Item>
                <div className='my-3'>
                  <a className="nav-link" aria-current="page" onClick={() => router.push('/user')} style={{ cursor: 'pointer' }}>
                    <BsFillPersonFill className='me-2' /><strong>ข้อมูลผู้ใช้</strong>
                  </a>
                </div>
              </ListGroup.Item>
            )}

            {role === 1 ? (
              <ListGroup.Item>
                <div className='my-3'>
                  <div className='mb-4'>
                    <a
                      className="nav-link" aria-current="page"
                      aria-controls="collapse-common-fee"
                      aria-expanded={openCommonFee}
                      onClick={() => setOpenCommonFee(!openCommonFee)}
                      style={{ cursor: 'pointer' }}>
                      <div className='row'>
                        <div className='col-md-6'>
                          <BsReceiptCutoff className='me-2' />ค่าส่วนกลาง
                        </div>

                        {openCommonFee !== true ? (
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
                    <Collapse in={openCommonFee}>
                      <div className='mb-3' id="collapse-common-fee">
                        <a className="nav-link mx-4 mt-3" aria-current="page" onClick={() => router.push('/common_fee/admin/notify')} style={{ cursor: 'pointer' }}>แจ้งชำระค่าส่วนกลาง</a>
                        <a className="nav-link mx-4 mt-3" aria-current="page" onClick={() => router.push('/common_fee/admin/receive')} style={{ cursor: 'pointer' }}>รับเงินค่าส่วนกลาง</a>
                      </div>
                    </Collapse>
                    {/* --- */}

                  </div>
                </div>
              </ListGroup.Item>

            ) : role === 3 ? (
              <ListGroup.Item>
                <div className='my-3'>
                  <a className="nav-link" aria-current="page" onClick={() => router.push('/common_fee/user/notify')} style={{ cursor: 'pointer' }}>
                    <BsReceiptCutoff className='me-2' /><strong>ค่าส่วนกลาง</strong>
                  </a>
                </div>

              </ListGroup.Item>
            ) : null}

            {role === 1 ? (
              <ListGroup.Item>
                <div className='my-3'>
                  <a className="nav-link" aria-current="page" onClick={() => router.push('/common_fee/admin/record')} style={{ cursor: 'pointer' }}>
                    <BsReceiptCutoff className='me-2' /><strong>บันทึกค่าใช้จ่ายโครงการ</strong>
                  </a>
                </div>
              </ListGroup.Item>
            ) : (
              <div>

              </div>
            )}

            {role === 1 ? (
              <ListGroup.Item>
                <div className='my-3'>
                  <a className="nav-link" aria-current="page" onClick={() => router.push('/report_problem/admin')} style={{ cursor: 'pointer' }}>
                    <BsChatRightDotsFill className='me-2' /><strong>แจ้งปัญหา</strong>
                  </a>
                </div>
              </ListGroup.Item>
            ) : role === 2 || role === 3 ? (
              <ListGroup.Item>
                <div className='my-3'>
                  <a className="nav-link" aria-current="page" onClick={() => router.push('/report_problem/user')} style={{ cursor: 'pointer' }}>
                    <BsChatRightDotsFill className='me-2' /><strong>แจ้งปัญหา</strong>
                  </a>
                </div>
              </ListGroup.Item>
            ) : null}

            {role === 1 && (
              <ListGroup.Item>
                <div className='my-3'>
                  <a className="nav-link" aria-current="page" onClick={() => router.push('/report')} style={{ cursor: 'pointer' }}>
                    <BsFileEarmarkBarGraphFill className='me-2' /><strong>รายงาน</strong>
                  </a>
                </div>
              </ListGroup.Item>
            )}

          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default SideBar;