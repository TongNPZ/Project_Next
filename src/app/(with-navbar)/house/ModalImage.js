import React, { useState, useEffect } from 'react';
import GetRequest from '@/app/ConfigAPI';
import { API_URL } from './../../../../app'
import { API_HOUSE } from './../../../../api';
import {
    Modal,
    Image
} from 'react-bootstrap';

export default function ModalImage({ show, handleClose, id }) {
    const [image, setImage] = useState('');

    // fetch //
    const fetchHouseByImage = async () => {
        try {
            const result = await GetRequest(`${API_HOUSE}/${id}`, 'GET', null);
            setImage(result.image);
        } catch (error) {
            console.log('error', error);
        }

    }
    // --- //

    useEffect(() => {
        if (show) {
            fetchHouseByImage();
        }
    }, [show, id]);

    return (
        <Modal show={show} onHide={handleClose} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>รูปภาพบ้าน</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                {image !== '' ? (
                    <Image src={`${API_URL}${image}`} fluid />
                ) : (
                    <h1 className='text-center'>ไม่มีรูปภาพที่แสดง</h1>
                )}

            </Modal.Body>
        </Modal>
    );
}