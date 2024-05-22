'use client'
import React, { useEffect, useState } from 'react';
import { DateFormat } from '@/app/Format';
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
} from 'react-bootstrap';
import {
    BsPencilSquare,
    BsFillXSquareFill,

} from "react-icons/bs";
import { IoAddCircle } from "react-icons/io5";

export default function ReceiveCommonFee() {
    const [record, setRecord] = useState([]);

    const fetcExpensesRecord = async () => {
        try {
            const result = await GetRequest(API_EXPENSES_COMMON_FEE, 'GET', null);
            setRecord(result.data);
        } catch (error) {
            console.log('error', error);
        }
    }

    useEffect(() => {
        fetcExpensesRecord();
    }, [record]);

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
                                    record.map((data) => {
                                        const formattedAmount = parseFloat(data.ex_amount).toLocaleString();
                                        return (
                                            <tr key={data.ncf_id}>
                                                <td style={{ textAlign: 'center' }} >{data.ex_id}</td>
                                                <td style={{ textAlign: 'center' }} >{DateFormat(data.ex_record)}</td>
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
                </Card.Body>
            </Card>
        </ProtectRoute >
    );
}