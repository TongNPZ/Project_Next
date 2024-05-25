'use client'
import React, { useState, useEffect } from "react";
import { DateTimeFormat } from "@/app/Format";
import ProtectRoute from '@/app/componnent/ProtectRoute/ProtectRoute';
import GetRequest from '@/app/ConfigAPI';
import { API_URL } from "../../../../../app";
import { API_REPORT_PROBLEM } from "../../../../../api";
import ModalAdd from "./ModalAdd";
import ModalEdit from "./ModalEdit";
import ModalDetail from "./ModalDetail";
import RemoveData from "./RemoveData";
import {
    Card,
    Button,
    Badge,
    OverlayTrigger,
    Tooltip,
    Form
} from 'react-bootstrap';
import {
    BsExclamationTriangleFill,
    BsPencilSquare,
    BsXLg
} from "react-icons/bs";

export default function reportProblemUser() {

    // fetch
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

        fecthReportProblem()
    }, [showData]);

    // - modal -
    const [selectedId, setSelectedId] = useState('');

    // add
    const [showAdd, setShowAdd] = useState(false);

    const handleAddClose = () => setShowAdd(false);
    const handleAddShow = () => setShowAdd(true);

    // edit
    const [showEdit, setShowEdit] = useState(false);

    const handleEditClose = () => setShowEdit(false);
    const handleEditShow = (id) => {
        setSelectedId(id);
        setShowEdit(true);
    }

    // detail
    const [showDetail, setShowDetail] = useState(false);

    const handleDetailClose = () => setShowDetail(false);
    const handleDetailShow = (id) => {
        setSelectedId(id);
        setShowDetail(true);
    }
    // ---

    // tooltip
    const renderTooltipEdit = (props) => (
        <Tooltip {...props}>
            แก้ไขข้อมูล
        </Tooltip>
    );

    const renderTooltipCancel = (props) => (
        <Tooltip {...props}>
            ยกเลิกแจ้งปัญหา
        </Tooltip>
    );

    return (
        <ProtectRoute requireRoles={[3]}>

            {/* modal */}
            <ModalAdd show={showAdd} handleClose={handleAddClose} />
            <ModalEdit show={showEdit} handleClose={handleEditClose} id={selectedId} />
            <ModalDetail show={showDetail} handleClose={handleDetailClose} id={selectedId} />
            {/* --- */}

            <div className="container ps-5 pe-5">
                <Card className="mb-3">
                    <Card.Header>
                        <div className="text-end">
                            <Button variant="success" onClick={handleAddShow}>
                                <BsExclamationTriangleFill style={{
                                    fontSize: '24px',
                                    marginRight: '5px'
                                }} />แจ้งปัญหา
                            </Button>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <div className='mb-3'>
                            <Form.Control
                                type="search"
                                placeholder="ค้นหา"
                            />
                        </div>
                    </Card.Body>
                </Card>

                {showData.map((data) => (
                    <Card className="mb-3" >
                        <Card.Body>
                            <div className="row">
                                <div className="col-md-6">
                                    <p>
                                        <strong>บ้านเลขที่ {data.house_no} {data.user_name} {data.user_lastname}</strong><br />
                                        {DateTimeFormat(data.rp_problem_date)}&nbsp;

                                        {data.rp_status === 0 ? (
                                            <Badge bg="info">รอการแก้ไข</Badge>
                                        ) : (
                                            <Badge bg="success">แก้ไขแล้ว</Badge>
                                        )}

                                    </p>
                                </div>

                                {data.rp_status === 0 ? (
                                    <div className="col-md-6 text-end">
                                        <OverlayTrigger overlay={renderTooltipEdit}>
                                            <a onClick={() => handleEditShow(data.rp_id)} style={{ cursor: 'pointer' }}>
                                                <BsPencilSquare className='me-2 mb-2 text-secondary' style={{ fontSize: '24px' }} />
                                            </a>
                                        </OverlayTrigger>
                                        <OverlayTrigger overlay={renderTooltipCancel}>
                                            <a onClick={() => RemoveData(data.rp_id)} style={{ cursor: 'pointer' }}>
                                                <BsXLg className='me-2 mb-2 text-secondary' style={{ fontSize: '24px' }} />
                                            </a>
                                        </OverlayTrigger>
                                    </div>
                                ) : (
                                    <div className="col-md-6 text-end" />
                                )}

                            </div>
                            <p>{data.rp_problem_details}</p>

                            {data.rp_problem_image !== '' ? (
                                <Card.Img src={`${API_URL}${data.rp_problem_image}`} rounded fluid />
                            ) : (
                                <Card>
                                    <Card.Body>
                                        <h1 className='text-center mt-5 mb-5'>ไม่มีรูปภาพที่แสดง</h1>
                                    </Card.Body>
                                </Card>
                            )}

                        </Card.Body>

                        {data.rp_status === 1 ? (
                            <Card.Footer>
                                <div className="d-grid">
                                    <Button variant="secondary" onClick={() => handleDetailShow(data.rp_id)}>
                                        ผลการแก้ไข
                                    </Button>
                                </div>
                            </Card.Footer>
                        ) : null}

                    </Card>
                ))}

            </div>

        </ProtectRoute >
    )
}