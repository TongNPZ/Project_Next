'use client'
import React, { useEffect, useState } from 'react';
import { DateTimeFormat } from '@/app/Format';
import GetRequest from '@/app/ConfigAPI';
import { API_URL } from '../../../../../app'
import {
    API_CONTRACT,
    API_TRANSFER
} from '../../../../../api';
import ModalDetail from './ModalDetail';
import ModalEdit from './ModalEdit'
import ChangedStatus from './ChangedStatus';
import UploadFile from './UploadFile';
import ModalTransferAdd from '../transfer/ModalAdd';
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
    BsFileEarmarkTextFill,
    BsFillXSquareFill,
    BsFillInfoCircleFill,
    BsBoxArrowUp,
    BsFileTextFill,
    BsFileEarmarkArrowUpFill,
    BsDownload,
    BsReceipt,
    BsFileEarmarkArrowDownFill,
    BsCaretRightFill,
    BsArrowCounterclockwise,
    BsSearch
} from "react-icons/bs";

export default function Book() {

    // fecth //

    // + contract + //
    const [showData, setShowData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const fecthContract = async () => {
        try {
            const result = await GetRequest(`${API_CONTRACT}?page=${currentPage}&limit=15&order=DESC&search=${search}&status=${status}&startDate=${startDate}&endDate=${endDate}`, 'GET', null);
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

        fecthContract();
    }, [showData, currentPage, search, status, startDate, endDate]);

    // + transfer + //
    const [showTransfer, setShowTransfer] = useState([]);

    const fecthTransfer = async () => {
        try {
            const result = await GetRequest(API_TRANSFER, 'GET', null);
            setShowTransfer(result.data);
        } catch (error) {
            console.log('error', error);
        }
    }

    useEffect(() => {
        fecthTransfer();
    }, [showTransfer]);

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

    // +++ modal add transfer +++ //
    const [showAddTransfer, setShowAddTransfer] = useState(false);

    const handleAddTransferClose = () => setShowAddTransfer(false);
    const handleAddTransferShow = (id) => {
        setSelectedId(id);
        setShowAddTransfer(true);
    }
    // +++ //

    // --- //

    // tooltip //
    const renderTooltipDetail = (props) => (
        <Tooltip {...props}>
            ดูรายละเอียด
        </Tooltip>
    );

    const renderTooltipUploadContract = (props) => (
        <Tooltip {...props}>
            อัพโหลดเอกสารสัญญา
        </Tooltip>
    );

    const renderTooltipUploadReceipt = (props) => (
        <Tooltip {...props}>
            อัพโหลดเอกสารใบเสร็จ
        </Tooltip>
    );

    const renderTooltipChangedContract = (props) => (
        <Tooltip {...props}>
            เปลี่ยนเอกสารสัญญา
        </Tooltip>
    );

    const renderTooltipChangedReceipt = (props) => (
        <Tooltip {...props}>
            เปลี่ยนเอกสารใบเสร็จ
        </Tooltip>
    );

    const renderTooltipDownloadContract = (props) => (
        <Tooltip {...props}>
            ดาวน์โหลดเอกสารสัญญา
        </Tooltip>
    );

    const renderTooltipDownloadReceipt = (props) => (
        <Tooltip {...props}>
            ดาวน์โหลดเอกสารใบเสร็จ
        </Tooltip>
    );

    const renderTooltipContract = (props) => (
        <Tooltip {...props}>
            แสดงเอกสารสัญญา
        </Tooltip>
    );

    const renderTooltipReceipt = (props) => (
        <Tooltip {...props}>
            แสดงเอกสารใบเสร็จ
        </Tooltip>
    );

    const renderTooltipTransfer = (props) => (
        <Tooltip {...props}>
            โอนกรรมสิทธิ์
        </Tooltip>
    );

    const renderTooltipEdit = (props) => (
        <Tooltip {...props}>
            แก้ไขข้อมูล
        </Tooltip>
    );

    const renderTooltipClose = (props) => (
        <Tooltip {...props}>
            ยกเลิกทำสัญญา
        </Tooltip>
    );
    // --- //

    return (
        <>
            {/* modal */}
            <ModalEdit show={showEdit} handleClose={handleEditClose} id={selectedId} />
            <ModalDetail show={showDetail} handleClose={handleDetailClose} id={selectedId} />
            <ModalTransferAdd show={showAddTransfer} handleClose={handleAddTransferClose} id={selectedId} />
            {/* --- */}

            <Card>
                <Card.Header>
                    <div className='row'>
                        <div className='col-md-6 d-flex align-items-center'>
                            <h5>ตารางข้อมูลสัญญา</h5>
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
                                <Form.Select value={status} onChange={(e) => setStatus(e.target.value)} style={{ width: '160px' }}>
                                    <option value={''}>สถานะทั้งหมด</option>
                                    <option value={'contracted'}>ทำสัญญาสำเร็จ</option>
                                    <option value={'processing'}>กำลังดำเนินการ</option>
                                    <option value={'cancel'}>ยกเลิกสัญญา</option>
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
                                    <th>เลขที่สัญญา</th>
                                    <th>เลขที่สัญญาจะซื้อจะขายที่ดิน</th>
                                    <th>ชื่อพยาน</th>
                                    <th>ชื่อพยาน</th>
                                    <th>จำนวนเงินทำสัญญา</th>
                                    <th>วันที่บันทึกข้อมูล</th>
                                    <th>วันที่ทำสัญญา</th>
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
                                            <td>{data.con_number}</td>
                                            <td>{data.con_numLandSale}</td>
                                            <td>{data.witnessone_name}</td>
                                            <td>{data.witnesstwo_name}</td>
                                            <td>{data.con_amount.toLocaleString()}</td>
                                            <td>{DateTimeFormat(data.con_record)}</td>

                                            {data.con_date ? (
                                                <td>{DateTimeFormat(data.con_date)}</td>
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

                                            {data.con_status === 1 ? (
                                                <td>
                                                    <Badge bg="info">รอทำสัญญา</Badge>
                                                </td>
                                            ) : data.con_status === 2 ? (
                                                <td>
                                                    <Badge bg="success">ทำสัญญาสำเร็จ</Badge>
                                                </td>
                                            ) : (
                                                <td>
                                                    <Badge bg="danger">ยกเลิกสัญญา</Badge>
                                                </td>
                                            )}

                                            {data.con_status === 1 ? (
                                                <td>

                                                    {data.contract === null || data.contract === '' ? (
                                                        <OverlayTrigger overlay={renderTooltipDownloadContract}>
                                                            <a href={`/document/contracted/${data.b_id}`} target="_blank" style={{ cursor: 'pointer' }}>
                                                                <BsFileEarmarkArrowDownFill className='me-2 mb-2 text-primary' style={{ fontSize: '28px' }} />
                                                            </a>
                                                        </OverlayTrigger>
                                                    ) : (
                                                        <OverlayTrigger overlay={renderTooltipContract}>
                                                            <a href={`${API_URL}${data.contract}`} target="_blank" style={{ cursor: 'pointer' }}>
                                                                <BsFileEarmarkTextFill className='me-2 mb-2 text-primary' style={{ fontSize: '28px' }} />
                                                            </a>
                                                        </OverlayTrigger>
                                                    )}

                                                    <OverlayTrigger overlay={renderTooltipDownloadReceipt}>
                                                        <a href={`/document/receipt/contract/${data.b_id}`} target="_blank" style={{ cursor: 'pointer' }}>
                                                            <BsDownload className='me-2 text-primary' style={{ fontSize: '28px' }} />
                                                        </a>
                                                    </OverlayTrigger>

                                                </td>
                                            ) : data.con_status !== 0 ? (
                                                <td>
                                                    <OverlayTrigger overlay={renderTooltipContract}>
                                                        <a href={`${API_URL}${data.contract}`} target="_blank" style={{ cursor: 'pointer' }}>
                                                            <BsFileEarmarkTextFill className='me-2 mb-2 text-primary' style={{ fontSize: '28px' }} />
                                                        </a>
                                                    </OverlayTrigger>
                                                </td>
                                            ) : (
                                                <td>
                                                    {/* null */}
                                                </td>
                                            )}

                                            {data.con_status === 1 ? (
                                                <td>
                                                    {data.contract !== null && data.con_receipt !== null && data.contract !== '' && data.con_receipt !== '' ? (
                                                        <OverlayTrigger overlay={renderTooltipTransfer}>
                                                            <a onClick={() => handleAddTransferShow(data.b_id)} style={{ cursor: 'pointer' }}>
                                                                <BsFileTextFill className='me-2 mb-2 text-secondary' style={{ fontSize: '24px' }} />
                                                            </a>
                                                        </OverlayTrigger>
                                                    ) : null}

                                                    {data.contract === null || data.contract === '' ? (
                                                        <OverlayTrigger overlay={renderTooltipUploadContract}>
                                                            <label htmlFor={`fileInput-contract-${data.b_id}`} style={{ cursor: 'pointer' }}>
                                                                <input
                                                                    id={`fileInput-contract-${data.b_id}`}
                                                                    type="file"
                                                                    style={{ display: 'none' }}
                                                                    value={uploadedFile ? uploadedFile.file : ''}
                                                                    onChange={(e) => {
                                                                        if (e.target.files.length > 0) {
                                                                            UploadFile(data.b_id, e.target.files[0], null);
                                                                        }
                                                                    }}
                                                                />
                                                                <BsFileEarmarkArrowUpFill className='me-2 mb-2 text-secondary' style={{ fontSize: '24px' }} />
                                                            </label>
                                                        </OverlayTrigger>
                                                    ) : (
                                                        <OverlayTrigger overlay={renderTooltipChangedContract}>
                                                            <label htmlFor={`fileInput-contract-${data.b_id}`} style={{ cursor: 'pointer' }}>
                                                                <input
                                                                    id={`fileInput-contract-${data.b_id}`}
                                                                    type="file"
                                                                    style={{ display: 'none' }}
                                                                    value={uploadedFile ? uploadedFile.file : ''}
                                                                    onChange={(e) => {
                                                                        if (e.target.files.length > 0) {
                                                                            UploadFile(data.b_id, e.target.files[0], null);
                                                                        }
                                                                    }}
                                                                />
                                                                <BsFileEarmarkArrowUpFill className='me-2 mb-2 text-warning' style={{ fontSize: '24px' }} />
                                                            </label>
                                                        </OverlayTrigger>
                                                    )}

                                                    {data.contract === null || data.contract === '' ? (
                                                        <OverlayTrigger overlay={renderTooltipEdit}>
                                                            <a onClick={() => handleEditShow(data.b_id)} style={{ cursor: 'pointer' }}>
                                                                <BsPencilSquare className='me-2 mb-2 text-warning' style={{ fontSize: '24px' }} />
                                                            </a>
                                                        </OverlayTrigger>
                                                    ) : null}

                                                    <OverlayTrigger overlay={renderTooltipClose}>
                                                        <a onClick={() => ChangedStatus(data.b_id)} style={{ cursor: 'pointer' }}>
                                                            <BsFillXSquareFill className='mb-2 text-danger' style={{ fontSize: '24px' }} />
                                                        </a>
                                                    </OverlayTrigger>
                                                </td>
                                            ) : data.con_status === 2 ? (
                                                <td>

                                                    {showTransfer.some((transfer) => transfer.b_id === data.b_id && transfer.trans_status !== 0 && transfer.h_status !== 5) ? (
                                                        <Button href="/buy/transfer" variant="secondary" size="sm">
                                                            <span>ไปยังหน้าโอนกรรมสิทธิ์</span> &nbsp;
                                                            <BsCaretRightFill />
                                                        </Button>
                                                    ) : data.h_status === 5 ? (
                                                        <Button variant="success" size="sm" disabled>
                                                            ขายสำเร็จ
                                                        </Button>
                                                    ) : (
                                                        <Button variant="danger" size="sm" disabled>
                                                            ยกเลิกโอนกรรมสิทธิ์
                                                        </Button>
                                                    )}

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
            </Card>
        </>
    );
}