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
    const [defaultValues, setDefaultValues] = useState({
        name: "",
        landSpace: "",
        landPrice: ""
    });

    const [name, setName] = useState('');
    const [landSpace, setLandSpace] = useState('');
    const [landPrice, setLandPrice] = useState('');

    // *** function *** //
    const ResetData = () => {
        setName(defaultValues.name);
        setLandSpace(defaultValues.landSpace);
        setLandPrice(defaultValues.landPrice);
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
            setDefaultValues({
                name: result.name,
                landSpace: result.land_space,
                landPrice: result.land_price
            });

            setName(result.name);
            setLandSpace(result.land_space);
            setLandPrice(result.land_price);
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

        ConfirmUpdate().then((result) => {
            if (result.isConfirmed) {
                const editData = async () => {
                    try {
                        const data = {
                            id: id,
                            name: name,
                            landSpace: parseFloat(landSpace),
                            landPrice: parseFloat(landPrice)
                        }

                        const response = await GetRequest(API_HOUSE_ZONE, 'PATCH', data)

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
                        <Button variant="warning" type='submit'>
                            แก้ไขข้อมูล
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
}