import React, { useState, useEffect } from 'react';
import { DateFormat } from '@/app/Format';
import GetRequest from '@/app/ConfigAPI';
import {
    API_NOTIFY_COMMON_FEE,
    API_HOUSE,
    API_DATA_OWNER_HOUSE
} from '../../../../../../api';
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
    Card,
} from 'react-bootstrap';

export default function ModalAdd({ show, handleClose }) {
    const [ncfNote, setNcfNote] = useState('');
    const [hId, setHId] = useState('');

    // *** function *** //
    const ResetData = () => {
        setNcfNote('');
        setHId('');
    }

    const handleCloseResetData = () => {
        ResetData();
        handleClose();
    }
    // *** //

    // fetch //

    // +++ house +++ //
    const [showHouse, setShowHouse] = useState([]);

    const fecthHouse = async () => {
        try {
            const result = await GetRequest(API_HOUSE, 'GET', null);
            setShowHouse(result.data);
        } catch (error) {
            console.log('error', error);
        }
    }

    useEffect(() => {
        fecthHouse();
    }, [showHouse]);
    // +++ //

    // +++ house owner +++ //
    const [showHouseOwner, setShowHouseOwner] = useState({});

    const fecthHouseOwner = async () => {
        try {
            const result = await GetRequest(`${API_DATA_OWNER_HOUSE}/${hId}`, 'GET', null);
            setShowHouseOwner(result);
        } catch (error) {
            console.log('error', error);
        }
    }

    useEffect(() => {

        if (hId !== '') {
            fecthHouseOwner();
        }

    }, [hId]);
    // +++ //

    // --- //

    // submit //
    const handleSubmit = (event) => {
        event.preventDefault();

        ConfirmInsert().then((result) => {
            if (result.isConfirmed) {
                const addData = async () => {
                    try {
                        const raw = {
                            "ncfNote": ncfNote === '' ? '-' : ncfNote,
                            "hId": parseInt(hId)
                        };

                        const response = await GetRequest(API_NOTIFY_COMMON_FEE, 'POST', raw)

                        if (response.message === 'Insert Successfully!') {
                            Success("เพิ่มข้อมูลสำเร็จ!").then(() => {
                                handleCloseResetData();
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
        <Modal show={show} onHide={handleCancel} size='xl'>
            <Modal.Header closeButton>
                <Modal.Title>แจ้งชำระค่าส่วนกลาง</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <div className='row'>
                        <div className='col-md-6'>

                            {hId !== '' ? (
                                <Card className='mb-3'>
                                    <Card.Body>
                                        <div className='row'>
                                            <div className='col-md-6'>
                                                <p className="col-form-label"><strong>บ้านเลขที่:</strong></p>
                                            </div>
                                            <div className='col-md-6'>
                                                <p className="col-form-label">{showHouseOwner.house_no}</p>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-md-6'>
                                                <p className="col-form-label"><strong>โซนบ้าน:</strong></p>
                                            </div>
                                            <div className='col-md-6'>
                                                <p className="col-form-label">{showHouseOwner.name}</p>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-md-6'>
                                                <p className="col-form-label"><strong>แบบบ้าน:</strong></p>
                                            </div>
                                            <div className='col-md-6'>
                                                <p className="col-form-label">{showHouseOwner.house_name}</p>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-md-6'>
                                                <p className="col-form-label"><strong>ชื่อเจ้าของบ้าน:</strong></p>
                                            </div>
                                            <div className='col-md-6'>
                                                <p className="col-form-label">{`${showHouseOwner.user_name} ${showHouseOwner.user_lastname}`}</p>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-md-6'>
                                                <p className="col-form-label"><strong>วันที่ได้รับกรรมสิทธิ์:</strong></p>
                                            </div>
                                            <div className='col-md-6'>
                                                <p className="col-form-label">{DateFormat(showHouseOwner.trans_date)}</p>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            ) : (
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '100%',
                                }}>
                                    <h1>ไม่มีข้อมูลที่แสดง</h1>
                                </div>
                            )}

                        </div>
                        <div className='col-md-6'>
                            <div className='mb-3'>
                                <label className="col-form-label">บ้านเลขที่</label>
                                <Form.Select value={hId} onChange={(e) => {
                                    setHId(e.target.value)
                                }}>
                                    <option value={''}>กรุณาเลือกบ้านที่ต้องการแจ้งชำระ</option>

                                    {showHouse.map((data) => (
                                        data.h_status === 5 ? (
                                            <option key={data.h_id} value={data.h_id}>{data.house_no}</option>
                                        ) : null
                                    ))}

                                </Form.Select>
                            </div>
                            <div className="mb-3">
                                <label className="col-form-label">หมายเหตุ</label>
                                <div className="mt-1">
                                    <Form.Control
                                        as='textarea'
                                        placeholder="หมายเหตุ (ถ้าไม่ต้องการกรอกหมายเหตุให้เว้นช่องกรอกนี้ไว้)"
                                        value={ncfNote}
                                        onChange={(e) => setNcfNote(e.target.value)}
                                    />
                                </div>
                            </div>
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
        </Modal >
    );
}