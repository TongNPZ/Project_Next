'use client'
import React, { useState, useEffect } from "react";
import ProtectRoute from "@/app/componnent/ProtectRoute/ProtectRoute";
import GetRequest from "@/app/ConfigAPI";
import { GET_API_DATA_USER } from "../../../../api";
import { useAuth } from '@/app/componnent/AuthContext/AuthContext';
import ModalEdit from "./ModalEdit";
import ChangePassword from "./ChangePassword";
import {
    Card,
    Image,
    ListGroup,
    Button,
    Tooltip,
    OverlayTrigger,
} from 'react-bootstrap';
export default function Profile() {
    const [showData, setShowData] = useState([]);
    const { authData, setAuthData } = useAuth();
    const id = authData.id;

    // fetch
    useEffect(() => {
        const fecthUsers = async () => {
            try {
                const result = await GetRequest(`${GET_API_DATA_USER}/${id}`, 'GET', null);
                setShowData(result);
                console.log(result)

            } catch (error) {
                console.log('error', error);
            }
        }
        fecthUsers();
    }, [showData]);
    // console.log(showData)
    // modal //
    const [selectedId, setSelectedId] = useState('');

    // show QR Code
    const [showChangePassword, setShowChangePassword] = useState(false);

    const handlePasswordClose = () => setShowChangePassword(false);
    const handlePasswordShow = (id) => {
        setSelectedId(id);
        setShowChangePassword(true);
    }

    // show edit
    const [showEdit, setShowEdit] = useState(false);

    const handleEditClose = () => setShowEdit(false);
    const handleEditShow = (id) => {
        setSelectedId(id);
        setShowEdit(true);
    }
    // --- //

    // tooltip
    const renderTooltipQRCode = (props) => (
        <Tooltip {...props}>
            ดู QR Code รับเงิน
        </Tooltip>
    );

    return (
        <ProtectRoute requireRoles={[1, 2, 3]}>
            {/* modal */}
            <ChangePassword show={showChangePassword} handleClose={handlePasswordClose} id={selectedId} />
            <ModalEdit show={showEdit} handleClose={handleEditClose} id={selectedId} />
            {/* --- */}

            <div className="row justify-content-center">
                {/* ---- */}
                <div className="col-md-6 ">
                    <Card>
                        <div className="ps-5 pe-5">
                            <div className="mt-3 me-2 text-end">
                                <Button variant="warning" onClick={() => handleEditShow(showData.user_id)}>แก้ไขข้อมูล</Button>
                            </div>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h5><b>ข้อมูลผู้ใช้</b></h5>
                                </ListGroup.Item>
                                <div className="ms-3 mt-3 mb-5">
                                    <div className='row'>
                                        <div className='col-md-2'>
                                            <p className="col-form-label"><strong>ชื่อ-นามสกุล</strong></p>
                                        </div>
                                        <div className='col-md-10'>
                                            <p className="col-form-label">{showData.user_name} {showData.user_lastname}</p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-2'>
                                            <p className="col-form-label"><strong>อายุ</strong></p>
                                        </div>
                                        <div className='col-md-10'>
                                            <p className="col-form-label">{showData.user_age}</p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-2'>
                                            <p className="col-form-label"><strong>สัญชาติ</strong></p>
                                        </div>
                                        <div className='col-md-10'>
                                            <p className="col-form-label">{showData.nationality}</p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-2'>
                                            <p className="col-form-label"><strong>ที่อยู่</strong></p>
                                        </div>
                                        <div className='col-md-10'>
                                            <p className="col-form-label">{showData.user_address}</p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-2'>
                                            <p className="col-form-label"><strong>สถานะ</strong></p>
                                        </div>
                                        <div className='col-md-10'>
                                            <p className="col-form-label">
                                                {showData.role === 1 && (
                                                    <Button variant="danger" style={{ borderRadius: '20px' }}>ผู้จัดการ</Button>
                                                )}
                                                {showData.role === 2 && (
                                                    <Button variant="secondary" style={{ borderRadius: '20px' }}> ลูกค้า </Button>
                                                )}
                                                {showData.role === 3 && (
                                                    <Button variant="primary" style={{ borderRadius: '20px' }}> ลูกบ้าน</Button>
                                                )}
                                            </p>
                                        </div>

                                    </div>
                                </div>

                                <ListGroup.Item>
                                    <h5><b>ข้อมูลติดต่อ</b></h5>
                                </ListGroup.Item>
                                <div className="ms-3 mt-3 mb-5">
                                    <div className='row'>
                                        <div className='col-md-2'>
                                            <p className="col-form-label"><strong>อีเมล</strong></p>
                                        </div>
                                        <div className='col-md-10'>
                                            <p className="col-form-label">{showData.user_email}</p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-2'>
                                            <p className="col-form-label"><strong>เบอร์โทร</strong></p>
                                        </div>
                                        <div className='col-md-10'>
                                            <p className="col-form-label">{showData.user_phone}</p>
                                        </div>
                                    </div>
                                </div>

                                <ListGroup.Item>
                                    <h5><b>รหัสผ่าน</b></h5>
                                    <small className="text-muted">กรุณาเก็บรักษารหัสผ่านของคุณอย่างปลอดภัย</small>
                                </ListGroup.Item>
                                <div className="ms-3 mt-3 mb-5">
                                    <div className='row'>
                                        <div className='col-md-2'>
                                            <p className="col-form-label"><strong>รหัสผ่าน</strong></p>
                                        </div>
                                        <div className='col-md-10' style={{ display: 'flex', alignItems: 'center' }}>
                                            <p className="col-form-label" style={{ WebkitTextSecurity: 'disc', margin: '0 10px 0 0' }}>
                                                {showData && showData.user_password && showData.user_password.slice(0, 10)}
                                            </p>
                                            <a
                                                onClick={() => handlePasswordShow(showData.user_id)}
                                                style={{
                                                    textDecoration: 'underline', // เพิ่มเส้นใต้
                                                    color: 'blue', // เปลี่ยนสีข้อความ
                                                    cursor: 'pointer', // เปลี่ยน cursor เป็นรูปแบบของ pointer เมื่อเม้าส์วาง
                                                    transition: 'color 0.3s' // เพิ่มการเปลี่ยนแปลงสีด้วย transition
                                                }}
                                                onMouseEnter={(e) => e.target.style.color = 'lightblue'} // เมื่อเม้าส์เข้าสู่ลิงก์
                                                onMouseLeave={(e) => e.target.style.color = 'blue'} // เมื่อเม้าส์ออกจากลิงก์
                                            >
                                                เปลี่ยนรหัสผ่าน
                                            </a>
                                        </div>

                                    </div>
                                </div>
                            </ListGroup>
                        </div>
                    </Card>
                </div>
            </div>



        </ProtectRoute>
    )
}