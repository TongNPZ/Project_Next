import React, { useState, useEffect } from 'react';
import {
    DateTimeFormat,
} from '@/app/Format';
import GetRequest from '@/app/ConfigAPI';
import { API_URL } from '../../../../../app';
import { API_REPORT_PROBLEM } from '../../../../../api';
import {
    Modal,
    Image,
    Card,
    ListGroup
} from 'react-bootstrap';

export default function ModalDetail({ show, handleClose, id }) {
    const [showData, setShowData] = useState({});

    // fecth
    useEffect(() => {
        if (show) {
            const fetchReportProblemById = async () => {
                try {
                    const result = await GetRequest(`${API_REPORT_PROBLEM}/${id}`, 'GET', null);
                    setShowData(result);
                } catch (error) {
                    console.log('error', error);
                }
            }

            fetchReportProblemById();
        }
    }, [show, id]);
    // --- //

    return (
        <Modal show={show} onHide={handleClose} fullscreen>
            <Modal.Header closeButton>
                <Modal.Title>รายละเอียดผลการแก้ไขปัญหา</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='row'>
                    <div className='col-md-6'>
                        <Card style={{ height: '100%' }}>
                            <Card.Header>ข้อมูลผู้แจ้งปัญหา</Card.Header>
                            <Card.Body>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <div className='row'>
                                            <div className='col-md-6'>
                                                <p className="col-form-label"><strong>รหัสแจ้งปัญหา:</strong></p>
                                            </div>
                                            <div className='col-md-6'>
                                                <p className="col-form-label">{showData.rp_id}</p>
                                            </div>
                                        </div>
                                    </ListGroup.Item>
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
                                                <p className="col-form-label"><strong>ชื่อผู้แจ้ง:</strong></p>
                                            </div>
                                            <div className='col-md-6'>
                                                <p className="col-form-label">{showData.user_name} {showData.user_lastname}</p>
                                            </div>
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <div className='row'>
                                            <div className='col-md-6'>
                                                <p className="col-form-label"><strong>รายละเอียด:</strong></p>
                                            </div>
                                            <div className='col-md-6'>
                                                <p className="col-form-label">{showData.rp_problem_details}</p>
                                            </div>
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <div className='row'>
                                            <div className='col-md-6'>
                                                <p className="col-form-label"><strong>วันที่แจ้งข้อมูล:</strong></p>
                                            </div>
                                            <div className='col-md-6'>
                                                <p className="col-form-label">{DateTimeFormat(showData.rp_problem_date)}</p>
                                            </div>
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <div className='mb-3'>
                                            <p className="col-form-label"><strong>รูปภาพการแก้ไข</strong></p>
                                        </div>
                                        {showData.rp_problem_image !== '' ? (
                                            <Image src={`${API_URL}${showData.rp_problem_image}`} rounded fluid />
                                        ) : (
                                            <Card>
                                                <Card.Body>
                                                    <h1 className='text-center mt-5 mb-5'>ไม่มีรูปภาพที่แสดง</h1>
                                                </Card.Body>
                                            </Card>
                                        )}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className='col-md-6'>
                        <Card style={{ height: '100%' }}>
                            <Card.Header>ผลการแก้ไขปัญหา</Card.Header>
                            <Card.Body>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <div className='row'>
                                            <div className='col-md-6'>
                                                <p className="col-form-label"><strong>รายละเอียด:</strong></p>
                                            </div>
                                            <div className='col-md-6'>
                                                <p className="col-form-label">{showData.rp_solved_details}</p>
                                            </div>
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <div className='row'>
                                            <div className='col-md-6'>
                                                <p className="col-form-label"><strong>วันที่แก้ไข:</strong></p>
                                            </div>
                                            <div className='col-md-6'>
                                                <p className="col-form-label">{DateTimeFormat(showData.rp_solved_date)}</p>
                                            </div>
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <div className='mb-3'>
                                            <p className="col-form-label"><strong>รูปภาพการแก้ไข</strong></p>
                                        </div>
                                        {showData.rp_solved_image !== '' ? (
                                            <Card.Img src={`${API_URL}${showData.rp_solved_image}`} />
                                        ) : (
                                            <Card>
                                                <Card.Body>
                                                    <h1 className='text-center mt-5 mb-5'>ไม่มีรูปภาพที่แสดง</h1>
                                                </Card.Body>
                                            </Card>
                                        )}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}