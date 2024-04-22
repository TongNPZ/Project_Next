import React, { useState, useEffect } from 'react';
import GetRequest from '@/app/ConfigAPI';
import { API_HOUSE_ZONE } from '../../../../../api';
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
    const [nameDefault, setNameDefault] = useState('');
    const [landAreaPriceDefault, setLandAreaPriceDefault] = useState(0);

    const [name, setName] = useState('');
    const [landAreaPrice, setLandAreaPrice] = useState(0);

    const [confirmSubmit, setConfirmSubmit] = useState(true);

    // *** function *** //
    const ResetData = () => {
        setName(nameDefault);
        setLandAreaPrice(landAreaPriceDefault);
    }

    const handleCloseResetData = () => {
        ResetData();
        handleClose();
    }
    // *** //

    // fecth id //
    const fetchHouseZoneById = async () => {
        try {
            const result = await GetRequest(`${API_HOUSE_ZONE}/${id}`, 'GET', null);
            setNameDefault(result.name);
            setLandAreaPriceDefault(result.landArea_price);

            setName(result.name);
            setLandAreaPrice(result.landArea_price);
        } catch (error) {
            console.log('error', error);
        }

    }

    useEffect(() => {
        if (show) {
            fetchHouseZoneById();
        }
    }, [show, id]);


    // --- //

    // submit //
    const handleSubmit = (event) => {
        event.preventDefault();

        if (confirmSubmit) {
            ConfirmUpdate().then((result) => {
                if (result.isConfirmed) {
                    const editData = async () => {
                        try {
                            const data = {
                                id: id,
                                name: name,
                                landAreaPrice: landAreaPrice
                            }

                            const response = await GetRequest(API_HOUSE_ZONE, 'PATCH', data)

                            if (response.message === 'Update Successfully!') {
                                Success("แก้ไขข้อมูลสำเร็จ!").then(() => {
                                    setConfirmSubmit(false);
                                    handleClose();
                                }).then(() => {
                                    setConfirmSubmit(true);
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
                <Modal.Title>แก้ไขข้อมูลโซนบ้าน</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="รหัสโซนบ้าน"
                        className='mb-3'
                    >
                        <Form.Control type="text" defaultValue={id} readOnly />
                    </FloatingLabel>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className="row mb-3">
                                <label className="col-md-4 col-form-label">ชื่อโซน</label>
                                <div className="col-md-8">
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
                        </div>
                        <div className='col-md-6'>
                            <div className="row mb-3">
                                <label className="col-md-6 col-form-label">ราคาบ้านต่อที่ดิน</label>
                                <div className="col-md-6">
                                    <Form.Control
                                        type="number"
                                        placeholder="ราคาบ้านต่อที่ดิน (ตารางวา)"
                                        value={landAreaPrice}
                                        onChange={(e) => setLandAreaPrice(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
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