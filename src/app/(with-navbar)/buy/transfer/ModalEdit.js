import React, { useState, useEffect } from 'react';
import { DateInputFormat } from '@/app/Format';
import GetRequest from '@/app/ConfigAPI';
import { API_TRANSFER } from '../../../../../api';
import {
    Success,
    ConfirmCancel,
    ConfirmRestore,
    ConfirmUpdate
} from '@/app/componnent/SweetAlertComponent/ResponseMessage'
import {
    Modal,
    Button,
    Form,
    FloatingLabel,
} from 'react-bootstrap';

export default function ModalEdit({ show, handleClose, id }) {
    const [defaultValues, setDefaultValues] = useState({});

    const [bankName, setBankName] = useState('');
    const [bankBranch, setBankBranch] = useState('');
    const [bankNum, setBankNum] = useState('');
    const [bankDate, setBankDate] = useState('');
    const [transNote, setTransNote] = useState('');

    // *** function *** //
    const ResetData = () => {
        setBankName(defaultValues.bank_name);
        setBankBranch(defaultValues.bank_branch);
        setBankNum(defaultValues.bank_num);
        setBankDate(defaultValues.bank_date);
        setTransNote(defaultValues.trans_note);
    }

    const handleCloseResetData = () => {
        ResetData();
        handleClose();
    }
    // *** //

    // fetch //
    const fetchTransfer = async () => {
        try {
            const result = await GetRequest(`${API_TRANSFER}/${id}`, 'GET', null);

            // data default //
            setDefaultValues(result);

            // data //
            setBankName(result.bank_name);
            setBankBranch(result.bank_branch);
            setBankNum(result.bank_num);
            setBankDate(result.bank_date);
            setTransNote(result.trans_note);
        } catch (error) {
            console.log('error', error);
        }
    }

    useEffect(() => {
        if (show) {
            fetchTransfer();
        }
    }, [show, id]);

    //
    useEffect(() => {
        setBankDate(DateInputFormat(bankDate));
    }, [bankDate]);

    // --- //

    // submit //
    const handleSubmit = (event) => {
        event.preventDefault();

        ConfirmUpdate().then((result) => {
            if (result.isConfirmed) {
                const editData = async () => {
                    try {

                        let raw;

                        if (defaultValues.bank_name && defaultValues.bank_branch && defaultValues.bank_num && defaultValues.bank_date) {
                            raw = {
                                "id": id,
                                "bankName": bankName,
                                "bankBranch": bankBranch,
                                "bankNum": bankNum,
                                "bankDate": bankDate,
                                "transNote": transNote
                            };
                        } else {
                            raw = {
                                "id": id,
                                "transNote": transNote !== '' ? transNote : '-'
                            };
                        }

                        const response = await GetRequest(API_TRANSFER, 'PATCH', raw)

                        if (response.message === 'Update Successfully!') {
                            Success("แก้ไขข้อมูลสำเร็จ!").then(() => handleClose())
                        }
                    } catch (error) {
                        console.log('error', error);
                    }
                }

                editData()
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
        <Modal show={show} onHide={handleCancel} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>แก้ไขข้อมูลโอนกรรมสิทธิ์</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="รหัสจอง"
                        className='mb-3'
                    >
                        <Form.Control type="text" defaultValue={id} readOnly />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="ชื่อผู้รับโอนกรรมสิทธิ์"
                        className='mb-3'
                    >
                        <Form.Control type="text" value={`${defaultValues.user_name} ${defaultValues.user_lastname}`} disabled />
                    </FloatingLabel>

                    {defaultValues.bank_name && defaultValues.bank_branch && defaultValues.bank_num && defaultValues.bank_date ? (
                        <>
                            <div className="row mb-3">
                                <div className='col-md-6'>
                                    <label className="col-form-label">ธนาคาร</label>
                                    <div className="mt-1">
                                        <Form.Control
                                            type="text"
                                            placeholder="ชื่อธนาคาร"
                                            value={bankName}
                                            onChange={(e) => setBankName(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <label className="col-form-label">สาขา</label>
                                    <div className="mt-1">
                                        <Form.Control
                                            type="text"
                                            placeholder="สาขา"
                                            value={bankBranch}
                                            onChange={(e) => setBankBranch(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className='col-md-6'>
                                    <label className="col-form-label">เลขที่</label>
                                    <div className="mt-1">
                                        <Form.Control
                                            type="number"
                                            placeholder="เลขที่"
                                            value={bankNum}
                                            onChange={(e) => setBankNum(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <label className="col-form-label">วันที่</label>
                                    <div className="mt-1">
                                        <Form.Control
                                            type="date"
                                            value={bankDate}
                                            onChange={(e) => setBankDate(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : null}

                    <div className="mb-3">
                        <label className="col-form-label">หมายเหตุ</label>
                        <div className="mt-1">
                            <Form.Control
                                as='textarea'
                                placeholder="หมายเหตุ (ถ้าไม่ต้องการกรอกหมายเหตุให้เว้นช่องกรอกนี้ไว้)"
                                value={transNote}
                                onChange={(e) => setTransNote(e.target.value)}
                            />
                        </div>
                    </div>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleRestore}>
                            คืนค่า
                        </Button>
                        <Button variant="warning" type='submit'>
                            แก้ไขข้อมูล
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
}