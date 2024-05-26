'use client'
import React, { useState, useEffect } from "react";
import ProtectRoute from "@/app/componnent/ProtectRoute/ProtectRoute";
import GetRequest from "@/app/ConfigAPI";
import { API_USER_HOUSE } from "../../../../api";
import { API_URL } from '../../../../app';
import { useAuth } from '@/app/componnent/AuthContext/AuthContext';
import {
    Card,
    ListGroup,
    Button,
    Tooltip,
    OverlayTrigger,
    ProgressBar,
    Nav,
    Badge,
    Image
} from 'react-bootstrap';
import ProgressBarDetail from "../../componnent/ProgressBar/ProgressBarDetail";

export default function Profile() {
    const [showData, setShowData] = useState([]);
    const { authData, setAuthData } = useAuth();
    const id = authData.id;
    const [selectedId, setSelectedId] = useState(null);
    const [selectedItemData, setSelectedItemData] = useState(null);

    // fetch
    useEffect(() => {
        const fecthUsers = async () => {
            try {
                const result = await GetRequest(`${API_USER_HOUSE}/${id}`, 'GET', null);
                setShowData(result);
                console.log(result)

            } catch (error) {
                console.log('error', error);
            }
        }
        fecthUsers();
    }, []);
    // console.log(showData)

    // active key
    const [activeKey, setActiveKey] = useState('overdue');

    const handleSelect = (key) => {
        setActiveKey(key);
    };

    const [showDetail, setShowDetail] = useState(false);

    const handleDetailClose = () => setShowDetail(false);
    const handleDetailShow = (id) => {
        setSelectedId(id);
        // console.log(selectedItemData.trans_status)
        // console.log(selectedItemData.con_status)
        // หาข้อมูลบ้านที่ถูกกดจาก showData
        const selectedItem = showData.data.find(item => item.h_id === id);
        setSelectedItemData(selectedItem);
        setShowDetail(true);
    }
    useEffect(() => {
        setActiveKey('all');
    }, []);

    return (
        <ProtectRoute requireRoles={[2, 3]}>
            <ProgressBarDetail show={showDetail} handleClose={handleDetailClose} id={selectedId} selectedItemData={selectedItemData} />
            <div className="row justify-content-center">
                {/* ---- */}
                <div className="col-md-12 ">
                    <Card >
                        <Card.Header className="pt-4">
                            <Nav className="justify-content-center" variant="tabs" activeKey={activeKey} onSelect={handleSelect}>
                                <Nav.Item>
                                    <Nav.Link eventKey='all'>ทั้งหมด</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey='inprogress'>ที่กำลังดำเนินการ</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey='finish'>เสร็จสิ้น</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey='cancel'>ยกเลิก</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Card.Header>
                        <Card.Body>
                            <div className="ps-5 pe-5">
                                <ListGroup className="mb-2">
                                    {showData.data && showData.data.map(item => (
                                        (activeKey === 'all' && (showData.data)) ||
                                            (activeKey === 'inprogress' && (item.h_status === 2 || item.h_status === 3 || item.h_status === 4)) ||
                                            (activeKey === 'finish' && item.h_status === 5) ||
                                            (activeKey === 'cancel' && (item.b_status === 0 || item.trans_status === 0 || item.con_status === 0)) ? (
                                            <div className="">
                                                <ListGroup.Item key={item.h_id} action onClick={() => handleDetailShow(item.h_id)} className="hover-card">
                                                    <div className="row">
                                                        <div className="col-md-2">
                                                            <Image src={`${API_URL}${item.image}`} style={{ width: '100%', height: 'auto' }} />
                                                        </div>
                                                        <div className="col-md-10">
                                                            <p> {item.house_name}</p>
                                                            <p className="text-muted">บ้านเลขที่ {item.house_no} เลขโฉนดที่ดิน {item.num_deed} เลขที่หน้าสำรวจ {item.num_survey}</p>
                                                            <p className="text-muted"> ขนาดพื้นที่ใช้สอย {item.usable_space} ตารางเมตร</p>
                                                            <p className="text-muted "> ขนาดที่ดิน {item.hLand_space} ตารางวา&nbsp;&nbsp;&nbsp;

                                                                {item.b_status === 0 || item.trans_status === 0 || item.con_status === 0 ? (
                                                                    <Button variant="danger" style={{ borderRadius: '20px' }}> ยกเลิก </Button>
                                                                ) : (
                                                                    <>
                                                                        {item.h_status === 2 && (
                                                                            <Button variant="primary" style={{ borderRadius: '20px' }}> กำลังจอง </Button>
                                                                        )}
                                                                        {item.h_status === 3 && (
                                                                            <Button variant="primary" style={{ borderRadius: '20px' }}> กำลังทำสัญญา </Button>
                                                                        )}
                                                                        {item.h_status === 4 && (
                                                                            <Button variant="primary" style={{ borderRadius: '20px' }}> กำลังโอนกรรมสิทธิ์ </Button>
                                                                        )}
                                                                        {item.h_status === 5 && (
                                                                            <Button variant="success" style={{ borderRadius: '20px' }}> สำเร็จ </Button>
                                                                        )}
                                                                    </>
                                                                )}

                                                            </p>
                                                        </div>
                                                        <p className="text-end">ราคา {item.house_price.toLocaleString()} บาท</p>
                                                    </div>
                                                </ListGroup.Item>
                                                <br />
                                            </div>
                                        ) : null
                                    ))}
                                </ListGroup>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </ProtectRoute>
    )
}