'use client'
import React, { useEffect, useState } from 'react';
import {
    DateFormat,
    DateTimeFormat
} from '@/app/Format';
import ProtectRoute from '@/app/componnent/ProtectRoute/ProtectRoute';
import GetRequest from '@/app/ConfigAPI';
import ModalAdd from './ModalAdd'
import ModalEdit from './ModalEdit'
import DeleteRecord from './DeleteRecord';
import {
    API_EXPENSES_COMMON_FEE
} from '../../../../../../api';
import {
    Table,
    Card,
    Button,
    Form,
    OverlayTrigger,
    Tooltip,
    InputGroup,
    Pagination,
} from 'react-bootstrap';
import {
    BsPencilSquare,
    BsFillXSquareFill,
    BsArrowCounterclockwise,
    BsSearch
} from "react-icons/bs";
import { IoAddCircle } from "react-icons/io5";

export default function ReceiveCommonFee() {
    const [record, setRecord] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [search, setSearch] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const fetcExpensesRecord = async () => {
        try {
            const result = await GetRequest(`${API_EXPENSES_COMMON_FEE}?page=${currentPage}&limit=15&order=DESC&search=${search}&startDate=${startDate}&endDate=${endDate}`, 'GET', null);
            setRecord(result.data);
            setTotalPage(result.totalPage);
        } catch (error) {
            console.log('error', error);
        }
    }

    useEffect(() => {

        if (search !== '') {
            setCurrentPage(1);
        }

        fetcExpensesRecord();
    }, [record, currentPage, search, startDate, endDate]);

    // function
    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSortReset = () => {
        setSearch('');
        setStartDate('');
        setEndDate('');
    };

    // modal //

    // +++ modal add +++ //
    const [showAdd, setShowAdd] = useState(false);
    // ฟังก์ชันที่ใช้เพื่อเปิด Modal
    const handleAddShow = () => setShowAdd(true);
    // ฟังก์ชันที่ใช้เพื่อปิด Modal
    const handleAddClose = () => setShowAdd(false);

    const [showEdit, setShowEdit] = useState(false);
    const handleEditClose = () => setShowEdit(false);
    const handleEditShow = (id) => {
        setSelectedId(id);
        setShowEdit(true);
    }
    // +++ //

    const [selectedId, setSelectedId] = useState('');

    const renderTooltipEdit = (props) => (
        <Tooltip {...props}>
            แก้ไขข้อมูล
        </Tooltip>
    );

    const renderTooltipClose = (props) => (
        <Tooltip {...props}>
            ลบ
        </Tooltip>
    );

    return (
        <ProtectRoute requireRoles={[1]}>

            {/* modal */}
            {/* --- */}
            <ModalEdit show={showEdit} handleClose={handleEditClose} id={selectedId} />
            <ModalAdd show={showAdd} handleClose={handleAddClose} />

            <Card>
                <Card.Header>
                    <div className='row'>
                        <div className='col-md-6 d-flex align-items-center'>
                            <h5>ตารางบันทึกค่าใช้จ่ายส่วนกลาง</h5>
                        </div>
                        <div className='col-md-6 text-md-end'>
                            <Button className='me-2' variant="secondary" onClick={handleSortReset}>
                                <BsArrowCounterclockwise style={{ fontSize: '22px' }} />
                            </Button>
                            <Button variant="success" onClick={handleAddShow}>
                                <IoAddCircle style={{
                                    fontSize: '24px',
                                    marginRight: '5px'
                                }} />
                                ลงบันทึก
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
                                    <th style={{ width: '100px', textAlign: 'center' }}>ลำดับที่</th>
                                    <th style={{ width: '300px', textAlign: 'center' }}>วันที่ลงบันทึก</th>
                                    <th style={{ width: '300px', textAlign: 'center' }}>วันที่ชำระ</th>
                                    <th style={{ textAlign: 'center' }}>รายการ</th>
                                    <th style={{ width: '250px', textAlign: 'center' }}>จำนวนเงิน</th>
                                    <th style={{ width: '200px', textAlign: 'center' }}>การจัดการ</th>
                                </tr>
                            </thead>
                            <tbody>

                                {record && record.length > 0 ? (
                                    record.map((data, index) => {
                                        const formattedAmount = parseFloat(data.ex_amount).toLocaleString();
                                        return (
                                            <tr key={index}>
                                                <td style={{ textAlign: 'center' }} >{data.ex_id}</td>
                                                <td style={{ textAlign: 'center' }} >{DateTimeFormat(data.ex_record)}</td>
                                                <td style={{ textAlign: 'center' }} >{DateFormat(data.ex_date)}</td>
                                                <td >{data.ex_list}</td>
                                                <td style={{ textAlign: 'right' }}>{formattedAmount}</td>
                                                <td style={{ textAlign: 'center' }}>
                                                    <OverlayTrigger overlay={renderTooltipEdit}>
                                                        <a onClick={() => handleEditShow(data.ex_id)} style={{ cursor: 'pointer' }}>
                                                            <BsPencilSquare className='me-2 mb-2 text-warning' style={{ fontSize: '24px' }} />
                                                        </a>
                                                    </OverlayTrigger>
                                                    <OverlayTrigger overlay={renderTooltipClose}>
                                                        <a onClick={() => DeleteRecord(data.ex_id)} style={{ cursor: 'pointer' }}>
                                                            <BsFillXSquareFill className='mb-2 text-danger' style={{ fontSize: '24px' }} />
                                                        </a>
                                                    </OverlayTrigger>
                                                </td>
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
        </ProtectRoute >
    );
}