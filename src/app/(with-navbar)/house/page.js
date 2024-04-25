'use client'
import React, { useEffect, useState } from 'react';
import GetRequest from '@/app/ConfigAPI';
import { API_HOUSE } from './../../../../api';
import ModalAdd from './ModalAdd'
import ModalEdit from './ModalEdit'
import ModalImage from './ModalImage';
import ChangedStatus from './ChangedStatus';
import {
    Table,
    Card,
    Button,
    Form,
    Badge,
    OverlayTrigger,
    Tooltip,
    Image
} from 'react-bootstrap';
import {
    BsPencilSquare,
    BsFillHouseSlashFill,
    BsFillHouseAddFill,
    BsFillHouseUpFill,
    BsBadge3DFill,
    BsCardImage
} from "react-icons/bs";

export default function HouseZone() {

    // fecth //
    const [showData, setShowData] = useState([]);

    const fecthHouse = async () => {
        try {
            const result = await GetRequest(API_HOUSE, 'GET', null);
            setShowData(result.data);
        } catch (error) {
            console.log('error', error);
        }
    }

    useEffect(() => {
        fecthHouse();
    }, [showData]);
    // --- //

    // modal //
    const [selectedId, setSelectedId] = useState('');

    // +++ modal add +++ //
    const [showAdd, setShowAdd] = useState(false);

    const handleAddClose = () => setShowAdd(false);
    const handleAddShow = () => setShowAdd(true);

    // +++ modal edit +++ //
    const [showEdit, setShowEdit] = useState(false);

    const handleEditClose = () => setShowEdit(false);
    const handleEditShow = (id) => {
        setSelectedId(id);
        setShowEdit(true);
    }

    // +++ modal image +++ //
    const [showImage, setShowImage] = useState(false);

    const handleImageClose = () => setShowImage(false);
    const handleImageShow = (id) => {
        setSelectedId(id);
        setShowImage(true);
    }

    // --- //

    // tooltip //
    const renderTooltipImage = (props) => (
        <Tooltip {...props}>
            ดูภาพ
        </Tooltip>
    );

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
            เปิดการขายบ้าน
        </Tooltip>
    );

    const renderTooltipClose = (props) => (
        <Tooltip {...props}>
            ปิดการขายบ้าน
        </Tooltip>
    );
    // --- //

    return (
        <>
            {/* modal */}
            <ModalAdd show={showAdd} handleClose={handleAddClose} />
            <ModalEdit show={showEdit} handleClose={handleEditClose} id={selectedId} />
            <ModalImage show={showImage} handleClose={handleImageClose} id={selectedId} />
            {/* --- */}

            <Card>
                <Card.Header>

                    <div className='row'>
                        <div className='col-md-6 d-flex align-items-center'>
                            <h5>ตารางข้อมูลบ้าน</h5>
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
                                    <th>รหัสบ้าน</th>
                                    <th>บ้านเลขที่</th>
                                    <th>ชื่อแบบบ้าน</th>
                                    <th>เลขที่โฉนดที่ดิน</th>
                                    <th>เลขที่หน้าสำรวจ</th>
                                    <th>
                                        ขนาดพื้นที่ใช้สอย <br />
                                        (ตารางเมตร)
                                    </th>
                                    <th>
                                        ขนาดพื้นที่ดิน <br />
                                        (ตารางวา)
                                    </th>
                                    <th>ราคาขายบ้าน</th>
                                    <th>ราคาบ้านพร้อมที่ดิน</th>
                                    <th>หมายเหตุ</th>
                                    <th>รูปภาพบ้าน</th>
                                    <th>ภาพบ้าน 3 มิติ</th>
                                    <th>สถานะ</th>
                                    <th>การจัดการ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {showData.map((data) => (
                                    <tr key={data.h_id}>
                                        <td>{data.h_id}</td>
                                        <td>{data.house_no}</td>
                                        <td>{data.house_name}</td>
                                        <td>{data.num_deed}</td>
                                        <td>{data.num_survey}</td>
                                        <td>{data.hUsable_space.toLocaleString()}</td>
                                        <td>{data.hLand_space.toLocaleString()}</td>
                                        <td>{data.houseSale_price.toLocaleString()}</td>
                                        <td>{data.price.toLocaleString()}</td>
                                        <td>{data.note}</td>
                                        <td>
                                            <OverlayTrigger overlay={renderTooltipImage}>
                                                <a onClick={() => handleImageShow(data.h_id)} style={{ cursor: 'pointer' }}>
                                                    <BsCardImage className='text-primary' style={{ fontSize: '28px' }} />
                                                </a>
                                            </OverlayTrigger>
                                        </td>
                                        <td>
                                            <OverlayTrigger overlay={renderTooltip3D}>
                                                <a href={data.image3d_edit} target="_blank" rel="noreferrer">
                                                    <BsBadge3DFill style={{ fontSize: '28px' }} />
                                                </a>
                                            </OverlayTrigger>
                                        </td>

                                        {data.h_status === 1 ? (
                                            <td>
                                                <Badge bg="success">กำลังขาย</Badge>
                                            </td>
                                        ) : data.h_status === 2 ? (
                                            <td>
                                                <Badge bg="warning">จองแล้ว</Badge>
                                            </td>
                                        ) : data.h_status === 3 ? (
                                            <td>
                                                <Badge bg="info">ทำสัญญาแล้ว</Badge>
                                            </td>
                                        ) : data.h_status === 4 ? (
                                            <td>
                                                <Badge bg="secondary">ขายแล้ว</Badge>
                                            </td>
                                        ) : (
                                            <td>
                                                <Badge bg="danger">ยกเลิกขาย</Badge>
                                            </td>
                                        )}

                                        {data.h_status !== 0 ? (
                                            <td>
                                                <OverlayTrigger overlay={renderTooltipEdit}>
                                                    <a onClick={() => handleEditShow(data.h_id)} style={{ cursor: 'pointer' }}>
                                                        <BsPencilSquare className='me-2 text-warning' style={{ fontSize: '24px' }} />
                                                    </a>
                                                </OverlayTrigger>

                                                <OverlayTrigger overlay={renderTooltipClose}>
                                                    <a onClick={() => ChangedStatus(data.hs_id)} style={{ cursor: 'pointer' }}>
                                                        <BsFillHouseSlashFill className='text-danger' style={{ fontSize: '24px' }} />
                                                    </a>
                                                </OverlayTrigger>
                                            </td>
                                        ) : (
                                            <td>
                                                <OverlayTrigger overlay={renderTooltipOpen}>
                                                    <a onClick={() => ChangedStatus(data.hs_id)} style={{ cursor: 'pointer' }}>
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