import React, { useState, useEffect } from 'react';
import {
    handleChangeText,
    handleChangeNumber
} from '@/app/Format';
import GetRequest from '@/app/ConfigAPI';
import {
    GET_API_DATA_USER
} from '../../../../api';
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
    ListGroup
} from 'react-bootstrap';

export default function ModalEdit({ show, handleClose, id }) {
    // default values
    const [defaultValues, setDefaultValues] = useState({});
    // - fecth - //
    // const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [userLastname, setUserLastname] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [userAge, setUserAge] = useState('');
    const [userNationality, setUserNationality] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userEmail, setUserEmail] = useState('');

    // housing estate
    useEffect(() => {
        if (show) {
            const fecthUsers = async () => {
                try {
                    const result = await GetRequest(`${GET_API_DATA_USER}/${id}`, 'GET', null);
                    setDefaultValues(result);
                    // setUserId(result.user_id);
                    setUserName(result.user_name);
                    setUserLastname(result.user_lastname);
                    setUserAddress(result.user_address);
                    setUserAge(result.user_age);
                    setUserNationality(result.nationality);
                    setUserPhone(result.user_phone);
                    setUserEmail(result.user_email);

                } catch (error) {
                    console.log('error', error);
                }
            }

            fecthUsers();
        }
    }, [show, id]);

    // - function - //

    // reset data
    const ResetData = () => {
        setUserName(defaultValues.user_name);
        setUserLastname(defaultValues.user_lastname);
        setUserAddress(defaultValues.user_id);
        setUserAge(defaultValues.user_age);
        setUserNationality(defaultValues.nationality);
        setUserPhone(defaultValues.user_phone);
        setUserEmail(defaultValues.user_email);
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

    // restore
    const handleRestore = (event) => {
        event.preventDefault();

        ConfirmRestore().then((result) => {
            if (result.isConfirmed) {
                ResetData();
            }
        });
    }

    console.log(id)
    // handle submit
    const handleSubmit = (event) => {
        event.preventDefault();

        ConfirmUpdate().then((result) => {
            if (result.isConfirmed) {
                const editData = async () => {
                    try {

                        const data = {
                            userId: id,
                            userName: userName,
                            userLastname: userLastname,
                            userAddress: userAddress,
                            userAge: userAge,
                            nationality: userNationality,
                            userPhone: userPhone,
                            userEmail: userEmail,
                        }

                        const response = await GetRequest(GET_API_DATA_USER, 'PATCH', data)

                        if (response.message === 'Update Successfully!') {
                            console.log(response)
                            Success("แก้ไขข้อมูลสำเร็จ!")
                                .then(() => handleClose())

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
        <Modal show={show} onHide={handleCancel} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>แก้ไขข้อมูลผู้ใช้</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <ListGroup variant="flush">
                        <ListGroup.Item >
                            <h6><b>ข้อมูลผู้ใช้</b></h6>
                        </ListGroup.Item>
                        <div className='ms-3 me-3 mt-3'>
                            <div className="row mb-3">
                                <div className='col-md-4'>
                                    <label className="col-form-label">ชื่อ</label>
                                    <div className="mt-1">
                                        <Form.Control
                                            type="text"
                                            placeholder="ชื่อ"
                                            value={userName}
                                            onChange={handleChangeText(setUserName)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <label className="col-form-label">นามสกุล</label>
                                    <div className="mt-1">
                                        <Form.Control
                                            type="text"
                                            placeholder="นามสกุล"
                                            value={userLastname}
                                            onChange={handleChangeText(setUserLastname)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className='col-md-2'>
                                    <label className="col-form-label">อายุ</label>
                                    <div className="mt-1">
                                        <Form.Control
                                            type="text"
                                            placeholder="อายุ"
                                            value={userAge}
                                            onChange={handleChangeNumber(setUserAge)}
                                            maxLength={3}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className='col-md-2'>
                                    <label className="col-form-label">สัญชาติ</label>
                                    <div className="mt-1">
                                        <Form.Control
                                            type="text"
                                            placeholder="สัญชาติ"
                                            value={userNationality}
                                            onChange={handleChangeText(setUserNationality)}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="col-form-label">ที่อยู่</label>
                                <div className="mt-1">
                                    <Form.Control
                                        as='textarea'
                                        placeholder="ที่อยู่"
                                        value={userAddress}
                                        onChange={(e) => setUserAddress(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <ListGroup.Item >
                            <h6><b>ข้อมูลผู้ใช้</b></h6>
                        </ListGroup.Item>
                        <div className='ms-3 me-3 mt-3 mb-3'>
                            <div className="row mb-3">
                                <div className='col-md-8'>
                                    <label className="col-form-label">อีเมล</label>
                                    <div className="mt-1">
                                        <Form.Control
                                            type='email'
                                            placeholder="อีเมล"
                                            value={userEmail}
                                            onChange={(e) => setUserEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <label className="col-form-label">เบอร์โทรศัพท์</label>
                                    <div className="mt-1">
                                        <Form.Control
                                            type="text"
                                            placeholder="เบอร์โทรศัพท์"
                                            value={userPhone}
                                            onChange={handleChangeNumber(setUserPhone)}
                                            maxLength={10}
                                            required
                                        />
                                    </div>


                                </div>
                            </div>
                        </div>
                    </ListGroup>
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
        </Modal >
    );
}