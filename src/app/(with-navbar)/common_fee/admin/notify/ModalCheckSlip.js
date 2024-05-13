import React, { useState, useEffect } from 'react';
import GetRequest from '@/app/ConfigAPI';
import {
    API_URL,
    NCF
} from '../../../../../../app';
import { 
    API_RECEIVE_COMMON_FEE,
 } from '../../../../../../api';
import {
    Modal,
    Image,
    Card,
} from 'react-bootstrap';

export default function ModalCheckSlip({ show, handleClose, ncfId }) {
    const [showData, setShowData] = useState({});

    // fecth //
    const fetchRcfById = async () => {
        try {
            const result = await GetRequest(`${API_RECEIVE_COMMON_FEE}${NCF}/${ncfId}`, 'GET', null);
            setShowData(result);
        } catch (error) {
            console.log('error', error);
        }

    }

    useEffect(() => {
        if (show) {
            fetchRcfById();
        }
    }, [show, ncfId]);
    // --- //

    return (
        <Modal show={show} onHide={handleClose} size="md">
            <Modal.Header closeButton>
                <Modal.Title>ตรวจสอบสลิป</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='text-center'>
                    {showData.rcf_slip !== null ? (
                        <Image src={`${API_URL}${showData.rcf_slip}`} rounded fluid />
                    ) : (
                        <Card>
                            <Card.Body>
                                <h1 className='text-center mt-5 mb-5'>ไม่มีรูปภาพที่แสดง</h1>
                            </Card.Body>
                        </Card>
                    )}
                </div>
            </Modal.Body>
        </Modal>
    );
}