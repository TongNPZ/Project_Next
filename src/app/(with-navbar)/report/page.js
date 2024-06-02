'use client'
import React, { useState } from "react"
import {
    DateTimeFormat,
    DateFormat,
    PriceWithCommas
} from "@/app/Format"
import ProtectRoute from "@/app/componnent/ProtectRoute/ProtectRoute"
import GetRequest from "@/app/ConfigAPI"
import {
    API_HOUSE,
    API_HOUSE_OWNER,
    API_BOOK,
    API_CONTRACT,
    API_TRANSFER,
    API_NOTIFY_COMMON_FEE,
    API_RECEIVE_COMMON_FEE,
    API_EXPENSES_COMMON_FEE,
    API_REPORT_PROBLEM
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

    const [tempStatus, setTempStatus] = useState('');
    const [tempStartDate, setTempStartDate] = useState('');
    const [tempEndDate, setTempEndDate] = useState('');

    const fecthHouse = async (search, status) => {
        try {
            const result = await GetRequest(`${API_HOUSE}?order=DESC&search=${search}&status=${status}`, 'GET', null)
            setShowData(result.data)
        } catch (error) {
            console.log('error', error)
        }
    }

    const fetchHouseOwner = async (search, startDate, endDate) => {
        try {
            const result = await GetRequest(`${API_HOUSE_OWNER}?order=DESC&search=${search}&startDate=${startDate}&endDate=${endDate}`, 'GET', null);
            setShowData(result.data);
        } catch (error) {
            console.log('error', error);
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

    const fetchNcf = async (search, status, startDate, endDate) => {
        try {
            const result = await GetRequest(`${API_NOTIFY_COMMON_FEE}?order=DESC&search=${search}&status=${status}&startDate=${startDate}&endDate=${endDate}`, 'GET', null);
            setShowData(result.data);
        } catch (error) {
            console.log('error', error);
        }
    }

    const [showRcf, setShowRcf] = useState([]);

    const fetchRcf = async (startDate, endDate) => {
        try {
            const result = await GetRequest(`${API_RECEIVE_COMMON_FEE}?order=DESC&startDate=${startDate}&endDate=${endDate}`, 'GET', null);
            setShowRcf(result.data);
        } catch (error) {
            console.log('error', error);
        }
    }

    const fetcExpenses = async (search, startDate, endDate) => {
        try {
            const result = await GetRequest(`${API_EXPENSES_COMMON_FEE}?order=DESC&search=${search}&startDate=${startDate}&endDate=${endDate}`, 'GET', null);
            setShowData(result.data);
        } catch (error) {
            console.log('error', error);
        }
    }

    const fecthReportProblem = async (search, status, startDate, endDate) => {
        try {
            const result = await GetRequest(`${API_REPORT_PROBLEM}?order=DESC&search=${search}&status=${status}&startDate=${startDate}&endDate=${endDate}`, 'GET', null);
            setShowData(result.data);
        } catch (error) {
            console.log('error', error);
        }
    }

    // function
    const filteredShowData = showData && showData.filter(data => {
        const rcfFindData = showRcf && showRcf.find(rcf => rcf.ncf_id === data.ncf_id);

        if (tempStartDate === '' && tempEndDate === '') {
            return rcfFindData || data.ncf_status === 0;
        } else {
            return rcfFindData
        }
    });

    const [activeKey, setActiveKey] = useState('house');

    const handleSelect = (key) => {
        setActiveKey(key)
        handleSortReset()
    };

    const handleSearchReport = async (e) => {
        e.preventDefault();

        if (status !== 'overdue') {
            setTempStartDate(startDate)
            setTempEndDate(endDate)
        } else {
            setTempStartDate('')
            setTempEndDate('')
        }

        setTempStatus(status)

        if (endDate === '') {
            setStartDate('');
        }

        if (activeKey === 'house') {
            if (status === '' || status === 'vacant' || status === 'cancel') {
                fecthHouse(search, status);
            } else if (status === 'sold') {
                fetchHouseOwner(search, startDate, endDate);
            } else if (status === 'booked') {
                fecthBook(search, status, startDate, endDate);
            } else if (status === 'contracted') {
                fecthContract(search, status, startDate, endDate);
            } else if (status === 'transferred') {
                fecthTransfer(search, status, startDate, endDate);
            }
        } else if (activeKey === 'commonFee') {
            if (status === '' || status === 'paid') {
                fetchNcf(search, status, '', '')
                fetchRcf(startDate, endDate)
            } else if (status === 'overdue') {
                fetchNcf(search, status, startDate, endDate)
                fetchRcf('', '')
            }
        } else if (activeKey === 'expenses') {
            if (status === '') {
                fetcExpenses(search, startDate, endDate);
            }
        } else if (status === '' || status === 'pending' || status === 'resolved') {
            fecthReportProblem(search, status, startDate, endDate);
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

    function base64Encode(data) {
        return Buffer.from(JSON.stringify(data)).toString('base64');
    }

    const reportData = {
        showData: showData,
        activeKey: activeKey,
        search: search || 'default',
        tempStatus: tempStatus || 'default',
        startDate: startDate || 'default',
        endDate: endDate || 'default',
        showRcf: 'default'
    }

    const encodedData = base64Encode(reportData);

    const reportDataCommonFee = {
        showData: showData,
        activeKey: activeKey,
        search: search || 'default',
        tempStatus: tempStatus || 'default',
        startDate: startDate || 'default',
        endDate: endDate || 'default',
        showRcf: showRcf
    }

    const encodedDataCommonFee = base64Encode(reportDataCommonFee);

    const filteredDataVacant = showData && showData.filter(data => data.h_status === 1);
    const filteredDataBook = showData && showData.filter(data => data.h_status === 2);
    const filteredDataContract = showData && showData.filter(data => data.h_status === 3);
    const filteredDataTransfer = showData && showData.filter(data => data.h_status === 4);
    const filteredDataSold = showData && showData.filter(data => data.h_status === 5);
    const filteredDataCancel = showData && showData.filter(data => data.h_status === 0);

    const totalPriceHouse = showData && showData.reduce((sum, data) => {
        return sum + parseFloat(data.price);
    }, 0);

    const totalPriceSold = filteredDataSold && filteredDataSold.reduce((sum, data) => {
        return sum + parseFloat(data.price);
    }, 0);

    const totalPriceSoldฺBooked = filteredDataSold && filteredDataSold.reduce((sum, data) => {
        return sum + parseFloat(data.b_amount);
    }, 0);

    const totalPriceSoldContracted = filteredDataSold && filteredDataSold.reduce((sum, data) => {
        return sum + parseFloat(data.con_amount);
    }, 0);

    const totalPriceSoldTransferred = filteredDataSold && filteredDataSold.reduce((sum, data) => {
        return sum + parseFloat(data.trans_amount);
    }, 0);

    return (
        <ProtectRoute requireRoles={[1]}>
            <Card>
                <Card.Header>
                    <Nav variant="tabs" activeKey={activeKey} onSelect={handleSelect}>
                        <Nav.Item>
                            <Nav.Link eventKey='house'>รายงานข้อมูลบ้าน</Nav.Link>
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

                                        {activeKey === 'house' ? (
                                            <>
                                                <option value={'vacant'}>ว่าง</option>
                                                <option value={'booked'}>จอง</option>
                                                <option value={'contracted'}>ทำสัญญา</option>
                                                <option value={'transferred'}>โอนกรรมสิทธิ์</option>
                                                <option value={'sold'}>ขายแล้ว</option>
                                                <option value={'cancel'}>ยกเลิกขาย</option>
                                            </>
                                        ) : activeKey === 'commonFee' ? (
                                            <>
                                                <option value={'overdue'}>ค้างชำระ</option>
                                                <option value={'paid'}>ชำระแล้ว</option>
                                            </>
                                        ) : activeKey === 'reportProblem' ? (
                                            <>
                                                <option value={'pending'}>กำลังแก้ไข</option>
                                                <option value={'resolved'}>แก้ไขแล้ว</option>
                                            </>
                                        ) : null}

                                    </Form.Select>
                                </InputGroup>
                                <InputGroup>
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
                            <div className="col-md-6">

                                {status === 'sold' || status === 'booked' || status === 'contracted' || status === 'transferred' || activeKey === 'commonFee' && status === '' || status === 'overdue' || status === 'paid' || activeKey === 'expenses' && status === '' || activeKey === 'reportProblem' && status === '' || status === 'pending' || status === 'resolved' ? (
                                    <div className="d-flex align-items-center mb-3">
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
                                    <div className="d-flex align-items-center mb-3">
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

                                <div className="text-start">
                                    <Button className="me-1" variant="primary" onClick={handleSearchReport}>ค้นหา</Button>
                                    <Button variant="secondary" onClick={handleSortReset}>ล้างค่า</Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {activeKey === 'house' ? (
                        showData && showData.length > 0 ? (
                            <>
                                <div className="text-end mb-3">
                                    <Button variant="danger" href={`/document/report/${encodeURIComponent(encodedData)}`} target="_blank">
                                        <BsFiletypePdf style={{ fontSize: '24px' }} />&nbsp;
                                        ส่งออกข้อมูล
                                    </Button>
                                </div>

                                {tempStatus === '' || tempStatus === 'vacant' || tempStatus === 'cancel' ? (
                                    <Table bordered hover responsive>
                                        <thead>
                                            <tr>
                                                <th>ลำดับ</th>
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
                                                    <td>{index + 1}</td>
                                                    <td>{data.house_no}</td>
                                                    <td>{data.name}</td>
                                                    <td>{data.house_name}</td>
                                                    <td>{data.num_deed}</td>
                                                    <td>{data.num_survey}</td>
                                                    <td>{parseFloat(data.hLand_space).toLocaleString()}</td>
                                                    <td>{parseFloat(data.usable_space).toLocaleString()}</td>
                                                    <td>{PriceWithCommas(parseFloat(data.price))}</td>

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
                                ) : tempStatus === 'sold' ? (
                                    <Table bordered hover responsive>
                                        <thead>
                                            <tr>
                                                <th>ลำดับ</th>
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
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {showData.map((data, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{data.house_no}</td>
                                                    <td>{data.name}</td>
                                                    <td>{data.house_name}</td>
                                                    <td>{data.num_deed}</td>
                                                    <td>{data.num_survey}</td>
                                                    <td>{parseFloat(data.hLand_space).toLocaleString()}</td>
                                                    <td>{parseFloat(data.usable_space).toLocaleString()}</td>
                                                    <td>{PriceWithCommas(parseFloat(data.price))}</td>

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
                                                <th>ลำดับ</th>
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
                                                    <td>{index + 1}</td>
                                                    <td>{data.house_no}</td>
                                                    <td>{data.user_name} {data.user_lastname}</td>
                                                    <td>{PriceWithCommas(parseFloat(data.b_amount))}</td>
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
                                                <th>ลำดับ</th>
                                                <th>เลขที่สัญญา</th>
                                                <th>วันที่ทำสัญญา</th>
                                                <th>ชื่อผู้ทำสัญญา</th>
                                                <th>บ้านเลขที่</th>
                                                <th>จำนวนเงินมัดจำ</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {showData.map((data, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{data.con_number}</td>
                                                    <td>{DateTimeFormat(data.con_date)}</td>
                                                    <td>{data.user_name} {data.user_lastname}</td>
                                                    <td>{data.house_no}</td>
                                                    <td>{PriceWithCommas(parseFloat(data.con_amount))}</td>
                                                </tr>
                                            ))}

                                        </tbody>
                                    </Table>
                                ) : tempStatus === 'transferred' && (
                                    <Table bordered hover responsive>
                                        <thead>
                                            <tr>
                                                <th>ลำดับ</th>
                                                <th>บ้านเลขที่</th>
                                                <th>วันที่โอนกรรมสิทธิ์</th>
                                                <th>ชื่อผู้รับโอน</th>
                                                <th>จำนวนเงินส่วนที่เหลือ</th>
                                                <th>หมายเหตุ</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {showData.map((data, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{data.house_no}</td>
                                                    <td>{DateTimeFormat(data.trans_date)}</td>
                                                    <td>{data.trans_name}</td>
                                                    <td>{PriceWithCommas(parseFloat(data.trans_amount))}</td>
                                                    <td>{data.trans_note}</td>
                                                </tr>
                                            ))}

                                        </tbody>
                                    </Table>
                                )}

                                <div className="row mt-3 mb-3">
                                    <div className='col-md-8' />

                                    {tempStatus === '' || tempStatus === 'vacant' || tempStatus === 'cancel' ? (
                                        <div className="col-md-4">

                                            {filteredDataVacant && filteredDataVacant.length > 0 && (
                                                <div className='row'>
                                                    <div className='col-md-6'>
                                                        <p className="col-form-label">รวมจำนวนบ้านที่ว่าง:</p>
                                                    </div>
                                                    <div className='col-md-4 text-end'>
                                                        <p className="col-form-label">{filteredDataVacant.length}</p>
                                                    </div>
                                                    <div className='col-md-2 text-end'>
                                                        <p className="col-form-label">หลัง</p>
                                                    </div>
                                                </div>
                                            )}

                                            {filteredDataBook && filteredDataBook.length > 0 && (
                                                <div className='row'>
                                                    <div className='col-md-6'>
                                                        <p className="col-form-label">รวมจำนวนบ้านที่กำลังจอง:</p>
                                                    </div>
                                                    <div className='col-md-4 text-end'>
                                                        <p className="col-form-label">{filteredDataBook.length}</p>
                                                    </div>
                                                    <div className='col-md-2 text-end'>
                                                        <p className="col-form-label">หลัง</p>
                                                    </div>
                                                </div>
                                            )}

                                            {filteredDataContract && filteredDataContract.length > 0 && (
                                                <div className='row'>
                                                    <div className='col-md-6'>
                                                        <p className="col-form-label">รวมจำนวนบ้านที่กำลังทำสัญญา:</p>
                                                    </div>
                                                    <div className='col-md-4 text-end'>
                                                        <p className="col-form-label">{filteredDataContract.length}</p>
                                                    </div>
                                                    <div className='col-md-2 text-end'>
                                                        <p className="col-form-label">หลัง</p>
                                                    </div>
                                                </div>
                                            )}

                                            {filteredDataTransfer && filteredDataTransfer.length > 0 && (
                                                <div className='row'>
                                                    <div className='col-md-6'>
                                                        <p className="col-form-label">รวมจำนวนบ้านที่กำลังโอนกรรมสิทธิ์:</p>
                                                    </div>
                                                    <div className='col-md-4 text-end'>
                                                        <p className="col-form-label">{filteredDataTransfer.length}</p>
                                                    </div>
                                                    <div className='col-md-2 text-end'>
                                                        <p className="col-form-label">หลัง</p>
                                                    </div>
                                                </div>
                                            )}

                                            {filteredDataSold && filteredDataSold.length > 0 && (
                                                <div className='row'>
                                                    <div className='col-md-6'>
                                                        <p className="col-form-label">รวมจำนวนบ้านที่ขายแล้ว:</p>
                                                    </div>
                                                    <div className='col-md-4 text-end'>
                                                        <p className="col-form-label">{filteredDataSold.length}</p>
                                                    </div>
                                                    <div className='col-md-2 text-end'>
                                                        <p className="col-form-label">หลัง</p>
                                                    </div>
                                                </div>
                                            )}

                                            {filteredDataCancel && filteredDataCancel.length > 0 && (
                                                <div className='row'>
                                                    <div className='col-md-6'>
                                                        <p className="col-form-label">รวมจำนวนบ้านที่ยกเลิกขาย:</p>
                                                    </div>
                                                    <div className='col-md-4 text-end'>
                                                        <p className="col-form-label">{filteredDataCancel.length}</p>
                                                    </div>
                                                    <div className='col-md-2 text-end'>
                                                        <p className="col-form-label">หลัง</p>
                                                    </div>
                                                </div>
                                            )}

                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <p className="col-form-label">รวมมูลค่าบ้านทั้งหมด:</p>
                                                </div>
                                                <div className='col-md-4 text-end'>
                                                    <p className="col-form-label">{PriceWithCommas(totalPriceHouse)}</p>
                                                </div>
                                                <div className='col-md-2 text-end'>
                                                    <p className="col-form-label">บาท</p>
                                                </div>
                                            </div>

                                        </div>
                                    ) : tempStatus === 'sold' ? (
                                        <div className="col-md-4">
                                            {filteredDataSold && filteredDataSold.length > 0 && (
                                                <>
                                                    <div className='row'>
                                                        <div className='col-md-6'>
                                                            <p className="col-form-label">รวมจำนวนบ้านที่ขายแล้ว:</p>
                                                        </div>
                                                        <div className='col-md-4 text-end'>
                                                            <p className="col-form-label">{filteredDataSold.length}</p>
                                                        </div>
                                                        <div className='col-md-2 text-end'>
                                                            <p className="col-form-label">หลัง</p>
                                                        </div>
                                                    </div>
                                                    <div className='row'>
                                                        <div className='col-md-6'>
                                                            <p className="col-form-label">รวมมูลค่าบ้านที่ขายแล้ว:</p>
                                                        </div>
                                                        <div className='col-md-4 text-end'>
                                                            <p className="col-form-label">{PriceWithCommas(totalPriceSold)}</p>
                                                        </div>
                                                        <div className='col-md-2 text-end'>
                                                            <p className="col-form-label">บาท</p>
                                                        </div>
                                                    </div>
                                                    <div className='row'>
                                                        <div className='col-md-6'>
                                                            <p className="col-form-label">รวมมูลค่าจอง:</p>
                                                        </div>
                                                        <div className='col-md-4 text-end'>
                                                            <p className="col-form-label">{PriceWithCommas(totalPriceSoldฺBooked)}</p>
                                                        </div>
                                                        <div className='col-md-2 text-end'>
                                                            <p className="col-form-label">บาท</p>
                                                        </div>
                                                    </div>
                                                    <div className='row'>
                                                        <div className='col-md-6'>
                                                            <p className="col-form-label">รวมมูลค่าเงินดาวน์:</p>
                                                        </div>
                                                        <div className='col-md-4 text-end'>
                                                            <p className="col-form-label">{PriceWithCommas(totalPriceSoldContracted)}</p>
                                                        </div>
                                                        <div className='col-md-2 text-end'>
                                                            <p className="col-form-label">บาท</p>
                                                        </div>
                                                    </div>
                                                    <div className='row'>
                                                        <div className='col-md-6'>
                                                            <p className="col-form-label">รวมมูลค่าคงเหลือ:</p>
                                                        </div>
                                                        <div className='col-md-4 text-end'>
                                                            <p className="col-form-label">{PriceWithCommas(totalPriceSoldTransferred)}</p>
                                                        </div>
                                                        <div className='col-md-2 text-end'>
                                                            <p className="col-form-label">บาท</p>
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    ) : null}
                                </div>
                            </>
                        ) : (
                            <div className="text-center">
                                <h2 className="mt-5 mb-5">
                                    ไม่มีข้อมูลที่จะแสดง
                                </h2>
                            </div>
                        )
                    ) : activeKey === 'commonFee' ? (
                        filteredShowData && filteredShowData.length > 0 ? (
                            <>
                                <div className="text-end mb-3">
                                    <Button variant="danger" href={`/document/report/${encodeURIComponent(encodedDataCommonFee)}`} target="_blank">
                                        <BsFiletypePdf style={{ fontSize: '24px' }} />&nbsp;
                                        ส่งออกข้อมูล
                                    </Button>
                                </div>

                                {tempStatus === '' || tempStatus === 'overdue' || tempStatus === 'paid' ? (
                                    <Table bordered hover responsive>
                                        <thead>
                                            <tr>
                                                <th>ลำดับ</th>
                                                <th>บ้านเลขที่</th>
                                                <th>จำนวนเงิน</th>
                                                <th>วันที่กำหนดชำระ</th>
                                                <th>วันที่ชำระ</th>

                                                {tempStatus === '' ? (
                                                    <th>สถานะ</th>
                                                ) : null}

                                            </tr>
                                        </thead>
                                        <tbody>

                                            {filteredShowData.map((data, index) => {
                                                const rcfFindData = showRcf && showRcf.find(rcf => rcf.ncf_id === data.ncf_id);
                                                const rcfSomeData = rcfFindData !== undefined;

                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{data.house_no}</td>
                                                        <td>{PriceWithCommas(parseFloat(data.ncf_amount))}</td>
                                                        <td>{DateFormat(data.ncf_date)}</td>
                                                        <td>
                                                            {rcfSomeData && rcfFindData.rcf_date ? (
                                                                DateFormat(rcfFindData.rcf_date)
                                                            ) : (
                                                                <span>-</span>
                                                            )}
                                                        </td>

                                                        {tempStatus === '' ? (
                                                            data.ncf_status === 1 ? (
                                                                <td>
                                                                    <Badge bg="success">ชำระแล้ว</Badge>
                                                                </td>
                                                            ) : (
                                                                <td>
                                                                    <Badge bg="danger">ค้างชำระ</Badge>
                                                                </td>
                                                            )
                                                        ) : null}

                                                    </tr>
                                                )
                                            })}

                                        </tbody>
                                    </Table>
                                ) : null}

                            </>
                        ) : (
                            <div className="text-center">
                                <h2 className="mt-5 mb-5">
                                    ไม่มีข้อมูลที่จะแสดง
                                </h2>
                            </div>
                        )
                    ) : activeKey === 'expenses' ? (
                        showData && showData.length > 0 ? (
                            <>
                                <div className="text-end mb-3">
                                    <Button variant="danger" href={`/document/report/${encodeURIComponent(encodedData)}`} target="_blank">
                                        <BsFiletypePdf style={{ fontSize: '24px' }} />&nbsp;
                                        ส่งออกข้อมูล
                                    </Button>
                                </div>

                                {tempStatus === '' ? (
                                    <Table bordered hover responsive>
                                        <thead>
                                            <tr>
                                                <th>ลำดับ</th>
                                                <th>รายการ</th>
                                                <th>จำนวนเงิน</th>
                                                <th>วันที่ลงบันทึก</th>
                                                <th>วันที่ชำระ</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {showData.map((data, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{data.ex_list}</td>
                                                    <td>{PriceWithCommas(parseFloat(data.ex_amount))}</td>
                                                    <td>{DateTimeFormat(data.ex_record)}</td>
                                                    <td>{DateFormat(data.ex_date)}</td>
                                                </tr>
                                            ))}

                                        </tbody>
                                    </Table>
                                ) : null}

                            </>
                        ) : (
                            <div className="text-center">
                                <h2 className="mt-5 mb-5">
                                    ไม่มีข้อมูลที่จะแสดง
                                </h2>
                            </div>
                        )
                    ) : activeKey === 'reportProblem' && (
                        showData && showData.length > 0 ? (
                            <>
                                <div className="text-end mb-3">
                                    <Button variant="danger" href={`/document/report/${encodeURIComponent(encodedData)}`} target="_blank">
                                        <BsFiletypePdf style={{ fontSize: '24px' }} />&nbsp;
                                        ส่งออกข้อมูล
                                    </Button>
                                </div>

                                {tempStatus === '' ? (
                                    <Table bordered hover responsive>
                                        <thead>
                                            <tr>
                                                <th>ลำดับ</th>
                                                <th>บ้านเลขที่</th>
                                                <th>ชื่อผู้แจ้ง</th>
                                                <th>รายละเอียดการแจ้ง</th>
                                                <th>วันที่แจ้ง</th>
                                                <th>รายละเอียดการแก้ไข</th>
                                                <th>วันที่แก้ไข</th>
                                                <th>สถานะ</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {showData.map((data, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{data.house_no}</td>
                                                    <td>{data.user_name} {data.user_lastname}</td>
                                                    <td>{data.rp_problem_details}</td>
                                                    <td>{DateTimeFormat(data.rp_problem_date)}</td>
                                                    <td>{data.rp_solved_details ? data.rp_solved_details : '-'}</td>
                                                    <td>{data.rp_solved_date ? DateTimeFormat(data.rp_solved_date) : '-'}</td>

                                                    {data.rp_status === 1 ? (
                                                        <td>
                                                            <Badge bg="success">แก้ไขแล้ว</Badge>
                                                        </td>
                                                    ) : (
                                                        <td>
                                                            <Badge bg="info">กำลังแก้ไข</Badge>
                                                        </td>
                                                    )}

                                                </tr>
                                            ))}

                                        </tbody>
                                    </Table>
                                ) : tempStatus === 'pending' ? (
                                    <Table bordered hover responsive>
                                        <thead>
                                            <tr>
                                                <th>ลำดับ</th>
                                                <th>บ้านเลขที่</th>
                                                <th>ชื่อผู้แจ้ง</th>
                                                <th>รายละเอียดการแจ้ง</th>
                                                <th>วันที่แจ้ง</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {showData.map((data, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{data.house_no}</td>
                                                    <td>{data.user_name} {data.user_lastname}</td>
                                                    <td>{data.rp_problem_details}</td>
                                                    <td>{DateTimeFormat(data.rp_problem_date)}</td>
                                                </tr>
                                            ))}

                                        </tbody>
                                    </Table>
                                ) : tempStatus === 'resolved' ? (
                                    <Table bordered hover responsive>
                                        <thead>
                                            <tr>
                                                <th>ลำดับ</th>
                                                <th>บ้านเลขที่</th>
                                                <th>ชื่อผู้แจ้ง</th>
                                                <th>รายละเอียดการแจ้ง</th>
                                                <th>วันที่แจ้ง</th>
                                                <th>รายละเอียดการแก้ไข</th>
                                                <th>วันที่แก้ไข</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {showData.map((data, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{data.house_no}</td>
                                                    <td>{data.user_name} {data.user_lastname}</td>
                                                    <td>{data.rp_problem_details}</td>
                                                    <td>{DateTimeFormat(data.rp_problem_date)}</td>
                                                    <td>{data.rp_solved_details ? data.rp_solved_details : '-'}</td>
                                                    <td>{data.rp_solved_date ? DateTimeFormat(data.rp_solved_date) : '-'}</td>
                                                </tr>
                                            ))}

                                        </tbody>
                                    </Table>
                                ) : null}

                            </>
                        ) : (
                            <div className="text-center">
                                <h2 className="mt-5 mb-5">
                                    ไม่มีข้อมูลที่จะแสดง
                                </h2>
                            </div>
                        )
                    )}
                </Card.Body>
            </Card>
        </ProtectRoute >
    )
}