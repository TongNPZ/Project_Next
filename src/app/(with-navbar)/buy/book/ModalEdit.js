import React, { useState, useEffect } from 'react';
import GetRequest from '@/app/ConfigAPI';
import { API_URL } from '../../../../../app';
import {
    API_HOUSE,
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
    FloatingLabel,
    Image
} from 'react-bootstrap';

export default function ModalEdit({ show, handleClose, id }) {
    const [imageChoose, setImageChoose] = useState(true);

    const [houseNoDefault, setHouseNoDefault] = useState('');
    const [numDeedDefault, setNumDeedDefault] = useState('');
    const [numSurveyDefault, setNumSurveyDefault] = useState('');
    const [usableSpaceDefault, setUsableSpaceDefault] = useState(0);
    const [landSpaceDefault, setLandSpaceDefault] = useState(0);
    const [houseSalePriceDefault, setHouseSalePriceDefault] = useState(0);
    const [noteDefault, setNoteDefault] = useState('');
    const [imageDefault, setImageDefault] = useState('');
    const [image3DEditDefault, setImage3DEditDefault] = useState('');
    const [hsIdDefault, setHsIdDefault] = useState(0);

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
        setHouseNo(houseNoDefault);
        setNumDeed(numDeedDefault);
        setNumSurvey(numSurveyDefault);
        setUsableSpace(usableSpaceDefault);
        setLandSpace(landSpaceDefault);
        setHouseSalePrice(houseSalePriceDefault);
        setNote(noteDefault);
        setImage(imageDefault);
        setImage3DEdit(image3DEditDefault);
        setHsId(hsIdDefault);
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
            setHouseNoDefault(result.house_no);
            setNumDeedDefault(result.num_deed);
            setNumSurveyDefault(result.num_survey);
            setUsableSpaceDefault(result.hUsable_space);
            setLandSpaceDefault(result.hLand_space);
            setHouseSalePriceDefault(result.houseSale_price);
            setNoteDefault(result.note);
            setImageDefault(result.image);
            setImage3DEditDefault(result.image3d_edit);
            setHsIdDefault(result.hs_id);

            // data //
            setHouseNo(result.house_no);
            setNumDeed(result.num_deed);
            setNumSurvey(result.num_survey);
            setUsableSpace(result.hUsable_space);
            setLandSpace(result.hLand_space);
            setHouseSalePrice(result.houseSale_price);
            setNote(result.note);
            setImage(result.image);
            setImage3DEdit(result.image3d_edit);
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
                        formdata.append("usableSpace", usableSpace);
                        formdata.append("landSpace", landSpace);
                        formdata.append("houseSalePrice", houseSalePrice);
                        formdata.append("note", note);
                        formdata.append("image", image);
                        formdata.append("image3dEdit", image3DEdit);
                        formdata.append("hsId", hsId);

                        const response = await GetRequest(API_HOUSE, 'PATCH', formdata)

                        if (response.message === 'Update Successfully!') {
                            Success("แก้ไขข้อมูลสำเร็จ!")
                                .then(() => handleClose())
                                .then(() => setImageChoose(true))
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
                setImageChoose(true);
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
                setImageChoose(true);
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
                        <Form.Control type="text" defaultValue={id} readOnly disabled />
                    </FloatingLabel>
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
                                placeholder="หมายเหตุ (ถ้าไม่มีหมายเหตุให้ใส่ - ช่องกรอกนี้)"
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