import React, { useState, useEffect } from 'react';
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
    const [houseNo, setHouseNo] = useState('');
    const [numDeed, setNumDeed] = useState('');
    const [numSurvey, setNumSurvey] = useState('');
    const [usableSpace, setUsableSpace] = useState(0);
    const [landSpace, setLandSpace] = useState(0);
    const [houseSalePrice, setHouseSalePrice] = useState(0);
    const [note, setNote] = useState('');
    const [image, setImage] = useState('');
    const [image3DEdit, setImage3DEdit] = useState('');
    const [hsId, setHsId] = useState(0);

    // *** function *** //
    const ResetData = () => {
        setHouseNo('');
        setNumDeed('');
        setNumSurvey('');
        setUsableSpace(0);
        setLandSpace(0);
        setHouseSalePrice(0);
        setNote('');
        setImage('');
        setImage3DEdit('');
        setHsId(0);
    }

    const handleCloseResetData = () => {
        ResetData();
        handleClose();
    }
    // *** //

    // fetch house style //
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

        ConfirmInsert().then((result) => {
            if (result.isConfirmed) {
                const addData = async () => {
                    try {
                        const formdata = new FormData();
                        formdata.append("houseNo", houseNo);
                        formdata.append("numDeed", numDeed);
                        formdata.append("numSurvey", numSurvey);
                        formdata.append("usableSpace", usableSpace);
                        formdata.append("landSpace", landSpace);
                        formdata.append("houseSalePrice", houseSalePrice);
                        formdata.append("note", note);
                        formdata.append("image", image);
                        formdata.append("image3DEdit", image3DEdit);
                        formdata.append("hsId", hsId);

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
                    <div className="mb-3">
                        <label className="col-form-label">เลขที่บ้าน</label>
                        <div className="mt-1">
                            <Form.Control
                                type="text"
                                placeholder="เลขที่บ้าน"
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
                    <div className="row mb-3">
                        <div className='col-md-6'>
                            <label className="col-form-label">
                                ขนาดพื้นที่ใช้สอย (ตารางเมตร)
                                <p className='text-secondary mb-1' style={{ fontSize: '14px' }}>ถ้าต้องการขนาดพื้นที่ใช้สอยเริ่มต้นให้กรอกเลข 0</p>
                            </label>
                            <div className="mt-1">
                                <Form.Control
                                    type="number"
                                    placeholder="ขนาดพื้นที่ใช้สอย (ตารางเมตร)"
                                    value={usableSpace}
                                    onChange={(e) => setUsableSpace(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <label className="col-form-label">
                                ขนาดพื้นที่ดิน (ตารางวา)
                                <p className='text-secondary mb-1' style={{ fontSize: '14px' }}>ถ้าต้องการขนาดพื้นที่ดินเริ่มต้นให้กรอกเลข 0</p>
                            </label>
                            <div className="mt-1">
                                <Form.Control
                                    type="number"
                                    placeholder="ขนาดพื้นที่ดิน (ตารางวา)"
                                    value={landSpace}
                                    onChange={(e) => setLandSpace(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="col-form-label">ราคาขายบ้าน</label>
                        <div className="mt-1">
                            <Form.Control
                                type="number"
                                placeholder="ราคาขายบ้าน"
                                value={houseSalePrice}
                                onChange={(e) => setHouseSalePrice(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="col-form-label">หมายเหตุ</label>
                        <div className="mt-1">
                            <Form.Control
                                as='textarea'
                                placeholder="หมายเหตุ (ถ้าไม่มีหมายเหตุให้เว้นว่างช่องกรอกนี้)"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="col-form-label">
                            ภาพ 3 มิติ (URL)
                            <p className='text-secondary mb-1' style={{ fontSize: '14px' }}>ภาพสามมิติที่มีการแก้ไขเพิ่มเติม</p>
                        </label>
                        <div className="mt-1">
                            <Form.Control
                                type="url"
                                placeholder="URL ภาพ 3 มิติ (ถ้าไม่มีภาพสามมิติที่แก้ไขเพิ่มเติมให้เว้นว่างช่องกรอกนี้)"
                                value={image3DEdit}
                                onChange={(e) => setImage3DEdit(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='mb-3'>
                        <label className="col-form-label">แบบบ้าน</label>

                        <Form.Select value={hsId} onChange={(e) => setHsId(e.target.value)}>
                            <option>กรุณาเลือกแบบบ้าน</option>

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