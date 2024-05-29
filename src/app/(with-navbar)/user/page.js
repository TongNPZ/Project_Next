'use client'
import React, { useEffect, useState } from 'react';
import ProtectRoute from '@/app/componnent/ProtectRoute/ProtectRoute';
import GetRequest from '@/app/ConfigAPI';
import { GET_API_DATA_USER } from './../../../../api';
import ModalEdit from './ModalEdit'
import ChangedStatus from './ChangedStatus';
import ModalAddRole from './ModalAddRole';
import {
    Table,
    Card,
    Form,
    Badge,
    OverlayTrigger,
    Tooltip,
    Pagination,
    InputGroup,
    Button
} from 'react-bootstrap';
import {
    BsPencilSquare,
    BsPersonFillSlash,
    BsPersonFillUp,
    BsSearch,
    BsArrowCounterclockwise
} from "react-icons/bs";

export default function HouseZone() {

    // fecth //
    const [showData, setShowData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('');

    const fecthUser = async () => {
        try {
            const result = await GetRequest(`${GET_API_DATA_USER}?page=${currentPage}&limit=15&search=${search}&status=${status}`, 'GET', null);
            setShowData(result.data);
            setTotalPage(result.totalPage);
        } catch (error) {
            console.log('error', error);
        }
    }

    useEffect(() => {

        if (search !== "") {
            setCurrentPage(1);
        }

        fecthUser();
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

    // modal //
    const [selectedId, setSelectedId] = useState('');

    // + edit + //
    const [showEdit, setShowEdit] = useState(false);
    const handleEditClose = () => setShowEdit(false);
    const handleEditShow = (id) => {
        setSelectedId(id);
        setShowEdit(true);
    }

    // + add role + //
    const [showAddRole, setShowAddRole] = useState(false);

    const handleAddRoleClose = () => setShowAddRole(false);
    const handleAddRoleShow = (id) => {
        setSelectedId(id);
        setShowAddRole(true);
    }
    // --- //

    // tooltip //
    const renderTooltipEdit = (props) => (
        <Tooltip {...props}>
            แก้ไขข้อมูล
        </Tooltip>
    );

    const renderTooltipOpen = (props) => (
        <Tooltip {...props}>
            เปิดใช้งานระบบ
        </Tooltip>
    );

    const renderTooltipClose = (props) => (
        <Tooltip {...props}>
            ปิดใช้งานระบบ
        </Tooltip>
    );
    // --- //

    return (
        <ProtectRoute requireRoles={[1]}>

            {/* modal */}
            <ModalEdit show={showEdit} handleClose={handleEditClose} id={selectedId} />
            <ModalAddRole show={showAddRole} handleClose={handleAddRoleClose} id={selectedId} />
            {/* --- */}

            <Card>
                <Card.Header>
                    <div className='row'>
                        <div className='col-md-6 d-flex align-items-center'>
                            <h5>ข้อมูลผู้ใช้งาน</h5>
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
                            <Form.Select value={status} onChange={(e) => setStatus(e.target.value)} style={{ width: '150px' }}>
                                <option value={''}>สถานะทั้งหมด</option>
                                <option value={'admin'}>ผู้จัดการ</option>
                                <option value={'customer'}>ลูกค้า</option>
                                <option value={'resident'}>ลูกบ้าน</option>
                                <option value={'unauthorized'}>ไม่มีสิทธิ์ใช้งานระบบ</option>
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
                                    <th>เลขบัตรประจำตัวประชาชน</th>
                                    <th>ชื่อจริง</th>
                                    <th>นามสกุล</th>
                                    <th>ที่อยู่</th>
                                    <th>อายุ</th>
                                    <th>สัญชาติ</th>
                                    <th>เบอร์โทรศัพท์</th>
                                    <th>สิทธิ์ใช้งานระบบ</th>
                                    <th>การจัดการ</th>
                                </tr>
                            </thead>
                            <tbody>

                                {showData && showData.length > 0 ? (
                                    showData.map((data) => (
                                        <tr key={data.user_id}>
                                            <td>{data.user_id}</td>
                                            <td>{data.user_name}</td>
                                            <td>{data.user_lastname}</td>
                                            <td>{data.user_address}</td>
                                            <td>{data.user_age}</td>
                                            <td>{data.nationality}</td>
                                            <td>{data.user_phone}</td>

                                            {data.role === 1 ? (
                                                <td>
                                                    <Badge bg="success">ผู้จัดการ</Badge>
                                                </td>
                                            ) : data.role === 2 ? (
                                                <td>
                                                    <Badge bg="warning">ลูกค้า</Badge>
                                                </td>
                                            ) : data.role === 3 ? (
                                                <td>
                                                    <Badge bg="primary">ลูกบ้าน</Badge>
                                                </td>
                                            ) : (
                                                <td>
                                                    <Badge bg="danger">ไม่มีสิทธิ์ใช้งานระบบ</Badge>
                                                </td>
                                            )}

                                            {data.role !== 0 ? (
                                                <td>
                                                    <OverlayTrigger overlay={renderTooltipEdit}>
                                                        <a onClick={() => handleEditShow(data.user_id)} style={{ cursor: 'pointer' }}>
                                                            <BsPencilSquare className='me-2 text-warning' style={{ fontSize: '24px' }} />
                                                        </a>
                                                    </OverlayTrigger>

                                                    <OverlayTrigger overlay={renderTooltipClose}>
                                                        <a onClick={() => ChangedStatus(data.user_id)} style={{ cursor: 'pointer' }}>
                                                            <BsPersonFillSlash className='text-danger' style={{ fontSize: '24px' }} />
                                                        </a>
                                                    </OverlayTrigger>
                                                </td>
                                            ) : (
                                                <td>
                                                    <OverlayTrigger overlay={renderTooltipOpen}>
                                                        <a onClick={() => handleAddRoleShow(data.user_id)} style={{ cursor: 'pointer' }}>
                                                            <BsPersonFillUp className='text-success' style={{ fontSize: '24px' }} />
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