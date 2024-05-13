import React, { useState, useEffect } from 'react';
import GetRequest from '@/app/ConfigAPI';
import { API_URL } from './../../../../app';
import { API_HOUSE } from './../../../../api';
import {
    Modal,
    Image,
    Card,
    ListGroup
} from 'react-bootstrap';

export default function ModalDetail({ show, handleClose, id }) {
    const [showData, setShowData] = useState({});

    // fecth //
    const fetchHouseById = async () => {
        try {
            const result = await GetRequest(`${API_HOUSE}/${id}`, 'GET', null);
            setShowData(result);
        } catch (error) {
            console.log('error', error);
        }

    }

    useEffect(() => {
        if (show) {
            fetchHouseById();
        }
    }, [show, id]);
    // --- //

    return (
        <Modal show={show} onHide={handleClose} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>รายละเอียดข้อมูลบ้าน</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='row'>
                    <div className='col-md-5'>
                        <div className='mb-3'>
                            <Card>
                                <Card.Body>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <p className="col-form-label"><strong>บ้านเลขที่:</strong></p>
                                                </div>
                                                <div className='col-md-6'>
                                                    <p className="col-form-label">{showData.house_no}</p>
                                                </div>
                                            </div>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <p className="col-form-label"><strong>เลขที่โฉนดที่ดิน:</strong></p>
                                                </div>
                                                <div className='col-md-6'>
                                                    <p className="col-form-label">{showData.num_deed}</p>
                                                </div>
                                            </div>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <p className="col-form-label"><strong>เลขที่หน้าสำรวจ:</strong></p>
                                                </div>
                                                <div className='col-md-6'>
                                                    <p className="col-form-label">{showData.num_survey}</p>
                                                </div>
                                            </div>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <p className="col-form-label"><strong>ราคาพร้อมที่ดิน:</strong></p>
                                                </div>
                                                <div className='col-md-4'>
                                                    <p className="col-form-label">{parseFloat(showData.price).toLocaleString()}</p>
                                                </div>
                                                <div className='col-md-2 text-end'>
                                                    <p className="col-form-label">บาท</p>
                                                </div>
                                            </div>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <p className="col-form-label"><strong>หมายเหตุ:</strong></p>
                                                </div>
                                                <div className='col-md-6'>
                                                    <p className="col-form-label">{showData.note}</p>
                                                </div>
                                            </div>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className='text-center'>
                            {showData.image !== '' ? (
                                <Image src={`${API_URL}${showData.image}`} rounded fluid />
                            ) : (
                                <Card>
                                    <Card.Body>
                                        <h1 className='text-center mt-5 mb-5'>ไม่มีรูปภาพที่แสดง</h1>
                                    </Card.Body>
                                </Card>
                            )}
                        </div>
                    </div>
                    <div className='col-md-7'>
                        <div className='mb-3 text-center'>
                            <Card>
                                <Card.Body>
                                    <div className='ratio ratio-4x3'>
                                        <iframe src={showData.image3d} allowFullScreen />
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                        <div>
                            <Card>
                                <Card.Body>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <p className="col-form-label"><strong>โซนบ้าน:</strong></p>
                                                </div>
                                                <div className='col-md-6'>
                                                    <p className="col-form-label">{showData.name}</p>
                                                </div>
                                            </div>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <p className="col-form-label"><strong>ชื่อแบบบ้าน:</strong></p>
                                                </div>
                                                <div className='col-md-6'>
                                                    <p className="col-form-label">{showData.house_name}</p>
                                                </div>
                                            </div>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <p className="col-form-label"><strong>ขนาดพื้นที่ดิน:</strong></p>
                                                </div>
                                                <div className='col-md-2'>
                                                    <p className="col-form-label">{parseFloat(showData.hLand_space).toLocaleString()}</p>
                                                </div>
                                                <div className='col-md-4 text-end'>
                                                    <p className="col-form-label">ตารางวา</p>
                                                </div>
                                            </div>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <p className="col-form-label"><strong>ขนาดพื้นที่ใช้สอย:</strong></p>
                                                </div>
                                                <div className='col-md-2'>
                                                    <p className="col-form-label">{parseFloat(showData.usable_space).toLocaleString()}</p>
                                                </div>
                                                <div className='col-md-4 text-end'>
                                                    <p className="col-form-label">ตารางเมตร</p>
                                                </div>
                                            </div>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}