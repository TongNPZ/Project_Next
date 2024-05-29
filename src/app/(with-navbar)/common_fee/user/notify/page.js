'use client'
import React, { useState, useEffect } from "react";
import { useAuth } from "@/app/componnent/AuthContext/AuthContext";
import ProtectRoute from "@/app/componnent/ProtectRoute/ProtectRoute";
import { DateFormat } from "@/app/Format";
import GetRequest from "@/app/ConfigAPI";
import {
    API_USER_COMMON_FEE,
    API_RECEIVE_COMMON_FEE
} from "../../../../../../api";
import ModalDetail from "./ModalDetail";
import {
    Card,
    Nav,
    ListGroup,
    Form,
    Badge,
    Button,
    InputGroup
} from 'react-bootstrap';
import {
    BsCaretRightFill,
    BsArrowCounterclockwise,
    BsSearch
} from "react-icons/bs";

export default function NotifyCommonFeeUser() {

    // localstorage
    const { authData } = useAuth();

    // active key
    const [activeKey, setActiveKey] = useState('overdue');

    const handleSelect = (key) => {
        setActiveKey(key);
    };

    // - fecth - //

    // notify common fee
    const [showData, setShowData] = useState([]);
    const [search, setSearch] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const fecthNotifyCommonFee = async () => {
        try {

            if (activeKey === 'overdue') {
                const result = await GetRequest(`${API_USER_COMMON_FEE}/${authData.id}?status=overdue&order=DESC&search=${search}&startDate=${startDate}&endDate=${endDate}`, 'GET', null);
                setShowData(result.data);
            } else if (activeKey === 'paid') {
                const result = await GetRequest(`${API_USER_COMMON_FEE}/${authData.id}?status=paid&order=DESC&search=${search}&startDate=${startDate}&endDate=${endDate}`, 'GET', null);
                setShowData(result.data);
            }
        } catch (error) {
            console.log('error', error);
        }
    }

    useEffect(() => {
        fecthNotifyCommonFee()
    }, [showData, activeKey, search, startDate, endDate]);

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

    // function
    const handleSortReset = () => {
        setSearch('');
        setStartDate('');
        setEndDate('');
    };

    // - modal - //
    const [selectedId, setSelectedId] = useState('');

    // detail
    const [showDetail, setShowDetail] = useState(false);

    const handleDetailClose = () => setShowDetail(false);
    const handleDetailShow = (id) => {
        setSelectedId(id);
        setShowDetail(true);
    }

    // --- //

    return (
        <ProtectRoute requireRoles={[3]}>

            {/* Modal */}
            <ModalDetail show={showDetail} handleClose={handleDetailClose} id={selectedId} />
            {/* --- */}

            <Card>
                <Card.Header>
                    <Nav className="justify-content-center" variant="pills" activeKey={activeKey} onSelect={handleSelect}>
                        <Nav.Item>
                            <Nav.Link eventKey='overdue'>ค้างชำระ</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey='paid'>ชำระแล้ว</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Card.Header>
                <Card.Body>
                    <div className='row mb-3'>
                        <div className="col-md-6">
                            <div className="d-flex align-items-center mb-3">
                                <InputGroup className='me-2' style={{ width: '350px' }}>
                                    <InputGroup.Text>
                                        ค้นหาจากวันที่
                                    </InputGroup.Text>
                                    <Form.Control
                                        type="datetime-local"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                    />
                                </InputGroup>
                                <InputGroup style={{ width: '300px' }}>
                                    <InputGroup.Text>
                                        ถึงวันที่
                                    </InputGroup.Text>
                                    <Form.Control
                                        type="datetime-local"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                    />
                                </InputGroup>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="d-flex">
                                <InputGroup>
                                    <InputGroup.Text>
                                        <BsSearch />
                                    </InputGroup.Text>
                                    <Form.Control
                                        className="me-2"
                                        type="search"
                                        placeholder="ค้นหา"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        onKeyUp={(e) => {
                                            if (e.key === 'Enter') {
                                                setSearch(e.target.value)
                                            } else {
                                                setSearch(e.target.value)
                                            }
                                        }}
                                    />
                                </InputGroup>
                                <Button className='me-2 text-end' variant="secondary" onClick={handleSortReset}>
                                    <BsArrowCounterclockwise style={{ fontSize: '22px' }} />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {showData && showData.length > 0 ? (
                        showData.map((data, index) => (
                            activeKey === 'overdue' ? (
                                <ListGroup key={index} className="mb-2">
                                    <ListGroup.Item action onClick={() => handleDetailShow(data.ncf_id)}>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <p>ค่าบริการสาธารณะ</p>
                                                <div className="mb-2">

                                                    {showRcf.some((rcf) => rcf.ncf_id === data.ncf_id && rcf.rcf_status === 0) ? (
                                                        <Badge bg="info">รอดำเนินการ</Badge>
                                                    ) : (
                                                        <Badge bg="danger">ค้างจ่าย</Badge>
                                                    )}

                                                </div>
                                                <p>เจ้าของบ้านเลขที่ {data.house_no} ตามที่ท่านได้ชำระค่าบริการสาธารณะให้กับโครงการ ได้ครบกำหนดชำระในวันที่ {DateFormat(data.ncf_date)} เลขที่แจ้งชำระ {data.ncf_id} จำนวน {parseFloat(data.ncf_amount).toLocaleString()} บาท กรุณามาชำระค่าบริการสาธารณะก่อนวันที่ {DateFormat(data.ncf_nextDate)} เพื่อโครงการจะนำไปจัดสรรชำระค่าบริการอื่นต่อไป</p>
                                            </div>
                                            <div className="col-md-6 text-end">
                                                ดูรายละเอียด <BsCaretRightFill />
                                            </div>
                                        </div>
                                    </ListGroup.Item>
                                </ListGroup>
                            ) : activeKey === 'paid' && data.ncf_status === 1 && (
                                <ListGroup key={index} className="mb-2">
                                    <ListGroup.Item action onClick={() => handleDetailShow(data.ncf_id)}>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <p>ค่าบริการสาธารณะ</p>
                                                <div className="mb-2">
                                                    <Badge bg="success">ชำระแล้ว</Badge>
                                                </div>
                                                <p>โครงการขอขอบคุณที่ชำระค่าบริการสาธารณะ จำนวน {parseFloat(data.ncf_amount).toLocaleString()} บาท สำหรับเลขที่ชำระหมายเลข {showRcf.find((rcf) => rcf.ncf_id === data.ncf_id).rcf_id} เมื่อวันที่ {DateFormat(showRcf.find((rcf) => rcf.ncf_id === data.ncf_id).rcf_date)}</p>
                                            </div>
                                            <div className="col-md-6 text-end">
                                                ดูรายละเอียด <BsCaretRightFill />
                                            </div>
                                        </div>
                                    </ListGroup.Item>
                                </ListGroup>
                            )
                        ))
                    ) : (
                        <div className="mt-5 mb-5" style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                        }}>
                            <h1>ไม่มีข้อมูลที่แสดง</h1>
                        </div>
                    )}

                </Card.Body>
            </Card>
        </ProtectRoute >
    )
}