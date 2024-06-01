'use client'
import React, { useEffect, useState } from 'react';
import { DateTimeFormat } from '@/app/Format';
import GetRequest from '@/app/ConfigAPI';
import { API_URL } from '../../../../../app'
import { API_TRANSFER } from '../../../../../api';
import ModalDetail from './ModalDetail';
import ModalEdit from './ModalEdit'
import ConfirmStatus from './ConfirmStatus';
import CancelStatus from './CancelStatus';
import UploadFile from './UploadFile';
import {
    Table,
    Card,
    Button,
    Form,
    Badge,
    OverlayTrigger,
    Tooltip,
    InputGroup,
    Pagination,
} from 'react-bootstrap';
import {
    BsPencilSquare,
    BsFillHouseGearFill,
    BsFillXSquareFill,
    BsFillInfoCircleFill,
    BsBoxArrowUp,
    BsDownload,
    BsReceipt,
    BsCheckSquareFill,
    BsArrowCounterclockwise,
    BsSearch
} from "react-icons/bs";

export default function Transfer() {

    // fecth //
    const [showData, setShowData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const fecthTransfer = async () => {
        try {
            const result = await GetRequest(`${API_TRANSFER}?page=${currentPage}&limit=15&order=DESC&search=${search}&status=${status}&startDate=${startDate}&endDate=${endDate}`, 'GET', null);
            setShowData(result.data);
            setTotalPage(result.totalPage);
        } catch (error) {
            console.log('error', error);
        }
    }

    useEffect(() => {

        if (search !== '') {
            setCurrentPage(1);
        }

        fecthTransfer();
    }, [showData, currentPage, search, status, startDate, endDate]);
    // --- //

    // function //
    const [uploadedFile, setUploadedFile] = useState(null);

    useEffect(() => {
        return () => {
            setUploadedFile(null);
        };
    }, [uploadedFile]);

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSortReset = () => {
        setSearch('');
        setStatus('');
        setStartDate('');
        setEndDate('');
    };
    // --- //

    // modal //
    const [selectedId, setSelectedId] = useState('');

    // +++ modal detail +++ //
    const [showDetail, setShowDetail] = useState(false);

    const handleDetailClose = () => setShowDetail(false);
    const handleDetailShow = (id) => {
        setSelectedId(id);
        setShowDetail(true);
    }
    // +++ //

    // +++ modal edit +++ //
    const [showEdit, setShowEdit] = useState(false);

    const handleEditClose = () => setShowEdit(false);
    const handleEditShow = (id) => {
        setSelectedId(id);
        setShowEdit(true);
    }
    // +++ //

    // --- //

    // tooltip //
    const renderTooltipDetail = (props) => (
        <Tooltip {...props}>
            ดูรายละเอียด
        </Tooltip>
    );

    const renderTooltipUpload = (props) => (
        <Tooltip {...props}>
            ดาวน์โหลดใบเสร็จรับเงิน
        </Tooltip>
    );

    const renderTooltipChangedUpload = (props) => (
        <Tooltip {...props}>
            เปลี่ยนเอกสารสัญญา
        </Tooltip>
    );

    const renderTooltipDownload = (props) => (
        <Tooltip {...props}>
            ดาวน์โหลดใบเสร็จรับเงิน
        </Tooltip>
    );

    const renderTooltipReceipt = (props) => (
        <Tooltip {...props}>
            แสดงเอกสารใบเสร็จ
        </Tooltip>
    );

    const renderTooltipEdit = (props) => (
        <Tooltip {...props}>
            แก้ไขข้อมูล
        </Tooltip>
    );

    const renderTooltipConfirm = (props) => (
        <Tooltip {...props}>
            โอนกรรมสิทธิ์
        </Tooltip>
    );

    const renderTooltipClose = (props) => (
        <Tooltip {...props}>
            ยกเลิกโอนกรรมสิทธิ์
        </Tooltip>
    );
    // --- //

    return (
        <>
            {/* modal */}
            <ModalEdit show={showEdit} handleClose={handleEditClose} id={selectedId} />
            <ModalDetail show={showDetail} handleClose={handleDetailClose} id={selectedId} />
            {/* --- */}

            <Card>
                <Card.Header>
                    <div className='row'>
                        <div className='col-md-6 d-flex align-items-center'>
                            <h5>ข้อมูลโอนกรรมสิทธิ์</h5>
                        </div>
                        <div className='col-md-6 text-md-end'>
                            <Button className='me-2' variant="secondary" onClick={handleSortReset}>
                                <BsArrowCounterclockwise style={{ fontSize: '22px' }} />
                            </Button>
                            <Button href='/house' variant="success">
                                <BsFillHouseGearFill style={{
                                    fontSize: '24px',
                                    marginRight: '5px'
                                }} /> จัดการข้อมูลบ้าน
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
                                    <option value={'transferred'}>สำเร็จ</option>
                                    <option value={'processing'}>รอยืนยัน</option>
                                    <option value={'cancel'}>ยกเลิก</option>
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
                                    <th>รหัสจอง</th>
                                    <th>ชื่อผู้รับโอน</th>
                                    <th>จำนวนเงินส่วนที่เหลือ</th>
                                    <th>วันที่บันทึกข้อมูล</th>
                                    <th>วันที่โอนกรรมสิทธิ์</th>
                                    <th>รายละเอียด</th>
                                    <th>สถานะ</th>
                                    <th>เอกสาร</th>
                                    <th>การจัดการ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {showData && showData.length > 0 ? (
                                    showData.map((data) => (
                                        <tr key={data.b_id}>
                                            <td>{data.b_id}</td>
                                            <td>{data.trans_name}</td>
                                            <td>{data.trans_amount.toLocaleString()}</td>
                                            <td>{DateTimeFormat(data.trans_record)}</td>

                                            {data.trans_date ? (
                                                <td>{DateTimeFormat(data.trans_date)}</td>
                                            ) : (
                                                <td>
                                                    <span>-</span>
                                                </td>
                                            )}

                                            <td>
                                                <OverlayTrigger overlay={renderTooltipDetail}>
                                                    <a onClick={() => handleDetailShow(data.b_id)} style={{ cursor: 'pointer' }}>
                                                        <BsFillInfoCircleFill className='text-primary' style={{ fontSize: '28px' }} />
                                                    </a>
                                                </OverlayTrigger>
                                            </td>

                                            {data.trans_status === 1 ? (
                                                <td>
                                                    <Badge bg="info">รอยืนยัน</Badge>
                                                </td>
                                            ) : data.trans_status === 2 ? (
                                                <td>
                                                    <Badge bg="success">สำเร็จ</Badge>
                                                </td>
                                            ) : (
                                                <td>
                                                    <Badge bg="danger">ยกเลิก</Badge>
                                                </td>
                                            )}

                                            {data.trans_status === 2 ? (
                                                <td>
                                                    <OverlayTrigger overlay={renderTooltipDownload}>
                                                        <a href={`/document/receipt/transfer/${data.b_id}`} target="_blank" style={{ cursor: 'pointer' }}>
                                                            <BsDownload className='me-2 text-primary' style={{ fontSize: '28px' }} />
                                                        </a>
                                                    </OverlayTrigger>
                                                </td>
                                            ) : (
                                                <td>
                                                    {/* null */}
                                                </td>
                                            )}

                                            {data.trans_status === 1 ? (
                                                <td>
                                                    <>
                                                        <OverlayTrigger overlay={renderTooltipConfirm}>
                                                            <a onClick={() => ConfirmStatus(data.b_id)} style={{ cursor: 'pointer' }}>
                                                                <BsCheckSquareFill className='me-2 mb-2 text-success' style={{ fontSize: '24px' }} />
                                                            </a>
                                                        </OverlayTrigger>
                                                    </>
                                                </td>
                                            ) : (
                                                <td>
                                                    {/* null */}
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
            </Card >
        </>
    );
}