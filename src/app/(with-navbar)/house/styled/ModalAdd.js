import React, { useState, useEffect } from 'react';
import GetRequest from '@/app/ConfigAPI';
import {
    API_HOUSE_STYLE,
    API_HOUSE_ZONE
} from '../../../../../api';
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
    const [houseName, setHouseName] = useState('');
    const [hsUsableSpace, setHsUsableSpace] = useState(0);
    const [hsLandSpace, setHsLandSpace] = useState(0);
    const [image3D, setImage3D] = useState('');
    const [hzId, setHzId] = useState(0);

    // *** function *** //
    const ResetData = () => {
        setHouseName('');
        setHsUsableSpace(0);
        setHsLandSpace(0);
        setImage3D('');
        setHzId(0);
    }

    const handleCloseResetData = () => {
        ResetData();
        handleClose();
    }
    // *** //

    // fetch house zone //
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

        ConfirmInsert().then((result) => {
            if (result.isConfirmed) {
                const addData = async () => {
                    try {
                        const data = {
                            houseName: houseName,
                            hsUsableSpace: parseFloat(hsUsableSpace),
                            hsLandSpace: parseFloat(hsLandSpace),
                            Image3D: image3D,
                            hzId: hzId
                        }

                        const response = await GetRequest(API_HOUSE_STYLE, 'POST', data)

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
                <Modal.Title>เพิ่มข้อมูลแบบบ้าน</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
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
                        <Button variant="success" type='submit'>
                            เพื่มข้อมูล
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
}