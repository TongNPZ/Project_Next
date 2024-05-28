import React from 'react';
import { Card, ListGroup, Image } from 'react-bootstrap';
import { API_URL } from '../../../../app';
import {
    DateTimeFormat,
    FormatThaiNationalID
} from '@/app/Format';

const ContractedDetailCard = ({ showData }) => {
    return (
        <div className='row'>
            <div className=''>
                <div className='mb-3'>
                    <Card>
                        <Card.Header>ข้อมูลสัญญา</Card.Header>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <p className="col-form-label"><strong>เลขที่สัญญา:</strong></p>
                                        </div>
                                        <div className='col-md-6'>
                                            <p className="col-form-label">{showData.con_number}</p>
                                        </div>
                                    </div>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <p className="col-form-label"><strong>เลขที่สัญญาจะซื้อจะขายที่ดิน:</strong></p>
                                        </div>
                                        <div className='col-md-6'>
                                            <p className="col-form-label">{showData.con_numLandSale}</p>
                                        </div>
                                    </div>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <p className="col-form-label"><strong>ชื่อพยาน:</strong></p>
                                        </div>
                                        <div className='col-md-6'>
                                            <p className="col-form-label">{showData.witnessone_name}</p>
                                        </div>
                                    </div>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <p className="col-form-label"><strong>ชื่อพยาน:</strong></p>
                                        </div>
                                        <div className='col-md-6'>
                                            <p className="col-form-label">{showData.witnesstwo_name}</p>
                                        </div>
                                    </div>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <p className="col-form-label"><strong>จำนวนเงินทำสัญญา:</strong></p>
                                        </div>
                                        <div className='col-md-4'>
                                            <p className="col-form-label">{parseFloat(showData.con_amount).toLocaleString()}</p>
                                        </div>
                                        <div className='col-md-2 text-end'>
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
                                            <p className="col-form-label">{DateTimeFormat(showData.con_record)}</p>
                                        </div>
                                    </div>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <p className="col-form-label"><strong>วันที่ทำสัญญา:</strong></p>
                                        </div>
                                        <div className='col-md-6'>

                                            {showData.con_date !== null ? (
                                                <p className="col-form-label">{DateTimeFormat(showData.con_date)}</p>
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

export default ContractedDetailCard;
