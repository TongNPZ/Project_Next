'use client'
import React, { useEffect, useState } from 'react';
import { DateTimeFormat } from '@/app/Format';
import GetRequest from '@/app/ConfigAPI';
import { API_URL } from '../../../../../app'
import { API_TRANSFER } from '../../../../../api';
import ModalDetail from './ModalDetail';
import ModalEdit from './ModalEdit'
import ConfirmStatus from './ConfirmStatus';
import CancelStatus from './CancelStatus';
import UploadFile from './UploadFile';
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
    BsFillXSquareFill,
    BsFillInfoCircleFill,
    BsBoxArrowUp,
    BsDownload,
    BsReceipt,
    BsCheckSquareFill
} from "react-icons/bs";

export default function Transfer() {

    // fecth //
    const [showData, setShowData] = useState([]);

    const fecthTransfer = async () => {
        try {
            const result = await GetRequest(API_TRANSFER, 'GET', null);
            setShowData(result.data);
        } catch (error) {
            console.log('error', error);
        }
    }

    useEffect(() => {
        fecthTransfer();
    }, [showData]);
    // --- //

    // function //
    const [uploadedFile, setUploadedFile] = useState(null);

    useEffect(() => {
        return () => {
            setUploadedFile(null);
        };
    }, [uploadedFile]);
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
            อัพโหลดเอกสารใบเสร็จ
        </Tooltip>
    );

    const renderTooltipChangedUpload = (props) => (
        <Tooltip {...props}>
            เปลี่ยนเอกสารสัญญา
        </Tooltip>
    );

    const renderTooltipDownload = (props) => (
        <Tooltip {...props}>
            ดาวน์โหลดเอกสารใบเสร็จ
        </Tooltip>
    );

    const renderTooltipReceipt = (props) => (
        <Tooltip {...props}>
            แสดงเอกสารใบเสร็จ
        </Tooltip>
    );

    const renderTooltipEdit = (props) => (
        <Tooltip {...props}>
            แก้ไขข้อมูล
        </Tooltip>
    );

    const renderTooltipConfirm = (props) => (
        <Tooltip {...props}>
            โอนกรรมสิทธิ์
        </Tooltip>
    );

    const renderTooltipClose = (props) => (
        <Tooltip {...props}>
            ยกเลิกโอนกรรมสิทธิ์
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
                            <h5>ตารางข้อมูลโอนกรรมสิทธิ์</h5>
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
                                    <th>ชื่อผู้รับโอน</th>
                                    <th>จำนวนเงินส่วนที่เหลือ</th>
                                    <th>วันที่บันทึกข้อมูล</th>
                                    <th>วันที่โอนกรรมสิทธิ์</th>
                                    <th>หมายเหตุ</th>
                                    <th>รายละเอียด</th>
                                    <th>สถานะ</th>
                                    <th>เอกสาร</th>
                                    <th>การจัดการ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {showData && showData.length > 0 ? (
                                    showData.map((data) => (
                                        <tr key={data.b_id}>
                                            <td>{data.b_id}</td>
                                            <td>{data.trans_name}</td>
                                            <td>{data.trans_amount.toLocaleString()}</td>
                                            <td>{DateTimeFormat(data.trans_record)}</td>

                                            {data.trans_date ? (
                                                <td>{DateTimeFormat(data.trans_date)}</td>
                                            ) : (
                                                <td>
                                                    <p className='text-danger'>ไม่มีการโอนกรรมสิทธิ์</p>
                                                </td>
                                            )}

                                            <td>{data.trans_note}</td>
                                            <td>
                                                <OverlayTrigger overlay={renderTooltipDetail}>
                                                    <a onClick={() => handleDetailShow(data.b_id)} style={{ cursor: 'pointer' }}>
                                                        <BsFillInfoCircleFill className='text-primary' style={{ fontSize: '28px' }} />
                                                    </a>
                                                </OverlayTrigger>
                                            </td>

                                            {data.trans_status === 1 ? (
                                                <td>
                                                    <Badge bg="info">กำลังดำเนินการ</Badge>
                                                </td>
                                            ) : data.trans_status === 2 ? (
                                                <td>
                                                    <Badge bg="success">โอนกรรมสิทธิ์สำเร็จ</Badge>
                                                </td>
                                            ) : (
                                                <td>
                                                    <Badge bg="danger">ยกเลิกโอนกรรมสิทธิ์</Badge>
                                                </td>
                                            )}

                                            {data.trans_status === 1 ? (
                                                <td>

                                                    {data.trans_receipt === null || data.trans_receipt === '' ? (
                                                        <OverlayTrigger overlay={renderTooltipDownload}>
                                                            <a href={`/buy/document/receipt/transfer/${data.b_id}`} target="_blank" style={{ cursor: 'pointer' }}>
                                                                <BsDownload className='me-2 text-primary' style={{ fontSize: '28px' }} />
                                                            </a>
                                                        </OverlayTrigger>
                                                    ) : (
                                                        <OverlayTrigger overlay={renderTooltipReceipt}>
                                                            <a href={`${API_URL}${data.trans_receipt}`} target="_blank" style={{ cursor: 'pointer' }}>
                                                                <BsReceipt className='mb-2 text-primary' style={{ fontSize: '28px' }} />
                                                            </a>
                                                        </OverlayTrigger>
                                                    )}

                                                </td>
                                            ) : data.trans_status !== 0 ? (
                                                <td>
                                                    <OverlayTrigger overlay={renderTooltipReceipt}>
                                                        <a href={`${API_URL}${data.trans_receipt}`} target="_blank" style={{ cursor: 'pointer' }}>
                                                            <BsReceipt className='mb-2 text-primary' style={{ fontSize: '28px' }} />
                                                        </a>
                                                    </OverlayTrigger>
                                                </td>
                                            ) : (
                                                <td>
                                                    {/* null */}
                                                </td>
                                            )}

                                            {data.trans_status === 1 ? (
                                                <td>
                                                    {data.trans_receipt === null || data.trans_receipt === '' ? (
                                                        <OverlayTrigger overlay={renderTooltipUpload}>
                                                            <label htmlFor={`fileInput-receipt-${data.b_id}`} style={{ cursor: 'pointer' }}>
                                                                <input
                                                                    id={`fileInput-receipt-${data.b_id}`}
                                                                    type="file"
                                                                    style={{ display: 'none' }}
                                                                    value={uploadedFile ? uploadedFile.file : ''}
                                                                    onChange={(e) => {
                                                                        if (e.target.files.length > 0) {
                                                                            UploadFile(data.b_id, e.target.files[0]);
                                                                        }
                                                                    }}
                                                                />
                                                                <BsBoxArrowUp className='me-2 mb-2 text-secondary' style={{ fontSize: '24px' }} />
                                                            </label>
                                                        </OverlayTrigger>
                                                    ) : (
                                                        <OverlayTrigger overlay={renderTooltipChangedUpload}>
                                                            <label htmlFor={`fileInput-receipt-${data.b_id}`} style={{ cursor: 'pointer' }}>
                                                                <input
                                                                    id={`fileInput-receipt-${data.b_id}`}
                                                                    type="file"
                                                                    style={{ display: 'none' }}
                                                                    value={uploadedFile ? uploadedFile.file : ''}
                                                                    onChange={(e) => {
                                                                        if (e.target.files.length > 0) {
                                                                            UploadFile(data.b_id, e.target.files[0]);
                                                                        }
                                                                    }}
                                                                />
                                                                <BsBoxArrowUp className='me-2 mb-2 text-warning' style={{ fontSize: '28px' }} />
                                                            </label>
                                                        </OverlayTrigger>
                                                    )}

                                                    {data.trans_receipt === null || data.trans_receipt === '' ? (
                                                        <>
                                                            <OverlayTrigger overlay={renderTooltipEdit}>
                                                                <a onClick={() => handleEditShow(data.b_id)} style={{ cursor: 'pointer' }}>
                                                                    <BsPencilSquare className='me-2 mb-2 text-warning' style={{ fontSize: '24px' }} />
                                                                </a>
                                                            </OverlayTrigger>
                                                            <OverlayTrigger overlay={renderTooltipClose}>
                                                                <a onClick={() => CancelStatus(data.b_id)} style={{ cursor: 'pointer' }}>
                                                                    <BsFillXSquareFill className='mb-2 text-danger' style={{ fontSize: '24px' }} />
                                                                </a>
                                                            </OverlayTrigger>
                                                        </>
                                                    ) : (
                                                        <OverlayTrigger overlay={renderTooltipConfirm}>
                                                            <a onClick={() => ConfirmStatus(data.b_id)} style={{ cursor: 'pointer' }}>
                                                                <BsCheckSquareFill className='me-2 mb-2 text-success' style={{ fontSize: '24px' }} />
                                                            </a>
                                                        </OverlayTrigger>
                                                    )}
                                                </td>
                                            ) : (
                                                <td>
                                                    {/* null */}
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
            </Card >
        </>
    );
}