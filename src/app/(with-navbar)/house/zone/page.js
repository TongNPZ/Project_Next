'use client'
import React, { useEffect, useState } from 'react';
import ProtectRoute from '@/app/componnent/ProtectRoute/ProtectRoute';
import GetRequest from '@/app/ConfigAPI';
import { API_HOUSE_ZONE } from '../../../../../api';
import ModalAdd from './ModalAdd'
import ModalEdit from './ModalEdit'
import ChangedStatus from './ChangedStatus';
import {
    Table,
    Card,
    Button,
    Form,
    Badge,
    OverlayTrigger,
    Tooltip
} from 'react-bootstrap';
import {
    BsPencilSquare,
    BsFillHouseSlashFill,
    BsFillHouseAddFill,
    BsFillHouseUpFill
} from "react-icons/bs";

export default function HouseZone() {

    // fecth //
    const [showData, setShowData] = useState([]);

    const fecthHouseZone = async () => {
        try {
            const result = await GetRequest(API_HOUSE_ZONE, 'GET', null);
            setShowData(result.data);
        } catch (error) {
            console.log('error', error);
        }
    }

    useEffect(() => {
        fecthHouseZone();
    }, [showData]);
    // --- //

    // modal add //
    const [showAdd, setShowAdd] = useState(false);

    const handleAddClose = () => setShowAdd(false);
    const handleAddShow = () => setShowAdd(true);
    // --- //

    // modal edit //
    const [selectedId, setSelectedId] = useState('');
    const [showEdit, setShowEdit] = useState(false);

    const handleEditClose = () => setShowEdit(false);
    const handleEditShow = (id) => {
        setSelectedId(id);
        setShowEdit(true);
    }
    // --- //

    // tooltip //
    const renderTooltipEdit = (props) => (
        <Tooltip {...props}>
            แก้ไขข้อมูล
        </Tooltip>
    );

    const renderTooltipOpen = (props) => (
        <Tooltip {...props}>
            เปิดการใช้งานโซน
        </Tooltip>
    );

    const renderTooltipClose = (props) => (
        <Tooltip {...props}>
            ปิดการใช้งานโซน
        </Tooltip>
    );
    // --- //

    return (
        <ProtectRoute requireRoles={[1]}>

            {/* modal */}
            <ModalAdd show={showAdd} handleClose={handleAddClose} />
            <ModalEdit show={showEdit} handleClose={handleEditClose} id={selectedId} />
            {/* --- */}

            <Card>
                <Card.Header>

                    <div className='row'>
                        <div className='col-md-6 d-flex align-items-center'>
                            <h5>ตารางข้อมูลโซนบ้าน (Zone)</h5>
                        </div>
                        <div className='col-md-6 text-md-end'>
                            <Button variant="success" onClick={handleAddShow}>
                                <BsFillHouseAddFill style={{ fontSize: '24px' }} />
                            </Button>
                        </div>
                    </div>
                </Card.Header>
                <Card.Body>
                    <div className='row'>
                        <div className='col-md-8' />
                        <div className='col-md-4 text-md-end mb-3'>
                            <Form.Control
                                type="search"
                                placeholder="ค้นหา"
                            />
                        </div>
                    </div>
                    <div>
                        <Table bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>รหัสโซน</th>
                                    <th>ชื่อโซน</th>
                                    <th>ขนาดพื้นที่ดินเริ่มต้น (ตารางวา)</th>
                                    <th>ราคาบ้านต่อที่ดิน (ตารางวา)</th>
                                    <th>สถานะ</th>
                                    <th>การจัดการ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {showData.map((data) => (
                                    <tr key={data.hz_id}>
                                        <td>{data.hz_id}</td>
                                        <td>{data.name}</td>
                                        <td>{data.land_space.toLocaleString()}</td>
                                        <td>{data.land_price.toLocaleString()}</td>

                                        {data.hz_status === 1 ? (
                                            <td>
                                                <Badge bg="success">โซนเปิดใช้งาน</Badge>
                                            </td>
                                        ) : (
                                            <td>
                                                <Badge bg="danger">โซนปิดใช้งาน</Badge>
                                            </td>
                                        )}

                                        {data.hz_status !== 0 ? (
                                            <td>
                                                <OverlayTrigger overlay={renderTooltipEdit}>
                                                    <a onClick={() => handleEditShow(data.hz_id)} style={{ cursor: 'pointer' }}>
                                                        <BsPencilSquare className='me-2 text-warning' style={{ fontSize: '24px' }} />
                                                    </a>
                                                </OverlayTrigger>

                                                <OverlayTrigger overlay={renderTooltipClose}>
                                                    <a onClick={() => ChangedStatus(data.hz_id)} style={{ cursor: 'pointer' }}>
                                                        <BsFillHouseSlashFill className='text-danger' style={{ fontSize: '24px' }} />
                                                    </a>
                                                </OverlayTrigger>
                                            </td>
                                        ) : (
                                            <td>
                                                <OverlayTrigger overlay={renderTooltipOpen}>
                                                    <a onClick={() => ChangedStatus(data.hz_id)} style={{ cursor: 'pointer' }}>
                                                        <BsFillHouseUpFill className='text-success' style={{ fontSize: '24px' }} />
                                                    </a>
                                                </OverlayTrigger>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Card.Body>
            </Card>
        </ProtectRoute>
    );
}