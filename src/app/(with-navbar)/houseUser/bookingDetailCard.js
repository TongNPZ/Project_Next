import React from 'react';
import { Card, ListGroup, Image } from 'react-bootstrap';
import { API_URL } from '../../../../app';
import {
    DateTimeFormat,
    FormatThaiNationalID
} from '@/app/Format';

const BookingCard = ({ showData }) => {
    return (

        <div className='row'>
            <div className=''>
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
                </div>
            </div>
        </div>
    );
};

export default BookingCard;
