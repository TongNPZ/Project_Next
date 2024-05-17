'use client'
import React, { useEffect, useState } from 'react';
import { DateTimeFormat } from '@/app/Format';
import GetRequest from '@/app/ConfigAPI';
import { API_URL } from '../../../../../app'
import {
    API_CONTRACT,
    API_TRANSFER
} from '../../../../../api';
import ModalDetail from './ModalDetail';
import ModalEdit from './ModalEdit'
import ChangedStatus from './ChangedStatus';
import UploadFile from './UploadFile';
import ModalTransferAdd from '../transfer/ModalAdd';
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
    BsFileTextFill,
    BsFileEarmarkArrowUpFill,
    BsDownload,
    BsReceipt,
    BsFileEarmarkArrowDownFill,
    BsCaretRightFill
} from "react-icons/bs";

export default function Book() {

    // fecth //

    // + contract + //
    const [showData, setShowData] = useState([]);

    const fecthContract = async () => {
        try {
            const result = await GetRequest(API_CONTRACT, 'GET', null);
            setShowData(result.data);
        } catch (error) {
            console.log('error', error);
        }
    }

    useEffect(() => {
        fecthContract();
    }, [showData]);

    // + transfer + //
    const [showTransfer, setShowTransfer] = useState([]);

    const fecthTransfer = async () => {
        try {
            const result = await GetRequest(API_TRANSFER, 'GET', null);
            setShowTransfer(result.data);
        } catch (error) {
            console.log('error', error);
        }
    }

    useEffect(() => {
        fecthTransfer();
    }, [showTransfer]);

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

    // +++ modal add transfer +++ //
    const [showAddTransfer, setShowAddTransfer] = useState(false);

    const handleAddTransferClose = () => setShowAddTransfer(false);
    const handleAddTransferShow = (id) => {
        setSelectedId(id);
        setShowAddTransfer(true);
    }
    // +++ //

    // --- //

    // tooltip //
    const renderTooltipDetail = (props) => (
        <Tooltip {...props}>
            ดูรายละเอียด
        </Tooltip>
    );

    const renderTooltipUploadContract = (props) => (
        <Tooltip {...props}>
            อัพโหลดเอกสารสัญญา
        </Tooltip>
    );

    const renderTooltipUploadReceipt = (props) => (
        <Tooltip {...props}>
            อัพโหลดเอกสารใบเสร็จ
        </Tooltip>
    );

    const renderTooltipChangedContract = (props) => (
        <Tooltip {...props}>
            เปลี่ยนเอกสารสัญญา
        </Tooltip>
    );

    const renderTooltipChangedReceipt = (props) => (
        <Tooltip {...props}>
            เปลี่ยนเอกสารใบเสร็จ
        </Tooltip>
    );

    const renderTooltipDownloadContract = (props) => (
        <Tooltip {...props}>
            ดาวน์โหลดเอกสารสัญญา
        </Tooltip>
    );

    const renderTooltipDownloadReceipt = (props) => (
        <Tooltip {...props}>
            ดาวน์โหลดเอกสารใบเสร็จ
        </Tooltip>
    );

    const renderTooltipContract = (props) => (
        <Tooltip {...props}>
            แสดงเอกสารสัญญา
        </Tooltip>
    );

    const renderTooltipReceipt = (props) => (
        <Tooltip {...props}>
            แสดงเอกสารใบเสร็จ
        </Tooltip>
    );

    const renderTooltipTransfer = (props) => (
        <Tooltip {...props}>
            โอนกรรมสิทธิ์
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
            <ModalTransferAdd show={showAddTransfer} handleClose={handleAddTransferClose} id={selectedId} />
            {/* --- */}

            <Card>
                <Card.Header>

                    <div className='row'>
                        <div className='col-md-6 d-flex align-items-center'>
                            <h5>ตารางข้อมูลสัญญา</h5>
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
                                    <th>เลขที่สัญญา</th>
                                    <th>เลขที่สัญญาจะซื้อจะขายที่ดิน</th>
                                    <th>ชื่อพยาน</th>
                                    <th>ชื่อพยาน</th>
                                    <th>จำนวนเงินทำสัญญา</th>
                                    <th>วันที่บันทึกข้อมูล</th>
                                    <th>วันที่ทำสัญญา</th>
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
                                            <td>{data.con_number}</td>
                                            <td>{data.con_numLandSale}</td>
                                            <td>{data.witnessone_name}</td>
                                            <td>{data.witnesstwo_name}</td>
                                            <td>{data.con_amount.toLocaleString()}</td>
                                            <td>{DateTimeFormat(data.con_record)}</td>

                                            {data.con_date ? (
                                                <td>{DateTimeFormat(data.con_date)}</td>
                                            ) : (
                                                <td>
                                                    <p className='text-danger'>ไม่มีการทำสัญญา</p>
                                                </td>
                                            )}

                                            <td>{data.con_note}</td>
                                            <td>
                                                <OverlayTrigger overlay={renderTooltipDetail}>
                                                    <a onClick={() => handleDetailShow(data.b_id)} style={{ cursor: 'pointer' }}>
                                                        <BsFillInfoCircleFill className='text-primary' style={{ fontSize: '28px' }} />
                                                    </a>
                                                </OverlayTrigger>
                                            </td>

                                            {data.con_status === 1 ? (
                                                <td>
                                                    <Badge bg="info">กำลังดำเนินการ</Badge>
                                                </td>
                                            ) : data.con_status === 2 ? (
                                                <td>
                                                    <Badge bg="success">ทำสัญญาสำเร็จ</Badge>
                                                </td>
                                            ) : (
                                                <td>
                                                    <Badge bg="danger">ยกเลิกสัญญา</Badge>
                                                </td>
                                            )}

                                            {data.con_status === 1 ? (
                                                <td>

                                                    {data.contract === null || data.contract === '' ? (
                                                        <OverlayTrigger overlay={renderTooltipDownloadContract}>
                                                            <a href={`/document/contracted/${data.b_id}`} target="_blank" style={{ cursor: 'pointer' }}>
                                                                <BsFileEarmarkArrowDownFill className='me-2 mb-2 text-primary' style={{ fontSize: '28px' }} />
                                                            </a>
                                                        </OverlayTrigger>
                                                    ) : (
                                                        <OverlayTrigger overlay={renderTooltipContract}>
                                                            <a href={`${API_URL}${data.contract}`} target="_blank" style={{ cursor: 'pointer' }}>
                                                                <BsFileEarmarkTextFill className='me-2 mb-2 text-primary' style={{ fontSize: '28px' }} />
                                                            </a>
                                                        </OverlayTrigger>
                                                    )}

                                                    {data.con_receipt === null || data.con_receipt === '' ? (
                                                        <OverlayTrigger overlay={renderTooltipDownloadReceipt}>
                                                            <a href={`/document/receipt/contract/${data.b_id}`} target="_blank" style={{ cursor: 'pointer' }}>
                                                                <BsDownload className='me-2 text-primary' style={{ fontSize: '28px' }} />
                                                            </a>
                                                        </OverlayTrigger>
                                                    ) : (
                                                        <OverlayTrigger overlay={renderTooltipReceipt}>
                                                            <a href={`${API_URL}${data.con_receipt}`} target="_blank" style={{ cursor: 'pointer' }}>
                                                                <BsReceipt className='mb-2 text-primary' style={{ fontSize: '28px' }} />
                                                            </a>
                                                        </OverlayTrigger>
                                                    )}

                                                </td>
                                            ) : data.con_status !== 0 ? (
                                                <td>
                                                    <OverlayTrigger overlay={renderTooltipContract}>
                                                        <a href={`${API_URL}${data.contract}`} target="_blank" style={{ cursor: 'pointer' }}>
                                                            <BsFileEarmarkTextFill className='me-2 mb-2 text-primary' style={{ fontSize: '28px' }} />
                                                        </a>
                                                    </OverlayTrigger>
                                                    <OverlayTrigger overlay={renderTooltipReceipt}>
                                                        <a href={`${API_URL}${data.con_receipt}`} target="_blank" style={{ cursor: 'pointer' }}>
                                                            <BsReceipt className='mb-2 text-primary' style={{ fontSize: '28px' }} />
                                                        </a>
                                                    </OverlayTrigger>
                                                </td>
                                            ) : (
                                                <td>
                                                    {/* null */}
                                                </td>
                                            )}

                                            {data.con_status === 1 ? (
                                                <td>
                                                    {data.contract !== null && data.con_receipt !== null && data.contract !== '' && data.con_receipt !== '' ? (
                                                        <OverlayTrigger overlay={renderTooltipTransfer}>
                                                            <a onClick={() => handleAddTransferShow(data.b_id)} style={{ cursor: 'pointer' }}>
                                                                <BsFileTextFill className='me-2 mb-2 text-secondary' style={{ fontSize: '28px' }} />
                                                            </a>
                                                        </OverlayTrigger>
                                                    ) : null}

                                                    {data.contract === null || data.contract === '' ? (
                                                        <OverlayTrigger overlay={renderTooltipUploadContract}>
                                                            <label htmlFor={`fileInput-contract-${data.b_id}`} style={{ cursor: 'pointer' }}>
                                                                <input
                                                                    id={`fileInput-contract-${data.b_id}`}
                                                                    type="file"
                                                                    style={{ display: 'none' }}
                                                                    value={uploadedFile ? uploadedFile.file : ''}
                                                                    onChange={(e) => {
                                                                        if (e.target.files.length > 0) {
                                                                            UploadFile(data.b_id, e.target.files[0], null);
                                                                        }
                                                                    }}
                                                                />
                                                                <BsFileEarmarkArrowUpFill className='me-2 mb-2 text-secondary' style={{ fontSize: '24px' }} />
                                                            </label>
                                                        </OverlayTrigger>
                                                    ) : (
                                                        <OverlayTrigger overlay={renderTooltipChangedContract}>
                                                            <label htmlFor={`fileInput-contract-${data.b_id}`} style={{ cursor: 'pointer' }}>
                                                                <input
                                                                    id={`fileInput-contract-${data.b_id}`}
                                                                    type="file"
                                                                    style={{ display: 'none' }}
                                                                    value={uploadedFile ? uploadedFile.file : ''}
                                                                    onChange={(e) => {
                                                                        if (e.target.files.length > 0) {
                                                                            UploadFile(data.b_id, e.target.files[0], null);
                                                                        }
                                                                    }}
                                                                />
                                                                <BsFileEarmarkArrowUpFill className='me-2 mb-2 text-warning' style={{ fontSize: '24px' }} />
                                                            </label>
                                                        </OverlayTrigger>
                                                    )}

                                                    {data.con_receipt === null || data.con_receipt === '' ? (
                                                        <OverlayTrigger overlay={renderTooltipUploadReceipt}>
                                                            <label htmlFor={`fileInput-receipt-${data.b_id}`} style={{ cursor: 'pointer' }}>
                                                                <input
                                                                    id={`fileInput-receipt-${data.b_id}`}
                                                                    type="file"
                                                                    style={{ display: 'none' }}
                                                                    value={uploadedFile ? uploadedFile.file : ''}
                                                                    onChange={(e) => {
                                                                        if (e.target.files.length > 0) {
                                                                            UploadFile(data.b_id, null, e.target.files[0]);
                                                                        }
                                                                    }}
                                                                />
                                                                <BsBoxArrowUp className='me-2 mb-2 text-secondary' style={{ fontSize: '24px' }} />
                                                            </label>
                                                        </OverlayTrigger>
                                                    ) : (
                                                        <OverlayTrigger overlay={renderTooltipChangedReceipt}>
                                                            <label htmlFor={`fileInput-receipt-${data.b_id}`} style={{ cursor: 'pointer' }}>
                                                                <input
                                                                    id={`fileInput-receipt-${data.b_id}`}
                                                                    type="file"
                                                                    style={{ display: 'none' }}
                                                                    value={uploadedFile ? uploadedFile.file : ''}
                                                                    onChange={(e) => {
                                                                        if (e.target.files.length > 0) {
                                                                            UploadFile(data.b_id, null, e.target.files[0]);
                                                                        }
                                                                    }}
                                                                />
                                                                <BsBoxArrowUp className='me-2 mb-2 text-warning' style={{ fontSize: '28px' }} />
                                                            </label>
                                                        </OverlayTrigger>
                                                    )}

                                                    {data.contract === null && data.con_receipt === null || data.contract === '' && data.con_receipt === '' ? (
                                                        <OverlayTrigger overlay={renderTooltipEdit}>
                                                            <a onClick={() => handleEditShow(data.b_id)} style={{ cursor: 'pointer' }}>
                                                                <BsPencilSquare className='me-2 mb-2 text-warning' style={{ fontSize: '24px' }} />
                                                            </a>
                                                        </OverlayTrigger>
                                                    ) : null}

                                                    <OverlayTrigger overlay={renderTooltipClose}>
                                                        <a onClick={() => ChangedStatus(data.b_id)} style={{ cursor: 'pointer' }}>
                                                            <BsFillXSquareFill className='mb-2 text-danger' style={{ fontSize: '24px' }} />
                                                        </a>
                                                    </OverlayTrigger>
                                                </td>
                                            ) : data.con_status === 2 ? (
                                                <td>

                                                    {showTransfer.some((transfer) => transfer.b_id === data.b_id && transfer.trans_status !== 0 && transfer.h_status !== 5) ? (
                                                        <Button href="/buy/transfer" variant="secondary" size="sm">
                                                            <span>ไปยังหน้าโอนกรรมสิทธิ์</span> &nbsp;
                                                            <BsCaretRightFill />
                                                        </Button>
                                                    ) : data.h_status === 5 ? (
                                                        <Button variant="success" size="sm" disabled>
                                                            ขายสำเร็จ
                                                        </Button>
                                                    ) : (
                                                        <Button variant="danger" size="sm" disabled>
                                                            ยกเลิกโอนกรรมสิทธิ์
                                                        </Button>
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
            </Card>
        </>
    );
}