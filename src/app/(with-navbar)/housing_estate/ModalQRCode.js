import React, { useState, useEffect } from 'react';
import GetRequest from '@/app/ConfigAPI';
import { API_URL } from '../../../../app';
import { API_HOUSE_ESTATE } from '../../../../api';
import {
    Success,
    ConfirmCancel,
    ConfirmRestore,
    ConfirmUpdate
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

export default function ModalQRCode({ show, handleClose, id }) {

    // show input
    const [showInput, setShowInput] = useState(false);

    // image choose
    const [imageChoose, setImageChoose] = useState(true);

    // fecth
    const [showData, setShowData] = useState({});
    const [commonReceive, setCommonReceive] = useState('');

    useEffect(() => {
        if (show) {
            const fetchQRCode = async () => {
                try {
                    const result = await GetRequest(`${API_HOUSE_ESTATE}/${id}`, 'GET', null);
                    setShowData(result);
                    setCommonReceive(result.common_receive);
                } catch (error) {
                    console.log('error', error);
                }
            }

            fetchQRCode();
        }
    }, [show, id, showInput]);

    // - function - //

    // reset data
    const ResetData = () => {
        setCommonReceive(showData.common_receive);
        setImageChoose(true);
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
        setCommonReceive(showData.common_receive);
        setImageChoose(true);
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

        ConfirmUpdate().then((result) => {
            if (result.isConfirmed) {
                const editData = async () => {
                    try {
                        const formdata = new FormData();
                        formdata.append("heId", id);
                        formdata.append("commonReceive", commonReceive);

                        const response = await GetRequest(API_HOUSE_ESTATE, 'PATCH', formdata)

                        if (response.message === 'Update Successfully!') {
                            Success("แก้ไขข้อมูลสำเร็จ!").then(() => ResetData())
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

    return (
        <Modal show={show} onHide={() => {

            if (!showInput) {
                handleClose()
            } else {
                handleCancel()
            }
        }} size="md">
            <Modal.Header closeButton>
                <Modal.Title>QR Code รับเงิน</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                {!showInput ? (
                    <Image src={`${API_URL}${showData.common_receive}`} fluid />
                ) : (
                    <Form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="col-form-label">QR Code</label>
                            <div className="mt-3">

                                {imageChoose ? (
                                    commonReceive ? (
                                        <div className='text-center mb-3'>
                                            <Image src={`${API_URL}${commonReceive}`} style={{ maxWidth: 250 }} />
                                        </div>
                                    ) : (
                                        <p>ไม่มีข้อมูลที่แสดง</p>
                                    )
                                ) : (
                                    commonReceive && (
                                        <div className='text-center mb-3'>
                                            <Image src={URL.createObjectURL(new Blob([commonReceive], { type: commonReceive.type }))} style={{ maxWidth: 250 }} />
                                        </div>
                                    )
                                )}


                                <Form.Control
                                    type="file"
                                    accept='image/*'
                                    key={keyImage}
                                    placeholder="เลือกรูปภาพ QR Code"
                                    onChange={(e) => {
                                        setImageChoose(false)
                                        setCommonReceive(e.target.files[0])
                                    }}
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
                                <Button variant="warning" type='submit'>
                                    แก้ไขข้อมูล
                                </Button>
                            </Modal.Footer>
                        )}
                    </Form>
                )}

            </Modal.Body>

            {!showInput && (
                <Modal.Footer>
                    <Button variant="warning" onClick={() => setShowInput(true)}>
                        เปลี่ยน QR Code
                    </Button>
                </Modal.Footer>
            )}

        </Modal>
    );
}