'use client'
import React, { useEffect, useState } from 'react';
import ProtectRoute from '@/app/componnent/ProtectRoute/ProtectRoute';
import GetRequest from '@/app/ConfigAPI';
import { API_HOUSE_STYLE } from '../../../../../api';
import ModalAdd from './ModalAdd'
import ModalEdit from './ModalEdit'
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
    BsPencilSquare,
    BsFillHouseSlashFill,
    BsFillHouseAddFill,
    BsFillHouseUpFill,
    BsBadge3DFill,
    BsSearch,
    BsArrowCounterclockwise
} from "react-icons/bs";

export default function HouseStyle() {

    // fecth //
    const [showData, setShowData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('');

    const fecthHouseStyle = async () => {
        try {
            const result = await GetRequest(`${API_HOUSE_STYLE}?page=${currentPage}&limit=15&order=DESC&search=${search}&status=${status}`, 'GET', null);
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

        fecthHouseStyle();
    }, [showData, currentPage, search, status]);
    // --- //

    // function
    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSortReset = () => {
        setSearch('');
        setStatus('');
    };

    // modal add //
    const [showAdd, setShowAdd] = useState(false);

    const handleAddClose = () => setShowAdd(false);
    const handleAddShow = () => setShowAdd(true);
    // --- //

    // modal edit //
    const [selectedId, setSelectedId] = useState('');
    const [showEdit, setShowEdit] = useState(false);

    const handleEditClose = () => setShowEdit(false);
    const handleEditShow = (id) => {
        setSelectedId(id);
        setShowEdit(true);
    }
    // --- //

    // tooltip //
    const renderTooltip3D = (props) => (
        <Tooltip {...props}>
            ดูบ้าน 3 มิติ
        </Tooltip>
    );

    const renderTooltipEdit = (props) => (
        <Tooltip {...props}>
            แก้ไขข้อมูล
        </Tooltip>
    );

    const renderTooltipOpen = (props) => (
        <Tooltip {...props}>
            เปิดใช้งานแบบบ้าน
        </Tooltip>
    );

    const renderTooltipClose = (props) => (
        <Tooltip {...props}>
            ปิดใช้งานแบบบ้าน
        </Tooltip>
    );
    // --- //

    return (
        <ProtectRoute requireRoles={[1]}>

            {/* modal */}
            <ModalAdd show={showAdd} handleClose={handleAddClose} />
            <ModalEdit show={showEdit} handleClose={handleEditClose} id={selectedId} />
            {/* --- */}

            <Card>
                <Card.Header>

                    <div className='row'>
                        <div className='col-md-6 d-flex align-items-center'>
                            <h5>ข้อมูลแบบบ้าน (Type)</h5>
                        </div>
                        <div className='col-md-6 text-md-end'>
                            <Button className='me-2' variant="secondary" onClick={handleSortReset}>
                                <BsArrowCounterclockwise style={{ fontSize: '22px' }} />
                            </Button>
                            <Button variant="success" onClick={handleAddShow}>
                                <BsFillHouseAddFill style={{ fontSize: '24px' }} />
                            </Button>
                        </div>
                    </div>
                </Card.Header>
                <Card.Body>
                    <div className='row'>
                        <div className='col-md-8'>
                            <Form.Select value={status} onChange={(e) => setStatus(e.target.value)} style={{ width: '150px' }}>
                                <option value={''}>สถานะทั้งหมด</option>
                                <option value={'open'}>เปิดใช้งาน</option>
                                <option value={'close'}>ปิดใช้งาน</option>
                            </Form.Select>
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
                                    <th>รหัสแบบบ้าน</th>
                                    <th>ชื่อแบบบ้าน</th>
                                    <th>ขนาดพื้นที่ใช้สอย (ตารางเมตร)</th>
                                    <th>ราคาขาย/หลัง (บาท)</th>
                                    <th>ภาพบ้าน 3 มิติ</th>
                                    <th>โซนบ้าน</th>
                                    <th>สถานะ</th>
                                    <th>การจัดการ</th>
                                </tr>
                            </thead>
                            <tbody>

                                {showData && showData.length > 0 ? (
                                    showData.map((data) => (
                                        <tr key={data.hs_id}>
                                            <td>{data.hs_id}</td>
                                            <td>{data.house_name}</td>
                                            <td>{data.usable_space.toLocaleString()}</td>
                                            <td>{data.house_price.toLocaleString()}</td>
                                            <td>
                                                <OverlayTrigger overlay={renderTooltip3D}>
                                                    <a href={data.image3d} target="_blank" rel="noreferrer">
                                                        <BsBadge3DFill style={{ fontSize: '28px' }} />
                                                    </a>
                                                </OverlayTrigger>
                                            </td>
                                            <td>{data.name}</td>

                                            {data.hs_status === 1 ? (
                                                <td>
                                                    <Badge bg="success">เปิดใช้งาน</Badge>
                                                </td>
                                            ) : (
                                                <td>
                                                    <Badge bg="danger">ปิดใช้งาน</Badge>
                                                </td>
                                            )}

                                            {data.hs_status !== 0 ? (
                                                <td>
                                                    <OverlayTrigger overlay={renderTooltipEdit}>
                                                        <a onClick={() => handleEditShow(data.hs_id)} style={{ cursor: 'pointer' }}>
                                                            <BsPencilSquare className='me-2 text-warning' style={{ fontSize: '24px' }} />
                                                        </a>
                                                    </OverlayTrigger>

                                                    <OverlayTrigger overlay={renderTooltipClose}>
                                                        <a onClick={() => ChangedStatus(data.hs_id)} style={{ cursor: 'pointer' }}>
                                                            <BsFillHouseSlashFill className='text-danger' style={{ fontSize: '24px' }} />
                                                        </a>
                                                    </OverlayTrigger>
                                                </td>
                                            ) : (
                                                <td>
                                                    <OverlayTrigger overlay={renderTooltipOpen}>
                                                        <a onClick={() => ChangedStatus(data.hs_id)} style={{ cursor: 'pointer' }}>
                                                            <BsFillHouseUpFill className='text-success' style={{ fontSize: '24px' }} />
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