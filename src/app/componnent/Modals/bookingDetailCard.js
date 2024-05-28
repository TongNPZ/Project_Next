import React from 'react';
import { Card, ListGroup, Image } from 'react-bootstrap';
import { API_URL } from '../../../../app';
import {
    DateTimeFormat,
    FormatThaiNationalID
} from '@/app/Format';

const BookingCard = ({ showData }) => {
    return (
        <div className='col-md-12'>
            <div className='row'>
                <div className='col-md-6'>
                    <div className='mb-3'>
                        <Card>
                            <Card.Header>ข้อมูลจอง</Card.Header>
                            <Card.Body>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <div className='row'>
                                            <div className='col-md-6'>
                                                <p className="col-form-label"><strong>รหัสจอง:</strong></p>
                                            </div>
                                            <div className='col-md-6'>
                                                <p className="col-form-label">{showData.book_id}</p>
                                            </div>
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <div className='row'>
                                            <div className='col-md-6'>
                                                <p className="col-form-label"><strong>จำนวนเงินจอง:</strong></p>
                                            </div>
                                            <div className='col-md-2'>
                                                <p className="col-form-label">{parseFloat(showData.b_amount).toLocaleString()}</p>
                                            </div>
                                            <div className='col-md-4 text-end'>
                                                <p className="col-form-label">บาท</p>
                                            </div>
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <div className='row'>
                                            <div className='col-md-6'>
                                                <p className="col-form-label"><strong>วันที่บันทึกข้อมูล:</strong></p>
                                            </div>
                                            <div className='col-md-6'>
                                                <p className="col-form-label">{DateTimeFormat(showData.b_record)}</p>
                                            </div>
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <div className='row'>
                                            <div className='col-md-6'>
                                                <p className="col-form-label"><strong>วันที่จอง:</strong></p>
                                            </div>
                                            <div className='col-md-6'>

                                                {showData.b_date !== null ? (
                                                    <p className="col-form-label">{DateTimeFormat(showData.b_date)}</p>
                                                ) : (
                                                    <p className="col-form-label"> - </p>
                                                )}

                                            </div>
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <div className='row'>
                                            <div className='col-md-6'>
                                                <p className="col-form-label"><strong>หมายเหตุ:</strong></p>
                                            </div>
                                            <div className='col-md-6'>
                                                <p className="col-form-label">{showData.b_note}</p>
                                            </div>
                                        </div>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </div>
                    <div>
                        <Card>
                            <Card.Header>ข้อมูลผู้จอง</Card.Header>
                            <Card.Body>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <div className='row'>
                                            <div className='col-md-6'>
                                                <p className="col-form-label"><strong>เลขบัตรประจำตัวประชาชน:</strong></p>
                                            </div>
                                            <div className='col-md-6'>
                                                <p className="col-form-label">{FormatThaiNationalID(showData.user_id)}</p>
                                            </div>
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <div className='row'>
                                            <div className='col-md-6'>
                                                <p className="col-form-label"><strong>ชื่อ-นามสกุล:</strong></p>
                                            </div>
                                            <div className='col-md-6'>
                                                <p className="col-form-label">{showData.user_name} {showData.user_lastname}</p>
                                            </div>
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <div className='row'>
                                            <div className='col-md-6'>
                                                <p className="col-form-label"><strong>ที่อยู่ตามทะเบียนบ้าน:</strong></p>
                                            </div>
                                            <div className='col-md-6'>
                                                <p className="col-form-label">{showData.user_address}</p>
                                            </div>
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <div className='row'>
                                            <div className='col-md-6'>
                                                <p className="col-form-label"><strong>อายุ:</strong></p>
                                            </div>
                                            <div className='col-md-6'>
                                                <p className="col-form-label">{showData.user_age}</p>
                                            </div>
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <div className='row'>
                                            <div className='col-md-6'>
                                                <p className="col-form-label"><strong>สัญชาติ:</strong></p>
                                            </div>
                                            <div className='col-md-6'>
                                                <p className="col-form-label">{showData.nationality}</p>
                                            </div>
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <div className='row'>
                                            <div className='col-md-6'>
                                                <p className="col-form-label"><strong>เบอร์โทรศัพท์:</strong></p>
                                            </div>
                                            <div className='col-md-6'>
                                                <p className="col-form-label">{showData.user_phone}</p>
                                            </div>
                                        </div>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className='text-center mb-3'>
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
                    <div>
                        <Card>
                            <Card.Header>ข้อมูลบ้าน</Card.Header>
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
                                                <p className="col-form-label"><strong>แบบบ้าน:</strong></p>
                                            </div>
                                            <div className='col-md-6'>
                                                <p className="col-form-label">{showData.house_name}</p>
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
                                    <ListGroup.Item>
                                        <div className='row'>
                                            <div className='col-md-6'>
                                                <p className="col-form-label"><strong>ราคาบ้านพร้อมที่ดิน:</strong></p>
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
                </div>
            </div>
        </div>
    );
};

export default BookingCard;
