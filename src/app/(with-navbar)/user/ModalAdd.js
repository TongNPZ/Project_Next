import React, { useState } from 'react';
import GetRequest from '@/app/ConfigAPI';
import { API_HOUSE_ZONE } from './../../../../api';
import {
    ConfirmInsert,
    ConfirmCancel,
    ConfirmRestore,
    Success
} from '@/app/componnent/SweetAlertComponent/ResponseMessage'
import {
    Modal,
    Button,
    Form
} from 'react-bootstrap';

export default function ModalAdd({ show, handleClose }) {
    const [name, setName] = useState('');
    const [landSpace, setLandSpace] = useState('');
    const [landPrice, setLandPrice] = useState('');

    // *** function *** //
    const ResetData = () => {
        setName('');
        setLandSpace('');
        setLandPrice('');
    }

    const handleCloseResetData = () => {
        ResetData();
        handleClose();
    }
    // *** //

    // submit //
    const handleSubmit = (event) => {
        event.preventDefault();

        ConfirmInsert().then((result) => {
            if (result.isConfirmed) {
                const addData = async () => {
                    try {
                        const data = {
                            name: name,
                            landSpace: parseFloat(landSpace),
                            landPrice: parseFloat(landPrice)
                        }

                        const response = await GetRequest(API_HOUSE_ZONE, 'POST', data)

                        if (response.message === 'Insert Successfully!') {
                            Success("เพิ่มข้อมูลสำเร็จ!").then(() => {
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
        <Modal show={show} onHide={handleCancel} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>เพิ่มข้อมูลโซนบ้าน</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="col-form-label">ชื่อโซน</label>
                        <div className="mt-1">
                            <Form.Control
                                type="text"
                                placeholder="ชื่อโซน"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                maxLength={100}
                                required
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className='col-md-6'>
                            <label className="col-form-label">ขนาดพื้นที่ดินเริ่มต้น (ตารางวา)</label>
                            <div className="mt-1">
                                <Form.Control
                                    type="number"
                                    placeholder="ขนาดพื้นที่ดินเริ่มต้น (ตารางวา)"
                                    value={landSpace}
                                    onChange={(e) => setLandSpace(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <label className="col-form-label">ราคาบ้านต่อที่ดิน</label>
                            <div className="mt-1">
                                <Form.Control
                                    type="number"
                                    placeholder="ราคาบ้านต่อที่ดิน"
                                    value={landPrice}
                                    onChange={(e) => setLandPrice(e.target.value)}
                                    required
                                />
                            </div>
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