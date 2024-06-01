'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DateFormat } from '@/app/Format';
import ProtectRoute from '@/app/componnent/ProtectRoute/ProtectRoute';
import GetRequest from '@/app/ConfigAPI';
import {
    API_NOTIFY_COMMON_FEE,
    API_HOUSE_OWNER
} from '../../../../../../api';
import AddNotify from './AddNotify';
import {
    Table,
    Card,
    Button,
    Form,
    OverlayTrigger,
    Tooltip,
    InputGroup,
    Pagination
} from 'react-bootstrap';
import {
    BsEnvelopeArrowUpFill,
    BsCardChecklist,
    BsArrowCounterclockwise,
    BsSearch
} from "react-icons/bs";

export default function NotifyCommonFee() {

    // router
    const router = useRouter();

    // current date
    const currentDate = new Date

    // - fecth - //
    const [showData, setShowData] = useState([]);
    const [showNcf, setShowNcf] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [search, setSearch] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        const fetchHouseOwner = async () => {
            try {
                const result = await GetRequest(`${API_HOUSE_OWNER}?page=${currentPage}&limit=15&order=DESC&search=${search}`, 'GET', null);
                setShowData(result.data);
                setTotalPage(result.totalPage);
            } catch (error) {
                console.log('error', error);
            }
        }

        const fetchNcf = async () => {
            try {
                const result = await GetRequest(`${API_NOTIFY_COMMON_FEE}?order=DESC&startDate=${startDate}&endDate=${endDate}`, 'GET', null);
                setShowNcf(result.data);
            } catch (error) {
                console.log('error', error);
            }
        }

        if (search !== '') {
            setCurrentPage(1);
        }

        const timeout = setTimeout(() => {
            fetchHouseOwner();
            fetchNcf();
        }, 60);

        return () => clearTimeout(timeout);
    }, [currentDate, currentPage, search, startDate, endDate]);

    // --- //

    // function
    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSortReset = () => {
        setSearch('');
        setStartDate('');
        setEndDate('');
    };


    function addOneYear(dateString) {
        const date = new Date(dateString);
        date.setFullYear(date.getFullYear() + 1);
        return date;
    }

    // tooltip
    const renderTooltipAddNotifyCommonFee = (props) => (
        <Tooltip {...props}>
            แจ้งชำระค่าส่วนกลาง
        </Tooltip>
    );

    return (
        <ProtectRoute requireRoles={[1]}>
            <Card>
                <Card.Header>

                    <div className='row'>
                        <div className='col-md-6 d-flex align-items-center'>
                            <h5>ข้อมูลแจ้งชำระค่าส่วนกลาง</h5>
                        </div>
                        <div className='col-md-6 text-md-end'>
                            <Button className='me-2' variant="secondary" onClick={handleSortReset}>
                                <BsArrowCounterclockwise style={{ fontSize: '22px' }} />
                            </Button>
                            <Button href='/common_fee/admin/receive' variant="success">
                                <BsCardChecklist style={{
                                    fontSize: '24px',
                                    marginRight: '5px'
                                }} /> ตรวจสอบการรับเงินค่าส่วนกลาง
                            </Button>
                        </div>
                    </div>
                </Card.Header>
                <Card.Body>
                    <div className='row'>
                        <div className='col-md-8'>
                            <div className="d-flex align-items-center mb-3">
                                <InputGroup className='me-2' style={{ width: '350px' }}>
                                    <InputGroup.Text>
                                        ค้นหาจากวันที่
                                    </InputGroup.Text>
                                    <Form.Control
                                        type="date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                    />
                                </InputGroup>
                                <InputGroup style={{ width: '300px' }}>
                                    <InputGroup.Text>
                                        ถึงวันที่
                                    </InputGroup.Text>
                                    <Form.Control
                                        type="date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                    />
                                </InputGroup>
                            </div>
                        </div>
                        <div className='col-md-4 text-md-end mb-3'>
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
                    </div>
                    <div>
                        <Table bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>ลำดับ</th>
                                    <th>บ้านเลขที่</th>
                                    <th>ชื่อเจ้าของบ้าน</th>
                                    <th>วันที่โอนกรรมสิทธิ์</th>
                                    <th>วันที่กำหนดชำระ</th>
                                    <th>สิ้นสุดวันที่</th>
                                    <th>จำนวนเงินค่าส่วนกลาง</th>
                                    <th>การจัดการ</th>
                                </tr>
                            </thead>
                            <tbody>

                                {showData && showData.length > 0 ? (
                                    (() => {
                                        const rows = showData.map((data, index) => {
                                            const currentDate = new Date();
                                            const ncfData = showNcf && showNcf.find((ncf) => ncf.h_id === data.h_id);
                                            if (!ncfData) {
                                                return null;
                                            } else {
                                                const commonRate = ncfData.common_rate;
                                                const commonMonth = ncfData.common_month;
                                                const totalPrice = (data.hLand_space * commonRate) * commonMonth;

                                                if (currentDate > new Date(ncfData.ncf_nextDate)) {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{data.house_no}</td>
                                                            <td>{data.user_name} {data.user_lastname}</td>
                                                            <td>{DateFormat(data.trans_date)}</td>
                                                            <td>{DateFormat(ncfData.ncf_nextDate)}</td>
                                                            <td>{DateFormat(addOneYear(ncfData.ncf_nextDate))}</td>
                                                            <td>{parseFloat(totalPrice).toLocaleString()}</td>
                                                            <td>
                                                                <OverlayTrigger overlay={renderTooltipAddNotifyCommonFee}>
                                                                    <a style={{ cursor: 'pointer' }} onClick={() => AddNotify(data.h_id, router)} >
                                                                        <BsEnvelopeArrowUpFill className='me-2 text-secondary' style={{ fontSize: '24px' }} />
                                                                    </a>
                                                                </OverlayTrigger>
                                                            </td>
                                                        </tr>
                                                    );
                                                } else {
                                                    return null;
                                                }
                                            }
                                        }).filter(row => row !== null);

                                        if (rows.length > 0) {
                                            return rows;
                                        } else {
                                            return (
                                                <tr>
                                                    <td colSpan="12" className="text-center">
                                                        <h4 className='mt-5 mb-5'>
                                                            ยังไม่ถึงเวลาที่แจ้งชำระ
                                                        </h4>
                                                    </td>
                                                </tr>
                                            );
                                        }
                                    })()
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
                    <Pagination className="float-end">
                        <Pagination.First disabled={currentPage === 1} onClick={() => handlePageClick(1)} />
                        <Pagination.Prev disabled={currentPage === 1} onClick={() => handlePageClick(Math.max(1, currentPage - 1))} />

                        {currentPage > 3 && (
                            <>
                                <Pagination.Item onClick={() => handlePageClick(1)}>1</Pagination.Item>
                                {currentPage > 4 && <Pagination.Ellipsis />}
                            </>
                        )}

                        {[...Array(totalPage)].slice(
                            Math.max(0, currentPage - 3),
                            Math.min(totalPage, currentPage + 2)
                        ).map((_, index) => {
                            const pageIndex = index + Math.max(0, currentPage - 3) + 1;
                            return (
                                <Pagination.Item
                                    key={pageIndex}
                                    active={pageIndex === currentPage}
                                    onClick={() => handlePageClick(pageIndex)}
                                >
                                    {pageIndex}
                                </Pagination.Item>
                            );
                        })}

                        {currentPage < totalPage - 2 && (
                            <>
                                {currentPage < totalPage - 3 && <Pagination.Ellipsis />}
                                <Pagination.Item onClick={() => handlePageClick(totalPage)}>{totalPage}</Pagination.Item>
                            </>
                        )}

                        <Pagination.Next disabled={currentPage === totalPage} onClick={() => handlePageClick(Math.min(totalPage, currentPage + 1))} />
                        <Pagination.Last disabled={currentPage === totalPage} onClick={() => handlePageClick(totalPage)} />
                    </Pagination>
                </Card.Body>
            </Card>
        </ProtectRoute>
    );
}