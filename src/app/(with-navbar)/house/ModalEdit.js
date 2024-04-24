import React, { useState, useEffect } from 'react';
import GetRequest from '@/app/ConfigAPI';
import {
    API_HOUSE_ZONE,
    API_HOUSE_STYLE
} from './../../../../api';
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
    const [houseNameDefault, setHouseNameDefault] = useState('');
    const [hsUsableSpaceDefault, setHsUsableSpaceDefault] = useState(0);
    const [hsLandSpaceDefault, setHsLandSpaceDefault] = useState(0);
    const [image3DDefault, setImage3DDefault] = useState('');
    const [hzIdDefault, setHzIdDefault] = useState(0);

    const [houseName, setHouseName] = useState('');
    const [hsUsableSpace, setHsUsableSpace] = useState(0);
    const [hsLandSpace, setHsLandSpace] = useState(0);
    const [image3D, setImage3D] = useState('');
    const [hzId, setHzId] = useState(0);

    // *** function *** //
    const ResetData = () => {
        setHouseName(houseNameDefault);
        setHsUsableSpace(hsUsableSpaceDefault);
        setHsLandSpace(hsLandSpaceDefault);
        setImage3D(image3DDefault);
        setHzId(hzIdDefault);
    }

    const handleCloseResetData = () => {
        ResetData();
        handleClose();
    }
    // *** //

    // fecth //
    const fetchHouseStyleById = async () => {
        try {
            const result = await GetRequest(`${API_HOUSE_STYLE}/${id}`, 'GET', null);
            setHouseNameDefault(result.house_name);
            setHsUsableSpaceDefault(result.hsUsable_space);
            setHsLandSpaceDefault(result.hsLand_space);
            setImage3DDefault(result.image3d);
            setHzIdDefault(result.hz_id);

            setHouseName(result.house_name);
            setHsUsableSpace(result.hsUsable_space);
            setHsLandSpace(result.hsLand_space);
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
    }, []);
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
                            hsUsableSpace: parseFloat(hsUsableSpace),
                            hsLandSpace: parseFloat(hsLandSpace),
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
                <Modal.Title>แก้ไขข้อมูลแบบบ้าน</Modal.Title>
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
                                maxLength={100}
                                required
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className='col-md-6'>
                            <label className="col-form-label">ขนาดพื้นที่ใช้สอยเริ่มต้น</label>
                            <div className="mt-1">
                                <Form.Control
                                    type="number"
                                    placeholder="ขนาดพื้นที่ใช้สอยเริ่มต้น (ตารางเมตร)"
                                    value={hsUsableSpace}
                                    onChange={(e) => setHsUsableSpace(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <label className="col-form-label">ขนาดพื้นที่ดินเริ่มต้น</label>
                            <div className="mt-1">
                                <Form.Control
                                    type="number"
                                    placeholder="ขนาดพื้นที่ดินเริ่มต้น (ตารางวา)"
                                    value={hsLandSpace}
                                    onChange={(e) => setHsLandSpace(e.target.value)}
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
                                placeholder="ลิงค์ภาพ 3 มิติ"
                                value={image3D}
                                onChange={(e) => setImage3D(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className='mb-3'>
                        <label className="col-form-label">โซนบ้าน</label>

                        <Form.Select value={hzId} onChange={(e) => setHzId(e.target.value)}>
                            <option>กรุณาเลือกโซนบ้าน</option>

                            {showHouseZone.map((data) => (
                                <option key={data.hz_id} value={data.hz_id}>{data.name}</option>
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