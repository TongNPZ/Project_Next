import React, { useState, useEffect } from 'react';
import GetRequest from '@/app/ConfigAPI';
import {
    GET_API_DATA_USER
} from '../../../../api';
import {
    Success,
    Error, // เพิ่ม Error จาก SweetAlertComponent
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
    // - fecth - //
    const [userPassword, setUserPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // เพิ่ม useState สำหรับ confirmPassword

    // handle close reset data
    const handleCloseResetData = () => {
        ResetData();
        handleClose();
    }

    const handleRestore = (event) => {
        event.preventDefault();

        ConfirmRestore().then((result) => {
            if (result.isConfirmed) {
                ResetData();
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

    // reset data
    const ResetData = () => {
        setUserPassword('');
        setConfirmPassword(''); // เมื่อยกเลิก รีเซ็ตค่า confirmPassword ด้วย
    }

    // handle submit
    const handleSubmit = (event) => {
        event.preventDefault();

        // Check if passwords match
        if (userPassword !== confirmPassword) {
            // If passwords don't match, show an error message
            Error("รหัสผ่านไม่ตรงกัน");
        } else {
            ConfirmUpdate().then((result) => {
                if (result.isConfirmed) {
                    const editData = async () => {
                        try {
                            const data = {
                                userId: id,
                                userPassword: userPassword,
                            }
                            const response = await GetRequest(`${GET_API_DATA_USER}/changed/password`, 'PATCH', data)

                            if (response.message === 'Update Successfully!') {
                                Success("เปลี่ยนรหัสผ่านสำเร็จ!")
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
    }

    return (
        <Modal show={show} onHide={handleCancel} size="">
            <Modal.Header closeButton>
                <Modal.Title>เปลี่ยนรหัสผ่าน</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <ListGroup variant="flush">
                        <div className='ms-3 me-3 mt-3'>
                            <div className="row mb-3">
                                <div className='col-md-12'>
                                    <label className="col-form-label">รหัสผ่านใหม่</label>
                                    <div className="mt-1">
                                        <Form.Control
                                            type="password"
                                            placeholder="รหัสผ่านใหม่"
                                            value={userPassword}
                                            onChange={(e) => setUserPassword(e.target.value)}
                                            required
                                        />
                                        <label className="col-form-label">รหัสผ่านใหม่อีกครั้ง</label>
                                        <div className="mt-1">
                                            <Form.Control
                                                type="password"
                                                placeholder="รหัสผ่านใหม่อีกครั้ง"
                                                value={confirmPassword} // เพิ่มค่า value และ onChange สำหรับ confirmPassword
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                required
                                            />
                                        </div>
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
