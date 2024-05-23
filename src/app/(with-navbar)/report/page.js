'use client'
import React, { useState } from "react"
import { useRouter } from 'next/navigation';
import { DateTimeFormat } from "@/app/Format"
import ProtectRoute from "@/app/componnent/ProtectRoute/ProtectRoute"
import GetRequest from "@/app/ConfigAPI"
import {
    API_HOUSE,
    API_BOOK,
    API_CONTRACT,
    API_TRANSFER,
} from "../../../../api"
import {
    Nav,
    Card,
    Form,
    InputGroup,
    Button,
    Table,
    Badge
} from 'react-bootstrap'
import {
    BsSearch,
    BsFiletypePdf
} from "react-icons/bs";

export default function report() {

    // fetch
    const [showData, setShowData] = useState([])
    const [search, setSearch] = useState('')
    const [status, setStatus] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const fecthHouse = async (search, status) => {
        try {
            const result = await GetRequest(`${API_HOUSE}?order=DESC&search=${search}&status=${status}`, 'GET', null)
            setShowData(result.data)
        } catch (error) {
            console.log('error', error)
        }
    }

    const fecthBook = async (search, status, startDate, endDate) => {
        try {
            const result = await GetRequest(`${API_BOOK}?order=DESC&search=${search}&status=${status}&startDate=${startDate}&endDate=${endDate}`, 'GET', null);
            setShowData(result.data);
        } catch (error) {
            console.log('error', error);
        }
    }

    const fecthContract = async (search, status, startDate, endDate) => {
        try {
            const result = await GetRequest(`${API_CONTRACT}?order=DESC&search=${search}&status=${status}&startDate=${startDate}&endDate=${endDate}`, 'GET', null);
            setShowData(result.data);
        } catch (error) {
            console.log('error', error);
        }
    }

    const fecthTransfer = async (search, status, startDate, endDate) => {
        try {
            const result = await GetRequest(`${API_TRANSFER}?order=DESC&search=${search}&status=${status}&startDate=${startDate}&endDate=${endDate}`, 'GET', null);
            setShowData(result.data);
        } catch (error) {
            console.log('error', error);
        }
    }

    // function
    const [activeKey, setActiveKey] = useState('house');

    const handleSelect = (key) => {
        setActiveKey(key)
    };

    const [tempStatus, setTempStatus] = useState('');

    const handleSearchReport = async (e) => {
        e.preventDefault();

        setTempStatus(status)

        if (status === '' || status === 'vacant' || status === 'sold' || status === 'cancel') {
            fecthHouse(search, status);
        } else if (status === 'booked') {
            fecthBook(search, status, startDate, endDate);
        } else if (status === 'contracted') {
            fecthContract(search, status, startDate, endDate);
        } else if (status === 'transferred') {
            fecthTransfer(search, status, startDate, endDate);
        }
    }

    const handleSortReset = () => {
        setSearch('')
        setStatus('')
        setStartDate('')
        setEndDate('')
        setShowData([])

        setTempStatus('')
    };

    const showDataString = JSON.stringify(showData);

    return (
        <ProtectRoute requireRoles={[1]}>
            <Card>
                <Card.Header>
                    <Nav variant="tabs" activeKey={activeKey} onSelect={handleSelect}>
                        <Nav.Item>
                            <Nav.Link eventKey='house'>รายงานบ้าน</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey='commonFee'>รายงานค่าส่วนกลาง</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey='expenses'>รายงานค่าใช้จ่าย</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey='reportProblem'>รายงานการแจ้งปัญหา</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Card.Header>
                <Card.Body>
                    <div className="mb-5">
                        <div className="row ps-5 pe-5 mt-3 mb-4">
                            <div className="col-md-6">
                                <InputGroup className="mb-3">
                                    <InputGroup.Text>แสดงรายงาน</InputGroup.Text>
                                    <Form.Select value={status} onChange={(e) => {
                                        setStartDate('')
                                        setEndDate('')
                                        setSearch('')
                                        setStatus(e.target.value)
                                    }}>
                                        <option value={''}>ทั้งหมด</option>
                                        <option value={'vacant'}>ว่าง</option>
                                        <option value={'booked'}>จอง</option>
                                        <option value={'contracted'}>ทำสัญญา</option>
                                        <option value={'transferred'}>โอนกรรมสิทธิ์</option>
                                        <option value={'sold'}>ขายแล้ว</option>
                                        <option value={'cancel'}>ยกเลิกขาย</option>
                                    </Form.Select>
                                </InputGroup>
                            </div>
                            <div className="col-md-6">

                                {status === 'booked' || status === 'contracted' || status === 'transferred' ? (
                                    <div className="d-flex align-items-center">
                                        <InputGroup className='me-2' style={{ width: '70%' }}>
                                            <InputGroup.Text>
                                                ค้นหาจากวันที่
                                            </InputGroup.Text>
                                            <Form.Control
                                                type="datetime-local"
                                                value={startDate}
                                                onChange={(e) => setStartDate(e.target.value)}
                                            />
                                        </InputGroup>
                                        <InputGroup style={{ width: '60%' }}>
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
                                ) : (
                                    <div className="d-flex align-items-center">
                                        <InputGroup className='me-2' style={{ width: '70%' }}>
                                            <InputGroup.Text>
                                                ค้นหาจากวันที่
                                            </InputGroup.Text>
                                            <Form.Control
                                                type="datetime-local"
                                                value={startDate}
                                                onChange={(e) => setStartDate(e.target.value)}
                                                disabled
                                            />
                                        </InputGroup>
                                        <InputGroup style={{ width: '60%' }}>
                                            <InputGroup.Text>
                                                ถึงวันที่
                                            </InputGroup.Text>
                                            <Form.Control
                                                type="datetime-local"
                                                value={endDate}
                                                onChange={(e) => setEndDate(e.target.value)}
                                                disabled
                                            />
                                        </InputGroup>
                                    </div>
                                )}

                                <InputGroup className="mt-3">
                                    <InputGroup.Text>
                                        <BsSearch />
                                    </InputGroup.Text>
                                    <Form.Control
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
                            </div>
                        </div>
                        <div className="text-center">
                            <Button className="me-1" variant="primary" onClick={handleSearchReport}>ค้นหา</Button>
                            <Button variant="secondary" onClick={handleSortReset}>ล้างค่า</Button>
                        </div>
                    </div>

                    {showData && showData.length > 0 ? (
                        <>
                            <div className="text-end mb-3">
                                <Button variant="danger" href={`/document/report/${encodeURIComponent(showDataString)}/${activeKey}/${search || 'default'}/${tempStatus || 'default'}/${startDate || 'default'}/${endDate || 'default'}`} target="_blank">
                                    <BsFiletypePdf style={{ fontSize: '24px' }} />&nbsp;
                                    ส่งออกข้อมูล
                                </Button>
                            </div>

                            {tempStatus === '' || tempStatus === 'vacant' || tempStatus === 'sold' || tempStatus === 'cancel' ? (
                                <Table bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>รหัสบ้าน</th>
                                            <th>บ้านเลขที่</th>
                                            <th>โซนบ้าน</th>
                                            <th>ชื่อแบบบ้าน</th>
                                            <th>เลขที่โฉนดที่ดิน</th>
                                            <th>เลขที่หน้าสำรวจ</th>
                                            <th>
                                                ขนาดพื้นที่ดิน <br />
                                                (ตารางวา)
                                            </th>
                                            <th>
                                                ขนาดพื้นที่ใช้สอย <br />
                                                (ตารางเมตร)
                                            </th>
                                            <th>ราคาบ้านพร้อมที่ดิน</th>

                                            {tempStatus === '' ? (
                                                <th>สถานะ</th>
                                            ) : null}

                                        </tr>
                                    </thead>
                                    <tbody>

                                        {showData.map((data, index) => (
                                            <tr key={index}>
                                                <td>{data.h_id}</td>
                                                <td>{data.house_no}</td>
                                                <td>{data.name}</td>
                                                <td>{data.house_name}</td>
                                                <td>{data.num_deed}</td>
                                                <td>{data.num_survey}</td>
                                                <td>{parseFloat(data.hLand_space).toLocaleString()}</td>
                                                <td>{parseFloat(data.usable_space).toLocaleString()}</td>
                                                <td>{parseFloat(data.price).toLocaleString()}</td>

                                                {tempStatus === '' ? (
                                                    data.h_status === 1 ? (
                                                        <td>
                                                            <Badge bg="success">ว่าง</Badge>
                                                        </td>
                                                    ) : data.h_status === 2 ? (
                                                        <td>
                                                            <Badge bg="info">จอง</Badge>
                                                        </td>
                                                    ) : data.h_status === 3 ? (
                                                        <td>
                                                            <Badge bg="info">ทำสัญญา</Badge>
                                                        </td>
                                                    ) : data.h_status === 4 ? (
                                                        <td>
                                                            <Badge bg="info">โอนกรรมสิทธิ์</Badge>
                                                        </td>
                                                    ) : data.h_status === 5 ? (
                                                        <td>
                                                            <Badge bg="secondary">ขายแล้ว</Badge>
                                                        </td>
                                                    ) : (
                                                        <td>
                                                            <Badge bg="danger">ยกเลิกขาย</Badge>
                                                        </td>
                                                    )
                                                ) : null}

                                            </tr>
                                        ))}

                                    </tbody>
                                </Table>
                            ) : tempStatus === 'booked' ? (
                                <Table bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>รหัสจอง</th>
                                            <th>บ้านเลขที่</th>
                                            <th>ชื่อผู้จอง</th>
                                            <th>จำนวนเงินจอง</th>
                                            <th>วันที่จอง</th>
                                            <th>หมายเหตุ</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {showData.map((data, index) => (
                                            <tr key={index}>
                                                <td>{data.b_id}</td>
                                                <td>{data.house_no}</td>
                                                <td>{data.user_name} {data.user_lastname}</td>
                                                <td>{parseFloat(data.b_amount).toLocaleString()}</td>
                                                <td>{DateTimeFormat(data.b_date)}</td>
                                                <td>{data.b_note}</td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </Table>
                            ) : tempStatus === 'contracted' ? (
                                <Table bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>บ้านเลขที่</th>
                                            <th>ชื่อผู้จอง</th>
                                            <th>เลขที่สัญญา</th>
                                            <th>เลขที่สัญญาจะซื้อจะขายที่ดิน</th>
                                            <th>ชื่อพยาน</th>
                                            <th>ชื่อพยาน</th>
                                            <th>จำนวนเงินทำสัญญา</th>
                                            <th>วันที่ทำสัญญา</th>
                                            <th>หมายเหตุ</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {showData.map((data, index) => (
                                            <tr key={index}>
                                                <td>{data.house_no}</td>
                                                <td>{data.user_name} {data.user_lastname}</td>
                                                <td>{data.con_number}</td>
                                                <td>{data.con_numLandSale}</td>
                                                <td>{data.witnessone_name}</td>
                                                <td>{data.witnesstwo_name}</td>
                                                <td>{parseFloat(data.con_amount).toLocaleString()}</td>
                                                <td>{DateTimeFormat(data.con_date)}</td>
                                                <td>{data.con_note}</td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </Table>
                            ) : status === 'transferred' && (
                                <Table bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>บ้านเลขที่</th>
                                            <th>ชื่อผู้รับโอน</th>
                                            <th>จำนวนเงินส่วนที่เหลือ</th>
                                            <th>วันที่โอนกรรมสิทธิ์</th>
                                            <th>หมายเหตุ</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {showData.map((data, index) => (
                                            <tr key={index}>
                                                <td>{data.house_no}</td>
                                                <td>{data.trans_name}</td>
                                                <td>{parseFloat(data.trans_amount).toLocaleString()}</td>
                                                <td>{DateTimeFormat(data.trans_date)}</td>
                                                <td>{data.trans_note}</td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </Table>
                            )}
                        </>
                    ) : (
                        <div className="text-center">
                            <h2 className="mt-5 mb-5">
                                ไม่มีข้อมูลที่จะแสดง
                            </h2>
                        </div>
                    )}

                </Card.Body>
            </Card>
        </ProtectRoute >
    )
}