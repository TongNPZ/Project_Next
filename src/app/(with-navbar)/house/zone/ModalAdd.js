import React, { useState } from 'react';
import GetRequest from '@/app/ConfigAPI';
import { API_HOUSE_ZONE } from '../../../../../api';
import {
    ConfirmInsert,
    ConfirmCancel,
    ConfirmRestore,
    InsertSuccessfully
} from '@/app/componnent/SweetAlertComponent/ResponseMessage'
import {
    Modal,
    Button,
    Form
} from 'react-bootstrap';

export default function ModalAdd({ show, handleClose }) {
    const [name, setName] = useState('');
    const [landAreaPrice, setLandAreaPrice] = useState(0);

    const [confirmSubmit, setConfirmSubmit] = useState(true);

    // *** function *** //
    const ResetData = () => {
        setName('');
        setLandAreaPrice(0);
    }

    const handleCloseResetData = () => {
        ResetData();
        handleClose();
    }
    // *** //

    // submit //
    const handleSubmit = (event) => {
        event.preventDefault();

        if (confirmSubmit) {
            ConfirmInsert().then((result) => {
                if (result.isConfirmed) {
                    const addData = async () => {
                        try {
                            const data = {
                                name: name,
                                landAreaPrice: landAreaPrice
                            }

                            const response = await GetRequest(API_HOUSE_ZONE, 'POST', data)

                            if (response.message === 'Insert Successfully!') {
                                InsertSuccessfully().then(() => {
                                    setConfirmSubmit(false);
                                    handleCloseResetData();
                                }).then(() => {
                                    setConfirmSubmit(true);
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
        <Modal show={show} onHide={handleCancel}>
            <Modal.Header closeButton>
                <Modal.Title>เพิ่มข้อมูลโซนบ้าน</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                        <label className="col-md-4 col-form-label">ชื่อโซน</label>
                        <div className="col-md-8">
                            <Form.Control
                                type="text"
                                placeholder="ชื่อโซน"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                maxLength={1}
                                required
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-md-4 col-form-label">ราคาบ้านต่อที่ดิน</label>
                        <div className="col-md-8">
                            <Form.Control
                                type="number"
                                placeholder="ราคาบ้านต่อที่ดิน (ตารางวา)"
                                value={landAreaPrice}
                                onChange={(e) => setLandAreaPrice(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleRestore}>
                            คืนค่า
                        </Button>
                        <Button variant="success" type='submit'>
                            เพื่มข้อมูล
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
}