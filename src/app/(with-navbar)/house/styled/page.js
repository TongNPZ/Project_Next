'use client'
import React, { useEffect, useState } from 'react';
import GetRequest from '@/app/ConfigAPI';
import { API_HOUSE_STYLE } from '../../../../../api';
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
    BsFillHouseUpFill,
    BsBadge3DFill
} from "react-icons/bs";

export default function HouseZone() {

    // fecth //
    const [showData, setShowData] = useState([]);

    const fecthHouseStyle = async () => {
        try {
            const result = await GetRequest(API_HOUSE_STYLE, 'GET', null);
            setShowData(result.data);
        } catch (error) {
            console.log('error', error);
        }
    }

    useEffect(() => {
        fecthHouseStyle();
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
    const renderTooltip3D = (props) => (
        <Tooltip {...props}>
            ดูบ้าน 3 มิติ
        </Tooltip>
    );

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
        <>
            {/* modal */}
            <ModalAdd show={showAdd} handleClose={handleAddClose} />
            <ModalEdit show={showEdit} handleClose={handleEditClose} id={selectedId} />
            {/* --- */}

            <Card>
                <Card.Header>

                    <div className='row'>
                        <div className='col-md-6 d-flex align-items-center'>
                            <h5>ตารางข้อมูลแบบบ้าน</h5>
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
                        <Table bordered hover>
                            <thead>
                                <tr>
                                    <th>รหัสแบบบ้าน</th>
                                    <th>ชื่อแบบบ้าน</th>
                                    <th>ขนาดพื้นที่ใช้สอยเริ่มต้น</th>
                                    <th>ขนาดพื้นที่ดินเบื้องต้นเริ่มต้น</th>
                                    <th>รูปภาพบ้าน 3 มิติ</th>
                                    <th>โซนบ้าน</th>
                                    <th>สถานะ</th>
                                    <th>การจัดการ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {showData.map((data) => (
                                    <tr key={data.hs_id}>
                                        <td>{data.hs_id}</td>
                                        <td>{data.house_name}</td>
                                        <td>{data.hsUsable_space}</td>
                                        <td>{data.hsLand_space}</td>
                                        <td>
                                            <OverlayTrigger overlay={renderTooltip3D}>
                                                <a href={data.image3d} target="_blank" rel="noreferrer">
                                                    <BsBadge3DFill style={{ fontSize: '24px' }} />
                                                </a>
                                            </OverlayTrigger>
                                        </td>
                                        <td>{data.name}</td>
                                        {data.status === 1 ? (
                                            <td>
                                                <Badge bg="success">เปิดใช้งานแบบบ้าน</Badge>
                                            </td>
                                        ) : (
                                            <td>
                                                <Badge bg="danger">ปิดใช้งานแบบบ้าน</Badge>
                                            </td>
                                        )}

                                        {data.status !== 0 ? (
                                            <td>
                                                <OverlayTrigger overlay={renderTooltipEdit}>
                                                    <a href='#' onClick={() => handleEditShow(data.hz_id)} >
                                                        <BsPencilSquare className='me-2 text-warning' style={{ fontSize: '24px' }} />
                                                    </a>
                                                </OverlayTrigger>

                                                <OverlayTrigger overlay={renderTooltipClose}>
                                                    <a href='#' onClick={() => ChangedStatus(data.hz_id)} >
                                                        <BsFillHouseSlashFill className='text-danger' style={{ fontSize: '24px' }} />
                                                    </a>
                                                </OverlayTrigger>
                                            </td>
                                        ) : (
                                            <td>
                                                <OverlayTrigger overlay={renderTooltipOpen}>
                                                    <a href='#' onClick={() => ChangedStatus(data.hz_id)} >
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
        </>
    );
}