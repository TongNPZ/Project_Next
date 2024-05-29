import React, { useState, useEffect } from 'react';
import {
    handleChangeNumber,
    handleChangeNumberAndSlash
} from '@/app/Format';
import GetRequest from '@/app/ConfigAPI';
import {
    API_HOUSE_STYLE,
    API_HOUSE
} from './../../../../api';
import {
    ConfirmInsert,
    ConfirmCancel,
    ConfirmRestore,
    Success
} from '@/app/componnent/SweetAlertComponent/ResponseMessage'
import {
    Modal,
    Button,
    Form,
    Image
} from 'react-bootstrap';

export default function ModalAdd({ show, handleClose }) {
    const [showInputHLandSpace, setShowInputHLandSpace] = useState(false);

    const [houseNo, setHouseNo] = useState('');
    const [numDeed, setNumDeed] = useState('');
    const [numSurvey, setNumSurvey] = useState('');
    const [hLandSpace, setHLandSpace] = useState('');
    const [note, setNote] = useState('');
    const [image, setImage] = useState('');
    const [hsId, setHsId] = useState('');

    // *** function *** //
    const ResetData = () => {
        setHouseNo('');
        setNumDeed('');
        setNumSurvey('');
        setHLandSpace('');
        setNote('');
        setImage('');
        setHsId('');

        setShowInputHLandSpace(false);
    }

    const handleCloseResetData = () => {
        ResetData();
        handleClose();
    }
    // *** //

    // fetch //

    // +++ house style +++ //
    const [showHouseStyle, setShowHouseStyle] = useState([]);

    const fecthHouseStyle = async () => {
        try {
            const result = await GetRequest(API_HOUSE_STYLE, 'GET', null);
            setShowHouseStyle(result.data);
        } catch (error) {
            console.log('error', error);
        }
    }

    useEffect(() => {
        fecthHouseStyle();
    }, []);
    // +++ //

    // +++ house style by id +++ //
    const [showHouseStyleById, setShowHouseStyleById] = useState({});

    const fecthHouseStyleById = async () => {
        try {
            const result = await GetRequest(`${API_HOUSE_STYLE}/${hsId}`, 'GET', null);
            setShowHouseStyleById(result);
        } catch (error) {
            console.log('error', error);
        }
    };

    useEffect(() => {

        if (hsId === '') {
            setHLandSpace('');
        }

        fecthHouseStyleById();
    }, [hsId]);
    // +++ //

    // --- //

    // submit //
    const handleSubmit = (event) => {
        event.preventDefault();

        ConfirmInsert().then((result) => {
            if (result.isConfirmed) {
                const addData = async () => {
                    try {
                        const formdata = new FormData();
                        formdata.append("houseNo", houseNo);
                        formdata.append("numDeed", numDeed);
                        formdata.append("numSurvey", numSurvey);
                        formdata.append("hLandSpace", parseFloat(hLandSpace));

                        if (note === '') {
                            formdata.append("note", '-');
                        } else {
                            formdata.append("note", note);
                        }

                        formdata.append("image", image);
                        formdata.append("hsId", parseFloat(hsId));

                        const response = await GetRequest(API_HOUSE, 'POST', formdata)

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
    const [keyImage, setKeyImage] = useState(0);

    const handleRestore = (event) => {
        event.preventDefault();

        ConfirmRestore().then((result) => {
            if (result.isConfirmed) {
                ResetData();
                setKeyImage((preKey) => preKey + 1);
            }
        });
    }
    // --- //

    return (
        <Modal show={show} onHide={handleCancel} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>เพิ่มข้อมูลบ้าน</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label className="col-form-label">แบบบ้าน</label>
                        <Form.Select value={hsId} onChange={(e) => setHsId(e.target.value)}>
                            <option value={''}>กรุณาเลือกแบบบ้าน</option>

                            {showHouseStyle.map((data) => (
                                data.hs_status === 1 ? (
                                    <option key={data.hs_id} value={data.hs_id}>{data.house_name}</option>
                                ) : null
                            ))}

                        </Form.Select>
                    </div>
                    <div className="mb-3">
                        <label className="col-form-label">บ้านเลขที่</label>
                        <div className="mt-1">
                            <Form.Control
                                type="text"
                                placeholder="บ้านเลขที่"
                                value={houseNo}
                                onChange={handleChangeNumberAndSlash(setHouseNo)}
                                maxLength={6}
                                required
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className='col-md-6'>
                            <label className="col-form-label">เลขที่โฉนดที่ดิน</label>
                            <div className="mt-1">
                                <Form.Control
                                    type="text"
                                    placeholder="เลขที่โฉนดที่ดิน"
                                    value={numDeed}
                                    onChange={handleChangeNumber(setNumDeed)}
                                    maxLength={6}
                                    required
                                />
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <label className="col-form-label">เลขที่หน้าสำรวจ</label>
                            <div className="mt-1">
                                <Form.Control
                                    type="text"
                                    placeholder="เลขที่หน้าสำรวจ"
                                    value={numSurvey}
                                    onChange={handleChangeNumber(setNumSurvey)}
                                    maxLength={5}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className='mb-3'>
                        <label className="col-form-label">
                            ขนาดพื้นที่ดินเพิ่มเติม (ตารางวา)
                        </label>

                        {showInputHLandSpace && hLandSpace === 0 && hsId !== '' ? (
                            <div className="mt-1">
                                <Form.Control
                                    type="number"
                                    placeholder="ขนาดพื้นที่ดินเริ่มต้น"
                                    value={showHouseStyleById.land_space}
                                    readOnly
                                />
                            </div>
                        ) : (
                            <div className="mt-1">
                                <Form.Control
                                    type="number"
                                    placeholder="ขนาดพื้นที่ดินเพิ่มเติม (ตารางวา)"
                                    value={hLandSpace}
                                    onChange={(e) => setHLandSpace(e.target.value)}
                                    min='0'
                                    required
                                />
                            </div>
                        )}

                        <div className='mt-2'>
                            <Form.Check
                                inline
                                type='switch'
                                label="ขนาดพื้นที่ดินเริ่มต้น"
                                checked={showInputHLandSpace && hLandSpace === 0 && hsId !== ''}
                                onChange={() => {
                                    if (showInputHLandSpace && hLandSpace === 0 && hsId !== '') {
                                        setShowInputHLandSpace(false);
                                        setHLandSpace('');
                                    } else {
                                        setShowInputHLandSpace(true);
                                        setHLandSpace(0);
                                    }
                                }}
                                min='0'
                                disabled={hsId === ''}
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="col-form-label">หมายเหตุ</label>
                        <div className="mt-1">
                            <Form.Control
                                as='textarea'
                                placeholder="หมายเหตุ (ถ้าไม่ต้องการกรอกหมายเหตุให้เว้นช่องกรอกนี้ไว้)"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="col-form-label">รูปภาพบ้าน</label>
                        <div className="mt-3">

                            {image && (
                                <div className='text-center mb-3'>
                                    <Image src={URL.createObjectURL(new Blob([image], { type: image.type }))} style={{ maxWidth: 250 }} />
                                </div>
                            )}

                            <Form.Control
                                type="file"
                                accept='image/*'
                                key={keyImage}
                                placeholder="เลือกรูปภาพ"
                                onChange={(e) => setImage(e.target.files[0])}
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