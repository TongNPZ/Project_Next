import React, { useState, useEffect } from 'react';
import { DateFormat } from '@/app/Format';
import GetRequest from '@/app/ConfigAPI';
import {
    API_NOTIFY_COMMON_FEE,
} from '../../../../../../api';
import {
    ConfirmSend,
    ConfirmCancel,
    ConfirmRestore,
    Success
} from '@/app/componnent/SweetAlertComponent/ResponseMessage'
import {
    Modal,
    Button,
    Form,
} from 'react-bootstrap';

export default function ModalAdd({ show, handleClose, selected }) {
    const [ncfNote, setNcfNote] = useState('');

    // *** function *** //
    const ResetData = () => {
        setNcfNote('');
    }

    const handleCloseResetData = () => {
        ResetData();
        handleClose();
    }
    // *** //

    // submit //
    const handleSubmit = (event) => {
        event.preventDefault();

        ConfirmSend().then((result) => {
            if (result.isConfirmed) {
                const addData = async () => {
                    try {
                        const raw = {
                            "ncfNote": ncfNote === '' ? '-' : ncfNote,
                            "hId": selected.hId
                        };

                        const response = await GetRequest(API_NOTIFY_COMMON_FEE, 'POST', raw)

                        if (response.message === 'Insert Successfully!') {
                            Success("ส่งข้อมูลสำเร็จ!").then(() => {
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
    // --- //

    // cancel
    const handleCancel = () => {
        ConfirmCancel().then((result) => {
            if (result.isConfirmed) {
                handleCloseResetData();
            }
        });
    }
    // -- //

    // restore //
    const handleRestore = (event) => {
        event.preventDefault();

        ConfirmRestore().then((result) => {
            if (result.isConfirmed) {
                ResetData();
            }
        });
    }
    // --- //

    return (
        <Modal show={show} onHide={handleCancel} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>แจ้งชำระค่าส่วนกลาง</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="col-form-label">บ้านเลขที่</label>
                        <div className="mt-1">
                            <Form.Control
                                type="text"
                                value={selected.houseNo}
                                disabled
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="col-form-label">ชื่อเจ้าของบ้าน</label>
                        <div className="mt-1">
                            <Form.Control
                                type="text"
                                value={`${selected.userName} ${selected.userLastname}`}
                                disabled
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className='col-md-6'>
                            <label className="col-form-label">วันที่โอนกรรมสิทธิ์</label>
                            <div className="mt-1">
                                <Form.Control
                                    type="text"
                                    value={DateFormat(selected.transDate)}
                                    disabled
                                />
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <label className="col-form-label">วันที่แจ้งชำระค่าส่วนกลาง</label>
                            <div className="mt-1">
                                <Form.Control
                                    type="text"
                                    value={DateFormat(selected.ncfNextDate)}
                                    disabled
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="col-form-label">จำนวนเงินค่าส่วนกลาง</label>
                        <div className="mt-1">
                            <Form.Control
                                type="text"
                                value={parseFloat(selected.ncfAmount).toLocaleString()}
                                disabled
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="col-form-label">หมายเหตุ</label>
                        <div className="mt-1">
                            <Form.Control
                                as='textarea'
                                placeholder="หมายเหตุ (ถ้าไม่ต้องการกรอกหมายเหตุให้เว้นช่องกรอกนี้ไว้)"
                                value={ncfNote}
                                onChange={(e) => setNcfNote(e.target.value)}
                            />
                        </div>
                    </div>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleRestore}>
                            คืนค่า
                        </Button>
                        <Button variant="success" type='submit'>
                            ส่งข้อมูล
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal >
    );
}