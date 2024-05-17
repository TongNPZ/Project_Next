'use client'
import React, { useEffect, useState } from 'react';
import { DateFormat } from '@/app/Format';
import ProtectRoute from '@/app/componnent/ProtectRoute/ProtectRoute';
import GetRequest from '@/app/ConfigAPI';
import {
    API_NOTIFY_COMMON_FEE,
    API_RECEIVE_COMMON_FEE
} from '../../../../../../api';
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

export default function ReceiveCommonFee() {

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
            ตรวจสอบสลิปการชำระ
        </Tooltip>
    );

    const renderTooltipShowSlip = (props) => (
        <Tooltip {...props}>
            ดูสลิปการชำระ
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

    const renderTooltipUpload = (props) => (
        <Tooltip {...props}>
            อัพโหลดเอกสารใบเสร็จ
        </Tooltip>
    );

    const renderTooltipChangedUpload = (props) => (
        <Tooltip {...props}>
            เปลี่ยนเอกสารใบเสร็จ
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
            <ModalCheckSlip show={showCheckSlip} handleClose={handleCheckSlipClose} ncfId={selectedNcfId} />
            {/* --- */}

            <Card>
                <Card.Header>
                    <div className='col-md-6 d-flex align-items-center'>
                        <h5>ตารางข้อมูลรับเงินค่าส่วนกลาง</h5>
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
                                    <th>วันที่รับเงินชำระ</th>
                                    <th>หมายเหตุ</th>
                                    <th>ตรวจสอบการชำระ</th>
                                    <th>เอกสาร</th>
                                    <th>สถานะ</th>
                                    <th>การจัดการ</th>
                                </tr>
                            </thead>
                            <tbody>

                                {showData && showData.length > 0 ? (
                                    showData.map((data) => {
                                        const rcfSomeData = showRcf.some((rcf) => rcf.ncf_id === data.ncf_id);
                                        const rcfFindData = showRcf.find((rcf) => rcf.ncf_id === data.ncf_id);

                                        return (
                                            <tr key={data.ncf_id}>
                                                <td>{data.ncf_id}</td>
                                                <td>{data.house_no}</td>
                                                <td>{parseFloat(data.ncf_amount).toLocaleString()}</td>
                                                <td>{DateFormat(data.ncf_date)}</td>
                                                <td>
                                                    {rcfSomeData && rcfFindData.rcf_date ? (
                                                        DateFormat(rcfFindData.rcf_date)
                                                    ) : (
                                                        <div className='text-danger'>
                                                            <p>ยังไม่มีการชำระ</p>
                                                        </div>
                                                    )}
                                                </td>
                                                <td>{data.ncf_note}</td>
                                                <td>

                                                    {rcfSomeData && rcfFindData.rcf_slip !== null && data.ncf_status === 0 ? (
                                                        <OverlayTrigger overlay={renderTooltipCheckSlip}>
                                                            <a onClick={() => handleCheckSlipShow(data.ncf_id)} style={{ cursor: 'pointer' }}>
                                                                <BsFileEarmarkCheckFill className='text-danger' style={{ fontSize: '28px' }} />
                                                            </a>
                                                        </OverlayTrigger>
                                                    ) : rcfSomeData && rcfFindData.rcf_slip !== null && data.ncf_status === 1 ? (
                                                        <OverlayTrigger overlay={renderTooltipShowSlip}>
                                                            <a onClick={() => handleCheckSlipShow(data.ncf_id)} style={{ cursor: 'pointer' }}>
                                                                <BsFileEarmarkCheckFill className='text-success' style={{ fontSize: '28px' }} />
                                                            </a>
                                                        </OverlayTrigger>
                                                    ) : rcfSomeData && rcfFindData.rcf_slip === null && data.ncf_status === 1 ? (
                                                        <div className='text-success'>
                                                            <p>ชำระแล้ว</p>
                                                        </div>
                                                    ) : (
                                                        <div className='text-danger'>
                                                            <p>ยังไม่มีการชำระ</p>
                                                        </div>
                                                    )}

                                                </td>
                                                <td>

                                                    {rcfSomeData && rcfFindData.rcf_receipt !== null ? (
                                                        <OverlayTrigger overlay={renderTooltipReceipt}>
                                                            <a target="_blank" style={{ cursor: 'pointer' }}>
                                                                <BsReceipt className='me-2 mb-2 text-primary' style={{ fontSize: '28px' }} />
                                                            </a>
                                                        </OverlayTrigger>
                                                    ) : rcfSomeData && rcfFindData.rcf_receipt === null ? (
                                                        <OverlayTrigger overlay={renderTooltipDownload}>
                                                            <a href={`/document/receipt/commonFee/${data.ncf_id}`} target="_blank" style={{ cursor: 'pointer' }}>
                                                                <BsDownload className='mb-2 text-primary' style={{ fontSize: '28px' }} />
                                                            </a>
                                                        </OverlayTrigger>
                                                    ) : (
                                                        <OverlayTrigger overlay={renderTooltipDownload}>
                                                            <a href={`/document/receipt/commonFee/${data.ncf_id}`} target="_blank" style={{ cursor: 'pointer' }}>
                                                                <BsDownload className='mb-2 text-primary' style={{ fontSize: '28px' }} />
                                                            </a>
                                                        </OverlayTrigger>
                                                    )}

                                                </td>

                                                {rcfSomeData && rcfFindData.rcf_receipt !== null && rcfFindData.rcf_status === 1 && data.ncf_status === 1 ? (
                                                    <td>
                                                        <Badge bg="success">ชำระแล้ว</Badge>
                                                    </td>
                                                ) : rcfSomeData && rcfFindData.rcf_receipt === null && rcfFindData.rcf_status === 1 && data.ncf_status === 1 ? (
                                                    <td>
                                                        <Badge bg="info">รออัพโหลดใบเสร็จ</Badge>
                                                    </td>
                                                ) : rcfSomeData && rcfFindData.rcf_status === 0 && data.ncf_status === 0 ? (
                                                    <td>
                                                        <Badge bg="info">กำลังดำเนินการ</Badge>
                                                    </td>
                                                ) : (
                                                    <td>
                                                        <Badge bg="danger">ค้างชำระ</Badge>
                                                    </td>
                                                )}

                                                {rcfSomeData && rcfFindData.rcf_receipt !== null && rcfFindData.rcf_status === 1 && data.ncf_status === 1 ? (
                                                    <td>
                                                        <OverlayTrigger overlay={renderTooltipChangedUpload}>
                                                            <a style={{ cursor: 'pointer' }}>
                                                                <BsBoxArrowUp className='me-2 text-warning' style={{ fontSize: '24px' }} />
                                                            </a>
                                                        </OverlayTrigger>
                                                    </td>
                                                ) : rcfSomeData && rcfFindData.rcf_receipt === null && rcfFindData.rcf_status === 1 && data.ncf_status === 1 ? (
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
                                        )
                                    })
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