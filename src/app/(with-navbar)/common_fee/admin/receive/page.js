'use client'
import React, { useEffect, useState } from 'react';
import {
    DateFormat,
    PriceWithCommas
} from '@/app/Format';
import ProtectRoute from '@/app/componnent/ProtectRoute/ProtectRoute';
import GetRequest from '@/app/ConfigAPI';
import {
    API_NOTIFY_COMMON_FEE,
    API_RECEIVE_COMMON_FEE
} from '../../../../../../api';
import ModalCheckSlip from './ModalCheckSlip';
import RemoveData from './RemoveData';
import ChangedStatus from './ChangedStatus';
import {
    Table,
    Card,
    Button,
    Form,
    Badge,
    OverlayTrigger,
    Tooltip,
    InputGroup,
    Pagination
} from 'react-bootstrap';
import {
    BsFillTrash3Fill,
    BsFileEarmarkCheckFill,
    BsDownload,
    BsBellFill,
    BsCheckSquareFill,
    BsArrowCounterclockwise,
    BsSearch,
} from "react-icons/bs";

export default function ReceiveCommonFee() {

    // - fecth - //

    // notify common fee
    const [showData, setShowData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('');

    const fetchNotifyCommonFee = async () => {
        try {
            const result = await GetRequest(`${API_NOTIFY_COMMON_FEE}?page=${currentPage}&limit=15&order=DESC&search=${search}&status=${status}`, 'GET', null);
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

        fetchNotifyCommonFee();
    }, [showData, currentPage, search, status]);

    // show rcf
    const [showRcf, setShowRcf] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        const fetchRcf = async () => {
            try {
                const result = await GetRequest(`${API_RECEIVE_COMMON_FEE}?order=DESC&startDate=${startDate}&endDate=${endDate}`, 'GET', null);
                setShowRcf(result.data);
            } catch (error) {
                console.log('error', error);
            }
        }

        fetchRcf();
    }, [showRcf, startDate, endDate]);

    // --- //

    // fucntion
    const filteredShowData = showData && showData.filter(data => {
        const rcfFindData = showRcf && showRcf.find(rcf => rcf.ncf_id === data.ncf_id);

        if (startDate === '' && endDate === '') {
            return rcfFindData || data.ncf_status === 0;
        } else {
            return rcfFindData
        }

    });

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
            ตรวจสอบสลิปโอนเงิน
        </Tooltip>
    );

    const renderTooltipShowSlip = (props) => (
        <Tooltip {...props}>
            ดูสลิปโอนเงิน
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

    const renderTooltipUpload = (props) => (
        <Tooltip {...props}>
            ดาวน์โหลดใบเสร็จรับเงิน
        </Tooltip>
    );

    const renderTooltipChangedUpload = (props) => (
        <Tooltip {...props}>
            เปลี่ยนเอกสารใบเสร็จ
        </Tooltip>
    );

    const renderTooltipConfirm = (props) => (
        <Tooltip {...props}>
            ยืนยันการชำระ
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
                    <div className='row'>
                        <div className='col-md-6 d-flex align-items-center'>
                            <h5>ข้อมูลรับเงินค่าส่วนกลาง</h5>
                        </div>
                        <div className='col-md-6 text-md-end'>
                            <Button className='me-2' variant="secondary" onClick={handleSortReset}>
                                <BsArrowCounterclockwise style={{ fontSize: '22px' }} />
                            </Button>
                            <Button href='/common_fee/admin/notify' variant="success">
                                <BsBellFill style={{
                                    fontSize: '24px',
                                    marginRight: '5px'
                                }} /> แจ้งชำระค่าส่วนกลาง
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
                                    <option value={'overdue'}>ค้างจ่าย</option>
                                    <option value={'paid'}>ชำระเงินแล้ว</option>
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
                                    <th>รหัสแจ้งชำระค่าส่วนกลาง</th>
                                    <th>บ้านเลขที่</th>
                                    <th>ชื่อเจ้าของบ้าน</th>
                                    <th>จำนวนเงิน</th>
                                    <th>วันที่กำหนดชำระ</th>
                                    <th>สิ้นสุดวันที่</th>
                                    <th>วันที่ชำระ</th>
                                    <th>ตรวจสอบการชำระ</th>
                                    <th>เอกสาร</th>
                                    <th>สถานะ</th>
                                    <th>การจัดการ</th>
                                </tr>
                            </thead>
                            <tbody>

                                {filteredShowData && filteredShowData.length > 0 ? (
                                    filteredShowData.map((data, index) => {
                                        const rcfFindData = showRcf && showRcf.find(rcf => rcf.ncf_id === data.ncf_id);
                                        const rcfSomeData = rcfFindData !== undefined;

                                        return (
                                            <tr key={index}>
                                                <td>{data.ncf_id}</td>
                                                <td>{data.house_no}</td>
                                                <td>{data.user_name} {data.user_lastname}</td>
                                                <td>{PriceWithCommas(parseFloat(data.ncf_amount))}</td>
                                                <td>{DateFormat(data.ncf_date)}</td>
                                                <td>{DateFormat(data.ncf_nextDate)}</td>
                                                <td>
                                                    {rcfSomeData && rcfFindData.rcf_date ? (
                                                        DateFormat(rcfFindData.rcf_date)
                                                    ) : (
                                                        <p>-</p>
                                                    )}
                                                </td>
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
                                                        <p>-</p>
                                                    ) : (
                                                        <p>-</p>
                                                    )}
                                                </td>
                                                <td>
                                                    {data.ncf_status !== 0 && (
                                                        <OverlayTrigger overlay={renderTooltipDownload}>
                                                            <a href={`/document/receipt/commonFee/${rcfFindData.rcf_id}`} target="_blank" style={{ cursor: 'pointer' }}>
                                                                <BsDownload className='mb-2 text-primary' style={{ fontSize: '28px' }} />
                                                            </a>
                                                        </OverlayTrigger>
                                                    )}
                                                </td>

                                                {rcfSomeData && rcfFindData.rcf_status === 1 && data.ncf_status === 1 ? (
                                                    <td>
                                                        <Badge bg="success">ชำระแล้ว</Badge>
                                                    </td>
                                                ) : rcfSomeData && rcfFindData.rcf_status === 0 && data.ncf_status === 0 ? (
                                                    <td>
                                                        <Badge bg="info">รอชำระเงิน</Badge>
                                                    </td>
                                                ) : (
                                                    <td>
                                                        <Badge bg="danger">ค้างชำระ</Badge>
                                                    </td>
                                                )}

                                                <td>
                                                    {data.ncf_status !== 1 && data.rcf_status !== 1 ? (
                                                        <>
                                                            <OverlayTrigger overlay={renderTooltipConfirm}>
                                                                <a onClick={() => ChangedStatus(rcfFindData.rcf_id)} style={{ cursor: 'pointer' }}>
                                                                    <BsCheckSquareFill className='me-2 mb-2 text-success' style={{ fontSize: '24px' }} />
                                                                </a>
                                                            </OverlayTrigger>
                                                            {data.rcf_slip === '' && (
                                                                <OverlayTrigger overlay={renderTooltipDelete}>
                                                                    <a onClick={() => RemoveData(data.ncf_id)} style={{ cursor: 'pointer' }}>
                                                                        <BsFillTrash3Fill className='mb-2 text-danger' style={{ fontSize: '24px' }} />
                                                                    </a>
                                                                </OverlayTrigger>
                                                            )}
                                                        </>
                                                    ) : null}
                                                </td>
                                            </tr>
                                        );
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
        </ProtectRoute>
    );
}