import React, { useState, useEffect } from 'react';
import GetRequest from '@/app/ConfigAPI';
import { API_URL } from './../../../../app';
import {
    API_HOUSE,
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
    FloatingLabel,
    Image
} from 'react-bootstrap';

export default function ModalEdit({ show, handleClose, id }) {
    const [imageChoose, setImageChoose] = useState(true);
    const [showInputHLandSpace, setShowInputHLandSpace] = useState(false);

    const [defaultValues, setDefaultValues] = useState({});

    const [houseNo, setHouseNo] = useState('');
    const [numDeed, setNumDeed] = useState('');
    const [numSurvey, setNumSurvey] = useState('');
    const [hLandSpace, setHLandSpace] = useState(isNaN);
    const [note, setNote] = useState('');
    const [image, setImage] = useState('');
    const [hsId, setHsId] = useState('');

    // *** function *** //
    const ResetData = () => {
        setHouseNo(defaultValues.house_no);
        setNumDeed(defaultValues.num_deed);
        setNumSurvey(defaultValues.num_survey);
        setHLandSpace(isNaN);
        setNote(defaultValues.note);
        setImage(defaultValues.image);
        setHsId(defaultValues.hs_id);

        setImageChoose(true);
        setShowInputHLandSpace(false);
    }

    const handleCloseResetData = () => {
        ResetData();
        handleClose();
    }
    // *** //

    // fecth //

    // +++ fectch house +++ //
    const fetchHouseById = async () => {
        try {
            const result = await GetRequest(`${API_HOUSE}/${id}`, 'GET', null);

            // data default //
            setDefaultValues(result);

            // data //
            setHouseNo(result.house_no);
            setNumDeed(result.num_deed);
            setNumSurvey(result.num_survey);
            setNote(result.note);
            setImage(result.image);
            setHsId(result.hs_id);
        } catch (error) {
            console.log('error', error);
        }
    }

    useEffect(() => {
        if (show) {
            fetchHouseById();
        }
    }, [show, id]);

    // +++ fetch house style +++ //
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
    }, [showHouseStyle]);
    // --- //

    // submit //
    const handleSubmit = (event) => {
        event.preventDefault();

        ConfirmUpdate().then((result) => {
            if (result.isConfirmed) {
                const editData = async () => {
                    try {
                        const formdata = new FormData();
                        formdata.append("id", id);
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

                        const response = await GetRequest(API_HOUSE, 'PATCH', formdata)

                        if (response.message === 'Update Successfully!') {
                            Success("แก้ไขข้อมูลสำเร็จ!")
                                .then(() => handleClose())
                                .then(() => {
                                    setImageChoose(true)
                                    setShowInputHLandSpace(false)
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
        <Modal show={show} onHide={handleCancel} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>แก้ไขข้อมูลบ้าน</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="รหัสบ้าน"
                        className='mb-3'
                    >
                        <Form.Control type="text" defaultValue={id} readOnly />
                    </FloatingLabel>
                    <div className="mb-3">
                        <label className="col-form-label">บ้านเลขที่</label>
                        <div className="mt-1">
                            <Form.Control
                                type="text"
                                placeholder="บ้านเลขที่"
                                value={houseNo}
                                onChange={(e) => setHouseNo(e.target.value)}
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
                                    onChange={(e) => setNumDeed(e.target.value)}
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
                                    onChange={(e) => setNumSurvey(e.target.value)}
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

                        {showInputHLandSpace && hLandSpace !== 0 ? (
                            <div className="mt-1">
                                <Form.Control
                                    type="number"
                                    placeholder="ขนาดพื้นที่ดินเพิ่มเติม (ตารางวา)"
                                    value={hLandSpace}
                                    onChange={(e) => setHLandSpace(e.target.value)}
                                    required
                                />
                            </div>
                        ) : showInputHLandSpace && hLandSpace === 0 ? (
                            <div className="mt-1">
                                <Form.Control
                                    type="number"
                                    placeholder="ขนาดพื้นที่ดินเริ่มต้น"
                                    value={defaultValues.land_space}
                                    readOnly
                                />
                            </div>
                        ) : null}

                        <div className='mt-2'>
                            <Form.Check
                                inline
                                type='checkbox'
                                label="ขนาดพื้นที่ดินเริ่มต้น"
                                checked={showInputHLandSpace && hLandSpace === 0}
                                onChange={() => {
                                    if (showInputHLandSpace && hLandSpace === 0) {
                                        setShowInputHLandSpace(false);
                                        setHLandSpace(isNaN);
                                    } else {
                                        setShowInputHLandSpace(true);
                                        setHLandSpace(0);
                                    }
                                }}
                            />
                            <Form.Check
                                inline
                                type='checkbox'
                                checked={showInputHLandSpace && hLandSpace !== 0}
                                label="กรอกขนาดพื้นที่ดินเพิ่มเติม"
                                onChange={() => {
                                    if (showInputHLandSpace && hLandSpace !== 0) {
                                        setShowInputHLandSpace(false);
                                        setHLandSpace(isNaN);
                                    } else {
                                        setShowInputHLandSpace(true);
                                        setHLandSpace('');
                                    }
                                }}
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
                    <div className='mb-3'>
                        <label className="col-form-label">แบบบ้าน</label>

                        <Form.Select value={hsId} onChange={(e) => setHsId(e.target.value)}>

                            {showHouseStyle.map((data) => (
                                data.hs_status === 1 ? (
                                    <option key={data.hs_id} value={data.hs_id}>{data.house_name}</option>
                                ) : null
                            ))}

                        </Form.Select>

                    </div>
                    <div className="mb-3">
                        <label className="col-form-label">รูปภาพบ้าน</label>
                        <div className="mt-3">

                            {imageChoose ? (
                                image ? (
                                    <div className='text-center mb-3'>
                                        <Image src={`${API_URL}${image}`} style={{ maxWidth: 250 }} />
                                    </div>
                                ) : (
                                    <p>ไม่มีรูปภาพที่แสดง</p>
                                )
                            ) : (
                                image && (
                                    <div className='text-center mb-3'>
                                        <Image src={URL.createObjectURL(new Blob([image], { type: image.type }))} style={{ maxWidth: 250 }} />
                                    </div>
                                )
                            )}


                            <Form.Control
                                type="file"
                                accept='image/*'
                                key={keyImage}
                                placeholder="เลือกรูปภาพ"
                                onChange={(e) => {
                                    setImageChoose(false)
                                    setImage(e.target.files[0])
                                }}
                            />
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