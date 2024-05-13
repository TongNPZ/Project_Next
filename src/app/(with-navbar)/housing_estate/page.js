'use client'
import React, { useState, useEffect } from "react";
import ProtectRoute from "@/app/componnent/ProtectRoute/ProtectRoute";
import GetRequest from "@/app/ConfigAPI";
import { API_URL } from "../../../../app";
import { API_HOUSE_ESTATE } from "../../../../api";
import ModalQRCode from "./ModalQRCode";
import ModalEdit from "./ModalEdit";
import {
    Card,
    Image,
    ListGroup,
    Button,
    Tooltip,
    OverlayTrigger,
} from 'react-bootstrap';
import {
    BsQrCode
} from "react-icons/bs";

export default function housingEstate() {

    // fetch
    const [showData, setShowData] = useState([]);

    useEffect(() => {
        const fecthHousingEstate = async () => {
            try {
                const result = await GetRequest(API_HOUSE_ESTATE, 'GET', null);
                setShowData(result.data);
            } catch (error) {
                console.log('error', error);
            }
        }

        fecthHousingEstate();
    }, [showData]);

    // modal //
    const [selectedId, setSelectedId] = useState('');

    // show QR Code
    const [showQRCode, setShowQRCode] = useState(false);

    const handleQRCodeClose = () => setShowQRCode(false);
    const handleQRCodeShow = (id) => {
        setSelectedId(id);
        setShowQRCode(true);
    }

    // show edit
    const [showEdit, setShowEdit] = useState(false);

    const handleEditClose = () => setShowEdit(false);
    const handleEditShow = (id) => {
        setSelectedId(id);
        setShowEdit(true);
    }
    // --- //

    // tooltip
    const renderTooltipQRCode = (props) => (
        <Tooltip {...props}>
            ดู QR Code รับเงิน
        </Tooltip>
    );

    return (
        <ProtectRoute requireRoles={[1]}>

            {/* modal */}
            <ModalQRCode show={showQRCode} handleClose={handleQRCodeClose} id={selectedId} />
            <ModalEdit show={showEdit} handleClose={handleEditClose} id={selectedId} />
            {/* --- */}

            <Card>

                {showData.map((data) => (
                    <div className="row" key={data.he_id}>
                        <div className="col-md-4 text-white text-center rounded-start" style={{ backgroundColor: '#47345F' }}>
                            <div className="mt-5 mb-3">
                                <Image src={`${API_URL}${data.image}`} style={{ width: '50%' }} fluid />
                            </div>
                            <h3>{data.name}</h3>
                            <p>{data.company}</p>
                        </div>
                        <div className="col-md-8">
                            <div className="mt-2 mb-3 me-2 text-end">
                                <OverlayTrigger overlay={renderTooltipQRCode}>
                                    <a onClick={() => handleQRCodeShow(data.he_id)} style={{ cursor: 'pointer' }}>
                                        <BsQrCode className="me-3 text-primary" style={{ fontSize: '30px' }} />
                                    </a>
                                </OverlayTrigger>
                                <Button variant="warning" onClick={() => handleEditShow(data.he_id)}>แก้ไขข้อมูล</Button>
                            </div>
                            <div className="ps-5 pe-5">
                                <ListGroup variant="flush">
                                    <ListGroup.Item >
                                        <h6><b>ข้อมูลโครงการ</b></h6>
                                    </ListGroup.Item>
                                    <div className="ms-3 mt-3">
                                        <div className='row'>
                                            <div className='col-md-3'>
                                                <p className="col-form-label"><strong>โครงการ:</strong></p>
                                            </div>
                                            <div className='col-md-9'>
                                                <p className="col-form-label">{data.name}</p>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-md-3'>
                                                <p className="col-form-label"><strong>บริษัท:</strong></p>
                                            </div>
                                            <div className='col-md-9'>
                                                <p className="col-form-label">{data.company}</p>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-md-3'>
                                                <p className="col-form-label"><strong>ผู้จัดการ:</strong></p>
                                            </div>
                                            <div className='col-md-9'>
                                                <p className="col-form-label">{`${data.user_name} ${data.user_lastname}`}</p>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-md-3'>
                                                <p className="col-form-label"><strong>เบอร์โทรศัพท์:</strong></p>
                                            </div>
                                            <div className='col-md-9'>
                                                <p className="col-form-label">{data.phone}</p>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-md-3'>
                                                <p className="col-form-label"><strong>สถานที่ตั้ง:</strong></p>
                                            </div>
                                            <div className='col-md-9'>
                                                <p className="col-form-label">{data.address}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <ListGroup.Item >
                                        <div className="mt-5">
                                            <h6><b>ข้อมูลเจ้าของบริษัท</b></h6>
                                        </div>
                                    </ListGroup.Item>
                                    <div className="ms-3 mt-3">
                                        <div className='row'>
                                            <div className='col-md-3'>
                                                <p className="col-form-label"><strong>ชื่อ-นามสกุล:</strong></p>
                                            </div>
                                            <div className='col-md-9'>
                                                <p className="col-form-label">{data.md_name}</p>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-md-3'>
                                                <p className="col-form-label"><strong>สัญชาติ:</strong></p>
                                            </div>
                                            <div className='col-md-9'>
                                                <p className="col-form-label">{data.md_nationality}</p>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-md-3'>
                                                <p className="col-form-label"><strong>ที่อยู่:</strong></p>
                                            </div>
                                            <div className='col-md-9'>
                                                <p className="col-form-label">{data.md_address}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <ListGroup.Item >
                                        <div className="mt-5">
                                            <h6><b>ข้อมูลส่วนกลาง</b></h6>
                                        </div>
                                    </ListGroup.Item>
                                    <div className="ms-3 mt-3 mb-5">
                                        <div className='row'>
                                            <div className='col-md-4'>
                                                <p className="col-form-label"><strong>อัตราเก็บค่าส่วนกลางตารางวาละ:</strong></p>
                                            </div>
                                            <div className='col-md-4 text-center'>
                                                <p className="col-form-label">{parseFloat(data.common_rate).toLocaleString()}</p>
                                            </div>
                                            <div className='col-md-4'>
                                                <p className="col-form-label">บาท</p>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-md-4'>
                                                <p className="col-form-label"><strong>จำนวนเดือนครั้งแรกที่เก็บ:</strong></p>
                                            </div>
                                            <div className='col-md-4 text-center'>
                                                <p className="col-form-label">{data.common_firstMonth}</p>
                                            </div>
                                            <div className='col-md-4'>
                                                <p className="col-form-label">เดือน</p>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-md-4'>
                                                <p className="col-form-label"><strong>จำนวนเดือนที่เก็บ:</strong></p>
                                            </div>
                                            <div className='col-md-4 text-center'>
                                                <p className="col-form-label">{data.common_month}</p>
                                            </div>
                                            <div className='col-md-4'>
                                                <p className="col-form-label">เดือน</p>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-md-4'>
                                                <p className="col-form-label"><strong>เงินส่วนกลางทั้งหมด:</strong></p>
                                            </div>
                                            <div className='col-md-4 text-center'>
                                                <p className="col-form-label">{parseFloat(data.common_money).toLocaleString()}</p>
                                            </div>
                                            <div className='col-md-4'>
                                                <p className="col-form-label">บาท</p>
                                            </div>
                                        </div>
                                    </div>
                                </ListGroup>
                            </div>
                        </div>
                    </div>
                ))}

            </Card>
        </ProtectRoute>
    )
}