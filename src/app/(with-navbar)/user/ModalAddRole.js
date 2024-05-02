import React, { useState, useEffect } from 'react';
import GetRequest from '@/app/ConfigAPI';
import { GET_API_DATA_USER } from './../../../../api';
import {
    Success,
    ConfirmCancel,
    ConfirmRestore,
    ConfirmRole
} from '@/app/componnent/SweetAlertComponent/ResponseMessage'
import {
    Modal,
    Button,
    Form,
    FloatingLabel,
    ListGroup
} from 'react-bootstrap';

export default function ModalAddRole({ show, handleClose, id }) {

    // default values
    const [defaultValues, setDefaultValues] = useState({});

    // data
    const [role, setRole] = useState('');

    // *** function *** //
    const ResetData = () => {
        setRole('');
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

        ConfirmRole().then((result) => {
            if (result.isConfirmed) {
                const editData = async () => {
                    try {

                        let data;

                        if (role !== '') {
                            data = {
                                "userId": id,
                                "role": role,
                            }
                        } else {
                            data = {
                                "userId": id,
                                "role": defaultValues.role,
                            }
                        }


                        const response = await GetRequest(GET_API_DATA_USER, 'PATCH', data)

                        if (response.message === 'Update Successfully!') {
                            Success("เพิ่มสิทธิ์สำเร็จ!").then(() => {
                                handleCloseResetData();
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

    // checkbox // 
    const [checkThis, setCheckThis] = useState(false);
    // --- //

    return (
        <Modal show={show} onHide={handleCancel} size="md">
            <Modal.Header closeButton>
                <Modal.Title>เพิ่มสิทธิ์ผู้ใช้งาน</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="เลขบัตรประจำตัวประชาชน"
                                className='mb-3'
                            >
                                <Form.Control type="text" defaultValue={id} readOnly />
                            </FloatingLabel>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className='mb-3'>
                                <label className="col-form-label">
                                    สิทธิ์การใช้งาน
                                </label>
                                <div className='mt-2'>
                                    <Form.Check
                                        inline
                                        type='checkbox'
                                        label="ลูกค้า"
                                        checked={checkThis && role === 2}
                                        onChange={() => {
                                            if (checkThis && role === 2) {
                                                setCheckThis(false);
                                                setRole('');
                                            } else {
                                                setCheckThis(true);
                                                setRole(2);
                                            }
                                        }}
                                    />
                                    <Form.Check
                                        inline
                                        type='checkbox'
                                        label="ลูกบ้าน"
                                        checked={checkThis && role === 3}
                                        onChange={() => {
                                            if (checkThis && role === 3) {
                                                setCheckThis(0);
                                                setRole('');
                                            } else {
                                                setCheckThis(true);
                                                setRole(3);
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleRestore}>
                            คืนค่า
                        </Button>
                        <Button variant="success" type='submit'>
                            บันทึกข้อมูล
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
}