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
    Tooltip,
    InputGroup,
    Pagination,
    Button
} from 'react-bootstrap';
import {
    BsClipboardCheckFill,
    BsCheckSquareFill,
    BsPencilSquare,
    BsArrowCounterclockwise,
    BsSearch
} from "react-icons/bs";

export default function ReportProblemAdmin() {

    // fecth
    const [showData, setShowData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('pending');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        const fecthReportProblem = async () => {
            try {
                const result = await GetRequest(`${API_REPORT_PROBLEM}?page=${currentPage}&limit=15&order=DESC&search=${search}&status=${status}&startDate=${startDate}&endDate=${endDate}`, 'GET', null);
                setShowData(result.data);
                setTotalPage(result.totalPage);
            } catch (error) {
                console.log('error', error);
            }
        }

        if (search !== '') {
            setCurrentPage(1);
        }

        fecthReportProblem();
    }, [showData, currentPage, search, status, startDate, endDate]);

    // function
    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSortReset = () => {
        setSearch('');
        setStatus('pending');
        setStartDate('');
        setEndDate('');
    };

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
                    <div className='row'>
                        <div className='col-md-6 d-flex align-items-center'>
                            <h5>ข้อมูลการแจ้งปัญหา</h5>
                        </div>
                        <div className='col-md-6 text-md-end'>
                            <Button className='me-2' variant="secondary" onClick={handleSortReset}>
                                <BsArrowCounterclockwise style={{ fontSize: '22px' }} />
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
                            <div className='mb-3'>
                                <Form.Select value={status} onChange={(e) => setStatus(e.target.value)} style={{ width: '190px' }}>
                                    <option value={''}>สถานะทั้งหมด</option>
                                    <option value={'pending'}>กำลังแก้ไข</option>
                                    <option value={'resolved'}>แก้ไขแล้ว</option>
                                </Form.Select>
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
                                {showData && showData.length > 0 ? (
                                    showData.map((data) => (
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
                                                    <span>-</span>
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