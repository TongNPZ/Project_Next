import React, { useState, useEffect } from 'react';
import { useAuth } from '@/app/componnent/AuthContext/AuthContext';
import GetRequest from '@/app/ConfigAPI';
import { GET_API_DATA_USER } from './../../../../api';
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
    FloatingLabel
} from 'react-bootstrap';

export default function ModalEdit({ show, handleClose, id }) {

    // authen
    const { authData } = useAuth();
    // default values
    const [defaultValues, setDefaultValues] = useState({});

    // data
    const [userName, setUserName] = useState('');
    const [userLastname, setUserLastname] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [userAge, setUserAge] = useState('');
    const [nationality, setNationality] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userEmail, setUserEmail] = useState('');

    // *** function *** //
    const ResetData = () => {
        setUserName(defaultValues.user_name);
        setUserLastname(defaultValues.user_lastname);
        setUserAddress(defaultValues.user_address);
        setUserAge(defaultValues.user_age);
        setNationality(defaultValues.nationality);
        setNationality(defaultValues.nationality);
        setUserPhone(defaultValues.user_phone);
        setUserEmail(defaultValues.user_email);
    }

    const handleCloseResetData = () => {
        ResetData();
        handleClose();
    }
    // *** //

    // fecth id //
    const fetchUserById = async () => {
        try {
            const result = await GetRequest(`${GET_API_DATA_USER}/${id}`, 'GET', null);
            setDefaultValues(result);

            setUserName(result.user_name);
            setUserLastname(result.user_lastname);
            setUserAddress(result.user_address);
            setUserAge(result.user_age);
            setNationality(result.nationality);
            setNationality(result.nationality);
            setUserPhone(result.user_phone);
            setUserEmail(result.user_email);
        } catch (error) {
            console.log('error', error);
        }

    }

    useEffect(() => {
        if (show) {
            fetchUserById();
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
                        const data = {
                            "userId": id,
                            "userName": userName,
                            "userLastname": userLastname,
                            "userAddress": userAddress,
                            "userAge": parseInt(userAge),
                            "nationality": nationality,
                            "userPhone": userPhone,
                            "userEmail": userEmail
                        }

                        const response = await GetRequest(GET_API_DATA_USER, 'PATCH', data)

                        if (response.message === 'Update Successfully!') {
                            Success("แก้ไขข้อมูลสำเร็จ!").then(() => {
                                handleClose();
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

                {authData.role === 1 ? (
                    <Modal.Title>แก้ไขข้อมูลผู้ใช้งาน</Modal.Title>
                ) : (
                    <Modal.Title>แก้ไขข้อมูลส่วนตัว</Modal.Title>
                )}

            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="เลขบัตรประจำตัวประชาชน"
                        className='mb-3'
                    >
                        <Form.Control type="text" defaultValue={id} readOnly />
                    </FloatingLabel>
                    <div className="row mb-3">
                        <div className='col-md-6'>
                            <label className="col-form-label">ชื่อจริง</label>
                            <div className="mt-1">
                                <Form.Control
                                    type="text"
                                    placeholder="ชื่อจริง"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <label className="col-form-label">นามสกุล</label>
                            <div className="mt-1">
                                <Form.Control
                                    type="text"
                                    placeholder="นามสกุล"
                                    value={userLastname}
                                    onChange={(e) => setUserLastname(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className='mb-3'>
                        <label className="col-form-label">ที่อยู่</label>
                        <div className="mt-1">
                            <Form.Control
                                as="textarea"
                                placeholder="ขนาดพื้นที่ดินเริ่มต้น (ตารางวา)"
                                value={userAddress}
                                onChange={(e) => setUserAddress(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className='col-md-6'>
                            <label className="col-form-label">อายุ</label>
                            <div className="mt-1">
                                <Form.Control
                                    type="number"
                                    placeholder="อายุ"
                                    value={userAge}
                                    onChange={(e) => setUserAge(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <label className="col-form-label">สัญชาติ</label>
                            <div className="mt-1">
                                <Form.Control
                                    type="text"
                                    placeholder="สัญชาติ"
                                    value={nationality}
                                    onChange={(e) => setNationality(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className='mb-3'>
                        <label className="col-form-label">เบอร์โทรศัพท์</label>
                        <div className="mt-1">
                            <Form.Control
                                type="text"
                                placeholder="เบอร์โทรศัพท์"
                                value={userPhone}
                                onChange={(e) => setUserPhone(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {authData.role !== 1 ? (
                        <div className='mb-3'>
                            <label className="col-form-label">อีเมล</label>
                            <div className="mt-1">
                                <Form.Control
                                    type="email"
                                    placeholder="อีเมล"
                                    value={userEmail}
                                    onChange={(e) => setUserEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    ) : null}

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