'use client'
import React, { useEffect, useState } from 'react';
import { DateFormat } from '@/app/Format';
import GetRequest from '@/app/ConfigAPI';
import { API_URL } from '../../../../../app'
import { API_BOOK } from '../../../../../api';
import ModalDetail from './ModalDetail';
import ModalEdit from './ModalEdit'
import ChangedStatus from './ChangedStatus';
import {
    Table,
    Card,
    Button,
    Form,
    Badge,
    OverlayTrigger,
    Tooltip,
} from 'react-bootstrap';
import {
    BsPencilSquare,
    BsFillHouseGearFill,
    BsFileEarmarkTextFill,
    BsFillXSquareFill,
    BsFillInfoCircleFill,
    BsBoxArrowUp,
    BsFileTextFill
} from "react-icons/bs";

export default function Book() {

    // fecth //
    const [showData, setShowData] = useState([]);

    const fecthBook = async () => {
        try {
            const result = await GetRequest(API_BOOK, 'GET', null);
            setShowData(result.data);
        } catch (error) {
            console.log('error', error);
        }
    }

    useEffect(() => {
        fecthBook();
    }, [showData]);
    // --- //

    // modal //
    const [selectedId, setSelectedId] = useState('');

    // +++ modal detail +++ //
    const [showDetail, setShowDetail] = useState(false);

    const handleDetailClose = () => setShowDetail(false);
    const handleDetailShow = (id) => {
        setSelectedId(id);
        setShowDetail(true);
    }
    // +++ //

    // +++ modal edit +++ //
    const [showEdit, setShowEdit] = useState(false);

    const handleEditClose = () => setShowEdit(false);
    const handleEditShow = (id) => {
        setSelectedId(id);
        setShowEdit(true);
    }
    // +++ //

    // --- //

    // tooltip //
    const renderTooltipDetail = (props) => (
        <Tooltip {...props}>
            ดูรายละเอียด
        </Tooltip>
    );

    const renderTooltipUpload = (props) => (
        <Tooltip {...props}>
            อัพโหลดไฟล์เอกสารใบเสร็จ
        </Tooltip>
    );

    const renderTooltipReceipt = (props) => (
        <Tooltip {...props}>
            แสดงเอกสารใบเสร็จ
        </Tooltip>
    );

    const renderTooltipContract = (props) => (
        <Tooltip {...props}>
            ทำสัญญา
        </Tooltip>
    );

    const renderTooltipEdit = (props) => (
        <Tooltip {...props}>
            แก้ไขข้อมูล
        </Tooltip>
    );

    const renderTooltipClose = (props) => (
        <Tooltip {...props}>
            ยกเลิกจอง
        </Tooltip>
    );
    // --- //

    return (
        <>
            {/* modal */}
            <ModalEdit show={showEdit} handleClose={handleEditClose} id={selectedId} />
            <ModalDetail show={showDetail} handleClose={handleDetailClose} id={selectedId} />
            {/* --- */}

            <Card>
                <Card.Header>

                    <div className='row'>
                        <div className='col-md-6 d-flex align-items-center'>
                            <h5>ตารางข้อมูลจองบ้าน</h5>
                        </div>
                        <div className='col-md-6 text-md-end'>
                            <Button href='/house' variant="success">
                                <BsFillHouseGearFill style={{
                                    fontSize: '24px',
                                    marginRight: '5px'
                                }} /> จัดการข้อมูลบ้าน
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
                                    <th>รหัสจอง</th>
                                    <th>บ้านเลขที่</th>
                                    <th>ชื่อผู้จอง</th>
                                    <th>จำนวนเงินจอง</th>
                                    <th>วันที่จอง</th>
                                    <th>หมายเหตุ</th>
                                    <th>รายละเอียด</th>
                                    <th>เอกสาร</th>
                                    <th>สถานะ</th>
                                    <th>การจัดการ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {showData && showData.length > 0 ? (
                                    showData.map((data) => (
                                        <tr key={data.b_id}>
                                            <td>{data.b_id}</td>
                                            <td>{data.house_no}</td>
                                            <td>{data.user_name} {data.user_lastname}</td>
                                            <td>{data.b_amount.toLocaleString()}</td>
                                            <td>{DateFormat(data.b_date)}</td>
                                            <td>{data.b_note}</td>
                                            <td>
                                                <OverlayTrigger overlay={renderTooltipDetail}>
                                                    <a onClick={() => handleDetailShow(data.b_id)} style={{ cursor: 'pointer' }}>
                                                        <BsFillInfoCircleFill className='text-primary' style={{ fontSize: '28px' }} />
                                                    </a>
                                                </OverlayTrigger>
                                            </td>

                                            {data.b_receipt === null ? (
                                                <td>
                                                    <OverlayTrigger overlay={renderTooltipUpload}>
                                                        <label htmlFor="fileInput" style={{ cursor: 'pointer' }}>
                                                            <BsBoxArrowUp className='text-dark' style={{ fontSize: '28px' }} />
                                                        </label>
                                                    </OverlayTrigger>
                                                    <input id="fileInput" type="file" style={{ display: 'none' }} />
                                                </td>
                                            ) : (
                                                <td>
                                                    <OverlayTrigger overlay={renderTooltipReceipt}>
                                                        <a href={`${API_URL}${data.b_receipt}`} target="_blank" download style={{ cursor: 'pointer' }}>
                                                            <BsFileEarmarkTextFill className='me-2 text-primary' style={{ fontSize: '28px' }} />
                                                        </a>
                                                    </OverlayTrigger>
                                                    <OverlayTrigger overlay={renderTooltipContract}>
                                                        <a onClick={() => handleEditShow(data.b_id)} style={{ cursor: 'pointer' }}>
                                                            <BsFileTextFill className='me-2 text-dark' style={{ fontSize: '28px' }} />
                                                        </a>
                                                    </OverlayTrigger>
                                                </td>
                                            )}

                                            {data.b_status === 1 ? (
                                                <td>
                                                    <Badge bg="info">กำลังดำเนินการ</Badge>
                                                </td>
                                            ) : data.b_status === 2 ? (
                                                <td>
                                                    <Badge bg="success">จองสำเร็จ</Badge>
                                                </td>
                                            ) : (
                                                <td>
                                                    <Badge bg="danger">ยกเลิกจอง</Badge>
                                                </td>
                                            )}

                                            {data.b_status === 1 && data.b_receipt === null ? (
                                                <td>
                                                    <OverlayTrigger overlay={renderTooltipEdit}>
                                                        <a onClick={() => handleEditShow(data.b_id)} style={{ cursor: 'pointer' }}>
                                                            <BsPencilSquare className='me-2 text-warning' style={{ fontSize: '24px' }} />
                                                        </a>
                                                    </OverlayTrigger>
                                                    <OverlayTrigger overlay={renderTooltipClose}>
                                                        <a onClick={() => ChangedStatus(data.h_id)} style={{ cursor: 'pointer' }}>
                                                            <BsFillXSquareFill className='text-danger' style={{ fontSize: '24px' }} />
                                                        </a>
                                                    </OverlayTrigger>
                                                </td>
                                            ) : (
                                                <td>
                                                    <OverlayTrigger overlay={renderTooltipEdit}>
                                                        <a onClick={() => handleEditShow(data.b_id)} style={{ cursor: 'pointer' }}>
                                                            <BsPencilSquare className='me-2 text-warning' style={{ fontSize: '24px' }} />
                                                        </a>
                                                    </OverlayTrigger>
                                                </td>
                                            )}
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="12" className="text-center">
                                            <h4 className='mt-5 mb-5'>
                                                ไม่มีข้อมูลที่แสดง
                                            </h4>
                                        </td>
                                    </tr>
                                )}

                            </tbody>
                        </Table>
                    </div>
                </Card.Body>
            </Card>
        </>
    );
}