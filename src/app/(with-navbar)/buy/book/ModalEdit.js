import React, { useState, useEffect } from 'react';
import GetRequest from '@/app/ConfigAPI';
import {
    API_BOOK
} from '../../../../../api';
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

    const [bAmount, setBAmount] = useState('');
    const [bNote, setBNote] = useState('');

    // *** function *** //
    const ResetData = () => {
        setBAmount(defaultValues.b_amount);
        setBNote(defaultValues.b_note);
    }

    const handleCloseResetData = () => {
        ResetData();
        handleClose();
    }
    // *** //

    // fetch //
    const fetchBook = async () => {
        try {
            const result = await GetRequest(`${API_BOOK}/${id}`, 'GET', null);

            // data default //
            setDefaultValues(result);

            // data //
            setBAmount(result.b_amount);
            setBNote(result.b_note);
        } catch (error) {
            console.log('error', error);
        }
    }

    useEffect(() => {
        if (show) {
            fetchBook();
        }
    }, [show, id]);
    // --- //

    // submit //
    const handleSubmit = (event) => {
        event.preventDefault();

        ConfirmUpdate().then((result) => {
            if (result.isConfirmed) {
                const editData = async () => {
                    try {
                        const formdata = new FormData();
                        formdata.append("id", id);
                        formdata.append("bAmount", bAmount);

                        if (bNote !== '') {
                            formdata.append("bNote", bNote);
                        } else {
                            formdata.append("bNote", '-');
                        }

                        const response = await GetRequest(API_BOOK, 'PATCH', formdata)

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
        <Modal show={show} onHide={handleCancel} size="md">
            <Modal.Header closeButton>
                <Modal.Title>แก้ไขข้อมูลจอง</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="รหัสจอง"
                        className='mb-3'
                    >
                        <Form.Control type="text" defaultValue={id} disabled />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="บ้านเลขที่"
                        className='mb-3'
                    >
                        <Form.Control type="text" defaultValue={defaultValues.house_no} disabled />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="ชื่อผู้จอง"
                        className='mb-3'
                    >
                        <Form.Control type="text" defaultValue={`${defaultValues.user_name} ${defaultValues.user_lastname}`} disabled />
                    </FloatingLabel>
                    <div className="mb-3">
                        <label className="col-form-label">จำนวนเงินจอง</label>
                        <div className="mt-1">
                            <Form.Control
                                type="number"
                                placeholder="จำนวนเงินจอง"
                                value={bAmount}
                                onChange={(e) => setBAmount(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="col-form-label">หมายเหตุ</label>
                        <div className="mt-1">
                            <Form.Control
                                as='textarea'
                                placeholder="หมายเหตุ (ถ้าไม่ต้องการกรอกหมายเหตุให้เว้นช่องกรอกนี้ไว้)"
                                value={bNote}
                                onChange={(e) => setBNote(e.target.value)}
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