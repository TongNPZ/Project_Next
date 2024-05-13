import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import GetRequest from '@/app/ConfigAPI';
import { API_CONTRACT } from '../../../../../api';
import {
    ConfirmInsert,
    ConfirmCancel,
    ConfirmRestore,
    Success
} from '@/app/componnent/SweetAlertComponent/ResponseMessage'
import {
    Modal,
    Button,
    Form,
    FloatingLabel
} from 'react-bootstrap';

export default function ModalContractAdd({ show, handleClose, id, houseNo, userName, userLastname }) {
    const router = useRouter();

    // useState //
    const [witnessOneName, setWitnessOneName] = useState('');
    const [witnessTwoName, setWitnessTwoName] = useState('');
    const [conAmount, setConAmount] = useState('');
    const [conNote, setConNote] = useState('');
    // --- //


    // *** function *** //

    // reset data
    const ResetData = () => {
        setWitnessOneName('');
        setWitnessTwoName('');
        setConAmount('');
        setConNote('');
    }

    // handle close reset data
    const handleCloseResetData = async () => {
        ResetData();
        handleClose();
    }
    // *** //

    // submit //
    const handleSubmit = (event) => {
        event.preventDefault();

        ConfirmInsert().then((result) => {
            if (result.isConfirmed) {
                const addData = async () => {
                    try {
                        const raw = {
                            "id": id,
                            "witnessOneName": witnessOneName,
                            "witnessTwoName": witnessTwoName,
                            "conAmount": parseFloat(conAmount),
                            "conNote": conNote === '' ? '-' : conNote
                        };

                        const response = await GetRequest(API_CONTRACT, 'POST', raw)

                        if (response.message === 'Insert Successfully!') {
                            Success("เพิ่มข้อมูลสำเร็จ!")
                                .then(() => {
                                    handleCloseResetData();
                                })
                                .then(() => {
                                    router.push('/buy/contracted');
                                })
                        }
                    } catch (error) {
                        console.log('error', error);
                    }
                }

                addData()
            }
        });
    }
    // --- //

    // cancel
    const handleCancel = () => {
        ConfirmCancel().then((result) => {
            if (result.isConfirmed) {
                handleCloseResetData();
            }
        });
    }
    // -- //

    // restore //
    const handleRestore = (event) => {
        event.preventDefault();

        ConfirmRestore().then((result) => {
            if (result.isConfirmed) {
                ResetData();
            }
        });
    }
    // --- //

    return (
        <Modal show={show} onHide={handleCancel} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>กรอกข้อมูลสัญญา</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="รหัสจอง"
                        className='mb-3'
                    >
                        <Form.Control type="text" defaultValue={id} disabled />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="บ้านเลขที่"
                        className='mb-3'
                    >
                        <Form.Control type="text" defaultValue={houseNo} disabled />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="ชื่อผู้จอง"
                        className='mb-3'
                    >
                        <Form.Control type="text" defaultValue={`${userName} ${userLastname}`} disabled />
                    </FloatingLabel>
                    <div className="row mb-3">
                        <div className='col-md-6'>
                            <label className="col-form-label">ชื่อพยานคนที่หนึ่ง</label>
                            <div className="mt-1">
                                <Form.Control
                                    type="text"
                                    placeholder="ชื่อพยานคนที่หนึ่ง"
                                    value={witnessOneName}
                                    onChange={(e) => setWitnessOneName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <label className="col-form-label">ชื่อพยานคนที่สอง</label>
                            <div className="mt-1">
                                <Form.Control
                                    type="text"
                                    placeholder="ชื่อพยานคนที่สอง"
                                    value={witnessTwoName}
                                    onChange={(e) => setWitnessTwoName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="col-form-label">จำนวนเงินทำสัญญา</label>
                        <div className="mt-1">
                            <Form.Control
                                type="number"
                                placeholder="จำนวนเงินทำสัญญา"
                                value={conAmount}
                                onChange={(e) => setConAmount(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="col-form-label">หมายเหตุ</label>
                        <div className="mt-1">
                            <Form.Control
                                as="textarea"
                                placeholder="หมายเหตุ (ถ้าไม่ต้องการกรอกหมายเหตุให้เว้นช่องกรอกนี้ไว้)"
                                value={conNote}
                                onChange={(e) => setConNote(e.target.value)}
                            />
                        </div>
                    </div>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleRestore}>
                            คืนค่า
                        </Button>
                        <Button variant="success" type='submit'>
                            เพื่มข้อมูล
                        </Button>
                    </Modal.Footer>
                </Form>

            </Modal.Body>
        </Modal>
    );
}