import React, { useState, useEffect } from 'react';
import GetRequest from '@/app/ConfigAPI';
import {
    API_HOUSE_ZONE,
    API_HOUSE_STYLE
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
    FloatingLabel
} from 'react-bootstrap';

export default function ModalEdit({ show, handleClose, id }) {
    const [defaultValues, setDefaultValues] = useState({
        houseName: "",
        usableSpace: "",
        housePrice: "",
        image3d: "",
        hzId: ""
    });

    const [houseName, setHouseName] = useState('');
    const [usableSpace, setUsableSpace] = useState('');
    const [housePrice, setHousePrice] = useState('');
    const [image3D, setImage3D] = useState('');
    const [hzId, setHzId] = useState('');

    // *** function *** //
    const ResetData = () => {
        setHouseName(defaultValues.houseName);
        setUsableSpace(defaultValues.usableSpace);
        setHousePrice(defaultValues.housePrice);
        setImage3D(defaultValues.image3d);
        setHzId(defaultValues.hzId);
    }

    const handleCloseResetData = () => {
        ResetData();
        handleClose();
    }
    // *** //

    // fecth //

    // +++ fetch house style +++ //
    const fetchHouseStyleById = async () => {
        try {
            const result = await GetRequest(`${API_HOUSE_STYLE}/${id}`, 'GET', null);
            setDefaultValues({
                houseName: result.house_name,
                usableSpace: result.usable_space,
                housePrice: result.house_price,
                image3d: result.image3d,
                hzId: result.hz_id
            });

            setHouseName(result.house_name);
            setUsableSpace(result.usable_space);
            setHousePrice(result.house_price);
            setImage3D(result.image3d);
            setHzId(result.hz_id);
        } catch (error) {
            console.log('error', error);
        }

    }

    useEffect(() => {
        if (show) {
            fetchHouseStyleById();
        }
    }, [show, id]);

    // +++ fetch house zone +++ //
    const [showHouseZone, setShowHouseZone] = useState([]);

    const fecthHouseZone = async () => {
        try {
            const result = await GetRequest(API_HOUSE_ZONE, 'GET', null);
            setShowHouseZone(result.data);
        } catch (error) {
            console.log('error', error);
        }
    }

    useEffect(() => {
        fecthHouseZone();
    }, [showHouseZone]);

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
                            houseName: houseName,
                            usableSpace: parseFloat(usableSpace),
                            housePrice: parseFloat(housePrice),
                            image3d: image3D,
                            hzId: hzId
                        }

                        const response = await GetRequest(API_HOUSE_STYLE, 'PATCH', data)

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
                <Modal.Title>แก้ไขข้อมูลแบบบ้าน (Type)</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="รหัสแบบบ้าน"
                        className='mb-3'
                    >
                        <Form.Control type="text" defaultValue={id} readOnly disabled />
                    </FloatingLabel>
                    <div className="mb-3">
                        <label className="col-form-label">ชื่อแบบบ้าน</label>
                        <div className="mt-1">
                            <Form.Control
                                type="text"
                                placeholder="ชื่อแบบบ้าน"
                                value={houseName}
                                onChange={(e) => setHouseName(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className='col-md-6'>
                            <label className="col-form-label">ขนาดพื้นที่ใช้สอย (ตารางเมตร)</label>
                            <div className="mt-1">
                                <Form.Control
                                    type="number"
                                    placeholder="ขนาดพื้นที่ใช้สอย (ตารางเมตร)"
                                    value={usableSpace}
                                    onChange={(e) => setUsableSpace(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <label className="col-form-label">ราคาขาย/หลัง (บาท)</label>
                            <div className="mt-1">
                                <Form.Control
                                    type="number"
                                    placeholder="ราคาขาย/หลัง (บาท)"
                                    value={housePrice}
                                    onChange={(e) => setHousePrice(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="col-form-label">ภาพ 3 มิติ (URL)</label>
                        <div className="mt-1">
                            <Form.Control
                                type="url"
                                placeholder="URL ภาพ 3 มิติ"
                                value={image3D}
                                onChange={(e) => setImage3D(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className='mb-3'>
                        <label className="col-form-label">โซนบ้าน</label>

                        <Form.Select value={hzId} onChange={(e) => setHzId(e.target.value)}>

                            {showHouseZone.map((data) => (
                                data.hz_status === 1 ? (
                                    <option key={data.hz_id} value={data.hz_id}>{data.name}</option>
                                ) : null
                            ))}

                        </Form.Select>
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