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
    Tooltip
} from 'react-bootstrap';
import {
    BsPencilSquare,
    BsPersonFillSlash,
    BsPersonFillUp
} from "react-icons/bs";

export default function HouseZone() {

    // fecth //
    const [showData, setShowData] = useState([]);

    const fecthUser = async () => {
        try {
            const result = await GetRequest(GET_API_DATA_USER, 'GET', null);
            setShowData(result.data);
        } catch (error) {
            console.log('error', error);
        }
    }

    useEffect(() => {
        fecthUser();
    }, [showData]);
    // --- //

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
                    <h5>ตารางข้อมูลผู้ใช้งาน</h5>
                </Card.Header>
                <Card.Body>
                    <div className='row'>
                        <div className='col-md-8' />
                        <div className='col-md-4 text-md-end mb-3'>
                            <Form.Control
                                type="search"
                                placeholder="ค้นหา"
                            />
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
                                {showData.map((data) => (
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
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Card.Body>
            </Card>
        </ProtectRoute>
    );
}