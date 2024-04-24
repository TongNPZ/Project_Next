"use client"
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useRouter } from 'next/navigation';
import { GiHamburgerMenu } from "react-icons/gi";


function SideBar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const router = useRouter();

  return (
    <>
      <GiHamburgerMenu
        onClick={handleShow}
        style={{ fontSize: '30px' }}
      />
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>พวงเพรช</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <a className="nav-link mx-4" aria-current="page" onClick={() => router.push('/')}>หน้าหลัก</a>
          <br />
          <a className="nav-link mx-4" aria-current="page" onClick={() => router.push('/house/zone')}>โซนบ้าน</a>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default SideBar;