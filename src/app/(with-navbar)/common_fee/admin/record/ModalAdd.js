import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { API_EXPENSES_COMMON_FEE } from '../../../../../../api';
import GetRequest from '@/app/ConfigAPI';
import { ConfirmInsert, ConfirmCancel, Success, ConfirmRestore } from '@/app/componnent/SweetAlertComponent/ResponseMessage';

export default function ModalAdd({ show, handleClose }) {
    const [exList, setExList] = useState('');
    const [exAmount, setExAmount] = useState('');
    const [recordDateTime, setRecordDateTime] = useState('');

    const ResetData = () => {
        setExList('');
        setExAmount('');
        setRecordDateTime('');
    }

    const handleCloseResetData = () => {
        ResetData();
        handleClose();
    }

    const handleCancel = () => {
        ConfirmCancel().then((result) => {
            if (result.isConfirmed) {
                handleCloseResetData();
            }
        });
    }

    const handleRestore = (event) => {
        event.preventDefault();

        ConfirmRestore().then((result) => {
            if (result.isConfirmed) {
                ResetData();
            }
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        ConfirmInsert().then((result) => {
            if (result.isConfirmed) {
                const addData = async () => {
                    try {
                        const data = {
                            exList: exList,
                            exAmount: exAmount,
                            exDate: recordDateTime,
                        }

                        const response = await GetRequest(API_EXPENSES_COMMON_FEE, 'POST', data)

                        if (response.message === 'Insert Successfully!') {
                            Success("เพิ่มข้อมูลสำเร็จ!").then(() => {
                                handleCloseResetData();
                            })
                        }
                    } catch (error) {
                        console.log('error', error);
                    }
                }

                addData()
            }
        });
    }

    return (
        <Modal show={show} onHide={handleCancel} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>บันทึกค่าใช้จ่ายส่วนกลาง</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="col-form-label">รายการ</label>
                        <div className="mt-1">
                            <Form.Control
                                type="text"
                                placeholder="รายการ"
                                value={exList}
                                onChange={(e) => setExList(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className='col-md-6'>
                            <label className="col-form-label">จำนวนเงิน</label>
                            <div className="mt-1">
                                <Form.Control
                                    type="number"
                                    placeholder="จำนวนเงิน"
                                    value={exAmount}
                                    onChange={(e) => setExAmount(e.target.value)}
                                    maxLength={6}
                                    required
                                />
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <label className="col-form-label">วันที่ลงบันทึก</label>
                            <div className="mt-1">
                                <Form.Control
                                    type="date"
                                    value={recordDateTime}
                                    onChange={(e) => setRecordDateTime(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleRestore}>
                            คืนค่า
                        </Button>
                        <Button variant="success" type='submit'>
                            บันทึก
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
