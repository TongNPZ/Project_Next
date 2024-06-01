import React, { useState, useEffect } from 'react';
import {
    handleChangeNumber,
    handleChangeText
} from '@/app/Format';
import GetRequest from '@/app/ConfigAPI';
import { API_URL } from './../../../../app';
import {
    API_HOUSE_ESTATE,
    GET_API_DATA_USER
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
    Image,
    ListGroup
} from 'react-bootstrap';

export default function ModalEdit({ show, handleClose, id }) {

    // image choose
    const [imageChoose, setImageChoose] = useState(true);
    const [signatureChoose, setSignatureChoose] = useState(true);
    const [mdSignatureChoose, setMdSignatureChoose] = useState(true);

    // default values
    const [defaultValues, setDefaultValues] = useState({});

    // - fecth - //
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [signature, setSignature] = useState('');
    const [mdName, setMdName] = useState('');
    const [mdNationality, setMdNationality] = useState('');
    const [mdAddress, setMdAddress] = useState('');
    const [mdSignature, setMdSignature] = useState('');
    const [commonRate, setCommonRate] = useState('');
    const [commonFirstYear, setCommonFirstYear] = useState('');
    const [commonMonth, setCommonMonth] = useState('');
    const [image, setImage] = useState('');
    const [userId, setUserId] = useState('');

    // housing estate
    useEffect(() => {
        if (show) {
            const fetchHousingEstateById = async () => {
                try {
                    const result = await GetRequest(`${API_HOUSE_ESTATE}/${id}`, 'GET', null);
                    setDefaultValues(result);

                    setName(result.name);
                    setCompany(result.company);
                    setPhone(result.phone);
                    setAddress(result.address);
                    setSignature(result.signature);
                    setMdName(result.md_name);
                    setMdNationality(result.md_nationality);
                    setMdAddress(result.md_address);
                    setMdSignature(result.md_signature);
                    setCommonRate(result.common_rate);
                    setCommonFirstYear(result.common_firstYear);
                    setCommonMonth(result.common_month);
                    setImage(result.image);
                    setUserId(result.user_id);
                } catch (error) {
                    console.log('error', error);
                }
            }

            fetchHousingEstateById();
        }
    }, [show, id]);

    // user
    const [showUser, setShowUser] = useState([]);

    useEffect(() => {
        const fecthUser = async () => {
            try {
                const result = await GetRequest(GET_API_DATA_USER, 'GET', null);
                setShowUser(result.data);
            } catch (error) {
                console.log('error', error);
            }
        }

        fecthUser();
    }, [showUser]);
    // --- //

    // - function - //

    // reset data
    const ResetData = () => {
        setName(defaultValues.name);
        setCompany(defaultValues.company);
        setPhone(defaultValues.phone);
        setAddress(defaultValues.address);
        setSignature(defaultValues.signature);
        setMdName(defaultValues.md_name);
        setMdNationality(defaultValues.md_nationality);
        setMdAddress(defaultValues.md_address);
        setMdSignature(defaultValues.md_signature);
        setCommonRate(defaultValues.common_rate);
        setCommonFirstYear(defaultValues.common_firstYear)
        setCommonMonth(defaultValues.common_month);
        setImage(defaultValues.image);
        setUserId(defaultValues.user_id);

        setImageChoose(true);
        setSignatureChoose(true);
        setMdSignatureChoose(true);
    }

    // handle close reset data
    const handleCloseResetData = () => {
        ResetData();
        handleClose();
    }

    // cancel
    const handleCancel = () => {
        ConfirmCancel().then((result) => {
            if (result.isConfirmed) {
                handleCloseResetData();
            }
        });
    }

    // restore
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

    // handle submit
    const handleSubmit = (event) => {
        event.preventDefault();

        ConfirmUpdate().then((result) => {
            if (result.isConfirmed) {
                const editData = async () => {
                    try {
                        const formdata = new FormData();
                        formdata.append("heId", id);
                        formdata.append("name", name);
                        formdata.append("company", company);
                        formdata.append("phone", phone);
                        formdata.append("address", address);
                        formdata.append("signature", signature);
                        formdata.append("mdName", mdName);
                        formdata.append("mdNationality", mdNationality);
                        formdata.append("mdAddress", mdAddress);
                        formdata.append("mdSignature", mdSignature);
                        formdata.append("commonRate", commonRate);
                        formdata.append("commonFirstYear", commonFirstYear);
                        formdata.append("commonMonth", commonMonth);
                        formdata.append("image", image);
                        formdata.append("userId", userId);

                        const response = await GetRequest(API_HOUSE_ESTATE, 'PATCH', formdata)

                        if (response.message === 'Update Successfully!') {
                            Success("แก้ไขข้อมูลสำเร็จ!")
                                .then(() => handleClose())
                                .then(() => setImageChoose(true))
                                .then(() => setSignatureChoose(true))
                                .then(() => setMdSignatureChoose(true))
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

    return (
        <Modal show={show} onHide={handleCancel} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>แก้ไขข้อมูลบ้าน</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="รหัสโครงการ"
                        className='mb-3'
                    >
                        <Form.Control type="text" defaultValue={id} readOnly />
                    </FloatingLabel>
                    <ListGroup variant="flush">
                        <ListGroup.Item >
                            <h6><b>ข้อมูลโครงการ</b></h6>
                        </ListGroup.Item>
                        <div className='ms-3 me-3 mt-3'>
                            <div className="mb-3">
                                <label className="col-form-label">ชื่อโครงการ</label>
                                <div className="mt-1">
                                    <Form.Control
                                        type="text"
                                        placeholder="ชื่อโครงการ"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className='col-md-8'>
                                    <label className="col-form-label">ชื่อบริษัท</label>
                                    <div className="mt-1">
                                        <Form.Control
                                            type="text"
                                            placeholder="ชื่อบริษัท"
                                            value={company}
                                            onChange={(e) => setCompany(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <label className="col-form-label">เบอร์โทรศัพท์</label>
                                    <div className="mt-1">
                                        <Form.Control
                                            type="text"
                                            placeholder="เบอร์โทรศัพท์"
                                            value={phone}
                                            onChange={handleChangeNumber(setPhone)}
                                            maxLength={10}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='mb-3'>
                                <label className="col-form-label">ผู้จัดการ</label>
                                <Form.Select value={userId} onChange={(e) => setUserId(e.target.value)}>

                                    {showUser.map((data) => (
                                        data.role !== 0 && data.role === 1 ? (
                                            <option key={data.user_id} value={data.user_id}>{data.user_name} {data.user_lastname}</option>
                                        ) : null
                                    ))}

                                </Form.Select>
                            </div>
                            <div className="mb-3">
                                <label className="col-form-label">ที่ตั้งโครงการ</label>
                                <div className="mt-1">
                                    <Form.Control
                                        as='textarea'
                                        placeholder="ที่ตั้งโครงการ"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <ListGroup.Item >
                            <h6><b>ข้อมูลเจ้าของบริษัท</b></h6>
                        </ListGroup.Item>
                        <div className='ms-3 me-3 mt-3'>
                            <div className="row mb-3">
                                <div className='col-md-8'>
                                    <label className="col-form-label">ชื่อ-นามสกุล</label>
                                    <div className="mt-1">
                                        <Form.Control
                                            type="text"
                                            placeholder="ชื่อ-นามสกุล"
                                            value={mdName}
                                            onChange={handleChangeText(setMdName)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <label className="col-form-label">สัญชาติ</label>
                                    <div className="mt-1">
                                        <Form.Control
                                            type="text"
                                            placeholder="สัญชาติ"
                                            value={mdNationality}
                                            onChange={handleChangeText(setMdNationality)}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="col-form-label">ที่อยู่</label>
                                <div className="mt-1">
                                    <Form.Control
                                        as='textarea'
                                        placeholder="ที่อยู่"
                                        value={mdAddress}
                                        onChange={(e) => setMdAddress(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <ListGroup.Item >
                            <h6><b>ข้อมูลส่วนกลาง</b></h6>
                        </ListGroup.Item>
                        <div className='ms-3 me-3 mt-3'>
                            <div className="mb-3">
                                <label className="col-form-label">อัตราเก็บค่าส่วนกลางต่อตารางวา</label>
                                <div className="mt-1">
                                    <Form.Control
                                        type="number"
                                        placeholder="อัตราเก็บค่าส่วนกลางต่อตารางวา"
                                        value={commonRate}
                                        onChange={(e) => setCommonRate(e.target.value)}
                                        min='0'
                                        required
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className='col-md-6'>
                                    <label className="col-form-label">จำนวนปีที่เก็บครั้งแรก</label>
                                    <div className="mt-1">
                                        <Form.Control
                                            type="number"
                                            placeholder="จำนวนปีที่เก็บครั้งแรก"
                                            value={commonFirstYear}
                                            onChange={(e) => setCommonFirstYear(e.target.value)}
                                            min='0'
                                            required
                                        />
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <label className="col-form-label">จำนวนเดือนที่เก็บ</label>
                                    <div className="mt-1">
                                        <Form.Control
                                            type="number"
                                            placeholder="จำนวนเดือนที่เก็บ"
                                            value={commonMonth}
                                            onChange={(e) => setCommonMonth(e.target.value)}
                                            min='0'
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ListGroup.Item />
                        <div className='ms-3 me-3 mt-3'>
                            <div className="mb-3">
                                <label className="col-form-label">โลโก้</label>
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
                            <div className='row'>
                                <div className='col-md-6'>
                                    <div className="mb-3">
                                        <label className="col-form-label">ลายเซ็นผู้จัดการ</label>
                                        <div className="mt-3">

                                            {signatureChoose ? (
                                                signature ? (
                                                    <div className='text-center mb-3'>
                                                        <Image src={`${API_URL}${signature}`} style={{ maxWidth: 250 }} />
                                                    </div>
                                                ) : (
                                                    <p>ไม่มีลายเซ็นที่แสดง</p>
                                                )
                                            ) : (
                                                signature && (
                                                    <div className='text-center mb-3'>
                                                        <Image src={URL.createObjectURL(new Blob([signature], { type: signature.type }))} style={{ width: 250 }} />
                                                    </div>
                                                )
                                            )}

                                            <Form.Control
                                                type="file"
                                                accept='image/*'
                                                key={keyImage}
                                                placeholder="เลือกลายเซ็น"
                                                onChange={(e) => {
                                                    setSignatureChoose(false)
                                                    setSignature(e.target.files[0])
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className="mb-3">
                                        <label className="col-form-label">ลายเซ็นเจ้าของบริษัท</label>
                                        <div className="mt-3">

                                            {mdSignatureChoose ? (
                                                mdSignature ? (
                                                    <div className='text-center mb-3'>
                                                        <Image src={`${API_URL}${mdSignature}`} style={{ maxWidth: 250 }} />
                                                    </div>
                                                ) : (
                                                    <p>ไม่มีลายเซ็นที่แสดง</p>
                                                )
                                            ) : (
                                                mdSignature && (
                                                    <div className='text-center mb-3'>
                                                        <Image src={URL.createObjectURL(new Blob([mdSignature], { type: mdSignature.type }))} style={{ width: 250 }} />
                                                    </div>
                                                )
                                            )}

                                            <Form.Control
                                                type="file"
                                                accept='image/*'
                                                key={keyImage}
                                                placeholder="เลือกลายเซ็น"
                                                onChange={(e) => {
                                                    setMdSignatureChoose(false)
                                                    setMdSignature(e.target.files[0])
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ListGroup>
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