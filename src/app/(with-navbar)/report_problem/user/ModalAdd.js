import React, { useState, useEffect } from 'react';
import { useAuth } from "@/app/componnent/AuthContext/AuthContext";
import GetRequest from '@/app/ConfigAPI';
import {
    API_REPORT_PROBLEM,
    API_USER_HOUSE,
    GET_API_DATA_USER
} from '../../../../../api';
import {
    ConfirmNotify,
    ConfirmCancel,
    ConfirmRestore,
    Success
} from '@/app/componnent/SweetAlertComponent/ResponseMessage'
import {
    Modal,
    Button,
    Form,
    Image
} from 'react-bootstrap';

export default function ModalAdd({ show, handleClose }) {

    // auth data
    const { authData } = useAuth();

    // data
    const [rpProblemDetails, setRpProblemDetails] = useState('');
    const [rpProblemImage, setRpProblemImage] = useState('');
    const [hId, setHId] = useState('');

    // fetch
    const [showUser, setShowUser] = useState([]);

    useEffect(() => {
        const fecthUser = async () => {
            try {
                const result = await GetRequest(`${GET_API_DATA_USER}/${authData.id}`, 'GET', null);
                setShowUser(result);
            } catch (error) {
                console.log('error', error);
            }
        }

        fecthUser()
    }, []);

    const [showUserHouse, setShowUserHouse] = useState([]);

    useEffect(() => {
        const fecthUserHouse = async () => {
            try {
                const result = await GetRequest(`${API_USER_HOUSE}/${authData.id}`, 'GET', null);
                setShowUserHouse(result.data);
            } catch (error) {
                console.log('error', error);
            }
        }

        fecthUserHouse()
    }, []);

    // *** function *** //
    const ResetData = () => {
        setRpProblemDetails('');
        setRpProblemImage('');
        setHId('');
    }

    const handleCloseResetData = () => {
        ResetData();
        handleClose();
    }
    // *** //

    // submit //
    const handleSubmit = (event) => {
        event.preventDefault();

        ConfirmNotify().then((result) => {
            if (result.isConfirmed) {
                const addData = async () => {
                    try {
                        const formdata = new FormData();
                        formdata.append("rpProblemDetails", rpProblemDetails);
                        formdata.append("rpProblemImage", rpProblemImage);
                        formdata.append("hId", hId);

                        const response = await GetRequest(API_REPORT_PROBLEM, 'POST', formdata)

                        if (response.message === 'Insert Successfully!') {
                            Success("แจ้งข้อมูลสำเร็จ!").then(() => {
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
        <Modal show={show} onHide={handleCancel} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>แจ้งปัญหา</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="col-form-label">ชื่อผู้แจ้งปัญหา</label>
                        <div className="mt-1">
                            <Form.Control
                                type="text"
                                value={`${showUser.user_name} ${showUser.user_lastname}`}
                                disabled
                            />
                        </div>
                    </div>
                    <div className='mb-3'>
                        <label className="col-form-label">บ้านเลขที่</label>
                        <Form.Select value={hId} onChange={(e) => setHId(e.target.value)} required>
                            <option value={''}>กรุณาเลือกบ้านเลขที่</option>

                            {showUserHouse.map((data, index) => (
                                data.trans_status === 2 && (
                                    <option key={index} value={data.h_id}>{data.house_no}</option>
                                )
                            ))}

                        </Form.Select>
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

                            {rpProblemImage && (
                                <div className='text-center mb-3'>
                                    <Image src={URL.createObjectURL(new Blob([rpProblemImage], { type: rpProblemImage.type }))} style={{ maxWidth: 250 }} />
                                </div>
                            )}

                            <Form.Control
                                type="file"
                                accept='image/*'
                                key={keyImage}
                                placeholder="เลือกรูปภาพ"
                                onChange={(e) => setRpProblemImage(e.target.files[0])}
                            />
                        </div>
                    </div>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleRestore}>
                            คืนค่า
                        </Button>
                        <Button variant="success" type='submit'>
                            แจ้งปัญหา
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
}