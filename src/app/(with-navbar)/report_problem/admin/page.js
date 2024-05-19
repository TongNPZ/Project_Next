'use client'
import React, { useEffect, useState } from 'react';
import { DateTimeFormat } from '@/app/Format';
import ProtectRoute from '@/app/componnent/ProtectRoute/ProtectRoute';
import GetRequest from '@/app/ConfigAPI';
import { API_REPORT_PROBLEM } from '../../../../../api';
import ModalDetail from '../user/ModalDetail';
import ModalConfirm from './ModalConfirm';
import ModalEdit from './ModalEdit';
import {
    Table,
    Card,
    Form,
    Badge,
    OverlayTrigger,
    Tooltip
} from 'react-bootstrap';
import {
    BsClipboardCheckFill,
    BsCheckSquareFill,
    BsPencilSquare
} from "react-icons/bs";

export default function ReportProblemAdmin() {

    // fecth
    const [showData, setShowData] = useState([]);

    useEffect(() => {
        const fecthReportProblem = async () => {
            try {
                const result = await GetRequest(API_REPORT_PROBLEM, 'GET', null);
                setShowData(result.data);
            } catch (error) {
                console.log('error', error);
            }
        }

        fecthReportProblem();
    }, [showData]);

    // - modal -
    const [selectedId, setSelectedId] = useState('');

    // detail
    const [showDetail, setShowDetail] = useState(false);

    const handleDetailClose = () => setShowDetail(false);
    const handleDetailShow = (id) => {
        setSelectedId(id);
        setShowDetail(true);
    }

    // confirm
    const [showConfirm, setShowConfirm] = useState(false);

    const handleConfirmClose = () => setShowConfirm(false);
    const handleConfirmShow = (id) => {
        setSelectedId(id);
        setShowConfirm(true);
    }

    // edit
    const [showEdit, setShowEdit] = useState(false);

    const handleEditClose = () => setShowEdit(false);
    const handleEditShow = (id) => {
        setSelectedId(id);
        setShowEdit(true);
    }
    // ---

    // tooltip
    const renderTooltipDetail = (props) => (
        <Tooltip {...props}>
            ผลการแก้ไขปัญหา
        </Tooltip>
    );

    const renderTooltipConfirm = (props) => (
        <Tooltip {...props}>
            ยืนยันการแก้ไข
        </Tooltip>
    );

    const renderTooltipEdit = (props) => (
        <Tooltip {...props}>
            แก้ไขข้อมูล
        </Tooltip>
    );

    return (
        <ProtectRoute requireRoles={[1]}>

            {/* modal */}
            <ModalDetail show={showDetail} handleClose={handleDetailClose} id={selectedId} />
            <ModalEdit show={showEdit} handleClose={handleEditClose} id={selectedId} />
            <ModalConfirm show={showConfirm} handleClose={handleConfirmClose} id={selectedId} />
            {/* --- */}

            <Card>
                <Card.Header>
                    <h5>ตารางข้อมูลการแจ้งปัญหา</h5>
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
                                    <th>รหัสแจ้งปัญหา</th>
                                    <th>บ้านเลขที่</th>
                                    <th>ชื่อผู้แจ้ง</th>
                                    <th>รายละเอียดการแจ้ง</th>
                                    <th>วันที่แจ้ง</th>
                                    <th>ผลการแก้ไข</th>
                                    <th>สถานะ</th>
                                    <th>การจัดการ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {showData.map((data) => (
                                    <tr key={data.rp_id}>
                                        <td>{data.rp_id}</td>
                                        <td>{data.house_no}</td>
                                        <td>{data.user_name} {data.user_lastname}</td>
                                        <td>{data.rp_problem_details}</td>
                                        <td>{DateTimeFormat(data.rp_problem_date)}</td>

                                        {data.rp_status === 1 ? (
                                            <td>
                                                <OverlayTrigger overlay={renderTooltipDetail}>
                                                    <a onClick={() => handleDetailShow(data.rp_id)} style={{ cursor: 'pointer' }}>
                                                        <BsClipboardCheckFill className='text-primary' style={{ fontSize: '28px' }} />
                                                    </a>
                                                </OverlayTrigger>
                                            </td>
                                        ) : (
                                            <td>
                                                <p className='text-danger'>ยังไม่แก้ไข</p>
                                            </td>
                                        )}


                                        {data.rp_status === 1 ? (
                                            <td>
                                                <Badge bg="success">แก้ไขแล้ว</Badge>
                                            </td>
                                        ) : (
                                            <td>
                                                <Badge bg="info">กำลังแก้ไข</Badge>
                                            </td>
                                        )}

                                        {data.rp_status === 0 ? (
                                            <td>
                                                <OverlayTrigger overlay={renderTooltipConfirm}>
                                                    <a onClick={() => handleConfirmShow(data.rp_id)} style={{ cursor: 'pointer' }}>
                                                        <BsCheckSquareFill className='me-2 mb-2 text-success' style={{ fontSize: '24px' }} />
                                                    </a>
                                                </OverlayTrigger>
                                            </td>
                                        ) : (
                                            <td>
                                                <OverlayTrigger overlay={renderTooltipEdit}>
                                                    <a onClick={() => handleEditShow(data.rp_id)} style={{ cursor: 'pointer' }}>
                                                        <BsPencilSquare className='me-2 mb-2 text-warning' style={{ fontSize: '24px' }} />
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