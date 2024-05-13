import React, { useState, useEffect } from 'react';
import GetRequest from '@/app/ConfigAPI';
import { API_URL } from '../../../../../../app';
import {
    API_HOUSE_ESTATE,
    API_RECEIVE_COMMON_FEE
} from '../../../../../../api';
import {
    Success,
    ConfirmCancel,
    ConfirmRestore,
    ConfirmInsert
} from '@/app/componnent/SweetAlertComponent/ResponseMessage'
import {
    Modal,
    Image,
    Button,
    Form
} from 'react-bootstrap';
import {
    BsArrowCounterclockwise
} from "react-icons/bs";

export default function ModalAddSlip({ show, handleClose, ncfId, commonReceive }) {

    // show input
    const [showInput, setShowInput] = useState(false);

    // data
    const [rcfSlip, setRcfSlip] = useState('');

    // - function - //

    // reset data
    const ResetData = () => {
        setRcfSlip('');
        setShowInput(false);
    }

    // handle close reset data
    const handleCloseResetData = () => {
        ResetData();
        handleClose();
    }

    // cancel
    const handleCancel = () => {
        ConfirmCancel().then((result) => {
            if (result.isConfirmed) {
                handleCloseResetData();
            }
        });
    }

    // cancel
    const handleReturn = () => {
        ConfirmCancel().then((result) => {
            if (result.isConfirmed) {
                ResetData();
            }
        });
    }

    // return data
    const ReturnData = () => {
        setRcfSlip('');
    }

    // handle restore
    const [keyImage, setKeyImage] = useState(0);

    const handleRestore = (event) => {
        event.preventDefault();

        ConfirmRestore().then((result) => {
            if (result.isConfirmed) {
                ReturnData();
                setKeyImage((preKey) => preKey + 1);
            }
        });
    }

    // handle submit
    const handleSubmit = (event) => {
        event.preventDefault();

        ConfirmInsert().then((result) => {
            if (result.isConfirmed) {
                const addData = async () => {
                    try {
                        const formdata = new FormData();
                        formdata.append("rcfSlip", rcfSlip);
                        formdata.append("ncfId", ncfId);

                        const response = await GetRequest(API_RECEIVE_COMMON_FEE, 'POST', formdata)

                        if (response.message === 'Insert Successfully!') {
                            Success("เพิ่มข้อมูลสำเร็จ!").then(() => handleCloseResetData())
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

    return (
        <Modal show={show} onHide={() => {

            if (!showInput) {
                handleClose()
            } else {
                handleCancel()
            }
        }} size="md">
            <Modal.Header closeButton>
                <Modal.Title>ชำระเงินออนไลน์</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                {!showInput ? (
                    <Image src={`${API_URL}${commonReceive}`} fluid />
                ) : (
                    <Form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="col-form-label">รูปสลิปการชำระ</label>
                            <div className="mt-3">

                                {rcfSlip && (
                                    <div className='text-center mb-3'>
                                        <Image src={URL.createObjectURL(new Blob([rcfSlip], { type: rcfSlip.type }))} style={{ maxWidth: 250 }} />
                                    </div>
                                )}

                                <Form.Control
                                    type="file"
                                    accept='image/*'
                                    key={keyImage}
                                    placeholder="เลือกรูปภาพ"
                                    onChange={(e) => setRcfSlip(e.target.files[0])}
                                />
                            </div>
                        </div>

                        {showInput && (
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleRestore}>
                                    <BsArrowCounterclockwise style={{ fontSize: '20px' }} />
                                </Button>
                                <Button variant="secondary" onClick={handleReturn}>
                                    ย้อนกลับ
                                </Button>
                                <Button variant="success" type='submit'>
                                    บันทึกข้อมูล
                                </Button>
                            </Modal.Footer>
                        )}
                    </Form>
                )}

            </Modal.Body>

            {!showInput && (
                <Modal.Footer>
                    <Button variant="success" onClick={() => setShowInput(true)}>
                        อัพโหลดสลิป
                    </Button>
                </Modal.Footer>
            )}

        </Modal>
    );
}