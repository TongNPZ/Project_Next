'use client'
import React, { useEffect, useState } from 'react';
import { DateTimeFormat } from '@/app/Format';
import ProtectRoute from '@/app/componnent/ProtectRoute/ProtectRoute';
import GetRequest from '@/app/ConfigAPI';
import {
    API_NOTIFY_COMMON_FEE,
    API_RECEIVE_COMMON_FEE
} from '../../../../../../api';
import ModalAdd from './ModalAdd';
import ModalCheckSlip from './ModalCheckSlip';
import RemoveData from './RemoveData';
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
    BsFillTrash3Fill,
    BsFileEarmarkCheckFill,
    BsFileEarmarkFill,
    BsDownload,
    BsFileEarmarkTextFill,
    BsBoxArrowUp
} from "react-icons/bs";

export default function NotifyCommonFee() {

    // - fecth - //

    // notify common fee
    const [showData, setShowData] = useState([]);

    const fetchNotifyCommonFee = async () => {
        try {
            const result = await GetRequest(API_NOTIFY_COMMON_FEE, 'GET', null);
            setShowData(result.data);
        } catch (error) {
            console.log('error', error);
        }
    }

    useEffect(() => {
        fetchNotifyCommonFee();
    }, [showData]);

    // show rcf
    const [showRcf, setShowRcf] = useState([]);

    useEffect(() => {
        const fetchRcf = async () => {
            try {
                const result = await GetRequest(API_RECEIVE_COMMON_FEE, 'GET', null);
                setShowRcf(result.data);
            } catch (error) {
                console.log('error', error);
            }
        }

        fetchRcf();
    }, [showRcf]);

    // --- //

    // - modal - //
    const [selectedNcfId, setSelectedNcfId] = useState('');

    // add
    const [showAdd, setShowAdd] = useState(false);

    const handleAddClose = () => setShowAdd(false);
    const handleAddShow = () => setShowAdd(true);

    // check slip
    const [showCheckSlip, setShowCheckSlip] = useState(false);

    const handleCheckSlipClose = () => setShowCheckSlip(false);
    const handleCheckSlipShow = (ncfId) => {
        setSelectedNcfId(ncfId);
        setShowCheckSlip(true);
    }
    // --- //

    // tooltip
    const renderTooltipCheckSlip = (props) => (
        <Tooltip {...props}>
            ตรวจสอบสลิป
        </Tooltip>
    );

    const renderTooltipDownload = (props) => (
        <Tooltip {...props}>
            ดาวน์โหลดเอกสารใบเสร็จ
        </Tooltip>
    );

    const renderTooltipUpload = (props) => (
        <Tooltip {...props}>
            อัพโหลดเอกสารใบเสร็จ
        </Tooltip>
    );

    const renderTooltipDelete = (props) => (
        <Tooltip {...props}>
            ยกเลิกการแจ้งชำระ
        </Tooltip>
    );

    return (
        <ProtectRoute requireRoles={[1]}>

            {/* modal */}
            <ModalAdd show={showAdd} handleClose={handleAddClose} />
            <ModalCheckSlip show={showCheckSlip} handleClose={handleCheckSlipClose} ncfId={selectedNcfId} />
            {/* --- */}

            <Card>
                <Card.Header>

                    <div className='row'>
                        <div className='col-md-6 d-flex align-items-center'>
                            <h5>ตารางข้อมูลค่าส่วนกลาง</h5>
                        </div>
                        <div className='col-md-6 text-md-end'>
                            <Button variant="success" onClick={handleAddShow}>
                                แจ้งชำระค่าส่วนกลาง
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
                                    <th>รหัสแจ้งชำระค่าส่วนกลาง</th>
                                    <th>บ้านเลขที่</th>
                                    <th>จำนวนเงิน</th>
                                    <th>วันที่แจ้งชำระ</th>
                                    <th>หมายเหตุ</th>
                                    <th>ตรวจสอบการชำระ</th>
                                    <th>เอกสาร</th>
                                    <th>สถานะ</th>
                                    <th>การจัดการ</th>
                                </tr>
                            </thead>
                            <tbody>

                                {showData && showData.length > 0 ? (
                                    showData.map((data) => (
                                        <tr key={data.ncf_id}>
                                            <td>{data.ncf_id}</td>
                                            <td>{data.house_no}</td>
                                            <td>{parseFloat(data.ncf_amount).toLocaleString()}</td>
                                            <td>{DateTimeFormat(data.ncf_date)}</td>
                                            <td>{data.ncf_note}</td>
                                            <td>

                                                {showRcf.some((rcf) => rcf.ncf_id === data.ncf_id && rcf.rcf_slip !== null) ? (
                                                    <OverlayTrigger overlay={renderTooltipCheckSlip}>
                                                        <a onClick={() => handleCheckSlipShow(data.ncf_id)} style={{ cursor: 'pointer' }}>
                                                            <BsFileEarmarkCheckFill className='text-danger' style={{ fontSize: '28px' }} />
                                                        </a>
                                                    </OverlayTrigger>
                                                ) : data.ncf_status === 1 ? (
                                                    <BsFileEarmarkFill className='text-primary' style={{ fontSize: '28px' }} />
                                                ) : data.ncf_status === 0 && (
                                                    <div className='text-danger'>
                                                        <p>ยังไม่มีการชำระ</p>
                                                    </div>
                                                )}

                                            </td>
                                            <td>

                                                {showRcf.some((rcf) => rcf.ncf_id === data.ncf_id && rcf.rcf_receipt !== null) ? (
                                                    <BsFileEarmarkTextFill className='me-2 text-primary' style={{ fontSize: '28px' }} />
                                                ) : (
                                                    <OverlayTrigger overlay={renderTooltipDownload}>
                                                        <a style={{ cursor: 'pointer' }}>
                                                            <BsDownload className='me-2 text-primary' style={{ fontSize: '28px' }} />
                                                        </a>
                                                    </OverlayTrigger>
                                                )}

                                            </td>

                                            {data.ncf_status === 1 ? (
                                                <td>
                                                    <Badge bg="success">ชำระแล้ว</Badge>
                                                </td>
                                            ) : (
                                                <td>
                                                    <Badge bg="danger">ค้างชำระ</Badge>
                                                </td>
                                            )}

                                            {showRcf.some((rcf) => rcf.ncf_id === data.ncf_id && rcf.rcf_receipt !== null) ? (
                                                <td>
                                                    <BsFileEarmarkTextFill className='me-2 text-primary' style={{ fontSize: '24px' }} />
                                                </td>
                                            ) : showRcf.some((rcf) => rcf.ncf_id === data.ncf_id && rcf.rcf_slip !== null) ? (
                                                <td>
                                                    <OverlayTrigger overlay={renderTooltipUpload}>
                                                        <a style={{ cursor: 'pointer' }}>
                                                            <BsBoxArrowUp className='me-2 text-secondary' style={{ fontSize: '24px' }} />
                                                        </a>
                                                    </OverlayTrigger>
                                                </td>
                                            ) : (
                                                <td>
                                                    <OverlayTrigger overlay={renderTooltipUpload}>
                                                        <a style={{ cursor: 'pointer' }}>
                                                            <BsBoxArrowUp className='me-2 text-secondary' style={{ fontSize: '24px' }} />
                                                        </a>
                                                    </OverlayTrigger>
                                                    <OverlayTrigger overlay={renderTooltipDelete}>
                                                        <a onClick={() => RemoveData(data.ncf_id)} style={{ cursor: 'pointer' }}>
                                                            <BsFillTrash3Fill className='text-danger' style={{ fontSize: '24px' }} />
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
        </ProtectRoute>
    );
}