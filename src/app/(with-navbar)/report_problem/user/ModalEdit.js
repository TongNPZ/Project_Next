import React, { useState, useEffect } from 'react';
import GetRequest from '@/app/ConfigAPI';
import { API_URL } from '../../../../../app';
import {
    API_REPORT_PROBLEM,
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
    Image
} from 'react-bootstrap';

export default function ModalEdit({ show, handleClose, id }) {
    const [imageChoose, setImageChoose] = useState(true);

    const [defaultValues, setDefaultValues] = useState({});

    const [rpProblemDetails, setRpProblemDetails] = useState('');
    const [rpProblemImage, setRpProblemImage] = useState('');

    // fecth
    useEffect(() => {
        if (show) {
            const fetchReportProblemById = async () => {
                try {
                    const result = await GetRequest(`${API_REPORT_PROBLEM}/${id}`, 'GET', null);

                    setDefaultValues(result);

                    setRpProblemDetails(result.rp_problem_details);
                    setRpProblemImage(result.rp_problem_image);
                } catch (error) {
                    console.log('error', error);
                }
            }

            fetchReportProblemById();
        }
    }, [show, id]);

    // function
    const ResetData = () => {
        setRpProblemDetails(defaultValues.rp_problem_details);
        setRpProblemImage(defaultValues.rp_problem_image);

        setImageChoose(true);
    }

    const handleCloseResetData = () => {
        ResetData();
        handleClose();
    }

    // submit
    const handleSubmit = (event) => {
        event.preventDefault();

        ConfirmUpdate().then((result) => {
            if (result.isConfirmed) {
                const editData = async () => {
                    try {
                        const formdata = new FormData();
                        formdata.append("rpId", id);
                        formdata.append("rpProblemDetails", rpProblemDetails);
                        formdata.append("rpProblemImage", rpProblemImage);

                        const response = await GetRequest(API_REPORT_PROBLEM, 'PATCH', formdata)

                        if (response.message === 'Update Successfully!') {
                            Success("แก้ไขข้อมูลสำเร็จ!")
                                .then(() => handleClose())
                                .then(() => {
                                    setImageChoose(true)
                                })
                        }
                    } catch (error) {
                        console.log('error', error);
                    }
                }

                editData()
            }
        });
    }

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
    const [keyImage, setKeyImage] = useState(0);

    const handleRestore = (event) => {
        event.preventDefault();

        ConfirmRestore().then((result) => {
            if (result.isConfirmed) {
                ResetData();
                setKeyImage((preKey) => preKey + 1);
            }
        });
    }
    // --- //

    return (
        <Modal show={show} onHide={handleCancel} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>แก้ไขข้อมูล</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="col-form-label">ชื่อผู้แจ้งปัญหา</label>
                        <div className="mt-1">
                            <Form.Control
                                type="text"
                                value={`${defaultValues.user_name} ${defaultValues.user_lastname}`}
                                disabled
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="col-form-label">บ้านเลขที่</label>
                        <div className="mt-1">
                            <Form.Control
                                type="text"
                                value={defaultValues.house_no}
                                disabled
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="col-form-label">รายละเอียดปัญหาที่แจ้ง</label>
                        <div className="mt-1">
                            <Form.Control
                                as='textarea'
                                placeholder="รายละเอียดปัญหาที่แจ้ง"
                                value={rpProblemDetails}
                                onChange={(e) => setRpProblemDetails(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="col-form-label">รูปภาพ</label>
                        <div className="mt-3">

                            {imageChoose ? (
                                rpProblemImage ? (
                                    <div className='text-center mb-3'>
                                        <Image src={`${API_URL}${rpProblemImage}`} style={{ maxWidth: 250 }} />
                                    </div>
                                ) : (
                                    <div className='text-center mt-5 mb-5'>
                                        <p>ไม่มีรูปภาพที่แสดง</p>
                                    </div>
                                )
                            ) : (
                                rpProblemImage && (
                                    <div className='text-center mb-3'>
                                        <Image src={URL.createObjectURL(new Blob([rpProblemImage], { type: rpProblemImage.type }))} style={{ maxWidth: 250 }} />
                                    </div>
                                )
                            )}

                            <Form.Control
                                type="file"
                                accept='image/*'
                                key={keyImage}
                                placeholder="เลือกรูปภาพ"
                                onChange={(e) => {
                                    setImageChoose(false)
                                    setRpProblemImage(e.target.files[0])
                                }}
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